import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet ,TextInput,View} from 'react-native';
import { Button, Block, Input, Txt } from '../components';
import { theme } from '../constants';
import { connect } from 'react-redux';
import { fetchProfile,verifyCode } from '../actions';


class VerifyScreen extends Component {
  state = {
    code: '',
    errors: [],
    load: false,
  }

  componentWillReceiveProps(nextProps) { 
    const { navigation } = this.props;
    if (nextProps.code) { 
      this.props.fetchProfile();
      this.props.navigation.navigate('AccountScreen'); 
    }
 }

 handleCode() {

    const { navigation } = this.props;
    const { code } = this.state;
    const errors = [];
    Keyboard.dismiss();
    this.setState({ load: true });
    const api_token = navigation.getParam('user');

     if (!code ) errors.push('code');
     this.setState({ errors, load: false });

    if (!errors.length) {
      this.props.verifyCode({ code });
    }else{
      this.setState({ errors, load: false });
    }
    }
    showErrorMessage() {
    if (this.props.error) {
      // this.setState({ load: false });
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
      // onPress={() => this.handleSignUp()}
    <Button gradient  onPress={this.handleCode.bind(this)}>
     {loading ? (
        <ActivityIndicator size="small" color="white" /> 
     ) : ( 
        <Txt bold white center>Valider</Txt>
     )}
    </Button>
    );
  }

  render() {
    const { navigation } = this.props;
    const { load, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <Block style={styles.forgot}>
        <Block padding={[30, theme.sizes.base * 2]}>
        <Txt h2 bold> Confirmez votre numero</Txt>
          
          <View style={{marginTop:80}}>
          <Txt h3 bold> Saisissez le code que nous vous avans envoye par SMS </Txt>

             <TextInput
                placeholder="- - - - - -"   
                style={[styles.codeInput,hasErrors('code')]}
                maxLength={6}
                keyboardType = 'numeric'
                placeholderStyle={styles.somePlaceholderStyle}
                defaultValue={this.state.code}
                onChangeText={text => this.setState({ code: text })}
                autoCorrect={false}
                /> 
                { this._renderButton() }  
                { this.showErrorMessage()}
          </View>
        </Block>
      </Block>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.verify.error,
    loading: state.verify.loading,
    code: state.verify.code,
  }
}
export default connect(mapStateToProps, { fetchProfile,verifyCode })(VerifyScreen);

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
  },
  codeInput: {
    height: 60,
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: "white",
    fontSize: 35,
    justifyContent: 'center',
    alignItems:'center',
    textAlign: 'center',
  
  },

})
