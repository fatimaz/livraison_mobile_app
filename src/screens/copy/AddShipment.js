import React, { Component } from 'react';
import { Modal,Alert, ActivityIndicator, StyleSheet, ScrollView, refreshControl, TextInput, View,
 TouchableOpacity, FlatList , RefreshControl} from 'react-native'
import { connect } from 'react-redux';
import { addShipment } from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Button, Block, Txt, Input, Badge } from '../components';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import ImagePicker from 'react-native-image-picker';
import {  Avatar } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import { ListItem, Icon } from 'react-native-elements';
import Moment from 'moment';


// const [date, setDate] = useState(new Date())
class AddShipment extends Component {
  constructor() {
    super();
    this.state = {
          from: '',
          to:'',
          expected_date: '', 
          disabled: true,
          showTerms: false,
          isDateTimePickerVisible: false ,
          pickerValue:'js',
          location_from: null,
          location_to: null,

    };
  }
  onGoBack1(location_from) {
      this.setState({ location_from});
  }
  onGoBack2(location_to) {
    this.setState({ location_to});
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
    const { loading , navigation} = this.props;
    const { from, to , expected_date } = this.state;
        return ( 
            <Button gradient style={{margin:10}} 
               onPress={() => navigation.navigate('AddItem', {from, to , expected_date})}>        
                <Txt bold white center>Next</Txt>
            </Button>
          );
    }

    // _renderButtonItem() {
    // const { loading, navigation } = this.props;
    //     return ( 
    //         <Button gradient style={{margin:10}} 
    //          onPress={() => navigation.navigate('AddItem')}>
    //             <Txt bold white center>Next</Txt>
    //         </Button>
    //       );
    // }  

  render() {
    const {  errors } = this.state;
    const { navigation } = this.props; 
    // const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block>
        <ActivityIndicator size="small" color="white" />
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Create shipment</Txt>
        </Block>
        <Txt style={{ paddingHorizontal:30}} h4>Shipment details </Txt>
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
                            // placeholder="From"
                            placeholder={this.state.location_from ? this.state.location_from : 'From (Country)' }
                            placeholderTextColor="#afb1b6"
                          ///  onChangeText={(query) =>this.setState({query})}
                            onSubmitEditing={() => this.search()}
                            autoCorrect={false}
                            onChangeText={text => this.setState({ to: text })}
                            // keyboardType="visible-password"
                          />
                    
                   </View>
                  {/* <View><Feather name="heart" size={20}/></View> */}
                     
               </View>
               </TouchableOpacity>
             <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('CountriesScreen')}
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
                            placeholder={this.state.location_to ? this.state.location_to : 'To (Country)' }
                            placeholderTextColor="#afb1b6"
                             ///  onChangeText={(query) =>this.setState({query})}
                            onSubmitEditing={() => this.search()}
                            autoCorrect={false}
                            onChangeText={text => this.setState({ to: text })}
                            // keyboardType="visible-password"
                          />  
                       </View>
                       {/* <View><Feather name="heart" size={20}/></View> */}
               </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={this.showDateTimePicker}>
               <View style={styles.search}> 
                       <View style={styles.inputWrapper}>
                        {/* <Button title="Show DatePicker" onPress={this.showDateTimePicker} /> */}
                   
                       <FontAwesome
                          name="calendar"
                          color="#FF7657"
                          size={12}
                          style={{marginRight:10}}
                        />
                        <TextInput 
                            placeholder="I want it before"
                            placeholderTextColor="#afb1b6"
                            onChangeText={(query) =>this.setState({query})}
                            onSubmitEditing={() => this.search()}
                            autoCorrect={false}
                            defaultValue={this.state.expected_date}
                            // keyboardType="visible-password"
                            onChangeText={text => this.setState({ expected_date: text })}
                        />               
                       </View>
                      
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                  />
                       {/* <View><Feather name="heart" size={20}/></View> */}
               </View>
               </TouchableOpacity>
        
                {this.showErrorMessage()}     
          </Block>    
        </Block>     
       </ScrollView>

       { this._renderButton() }    
                         
      </Block>
    )
  }
}
const mapStateToProps = state => {
  return {
        profile: state.auth.profile,
        loading: state.shipments.loading,
        error: state.shipments.error,
        added: state.shipments.added,

  }
}

export default connect(mapStateToProps, { addShipment })(AddShipment);
//  export default connect(mapStateToProps, { addShipment })(AddShipment);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
},
  input: {
    // borderRadius: 0,
    // borderWidth: 0,
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

