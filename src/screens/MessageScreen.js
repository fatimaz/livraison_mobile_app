import React, { Component } from 'react';
import { TextInput, ActivityIndicator, TouchableOpacity, View, StyleSheet , ScrollView, Alert, Keyboard} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Block, Input, Txt } from '../components';
import { theme } from '../constants';
import { connect } from 'react-redux';
import { addMsg } from '../actions';

class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message:'',
          object:'',
        };
    }
  componentWillReceiveProps(nextProps) {
        if (nextProps.added) {
          Alert.alert(
            'Merci',
            'Message a été envoyé',       
            [
              {
                text: 'OK', onPress: () => {
                  this.props.navigation.goBack(); 
                }
              }
            ],
            { cancelable: false }
          )  
        }
  }

  onsaveMessage(){
    const {object ,  message } = this.state;
    const {loading, navigation}=this.props
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });
    if (!message) errors.push('message');
    if (!object) errors.push('object');

    const user = navigation.getParam('user');
    const receiver_id = user.id;
     if (!errors.length) {
    this.props.addMsg({receiver_id,object, message});
    }else{
      this.setState({ loading: false });
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

render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    return (     
       <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[50, theme.sizes.base * 2]}>
          <Block style={{marginBottom:20}} row space="between">
            <Txt h2 bold>Nouveau Message</Txt>   
            <TouchableOpacity center middle style={styles.sendMsg} activeOpacity={0.8}   onPress={this.onsaveMessage.bind(this)}>
                <FontAwesome name='arrow-circle-up' size={30} color='#64B5F6'/>
             </TouchableOpacity>
          </Block>  
          <Block middle>
          <View style={styles.section}>     
              <View style={styles.option}>
                    <Txt gray style={{padding:5}} bold>A :</Txt>
                    <Txt bold>{user.name}</Txt>
                 </View>
            </View>
            <TextInput 
                placeholder="Object : Question apropos de ..."
                placeholderTextColor="#585858"
                autoCorrect={false}
                style={[styles.input]}
                defaultValue={this.state.object}
                onChangeText={text => this.setState({ object: text })}
             />   
             <Txt style={{paddingVertical:10}}>Message</Txt>
             <TextInput 
                placeholder=""
                placeholderTextColor="#585858"
                autoCorrect={false}
                style={[styles.inputText]}
                autoFocus={true}
                multiline={true}
                defaultValue={this.state.message}
                onChangeText={text => this.setState({ message: text })}
              />
       
          </Block>
        </Block>
     </ScrollView>
    )
  }
}

const mapStateToProps = state => {
    return {
        error: state.message.error,
        loading: state.message.loading,
        added: state.message.saved
    }
  }

  export default connect(mapStateToProps, {addMsg })(MessageScreen);


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
    marginVertical:10,
    paddingVertical:10
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
  section: {
    flexDirection: 'column',
    marginBottom: 10,
    // paddingBottom: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  option: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendMsg:{
    paddingHorizontal:20
  }
})
