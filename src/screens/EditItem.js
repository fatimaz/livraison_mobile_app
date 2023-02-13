import React, { Component } from 'react';
import { Alert,
         ActivityIndicator, 
         StyleSheet,
         FlatList,
         RefreshControl,
          TouchableOpacity,
          ScrollView,
          Keyboard, 
          TextInput, 
          View,
          Modal, 
          Text,
          Image } 
         from 'react-native'
import { connect } from 'react-redux';
import {  editShipment, fetchMyShipments } from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Button, Block, Txt, Input, Badge , PickerModal} from '../components';
import { theme } from '../constants';
import {  Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

class EditItem extends Component {
  constructor() {
    super();
    this.state = {
          link:'',
          name:'',
          price:'',
          // weight:'',
          qty:1,
          category:'',
          description:'',
          is_active:'',
          imageName: '',
          photo: '',
          photoImage:'',
          disabled: true,
          errors: [],
          isModalVisible: false,
          counter: 1,   
          item:{}
        
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    this.setState({link: item.link});
    this.setState({ name: item.name });
    this.setState({ price: item.price });
    // this.setState({weight: item.weight.toString()})
    this.setState({ counter: item.qty });
    this.setState({ description: item.description });
    this.setState({photoImage: item.photo})
  }
 componentWillReceiveProps(nextProps) {
  
    if (nextProps.added) {
         Alert.alert(
        'Votre Commande a bien été modifiée',
        'Nous informerons les voyageurs de votre commande. Attendez les offres des voyageurs.',       
        [
          {
            text: 'OK', onPress: () => {
              this.props.fetchMyShipments();
               this.props.navigation.navigate('MyShipmentsScreen'); 
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
    //  if(counter+1 < 6){
    //  this.setState({
    //    counter
    //   });  
    // }
  }
  decrementHalder =() =>{
    const{counter, qty}= this.state;
    const { navigation } = this.props;
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
          this.setState({photoImage:response.uri})
        }
      })
    }

 _onSaveShipment() {
    const { navigation, loading } = this.props; 
    const { link, name, price, description, photo,} = this.state;
    const qty = this.state.counter;
    const item = navigation.getParam('item');
    const from = navigation.getParam('from');
    const to = navigation.getParam('to');
    const expected_date = navigation.getParam('expected_date');
  
    const user_id = item.user_id;
    const id = item.id;
   // const expected_date = navigation.getParam('expected_date');
   //  const { profile } = this.props;
  const errors = [];
  Keyboard.dismiss();
  this.setState({ loading: true });
  if (!link) errors.push('link');
  if (!name) errors.push('name');
  if (!price) errors.push('price');
  // if (!weight) errors.push('weight');
    // if (!photo) errors.push('photo');
    // if (Object.keys(this.state.photo).length == 0) {
    //   const p = item.photo
    //   alert(JSON. stringify('1 '+p))
    // }else{
    //   const p = photo
    //   alert(JSON. stringify('2 '+p))
    // }  
  if (!errors.length) {
    this.props.editShipment({id , user_id, from, to , expected_date , link , name , price  ,  qty , description, photo} );
  //    if(Object.keys(this.state.photo).length == 0){
  //     const photo = "";
  //    this.props.editShipment({id, user_id,from, to ,expected_date, link, name, price,  weight,  qty, description,  photo} );
  //  }else{
  //     this.props.editShipment({id, user_id,from, to ,expected_date, link, name, price,  weight,  qty, description,  photo} );
  //   }  
  } else{ 
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
    // _onRefreshCategories() {
    //   const { navigation } = this.props;
    //    this.props.fetchCategories();
    // }

  // changeModalVisibility = (bool)=>{
  //    this.setState({ isModalVisible:bool});
  // }
  //renderList = ( item ) => {
  //   const { filters, campings } = this.props;
  //   const {isModalVisible }= this.state;
  //   const { navigation } = this.props; 
 
  //return (
  //   <View style={styles.section}>
  //       <TouchableOpacity
  //           key={item.id}
  //           onPress= {() => this.setState({category: item.name, isModalVisible: false} ) }
  //           >     
  //             <View style={styles.option}>
  //                <Text style={{ fontWeight: '500', }}>{item.name}</Text>  
  //             </View>
  //      </TouchableOpacity>       
  //   </View>
  //     );
  // }
  keyExtractor = (item, index) => index;
  render() {
    const {  errors } = this.state;
    const { navigation } = this.props; 
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h3 old>Modifier Article</Txt>
        </Block>
        <ScrollView>
        <Block padding={[10, theme.sizes.base ]}>
            <Block middle marginBottom={50}> 
                  {/* <TouchableOpacity  onPress={this.onSelectPostImage.bind(this)}> 
                  <Image
                      //  source={{ uri: this.props.profile.photo }}
                      source={{ uri:this.state.photo.uri }}
                      style={styles.avatar} />
                </TouchableOpacity> */}
                {/* <Txt>{this.state.photo}</Txt>
                <Txt>hsh</Txt> */}
                {/* <Txt>{this.state.photoImage}</Txt> */}
                  <Avatar
                      large
                      overlayContainerStyle={{backgroundColor: '#efeff0',width:100,paddingVertical: 40, paddingHorizontal: 40}}
                      onPress={this.onSelectPostImage.bind(this)}
                      source={{ uri:this.state.photoImage}}
                      //uri:this.state.photo.uri }}
                      icon={{name: 'camera',color: theme.colors.accent,size:30, type: 'font-awesome'}}             
                   />  
                   {/* <Txt>{this.state.photo.uri}</Txt> */}
             </Block>
          <Block middle> 
               <TextInput 
                      placeholder="Nom Article"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.input, hasErrors('name')]}
                      onChangeText={text => this.setState({ name: text })}
                      defaultValue={this.state.name}
               />
               <TextInput 
                      placeholder="Lien du produit"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.input, hasErrors('link')]}
                      onChangeText={text => this.setState({ link: text })}
                      defaultValue={this.state.link}
               />
               <TextInput 
                      placeholder="Prix ​​sur le site (Entrez le prix du produit en euros)"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      keyboardType = 'numeric'
                      style={[styles.input, hasErrors('price')]}
                      onChangeText={text => this.setState({ price: text })}
                      defaultValue={this.state.price}
               />
              {/* <TextInput 
                      placeholder="Item weight"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.input, hasErrors('weight')]}
                      onChangeText={text => this.setState({ weight: text })}
                      defaultValue={this.state.weight}
               /> */}
        
             
              <View style={{
                 width:theme.sizes.width,
                 height:30,
                justifyContent:'space-between',
                 flexDirection: 'row',
                 marginBottom:5
             }}
             >
                 <Text style={{ fontSize: 14, marginTop:10, marginLeft:10 }}>
                  Item quantity
                 </Text> 
            <View style={{  flexDirection: 'row'}}>
             <TouchableOpacity
               style={{
                   width:30,
                   alignItems: 'center',
                   justifyContent: 'center',
                   borderWidth: 1,
                   marginRight:10,
                   borderColor: theme.colors.accent,
                   borderRadius: 25,
    
               }}
               onPress = {this.decrementHalder} 
               >
                   <Txt style={{fontSize:20}}>-</Txt>
               </TouchableOpacity> 
                     <View
                        style={{
                            width: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight:10,
                        }}>
                            <Txt h2>{this.state.counter}</Txt>
                      </View>
                      <TouchableOpacity
                            style={{
                                width:30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // borderRadius: 25,
                                // borderBottomRightRadius: 25,
                                borderColor: theme.colors.accent,
                                borderRadius: 25,
                                borderWidth: 0.5,
                                // borderTopRightRadius: 25,
                              }} 
                              onPress = {this.incrementHalder}
                            >
                                <Txt style={{fontSize:20}}>+</Txt>
                            </TouchableOpacity> 
                       </View>
              </View>
                <TextInput 
                      placeholder="Product details (specify size , color, and other important"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.inputText, hasErrors('description')]}
                      multiline={true}
                       onChangeText={text => this.setState({ description: text })}
                       defaultValue={this.state.description}
                 />
                 
                   {this.showErrorMessage()}
          </Block>    
        </Block>
        { this._renderButton() }
       </ScrollView>
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {
        profile: state.auth.profile,
      error: state.editShipment.error,
      loading: state.editShipment.loading,
      added: state.editShipment.saved
  }
}

 export default connect(mapStateToProps, { editShipment, fetchMyShipments })(EditItem);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  input: {
    // borderRadius: 0,
    // borderWidth: 0,
    // borderBottomColor: theme.colors.gray2,
    // borderBottomWidth: StyleSheet.hairlineWidth,
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
    marginVertical:10,
    marginHorizontal:5,
    padding:2,
    backgroundColor: '#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderRadius: 15,
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
  borderWidth:2,
  borderRadius:40,
  borderColor:theme.colors.gray2,
  alignItems: 'center'
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