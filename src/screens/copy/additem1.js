import React, { Component } from 'react';
import { Alert, ActivityIndicator, StyleSheet, ScrollView, Keyboard, TextInput, View, Modal, Text } from 'react-native'
import { connect } from 'react-redux';
import {  addShipment } from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Button, Block, Txt, Input, Badge , PickerModal} from '../components';
import { theme } from '../constants';
import {  Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
// import {ModalPicker} from '../components/ModalPicker';
// import PickerModal from '../components'; 
import ModalPicker from '../constants';


class AddItem extends Component {
  constructor() {
    super();
    this.state = {
          link:'',
          name:'',
          price:'',
          weight:'',
          qty:'',
          category:'',
          description:'',
          is_active:'',
          imageName: '',
          shipmentImage: '',
          disabled: true,
          errors: [],
          load: false,
          isModalVisible: false,
          
    };
  }

 componentDidMount() {
    //  this.props.fetchCategories();
 }
 componentWillReceiveProps(nextProps) {
  
    if (nextProps.added) {
         Alert.alert(
        'Votre Shipment a bien été enregistrée',
        'Vous obtiendrez une réponse dans les 48 heures',       
        [
          {
            text: 'OK', onPress: () => {
               this.props.navigation.navigate('Myshipments'); 
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

    onSelectPostImage() {

        const options = {
            title: 'Select Image to share',
            quality: 0.1, //Image quality 0 lowest , 1 heights
            mediaType: 'photo',
            maxHeight: 200 // Speed up android loading
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response) {
               const imageName = `${1}-${response.fileName}`;
               // const imageName = `${response.fileName}`;
                this.setState({
                    shipmentImage: response.uri,
                    imageName,
                    disabled: false
                });
            } else {
                this.setState({ disabled: true });
            }
        });
    }

 _onSaveShipment() {
    const { navigation } = this.props; 
    const { link, name, price,  weight,  qty, description, category_id, imageName,  shipmentImage} = this.state;

    const from = navigation.getParam('from');
    const to = navigation.getParam('to');
    const expected_date = navigation.getParam('expected_date');
   
    //  const { profile } = this.props;
      const { profile } = 'ss';
     
    const errors = [];
    Keyboard.dismiss();
    const reg = /^[0]?[789]\d{9}$/;
    this.setState({ load: true });


    // if (!errors.length) {
   
       this.props.addShipment(from, to, expected_date ,link, name, price,  weight,  qty, description,category_id,  shipmentImage );
     
    //  }else{
      
    //  this.setState({ errors, load: false });
    // }
  }
   _renderButton() {
    const { loading } = this.props;

        return ( 
            <Button gradient style={{margin:10}} 
              onPress={this._onSaveShipment.bind(this)}>
            {loading ? (
                <ActivityIndicator size="small" color="white" /> 
            ) : ( 
                <Txt bold white center>save </Txt>
            )}
            </Button>
          );
    }

  //  changeModalVisibility = (bool)=>{
  //     this.setState({ isModalVisible:bool});
  //   }
 
  render() {
    const {  errors } = this.state;
    const { navigation } = this.props; 
 
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block>
        <ActivityIndicator size="small" color="white" />
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Create shopping item</Txt>
        </Block>
        {/* <Txt style={{ paddingHorizontal:30}} h4>Shipment details </Txt> */}
        <ScrollView>
        <Block padding={[10, theme.sizes.base ]}>
          <Button onPress= {() => this.setState({isModalVisible: true} )}><Txt>sss</Txt></Button>
          <Block middle>
               <TextInput 
                      placeholder="Item name"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('tel')]}
                      onChangeText={text => this.setState({ name: text })}
               />
               <TextInput 
                      placeholder="Item link"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('link')]}
                      onChangeText={text => this.setState({ link: text })}
               />
               <TextInput 
                      placeholder="Item price"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('price')]}
                      onChangeText={text => this.setState({ price: text })}
               />
              <TextInput 
                      placeholder="Item weight"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('weight')]}
                      onChangeText={text => this.setState({ weight: text })}
               />
                <TextInput 
                      placeholder="Quantity"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('qty')]}
                      onChangeText={text => this.setState({ qty: text })}
               />
               {/* <Picker
                  // selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                </Picker> */}
      {/*  */}
    
      <Modal
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={() => this.setState({ isModalVisible: false })}
        animationType={'fade'}>
        <View
          style={{ backgroundColor:'rgba(0, 0, 0, 0.7)', flex: 1, justifyContent: 'center', padding: 20, height:100 }}>
        <View style={{ borderRadius:10, alignItems: 'center', backgroundColor: '#fff', padding: 10 }}>
        <Button><Text>Close</Text></Button>
         
          <Picker
            selectedValue={ this.state.qty }
            style={styles.picker}
            
            onValueChange={(qty) => this.setState({qty})}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
          </Picker>
        </View>
        </View>
      </Modal>



      {/*  */}
               <TextInput 
                      placeholder="Category"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.input, hasErrors('category')]}
                      onChangeText={text => this.setState({ category: text })}
               />
                <TextInput 
                      placeholder="Product details"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.inputText, hasErrors('description')]}
                      multiline={true}
                       onChangeText={text => this.setState({ description: text })}
                 />
                  <Txt>Item photo </Txt> 
                  <Avatar
                        large
                        overlayContainerStyle={{backgroundColor: '#efeff0',padding: 30, margin: 10}}
                        onPress={this.onSelectPostImage.bind(this)}
                        source={{ uri: this.state.shipmentImage }}
                        icon={{name: 'camera',color: 'red', type: 'font-awesome'}}
                      
                 />
                  
                   {/* {this.showErrorMessage()} */}
          </Block>
          {/* <ModalPicker/> */}
      
        </Block>
        <Text>{this.state.qty}</Text>
       </ScrollView>
       { this._renderButton() }
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {
        profile: state.auth.profile,
        // loading: state.shipments.loading,
        // error: state.shipments.error,
        // added: state.shipments.added,
      //   fetching: state.category.fetching,
      //  data: state.category.data


      error: state.addShipment.error,
      loading: state.addShipment.loading,
      added: state.addShipment.saved
  }
}

 export default connect(mapStateToProps, { addShipment })(AddItem);


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
})