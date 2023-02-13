import React, { Component } from 'react';
import { Alert, ActivityIndicator,
  TextInput, View,Keyboard, KeyboardAvoidingView,
   StyleSheet ,TouchableOpacity, FlatList, Modal, RefreshControl, Text, Image} from 'react-native';
import { Button, Block, Input, Txt } from '../components';
import { theme } from '../constants';
import { connect } from 'react-redux';
import { sendPhone, fetchCountries } from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class EnterPhone extends Component   {

  state = {
    phone: '',
    errors: [],
    load: false,
    isModalVisible: false,
    country:'',
    code:'',
  }
  constructor(props){
    super(props)
}
componentWillReceiveProps(nextProps) { 
    const { navigation } = this.props;
    if (nextProps.pass) { 
      navigation.navigate('VerifyScreen');
    }
 }

 componentDidMount() {
  this.props.fetchCountries();
}
_onRefreshCountries() {
 this.props.fetchCountries();
}
  handleForgot() {

    const { navigation, loading } = this.props;
    const { code,phone } = this.state;
    const errors = [];
    Keyboard.dismiss();
    this.setState({ load: true });

    const re = /^[0]?[789]\d{9}$/;

    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  

    if (!phone || phone.length >= 12 || phone.length <= 9 ) errors.push('phone');



    // if (!phone || phone.length<=9 ) errors.push('phone');
    if (!code) errors.push('code');
   
    this.setState({ errors, loading: false });

    const mob = code +""+phone;
    const mobile = mob.substring(1);
    // const code = Math.floor(Math.random() * 9000 +1000);

    if (!errors.length) {
      this.props.sendPhone({ mobile });
    }else{
      this.setState({ errors, loading: false });
      Alert.alert(
        'Erreur',
        'Le numero de telephone n\'est pas valide.',
        [
          { text: 'Réessayer', }
        ],
        { cancelable: false }
      )
    
    }   
  }
  renderList = ( item ) => {
     return (
        <View style={styles.section}>
        <TouchableOpacity
            key={item.id}
            onPress= {() => this.setState({country: item.name, code:item.code, isModalVisible: false} ) }
            >     
              <View style={styles.option}>
                 <Txt style={{marginRight:10}}>{item.name}</Txt> 
                 <Txt bold>({item.code})</Txt> 
              </View>
       </TouchableOpacity>       
      </View>
      );
  }
  renderModal(){
    return(
       <Modal
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={() => this.setState({ isModalVisible: false })}
        animationType={'fade'}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'rgba(0, 0, 0, 0.7)'}}>
               <View style={{
                  width: 300,
                  height: 350,
                  borderRadius:10,
                  backgroundColor: '#fff'}}>
              <Button onPress= {() => this.setState({isModalVisible: false} )} style={{alignItems: 'flex-end', marginRight:20}}><Txt h3 bold>X</Txt></Button> 
        {(!this.props.fetching && this.props.data != null) ? 
         ( 
          <FlatList
              data={this.props.data}  
              renderItem={({ item }) => this.renderList(item)} 
              keyExtractor={this.keyExtractor}  
              refreshControl={ 
                  <RefreshControl 
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshCountries.bind(this)}
                 />
              }          
          />
          ) : null
         }  
        </View>
        </View>
      </Modal>
    )
  }
  render() {
    const { navigation, loading } = this.props;
    const { errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block padding={[40, theme.sizes.base * 2]}>
          <Txt style={{marginBottom:30}} h1 bold> Verifier votre numero de telephone</Txt>
          <TouchableOpacity onPress= {() => this.setState({isModalVisible: true} )}> 
          <View style={styles.searchSection}>
            <TextInput
                style={styles.input2}
                placeholder="+XXX"
                placeholderTextColor="#585858"
                error={hasErrors('phone')}
                // onChangeText={(searchString) => {this.setState({searchString})}}
                underlineColorAndroid="transparent"
                defaultValue={this.state.code}
                onChangeText={text => this.setState({ code: text })}
                editable = {false}
            />
             <FontAwesome style={styles.searchIcon} name='angle-down'  color="#000" size={24} />
        </View>
        </TouchableOpacity>
          <View>
            <Input
              placeholder="Numero de telephone"
              placeholderTextColor="#585858"
              error={hasErrors('phone')}
              style={[styles.input, hasErrors('phone')]}
              defaultValue={this.state.phone}
              keyboardType="numeric"
              onChangeText={text => this.setState({ phone: text })}
            />
            
              <Button gradient onPress={this.handleForgot.bind(this)}>
                  {loading ? (
                      <ActivityIndicator size="small" color="white" /> 
                  ) : ( 
                      <Txt bold white center>Confirmer</Txt>
                  )}
            </Button>
             {this.renderModal()}
          </View>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.phone.error,
    loading: state.phone.loading,
    pass: state.phone.pass,
    fetching: state.countries.loading,
    data: state.countries.countries,
    errorc: state.countries.error,
  }
}
export default connect(mapStateToProps, { sendPhone, fetchCountries })(EnterPhone);

const styles = StyleSheet.create({
forgot: {
  flex: 1,
  justifyContent: 'center',
},
input: {
  borderRadius: 10,
  backgroundColor:theme.colors.gray4,
  borderColor: theme.colors.gray2,
  padding:10,
  borderWidth: StyleSheet.hairlineWidth,
},
hasErrors: {
    borderBottomColor: theme.colors.accent,
},
option: {
  marginBottom: 10,
  flexDirection: 'row',
  alignItems: 'center',
},
section: {
  flexDirection: 'column',
  marginHorizontal: 14,
  marginBottom: 10,
  paddingBottom: 10,
  borderBottomColor: '#EAEAED',
  borderBottomWidth: 1,
},
searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height:50,
    backgroundColor:theme.colors.gray4,
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
},
searchIcon: {
  padding: 10,
},
input2: {
  flex: 1,
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  color: '#424242',
},
})