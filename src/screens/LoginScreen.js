import React, { Component } from 'react'
import {
  ActivityIndicator, Keyboard, KeyboardAvoidingView, View,
  Dimensions, StyleSheet, ScrollView, Alert
} from 'react-native'
import { Button, Block, Input, Txt, Spinner } from '../components';
import { theme } from '../constants';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

const { height } = Dimensions.get('window');

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
      error: '',
      load: false,
      disabled: true,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.navigation.navigate('SearchScreen');
    }
  }

  _onLoginPressed() {
    const { email, password } = this.state;
    const errors = [];

    this.setState({ loading: true, error: '' });
    Keyboard.dismiss();
    this.setState({ load: true });
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !re.test(email)) errors.push('email');
    if (!password) errors.push('password');

    if (!errors.length) {
      this.props.loginUser({ email, password });
    } else {
      this.setState({ errors, load: false });
      Alert.alert(
        'Erreur',
        'Remplissez les champs obligatoires.',
        [
          { text: 'Réessayer', }
        ],
        { cancelable: false }
      )
    }
  }
  onAuthSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  onAuthFailed() {
    this.setState({ 'error': 'Authentication Failed', loading: false });
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
    const { loading } = this.props;

    return (
      <Button gradient style={{ marginTop: 20 }} onPress={this._onLoginPressed.bind(this)}>
        {loading ? (
          // <ActivityIndicator size="small" color="white" /> 
          <Spinner size='small' />
        ) : (
          <Txt bold white center>Se connecter</Txt>
        )}
      </Button>
    );
  }
  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')
  render() {

    const { navigation } = this.props;
    const { errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <ScrollView>
        <Block padding={[80, theme.sizes.base * 2]}>
          <Txt h1 bold>Se Connecter</Txt>
          <Block middle style={{ paddingVertical: 40 }}>
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              selectionColor={theme.colors.accent}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Mot de passe"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              selectionColor={theme.colors.accent}
              onChangeText={text => this.setState({ password: text })}
            />
            {this.showErrorMessage()}
            <Txt style={styles.errorMessage} >{this.state.error}</Txt>
            {this._renderButton()}

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Txt blue center style={{ textDecorationLine: 'underline' }}>
                Mot de passe oublié?
              </Txt>
            </Button>
          </Block>

          <Button
            title='Forgot Password?'
            onPress={this.goToForgotPassword}
            titleStyle={{
              color: '#039BE5'
            }}
            type='clear'
          />

        </Block>

      </ScrollView>
    )
  }
}


const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user,
  }
}


export default connect(mapStateToProps, { loginUser })(LoginScreen);
const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray,
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
  },
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
    borderBottomLeftRadius: 20,
  },
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1
  },


})