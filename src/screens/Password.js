import React, { Component } from 'react'
import { Keyboard, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native'

import {  Button, Block, Txt, Input } from '../components';
import { theme } from '../constants';
import { connect } from 'react-redux';
import {  editPassword } from '../actions';


class Password extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      newpassword: '',
      errors: [],
      load: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.saved) {
      Alert.alert(
        'Success!',
        'Votre mot de passe a été enregistré ',
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
  _onSavePassword() {
    const { password, newpassword } = this.state;
    const errors = [];
    Keyboard.dismiss();
    this.setState({ load: true });

    if (!password || password.length <= 6) errors.push('password');
    if (!newpassword || newpassword.length <= 6) errors.push('password');
   
    if (!errors.length) {
      this.props.editPassword({ password, newpassword });
     } else {
          this.setState({ errors, load: false });
          Alert.alert(
            'Erreur',
            'Veuillez remplir tous les champs requis. \n Le mot de passe doit comporter au moins 6 caractères',     
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
      <Button gradient style={{margin:10}} onPress={this._onSavePassword.bind(this)}>
            {load? (
            <ActivityIndicator size="small" color="white" /> 
            ) : (
            <Txt bold white center> Enregistrer</Txt>
            )}      
       </Button>
    );
  }

  render() {
    const {  errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
  
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h1 bold>Mot de Passe</Txt>    
        </Block>

        <ScrollView>
        <Block padding={[10, theme.sizes.base * 2]}>
          <Block middle>
          <Input
              secure
              label="Actuel"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              onChangeText={text => this.setState({ password: text })}
            />
            <Input
              secure
              label="Nouveau"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              onChangeText={text => this.setState({ newpassword: text })}
            />
               {this.showErrorMessage()}
               { this._renderButton() }
          </Block>
        </Block>
       </ScrollView>
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.editPass.error,
    loading: state.editPass.loading,
    saved: state.editPass.saved,
   }
}

export default connect(mapStateToProps, {  editPassword })(Password);

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
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  errorMessage: {
    color: theme.colors.red,
    fontSize: 16
}
})