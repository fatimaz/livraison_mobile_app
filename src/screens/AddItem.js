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
import {  addShipment, fetchCategories, fetchMyShipments } from '../actions';
import {  Button, Block, Txt, Input, Badge , PickerModal} from '../components';
import { theme } from '../constants';
import {  Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { fonts} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


class AddItem extends Component {
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
// _renderButton() {
//     const { loading, navigation } = this.props;
//          const {  link, name, price, weight, qty,  description, imageName,  shipmentImage } = this.state;
//         const { profile } = this.props;
//         const item = {  link, name, price, weight, qty,  description, imageName,  shipmentImage };
//         return ( 
//             <Button gradient style={{margin:10}} 
//              onPress={() => navigation.navigate('AddShipment', {item})}>
//                 <Txt bold white center>Next</Txt>
//             </Button>
//           );
//     }   

    // onSelectPostImage() {
    //     const options = {
    //         title: 'Select Image to share',
    //         quality: 0.1, //Image quality 0 lowest , 1 heights
    //         mediaType: 'photo',
    //         maxHeight: 200 // Speed up android loading
    //     };
    //     ImagePicker.showImagePicker(options, (response) => {
    //         if (response) {
    //            const imageName = `${1}-${response.fileName}`;
    //            // const imageName = `${response.fileName}`;
    //             this.setState({
    //                 shipmentImage: response.uri,
    //                 imageName,
    //                 disabled: false
    //             });
    //         } else {
    //             this.setState({ disabled: true });
    //         }
    //     });
    // }

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

  //  changeModalVisibility = (bool)=>{
  //     this.setState({ isModalVisible:bool});
  //   }
  // renderList = ( item ) => {
  //   const { filters, campings } = this.props;
  //   const {isModalVisible }= this.state;
  //   const { navigation } = this.props; 
 
  //     return (
  //       <View style={styles.section}>
  //       <TouchableOpacity
  //           key={item.id}
  //           onPress= {() => this.setState({category: item.name, isModalVisible: false} ) }
  //           >     
  //             <View style={styles.option}>
  //                <Text style={{ fontWeight: '500', }}>{item.name}</Text>  
  //             </View>
  //      </TouchableOpacity>       
  //     </View>
  //     );
  // }
  keyExtractor = (item, index) => index;
  render() {
    const {  errors } = this.state;
    const { navigation } = this.props; 
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block>
        <ScrollView>
        {/* <ActivityIndicator size="small" color="white" /> */}
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Ajouter une nouvelle commande</Txt>
        </Block>
        <Block padding={[10, theme.sizes.base ]}>
        <Block middle> 
               <Image
                  source={{ uri:this.state.photo.uri }}
                  style={styles.avatar} 
                />
             <TouchableOpacity  onPress={this.onSelectPostImage.bind(this)}> 
              <View style={styles.search}> 
                <View style={styles.inputWrapper}>
                <FontAwesome
                        name="camera"
                        color="#64B5F6"
                        style={{ marginRight: 8 }}
                        size={16}
                      />
                        <TextInput 
                            placeholder="Télécharger une image"
                            placeholderTextColor="#303030"
                            onChangeText={(query) =>this.setState({query})}
                            editable = {false}
                            style={{fontWeight:'bold'}}
                            autoCorrect={false}
                          />
                   </View> 
               </View>
               </TouchableOpacity>
                {/*  */}
                  {/* <Avatar
                        large
                        overlayContainerStyle={{backgroundColor: '#efeff0',width:100,paddingVertical: 40, paddingHorizontal: 40}}
                        onPress={this.onSelectPostImage.bind(this)}
                        source={{ uri:this.state.photo.uri }}
                          //uri:this.state.photo.uri }}
                        icon={{name: 'camera',color: theme.colors.accent,size:30, type: 'font-awesome'}}             
                   />   */}
           </Block>
          <Block middle> 
               <TextInput 
                      placeholder="Nom Objet"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.input, hasErrors('name')]}
                      onChangeText={text => this.setState({ name: text })}
               />
               <TextInput 
                      placeholder="Lien du produit"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.input, hasErrors('link')]}
                      onChangeText={text => this.setState({ link: text })}
               />
               <TextInput 
                      placeholder="Prix ​​sur le site (Entrez le prix du produit en euros)"
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      keyboardType = 'numeric'
                      style={[styles.input, hasErrors('price')]}
                      onChangeText={text => this.setState({ price: text })}
               />
              {/* <TextInput 
                      placeholder="Poids (en Kg)"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('weight')]}
                      onChangeText={text => this.setState({ weight: text })}
               /> */}
             
              <View style={{
                 width:theme.sizes.width,
                 height:30,
                justifyContent:'space-between',
                 flexDirection: 'row',
                 marginBottom:5
             }}>
                 <Text style={{ fontSize: 14, marginTop:10, marginLeft:10 }}>
                   Quantité 
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
    
      {/* <Modal
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={() => this.setState({ isModalVisible: false })}
        animationType={'fade'}>
        <View
          style={{ backgroundColor:'rgba(0, 0, 0, 0.7)', flex: 1, justifyContent: 'center', padding: 10, height:100 }}>
        <View style={{ borderRadius:10,  backgroundColor: '#fff', padding: 10 }}>
        <Button onPress= {() => this.setState({isModalVisible: false} )} style={{alignItems: 'center'}}><Text>Close</Text></Button>
    
        {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false}> */}
        {/* {(!this.props.fetching && this.props.data != null) ? 
         (
          <FlatList
                data={this.props.data}  
                renderItem={({ item }) => this.renderList(item)} */}
                {/* // keyExtractor={item => item.id.toString() } 
      //              keyExtractor={this.keyExtractor}  
      //             refreshControl={ */}
      {/* //             <RefreshControl */}
      {/* //               refreshing={this.props.fetching}
      //               onRefresh={this._onRefreshCategories.bind(this)}
      //             />
      //           } 
                 
      //       />
      //       ) : null
      //     } */}

      {/* //   </View>
      //   </View>
      // </Modal>
     
      */} 
      {/* <TouchableOpacity onPress= {() => this.setState({isModalVisible: true} )}> 
      <View style={styles.inputWrapper}>
        <Text>jh</Text>
               <TextInput 
                      placeholder="Category"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('category')]}
                      defaultValue={this.state.category}
                      onChangeText={text => this.setState({ category: text })}
               />
         </View>
         </TouchableOpacity> */}
                <TextInput 
                      placeholder="Détails du produit (spécifiez la taille, la couleur et ..."
                      placeholderTextColor="#afb1b6"
                      autoCorrect={false}
                      style={[styles.inputText, hasErrors('description')]}
                      multiline={true}
                       onChangeText={text => this.setState({ description: text })}
                 />
                 
                   {this.showErrorMessage()}
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

 export default connect(mapStateToProps, { addShipment, fetchCategories, fetchMyShipments})(AddItem);

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