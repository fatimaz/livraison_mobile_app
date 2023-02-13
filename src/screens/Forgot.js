import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Block, Input, Txt } from '../components';
import { theme } from '../constants';
import { connect } from 'react-redux';
import { forgetPassword } from '../actions';


class Forgot extends Component {
  state = {
    email: '',
    errors: [],
    load: false,
  }

  componentWillReceiveProps(nextProps) { 
    const { navigation } = this.props;
    if (nextProps.pass) { 
      Alert.alert(
        'Mot de passe envoyé!',
        'Veuillez vérifier votre email.',
        [
          {
            text: 'OK', onPress: () => {
              navigation.navigate('LoginScreen')
            }
          }
        ],
        { cancelable: false }
      )
    }
 }

  handleForgot() {
  
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];
    Keyboard.dismiss();
    this.setState({ load: true });
 
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!email || !re.test(email) ) errors.push('email');
    this.setState({ errors, load: false });

    if (!errors.length) {
      this.props.forgetPassword({ email });
    }else{
      this.setState({ errors, load: false });
    }
    
  }

  render() {
    const { navigation, loading } = this.props;
    const { load, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Txt h1 bold> Mot de passe oublié</Txt>
          <View style={{justifyContent:'center', marginTop:50}}>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            {/* <Button gradient onPress={() => this.handleForgot()}> */} 
              <Button gradient onPress={this.handleForgot.bind(this)}>
                  {loading ? (
                      <ActivityIndicator size="small" color="white" /> 
                  ) : ( 
                      <Txt bold white center>Valider</Txt>
                  )}
            </Button>
            <Button onPress={() => navigation.navigate('Login')}>
              <Txt gray caption center style={{ textDecorationLine: 'underline' }}>
                 Retour connexion
              </Txt>
            </Button>
          </View>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.forgetPass.error,
    loading: state.forgetPass.loading,
    pass: state.forgetPass.pass
  }
}
export default connect(mapStateToProps, { forgetPassword })(Forgot);

const styles = StyleSheet.create({
  forgot: {
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
  }
})