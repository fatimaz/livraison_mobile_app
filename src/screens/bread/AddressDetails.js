import React, { Component } from 'react';
import { Alert,
         ActivityIndicator, 
         StyleSheet,
          TouchableOpacity,
          ScrollView,
          Keyboard, 
          TextInput, 
          View,
          Image, 
         Text} 
         from 'react-native'
import { connect } from 'react-redux';
import {  addShipment, fetchCategories, fetchMyShipments } from '../../actions';
import {  Button, Block, Txt, Input, Badge , PickerModal} from '../../components';
import { theme } from '../../constants';
import {  Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';



class AddressDetails extends Component {
  constructor() {
    super();
    this.state = {
          link:'',
          name:'',
          price:'',
          weight:'',
          qty:1,
          category:'',
          description:'',
          is_active:'',
          imageName: '',
          photo: '',
          disabled: true,
          errors: [],
          load: false,
          isModalVisible: false,
          counter: 1,   
    };
  }

 componentWillReceiveProps(nextProps) {
  
    if (nextProps.added) {
         Alert.alert(
        'Votre commande a bien été publiée',
        'Nous informerons les voyageurs de votre commande. Attendez les offres des voyageurs.',       
        [
          {
            text: 'OK', onPress: () => {
               this.props.navigation.navigate('MyShipmentsScreen'); 
               this.props.fetchMyShipments();
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
 

  incrementHalder =() =>{
    const{counter, qty}= this.state;
    const { navigation } = this.props;
     if(counter !==5){
       this.setState(prevState => ({counter: prevState.counter +1 }))
     }

  }
  decrementHalder =() =>{
    const{counter, qty}= this.state;
    if(counter !==1){
    this.setState(prevState => ({counter: prevState.counter - 1 }));
  }
 }

  onSelectPostImage = () => {
      const options = {
        noData: true,
      }
      ImagePicker.launchImageLibrary(options, response => {    
        if (response.uri) {
          this.setState({ photo: response })
        }
      })
    }
 _onSaveShipment() {
    const { navigation, loading } = this.props; 
    const { link, name, price, description, imageName,  photo} = this.state;
    const qty = this.state.counter;
    const from = navigation.getParam('from_id');
    const to = navigation.getParam('to_id');
    const expected_date = navigation.getParam('expected_date');
    //  const { profile } = this.props;
    var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });
    if (!link || !re.test(link) ) errors.push('link');
    if (!name) errors.push('name');
    if (!price) errors.push('price');
    if (!photo) errors.push('photo');

   if (!errors.length) {
     this.props.addShipment({from, to, expected_date ,link, name, price,  qty, description,  photo} );
     
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
            <Button gradient style={{margin:10}} 
              onPress={this._onSaveShipment.bind(this)}> 
                {/* it has to go to show details then save it =>shipmentdetails */}
            {loading ? (
                <ActivityIndicator size="small" color="white" /> 
            ) : ( 
                <Txt bold white center>Publier la commande</Txt>
            )}
            </Button>
          );
    }
    _onRefreshCategories() {
       this.props.fetchCategories();
    }

  keyExtractor = (item, index) => index;
  render() {
    const {  errors } = this.state;
    const { navigation } = this.props; 
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block>
        <ScrollView>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Address details</Txt>
        </Block>
        <Block padding={[10, theme.sizes.base ]}>
          <Block middle> 
               <TextInput 
                      placeholder="Address name Expl(home work("
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.input, hasErrors('name')]}
                      onChangeText={text => this.setState({ name: text })}
               />
               <TextInput 
                      placeholder="Area 'agdal"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.input, hasErrors('link')]}
                      onChangeText={text => this.setState({ link: text })}
               />
               <TextInput 
                      placeholder="Address details"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      keyboardType = 'numeric'
                      style={[styles.input, hasErrors('price')]}
                      onChangeText={text => this.setState({ price: text })}
               />
              <TextInput 
                      placeholder="Floor number"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('weight')]}
               />
             
             <TextInput 
                      placeholder="Flat number"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('weight')]}
               />
    
  
                <TextInput 
                      placeholder="Delivery instruction"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.inputText, hasErrors('description')]}
                      multiline={true}
                       onChangeText={text => this.setState({ description: text })}
                 />
                 
                   {/* {this.showErrorMessage()} */}
          </Block>    
        </Block>
        {/* <Text>{this.state.qty}</Text> */}
        { this._renderButton() }
       </ScrollView>
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {
      error: state.addShipment.error,
      loading: state.addShipment.loading,
      added: state.addShipment.saved
  }
}

 export default connect(mapStateToProps, { addShipment, fetchCategories, fetchMyShipments})(AddressDetails);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    // paddingVertical: theme.sizes.base/2,
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
  inputnote: {
    borderWidth: 0,
    height:200,
    backgroundColor: '#fafafa',
    borderRadius: 5,
    marginTop:10,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  search:{
    marginVertical:5,
    marginHorizontal:5,
    padding:10,
    backgroundColor: '#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor:'#efeff0',
    borderWidth:2,
 },
 inputWrapper:{
     flexDirection:'row',
     alignItems: 'center',
 },
 itemStyle: {
  fontSize: 15,
  height: 75,
  color: 'black',
  textAlign: 'center',
  fontWeight: 'bold'
},
picker: {
  width: 50
},
options: {
  flex: 1,
  paddingHorizontal: 14
},
container: {
  flex: 1,
  paddingVertical: theme.sizes.padding,
  paddingHorizontal: theme.sizes.padding/3,
  backgroundColor: theme.colors.gray4
},
section: {
  flexDirection: 'column',
  marginHorizontal: 14,
  marginBottom: 10,
  paddingBottom: 10,
  borderBottomColor: '#EAEAED',
  borderBottomWidth: 1,
},
avatar: {
  height: theme.sizes.base * 5,
  width: theme.sizes.base * 5,
  marginRight:25,
  // borderWidth:2,
  // borderRadius:40,
  // borderColor:theme.colors.gray2,
  alignItems: 'center'
},
})