import React, { Component } from 'react';
import { Modal,Alert, ActivityIndicator, StyleSheet, ScrollView, Keyboard, TextInput, View,
 TouchableOpacity, FlatList , RefreshControl} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Button, Block, Txt, Input, Badge } from '../components';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import ImagePicker from 'react-native-image-picker';
import {  Avatar } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
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
          location_from: null,
          location_to: null,
          from: 0,
          to: 0,
          shipment:{}
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('shipment');
  
    // const weight = navigation.getParam('weight');
     const country_from = navigation.getParam('country_from');
    const country_to = navigation.getParam('country_to');
     this.setState({ shipment: item});
    this.setState({expected_date: item.expected_date});
     this.setState({from: item.from})
     this.setState({to: item.to})
    this.setState({location_from: country_from})
    this.setState({location_to: country_to})
  }
  onGoBack1(location_from,from) {
      this.setState({ location_from});
      this.setState({ from});
  }
  onGoBack2(location_to, to) {
    this.setState({ location_to});
    this.setState({ to});
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
            <Button gradient style={{margin:10}} onPress={this.handleNext.bind(this)}>
                <Txt bold white center>Suivant</Txt>
            </Button>
          );
  }
  handleNext() {
    const {  from, to, expected_date } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('shipment');
    const errors = [];
    Keyboard.dismiss();
        if (!from) errors.push('from');
        if (!to ) errors.push('to');
        if (!expected_date ) errors.push('expected_date');
        // const checkmobile =Array.from(mobile).every(char => char >=0 && char <=9);
        // const checkmobile = /^[0-9]+$/.test(mobile);
        // if (!mobile || mobile.length !== 10 || !checkmobile) errors.push('mobile');
        if (!errors.length) {  
          this.props.navigation.navigate('EditItem', {from, to ,expected_date, item});   
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
    // const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
  
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Modifier votre commande</Txt>
          {/* Create shipment */}
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
                        />
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
//  export default connect(mapStateToProps, { addShipment })(AddShipment);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.base,
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
    padding:12,
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

