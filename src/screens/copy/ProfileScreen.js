import React, { Component } from 'react'
import { Alert,Keyboard, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'

import {  Button, Block, Txt,  Input} from '../components';
import { theme } from '../constants';
import { connect } from 'react-redux';
import {  editProfile, fetchProfile } from '../actions';

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      errors: [],
      load: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saved) {
      Alert.alert(
        'Success!',
        'Votre compte a été enregistré ',
        [
          {
            text: 'Continuer', onPress: () => {
              this.props.navigation.goBack();
             
            }
          }
        ],
        { cancelable: false }
      )  
    }
  }


  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;
    this.setState({ profile });
  }

  renderEdit(name) {
    const { profile, errors } = this.state;
     const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

      return (
        <Input
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
          selectionColor= {theme.colors.accent}
          error={hasErrors(name)}
           style={[styles.input, hasErrors(name)]}
        />
      )
  }

  // 
  _onSaveProfile() {
  
    const { profile } = this.state;
    const errors = [];
     Keyboard.dismiss();
     this.setState({ load: true });
     const firstname= profile['firstname'];
     const lastname= profile['lastname'];
     const email= profile['email'];
     const tel= profile['tel'];
     const address= profile['address'];

     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!email || !re.test(email) ) errors.push('email');
     if (!lastname) errors.push('lastname');
     if (!firstname) errors.push('firstname');

     if (!errors.length) {
      this.props.editProfile({ firstname, lastname, email,tel, address } );
     } else {
       this.setState({ errors, load: false });
       Alert.alert(
            'Erreur',
            'Veuillez remplir tous les champs requis.',
            [
              { text: 'Réessayer', }
            ],
            { cancelable: false }
        )
     }
  }

  showErrorMessage() {
    if (this.props.error) {
        return (
            <View style={styles.containerWithMargin}>
                <Txt accent style={styles.errorMessage}>{this.props.error}</Txt>
            </View>
        );
    } 
 }

  _renderButton() {
    const { load } = this.state;
    return (
       <Button gradient style={{margin:10}} onPress={this._onSaveProfile.bind(this)}>
              {load? (
              <ActivityIndicator size="small" color="white" /> 
              ) : (
              <Txt bold white center> Enregistrer</Txt>
              )}      
      </Button>
    );
  }

  render() {

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h1 bold>Profil </Txt>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Txt gray2 >Prénom</Txt>
                {this.renderEdit('firstname')}
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Txt gray2>Nom</Txt>
                {this.renderEdit('lastname')}
              </Block>     
            </Block>
         
{/*  */}
           <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Txt gray2>Email</Txt>
                {this.renderEdit('email')}
              </Block>         
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Txt gray2>Numéro de téléphone</Txt>
                {this.renderEdit('tel')}
              </Block>   
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block> 
                <Txt gray2 >Adresse</Txt>
                {this.renderEdit('address')}
              </Block>   
            </Block>
            {/*  */}
            {this.showErrorMessage()}
          </Block>
        </ScrollView>
        { this._renderButton() }
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.profileInfo.error,
    loading: state.profileInfo.loading,
    profile: state.profileInfo.profile,

    erroredit: state.editprofile.error,
    loadingedit: state.editprofile.loading,
    saved: state.editprofile.saved
  }
}

export default connect(mapStateToProps, { editProfile, fetchProfile })(ProfileScreen);


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputs: {
    // marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end'
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
})