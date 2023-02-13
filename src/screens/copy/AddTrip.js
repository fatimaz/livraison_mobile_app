import React, { Component } from 'react';
import { Modal,Alert, ActivityIndicator, StyleSheet, ScrollView, Keyboard, TextInput, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { addTrip } from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Button, Block, Txt, Input, Badge } from '../components';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import ImagePicker from 'react-native-image-picker';
import {  Avatar } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';


//  const [date, setDate] = useState(new Date())
class AddTrip extends Component {
  constructor() {
    super();
    this.state = {
        from: '',
        to:'',
        travel_date: '',
        weight:'',
        description:'',
        is_active:'',
        disabled: true,
        isDateTimePickerVisible: false,
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
    const travel_date= Moment(date,"YYYY-MM-DD hh:mm:ss", true).format('D MMMM YYYY')
    this.setState({ travel_date});
  };
  componentWillReceiveProps(nextProps) {
     if (nextProps.added) {
         Alert.alert(
          'Votre offre a bien été envoyée',
          'Vous obtiendrez une réponse dans les 48 heures',       
        [
          {
            text: 'OK', onPress: () => {
               this.props.navigation.navigate('ShipmentsSuggestions'); 
              //this.props.navigation.goBack();
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
  // _onSaveBooking() {
  //   const { navigation } = this.props; 
  //   const {  tel, note } = this.state;
  //   const errors = [];
  //   Keyboard.dismiss();
  //   const reg = /^[0]?[789]\d{9}$/;
  //   this.setState({ load: true });
  //   const tutor = navigation.getParam('tutor_name');  
  //   const tutor_id= tutor.id;
  //   const subject_id = navigation.getParam('sujet'); 
  //  if (!tel || reg.test(tel) ) errors.push('tel');

  //   if (!errors.length) {
  //     this.props.addBooking({ tutor_id, subject_id, tel, note });
  //    }else{
  //    this.setState({ errors, load: false });
  //   }
  // }

    _onSaveTrip() {
        const {from, to, travel_date, weight, description } = this.state;
        const { profile } = 'ss';
        // this.props;
        this.props.addTrip(from, to, travel_date, weight, description, profile );
    }

   _renderButton() {
    const { loading } = this.props;
        return ( 
            <Button gradient style={{margin:10}} 
              onPress={this._onSaveTrip.bind(this)}>
            {loading ? (
                <ActivityIndicator size="small" color="white" /> 
            ) : ( 
                <Txt bold white center>Save Trip</Txt>
            )}
            </Button>
          );
    }

  render() {
    const {  errors } = this.state;
    const { navigation } = this.props; 
    // const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block>
        <ActivityIndicator size="small" color="white" />
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Create Trip</Txt>
        </Block>
        <Txt style={{ paddingHorizontal:30}} h4>Trip details </Txt>
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
                            placeholder={this.state.location_from ? this.state.location_from : 'From (Country)' }
                            placeholderTextColor="#afb1b6"
                            onChangeText={(query) =>this.setState({query})}
                            onSubmitEditing={() => this.search()}
                            autoCorrect={false}
                            onChangeText={text => this.setState({ from: text })}
                            />
                       </View>
                       {/* <View><Feather name="heart" size={20}/></View> */}
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
                                placeholder={this.state.location_to ? this.state.location_to : 'To (Country)' }
                                placeholderTextColor="#afb1b6"
                                onChangeText={(query) =>this.setState({query})}
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
                            placeholder="travel date"
                            placeholderTextColor="#afb1b6"
                            onChangeText={(query) =>this.setState({query})}
                            onSubmitEditing={() => this.search()}
                            autoCorrect={false}
                            defaultValue={this.state.travel_date}
                            onChangeText={text => this.setState({ travel_date: text })}
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
                <TextInput 
                      placeholder=" Free weight"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.input]}
                      onChangeText={text => this.setState({ weight: text })}
               />
               <TextInput 
                      placeholder="Additinal Note"
                      placeholderTextColor="#afb1b6"
                      onChangeText={(query) =>this.setState({query})}
                      onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.inputText]}
                      multiline={true}
                     onChangeText={text => this.setState({ description: text })}
               />
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
        loading: state.trips.loading,
        error: state.trips.error,
        added: state.trips.added
  }
}

export default connect(mapStateToProps, { addTrip })(AddTrip);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  input: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical:5,
    marginHorizontal:5,
    borderRadius: 5,
    padding:10,
    borderColor:'#efeff0',
    borderWidth:2,
    backgroundColor: '#fff',
  },
  inputText:{
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height:100,
    marginVertical:5,
    marginHorizontal:5,
    borderRadius: 5,
    padding:10,
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
    borderRadius: 5,
    borderColor:'#efeff0',
    borderWidth:2,
 },
 inputWrapper:{
     flexDirection:'row',
     alignItems: 'center',
 },
})