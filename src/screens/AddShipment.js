import React, { Component } from 'react';
import { Modal,Alert, ActivityIndicator, StyleSheet, ScrollView, Keyboard, TextInput, View,
 TouchableOpacity, FlatList , RefreshControl} from 'react-native'
import {  Button, Block, Txt, Input, Badge } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import ImagePicker from 'react-native-image-picker';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';


// const [date, setDate] = useState(new Date())
class AddShipment extends Component {
  constructor() {
    super();
    this.state = { 
          expected_date: '', 
          disabled: true,
          showTerms: false,
          isDateTimePickerVisible: false ,
          pickerValue:'js',
          location_from: null,
          location_to: null,
          from_id: 0,
          to_id: 0,
    };
  }
  onGoBack1(location_from,from_id) {
      this.setState({ location_from});
      this.setState({ from_id});
  }
  onGoBack2(location_to, to_id) {
    this.setState({ location_to});
    this.setState({ to_id});
    if(this.state.location_from== location_to){
      Alert.alert(
        'Erreur',
        'Veuillez choisir une autre destination .',
        [
          { text: 'Réessayer', }
        ],
        { cancelable: false }
      )

    }

  }
 showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
   handleDatePicked = (date) => {
    this.hideDateTimePicker();
    Moment.locale('en');
    const expected_date= Moment(date,"YYYY-MM-DD hh:mm:ss", true).format('D MMMM YYYY')
    this.setState({ expected_date});
  };

  onSelectProfilePicture() {
    const options = {
        title: 'Select Profile Image',
        quality: 0.1, //Image quality 0 lowest , 1 heights
        mediaType: 'photo',
        maxHeight: 200 // Speed up android loading
    };

  ImagePicker.showImagePicker(options, (response) => {
        this.setState({
            profileImage: response.uri,
            // disabled: false
        });
    });
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
      return ( 
            <Button gradient style={{margin:10}} 
            onPress={this.handleNext.bind(this)}>
              {/* // onPress={() => navigation.navigate('AddItem', {from_id, to_id , expected_date})}>         */}
                <Txt bold white center>Suivant</Txt>
            </Button>
        );
  }

 handleNext() {
    const {  from_id, to_id, expected_date } = this.state;
    const errors = [];
    Keyboard.dismiss();
        if (!from_id) errors.push('from_id');
        if (!to_id ) errors.push('to_id');
        if (!expected_date ) errors.push('expected_date');
        // const checkmobile =Array.from(mobile).every(char => char >=0 && char <=9);
        // const checkmobile = /^[0-9]+$/.test(mobile);
        // if (!mobile || mobile.length !== 10 || !checkmobile) errors.push('mobile');
        if (!errors.length && from_id != to_id ) {  
          this.props.navigation.navigate('AddItem', {from_id, to_id , expected_date});   
        }else{
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
    const {  errors } = this.state;
    const { navigation } = this.props; 
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Ajouter une nouvelle commande</Txt>
        </Block>
        {/* <Txt style={{ paddingHorizontal:30}} h4>Shipment details </Txt> */}
        <ScrollView>
        <Block padding={[10, theme.sizes.base ]}>
          <Block middle>
          <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CountriesScreen', { onGoBack: this.onGoBack1.bind(this) })}
          >
          <View style={styles.search}> 
                <View style={styles.inputWrapper}>
                       <Badge
                          color={rgba(theme.colors.accent, "0.2")}
                          size={14}
                          style={{ marginRight: 8 }}
                        >               
                        <Badge color={theme.colors.accent} size={8} />
                        </Badge>
                        <TextInput 
                            placeholder={this.state.location_from ? this.state.location_from : 'Depart (Pays)' }
                            placeholderTextColor="#303030"
                            onChangeText={(query) =>this.setState({query})}
                            editable = {false}
                            style={{fontWeight:'bold'}}
                            autoCorrect={false}
                          />
                   </View> 
               </View>
               </TouchableOpacity>
             <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CountriesScreen', { onGoBack: this.onGoBack2.bind(this) })}
                >
               <View style={styles.search}> 
                       <View style={styles.inputWrapper}>
                       <Badge
                          color={rgba(theme.colors.accent, "0.2")}
                          size={14}
                          style={{ marginRight: 8 }}
                        >
                          <Badge color={theme.colors.accent} size={8} />
                        </Badge>
                        <TextInput 
                                placeholder={this.state.location_to ? this.state.location_to : 'Arrivée (Pays)' }
                                placeholderTextColor="#303030"
                                onChangeText={(query) =>this.setState({query})}
                                editable = {false}
                                autoCorrect={false}
                                style={{fontWeight:'bold'}}
                            />
                       </View>
               </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={this.showDateTimePicker}>
               <View style={styles.search}> 
                       <View style={styles.inputWrapper}>
                       <FontAwesome
                          name="calendar"
                          color="#FF7657"
                          size={12}
                          style={{marginRight:10}}
                        />
                        <TextInput 
                            placeholder="Je le veux avant"
                            placeholderTextColor="#303030"
                            autoCorrect={false}
                            defaultValue={this.state.expected_date}
                            editable = {false}
                            onChangeText={text => this.setState({ expected_date: text })}
                        />               
                       </View> 
   
                        <DateTimePicker
                          isVisible={this.state.isDateTimePickerVisible}
                          onConfirm={this.handleDatePicked}
                          onCancel={this.hideDateTimePicker}
                          minimumDate={Moment().toDate()}
                        />

                {/* <DateTimePickerModal
                        isVisible={this.state.isDateTimePickerVisible}
                        mode="date"
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        minimumDate={Moment().toDate()}
                      /> */}
                  
               </View>
               </TouchableOpacity>
        
                {this.showErrorMessage()}     
          </Block>    
        </Block>   
        { this._renderButton() }     
       </ScrollView>                        
      </Block>
    )
  }
}
export default AddShipment;


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    // paddingVertical: theme.sizes.base,
  },
  input: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical:5,
    marginHorizontal:5,
    borderRadius: 2,
    padding:100,
    // padding:8,
    borderColor:'#efeff0',
    borderWidth:2,
    backgroundColor: '#fff',
  },
  inputnote: {
    borderWidth: 0,
    height:150,
    backgroundColor: '#fafafa',
    borderRadius: 10,
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

})

