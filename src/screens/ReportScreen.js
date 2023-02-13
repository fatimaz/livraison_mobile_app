import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, View, StyleSheet , ScrollView, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { sendReport } from '../actions';
import { Button, Block, Txt } from '../components';
import { theme } from '../constants';

class ReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sujet: '',
      message: '',
      errors: [],
      load: false,
      profile: null,
    };
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.sent) { 
        this.props.navigation.navigate('MyShipmentsScreen');
    }
}
componentWillReceiveProps(nextProps) {
    if (nextProps.sent) {
         Alert.alert(
        'Envoyé',
        'Message envoye avec success.',       
        [
          {
            text: 'OK', onPress: () => {
               this.props.navigation.navigate('MyShipmentsScreen'); 
               const { navigation, loading } = this.props; 
               this.setState({ loading: false });
            }
          }
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

  handleReport() {
    const {  sujet, message } = this.state;
    const {navigation}=this.props
    const order_id = navigation.getParam('order_id'); 
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });
     if (!sujet) errors.push('sujet');
     if (!message) errors.push('message');

        if (!errors.length) {
            this.props.sendReport({  sujet, message, order_id });      
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

    <Button gradient onPress={this.handleReport.bind(this)}>
     {loading ? (
        <ActivityIndicator size="small" color="white" /> 
     ) : ( 
        <Txt bold white center>Envoyer</Txt>
     )}
    </Button>
    );
  }
  render() {
    const { navigation } = this.props;
    const {  errors , profile} = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (     
       <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[10, theme.sizes.base ]}>
          <Txt h1 bold style={{marginVertical:25}}> Envoyer message</Txt>
          <Block middle>
          <TextInput 
                  placeholder="Sujet"
                  placeholderTextColor="#afb1b6"
                  autoCorrect={false}
                  style={[styles.input, hasErrors('sujet')]}
                  onChangeText={text => this.setState({ sujet: text })}
               />
             <TextInput 
                  placeholder="Message"
                  placeholderTextColor="#afb1b6"
                  autoCorrect={false}
                  style={[styles.inputText, hasErrors('message')]}
                  multiline={true}
                  onChangeText={text => this.setState({ message: text })}
                 />
                 
             
            {this.showErrorMessage()}
            { this._renderButton() }
          </Block>
        </Block>
     </ScrollView>
    )
  }
}

 const mapStateToProps = state => {
  return {
    error: state.report.error,
    loading: state.report.loading,
    sent: state.report.savedreport,
   };
 };
export default connect(mapStateToProps, { sendReport })(ReportScreen);

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical:10,
    marginHorizontal:5,
    borderRadius: 10,
    padding:10,
    borderColor:'#efeff0',
    borderWidth:2,
    backgroundColor: '#fff',
  },
  inputText:{
    marginVertical:10,
    marginHorizontal:5,
    borderRadius: 10,
    padding:10,
    borderColor:'#efeff0',
    borderWidth:2,
    backgroundColor: '#fff',
    height:100
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
