import React, { Component } from 'react';
import { Alert, ActivityIndicator, StyleSheet, ScrollView, Keyboard, TextInput, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { editTrip , fetchMyTrips, deleteTrip} from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Button, Block, Txt, Input, Badge } from '../components';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';

class EditTripScreen extends Component {
  constructor() {
    super();
    this.state = {
        travel_date: '',
        weight_total:null,
        note:'',
        is_active:'',
        disabled: true,
        isDateTimePickerVisible: false,
        location_from: null,
        location_to: null,
        from: 0,
        to: 0,
        trip: {},
    };
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.delete) {
      this.props.fetchMyTrips();
      this.props.navigation.navigate('MyTrips');   
    }
 
    if (nextProps.saved) {
        Alert.alert(
         'Merci', 
         'Vous avez modifié votre trajet avec succès',     
       [
         {
           text: 'OK', onPress: () => {
             this.props.fetchMyTrips();
              this.props.navigation.navigate('MyTrips'); 
            //  this.props.navigation.goBack();
           }
         }
       ],
       { cancelable: false }
     )  
   }
 }
 componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('trip');
    const weight = navigation.getParam('weight');
    const country_from = navigation.getParam('country_from');
    const country_to = navigation.getParam('country_to');
    this.setState({ trip: item});
    this.setState({travel_date: item.travel_date});
    this.setState({ weight_total: weight });
    this.setState({ note: item.note });
    this.setState({from: item.from})
    this.setState({to: item.to})
    this.setState({location_from: country_from})
    this.setState({location_to: country_to})
  }
  onGoBack1(location_from, from) {
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
    const travel_date= Moment(date,"YYYY-MM-DD hh:mm:ss", true).format('D MMMM YYYY')
    this.setState({ travel_date});
  };

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
        const {from, to, travel_date, weight_total, note } = this.state;
        const { navigation } = this.props;
        const item = navigation.getParam('trip');
        const user_id = item.user_id;
        const id = item.id;
        const errors = [];
        Keyboard.dismiss();
        this.setState({ editing: true });
         if (!from) errors.push('from');
         if (!to) errors.push('to');
         if (!travel_date ) errors.push('expected_date');
         if (!weight_total ) errors.push('weight_total');
         if (!errors.length) {  
            this.props.editTrip({id, user_id,from, to, travel_date, weight_total, note} );
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

   _renderButton() {
    const { editing } = this.props;
        return ( 
            <Button gradient style={{margin:10}} 
              onPress={this._onSaveTrip.bind(this)}>
            {editing ? (
                <ActivityIndicator size="small" color="white" /> 
            ) : ( 
                <Txt bold white center>Modifier</Txt>
            )}
            </Button>
          );
    }
    _onSaveTrip() {
      const { navigation, editing } = this.props; 
      const trip = navigation.getParam('trip');
      const id = trip.id;
      this.setState({ editing: true });
      Alert.alert(
        '',
        'Etes-vous sur de vouloir supprimer ce trajet?',  
        [
           {text: 'Oui',onPress: () => {  this.props.deleteTrip({id})}},
           {text: 'Non',  onPress: () => {this.props.navigation.navigate('MyTrips')}},
        ],
        { cancelable: false }
   )
  }

  render() {
    const {  errors } = this.state;
    const { navigation, loading } = this.props; 
    // const { trip } = this.state; 

    const item = navigation.getParam('trip');

    //  alert(trip.countries.name)
    // const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Modifier trajet</Txt>
        </Block>
        <Txt style={{ paddingHorizontal:30}} h4>Détails du voyage </Txt>
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
                            placeholder={this.state.location_from ? this.state.location_from : 'fg'}
                            placeholderTextColor="#303030"
                            onChangeText={(query) =>this.setState({query})}
                            style={{fontWeight:'bold'}}
                            autoCorrect={false}
                            editable = {false}
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
                                placeholder={this.state.location_to ? this.state.location_to : 'fg' }
                                placeholderTextColor="#303030"
                                onChangeText={(query) =>this.setState({query})}
                                autoCorrect={false}
                                style={{fontWeight:'bold'}}
                                editable = {false}
                            />
                       </View>
                       {/* <View><Feather name="heart" size={20}/></View> */}
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
                            placeholder="Date de voyage"
                            placeholderTextColor="#303030"
                            editable = {false}
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
                      placeholder={this.state.weight_total}
                      placeholderTextColor="#303030"
                      autoCorrect={false}
                      style={[styles.input]}
                      keyboardType = 'numeric'
                      defaultValue={this.state.weight_total}
                      onChangeText={text => this.setState({ weight_total: text })}                
               />
               <TextInput 
                      placeholder="Note"
                      placeholderTextColor="#303030"
                      autoCorrect={false}
                      style={[styles.inputText]}
                      multiline={true}
                      defaultValue={this.state.note}
                      onChangeText={text => this.setState({ note: text })}            
               />
                   {this.showErrorMessage()}    
          </Block>
         </Block>
         { this._renderButton() }  
         <Button shadow 
            style={{borderRadius:3, borderWidth:1,borderColor:theme.colors.gray, marginHorizontal:20, marginTop:10 }}  
            onPress={this._onSaveTrip.bind(this)}> 
              {loading ? (
                <ActivityIndicator size="small" color="white" /> 
            ) : ( 
              <Txt center bold  gray >Supprimer</Txt>
              )}
           </Button>
       </ScrollView>                   
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {
        editing: state.editTrip.editing,
        error: state.editTrip.error,
        saved: state.editTrip.saved,
        // errordelete: state.deleteTrip.error,
        loading: state.deleteTrip.loading,
        delete: state.deleteTrip.delete
  }
}

export default connect(mapStateToProps, { deleteTrip,editTrip , fetchMyTrips })(EditTripScreen);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 1.5,
    paddingVertical:theme.sizes.base
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