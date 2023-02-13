import React, { Component } from 'react';
import { Alert, ActivityIndicator, StyleSheet, ScrollView, Keyboard, TextInput, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { addTrip, fetchMyTrips } from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Button, Block, Txt, Input, Badge } from '../components';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import 'moment/locale/fr';

class AddTrip extends Component {
  constructor() {
    super();
    this.state = {
        travel_date: '',
        weight_total:'',
        note:'',
        is_active:'',
        disabled: true,
        isDateTimePickerVisible: false,
        location_from: null,
        location_to: null,
        from_id: 0,
        to_id: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
  
    if (nextProps.added) {
         Alert.alert(
        'succès',
        'Vous avez ajouté votre trajet avec succès',      
        [
          {
            text: 'OK', onPress: () => {
              this.props.fetchMyTrips();
              this.props.navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      )  
    }
  }
//   componentWillReceiveProps(nextProps) {
 
//     if (nextProps.added) {
//         Alert.alert(
//          'Vous avez ajouté votre trajet avec succès',       
//        [
//          {
//            text: 'OK', onPress: () => {
//               this.props.navigation.navigate('MyTrips'); 
//             //  this.props.navigation.goBack();
//            }
//          }
//        ],
//        { cancelable: false }
//      )  
//    }
//  }

  onGoBack1(location_from, from_id) {
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
        const {from_id, to_id, travel_date, weight_total, note } = this.state;
        const errors = [];
         Keyboard.dismiss();
         this.setState({ loading: true });
         if (!from_id) errors.push('from_id');
         if (!to_id ) errors.push('to_id');
         if (!travel_date ) errors.push('travel_date');
         if (!weight_total ) errors.push('weight_total');
         if (!errors.length && from_id != to_id) {  
            this.props.addTrip({from_id, to_id, travel_date, weight_total, note });
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
    const { loading } = this.props;
        return ( 
            <Button gradient style={{margin:10}} 
              onPress={this._onSaveTrip.bind(this)}>
            {loading ? (
                <ActivityIndicator size="small" color="white" /> 
            ) : ( 
                <Txt bold white center>Ajouter</Txt>
            )}
            </Button>
          );
    }

  render() {
    const {  errors } = this.state;
    const { navigation } = this.props; 
    Moment.locale('en');
    // const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>Créer un trajet</Txt>
        </Block>
        <Txt style={{ paddingHorizontal:30}} h4>Détails du trajet </Txt>
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
                                placeholder={this.state.location_to ? this.state.location_to : 'Arrivée (Pays)' }
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
                            placeholder="Date de trajet"
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
                          minimumDate={Moment().toDate()}
                        />
               </View>
               </TouchableOpacity>
                <TextInput 
                    placeholder="Poids libre (en Kg)"
                    placeholderTextColor="#303030"
                    autoCorrect={false}
                    keyboardType = 'numeric'
                    style={[styles.input]}
                    onChangeText={text => this.setState({ weight_total: text })}   
               />
               <TextInput 
                  placeholder="Note"
                  placeholderTextColor="#303030"
                  autoCorrect={false}
                  style={[styles.inputText]}
                  multiline={true}
                  onChangeText={text => this.setState({ note: text })}        
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
        loading: state.trips.loading,
        error: state.trips.error,
        added: state.trips.added
  }
}

export default connect(mapStateToProps, { addTrip , fetchMyTrips })(AddTrip);

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