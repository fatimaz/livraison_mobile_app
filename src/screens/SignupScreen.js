import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, View, StyleSheet , ScrollView, Spinner} from 'react-native';
import { connect } from 'react-redux';
import { signupUser } from '../actions';
import { Button, Block, Input, Txt } from '../components';
import { theme } from '../constants';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      password: '',
      errors: [],
      load: false,
      profile: null,
    };
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.signedup) { 
        this.props.navigation.navigate('SearchScreen');
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

  handleSignUp() {
    const {  name, email, password } = this.state;
    const {loading}=this.props
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    ////// check with backend API or with some static data
        if (!name) errors.push('name');
        if (!email || !re.test(email) ) errors.push('email');
        // const checkmobile =Array.from(mobile).every(char => char >=0 && char <=9);
        // const checkmobile = /^[0-9]+$/.test(mobile);
        // if (!mobile || mobile.length !== 10 || !checkmobile) errors.push('mobile');

        if (!password || password.length <= 6) errors.push('password');
        if (!errors.length) {
            this.props.signupUser({  name, email,  password });      
        }else{
          this.setState({ errors, loading: false });
          Alert.alert(
            'Erreur',
            'Veuillez vérifier vos champs.',
            [
              { text: 'Réessayer', }
            ],
            { cancelable: false }
          )
        }
  }

  _renderButton() {
    const { loading } = this.props;
    return (
    <Button gradient onPress={this.handleSignUp.bind(this)}>
     {loading ? (
        <ActivityIndicator size="small" color="white" /> 
     ) : ( 
        <Txt bold white center>Créer un compte</Txt>
     )}
    </Button>
    );
  }
  render() {
    const { navigation } = this.props;
    const {  errors , profile} = this.state;
    const { loading } = this.props;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (     
       <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[10, theme.sizes.base * 2]}>
          <Txt h1 bold style={{marginVertical:25}}> Créer un compte</Txt>
          <Block middle>
            <Input
              label="Nom"
              error={hasErrors('name')}
              style={[styles.input, hasErrors('name')]}
              defaultValue={this.state.name}
              selectionColor= {theme.colors.accent}
              onChangeText={text => this.setState({ name: text })}
            />
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              selectionColor= {theme.colors.accent}
              onChangeText={text => this.setState({ email: text })}
            /> 
             
             {/* <Input
                    label="Mobile"
                    error={hasErrors('mobile')}
                    placeholder= '+212'
                    style={[styles.input, hasErrors('mobile')]}
                    defaultValue={this.state.mobile}
                    selectionColor= {theme.colors.accent}
                    onChangeText={text => this.setState({ mobile: text })}
                    editable={!loading}
             />       
            */}
            <Input
              secure
              label="Mot de passe"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              placeholder= '6 caractères min'
              placeholderTextColor= {theme.colors.gray2}
              defaultValue={this.state.password}
              selectionColor= {theme.colors.accent}
              onChangeText={text => this.setState({ password: text })}
            />  
             
            {this.showErrorMessage()}
            { this._renderButton() }
            <Button onPress={() => navigation.navigate('LoginScreen')}>
              <Txt blue caption center style={{ textDecorationLine: 'underline' }}>
                 Retour connexion
              </Txt>
            </Button>
          </Block>
        </Block>
     </ScrollView>
    )
  }
}

 const mapStateToProps = state => {
  return {
    error: state.signup.error,
    loading: state.signup.loading,
    signedup: state.signup.signedup,
    user: state.signup.user,
   }
 }
export default connect(mapStateToProps, { signupUser })(SignupScreen);

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
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
  containerWithMargin: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessage: {
      color: theme.colors.red,
      fontSize: 16
  }
})
