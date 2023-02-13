import React, { Component } from 'react'
import {
  Modal,
  StyleSheet, TextInput, Dimensions, TouchableOpacity, SafeAreaView, View, Text, Alert
} from 'react-native'

import { Button, Badge, Block, Txt, Switch, Input } from '../../components';
import { theme } from '../../constants';
import rgba from "hex-to-rgba";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ListItem, Icon } from 'react-native-elements';
import Moment from 'moment';
import 'moment/locale/fr';

const { width, height } = Dimensions.get('screen');



class SearchScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    location_from: null,
    location_to: null,
    bntDisabled: true,
    showTerms: false,
    counter: 1,
    pickup_date: '',
    distance: 0,
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
    const pickup_date = Moment(date, "YYYY-MM-DD hh:mm:ss", true).format('ddd D MMMM à HH:mm')
    this.setState({ pickup_date });
  };

  // renderHeader() {
  //   return (
  //     <View style={styles.headerContainer}>
  //       <View style={styles.header}>
  //         <View style={{ flex: 2, flexDirection: "row" }}>
  //           <View style={styles.settings}>
  //             <View style={styles.location}>
  //               <TouchableOpacity
  //                 onPress={() => this.props.navigation.navigate("AccountScreen")}
  //               >
  //                 <FontAwesome
  //                   name="user"
  //                   size={20}
  //                   color="white"
  //                 />
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //           {/* <View style={styles.options}>
  //                 <Text style={{ fontSize: 12, color: "#A5A5A5", marginBottom: 5 }}>
  //                   Detected Location
  //                 </Text>
  //                 <Text style={{ fontSize: 14, fontWeight: "300" }}>
  //                   Northern Islands
  //                 </Text>
  //               </View> */}
  //         </View>
  //         <View style={styles.settings}>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }
  //   renderTripButton() {
  //     const { navigation } = this.props;
  //     return (
  //       <Block center middle style={styles.startTrip}>
  //       <Badge color={rgba(theme.colors.primary, "0.1")} size={100}>
  //       <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Active")}>
  //             <Badge color={theme.colors.accent} size={62}>
  //                 <FAIcon name="bus" size={62 / 2.5} color="white" />
  //             </Badge>
  //       </TouchableOpacity>
  //       </Badge>
  //       </Block>
  //     )
  //   }
  renderPassenger() {
    const { counter } = this.state;
    return (
      <Modal
        animationType="fade"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
            {/* <View
          style={{ backgroundColor:'rgba(0, 0, 0, 0.7)', flex: 1, justifyContent: 'center', padding: 10, height:400 }}> */}
            {/* <View style={{ borderRadius:10,  backgroundColor: '#fff', padding: 10 }}> */}
            {/* <Block row space="between" style={{ flex:1,
                    marginBottom:90}}>  


                    </Block> */}
        <Block
           style={{ backgroundColor:'rgba(0, 0, 0, 0.7)', justifyContent: 'center', padding: 10,  }}
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={{
            justifyContent: 'flex-end',
            marginTop: -5,
            position: 'absolute',
          }}>
            <Button
              onPress={() => this.setState({ showTerms: false })}
            >
              <Txt size={25}>
                X
              </Txt>
            </Button>
          </Block>
          <View style={{
            marginTop: 100,
            width: theme.sizes.width,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.colors.gray4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 0.5,
                  borderRadius: 25,
                  borderColor: '#A5A5A5',
                }}
                onPress={this.decrementHalder}
              >
                <Txt bold h1>-</Txt>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 50,
                // backgroundColor: theme.colors.gray4,
                alignItems: 'center',
                justifyContent: 'center',
                // borderWidth: 0.5,
                borderColor: '#A5A5A5',
              }}>
              <Txt bold h1>{this.state.counter}</Txt>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.colors.gray4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  borderRadius: 25,
                  borderColor: '#A5A5A5',
                  borderWidth: 0.5,

                }}
                onPress={this.incrementHalder}
              >
                <Txt bold h1>+</Txt>
              </TouchableOpacity>
            </View>
          </View>
          <Block middle>
            <Button
              gradient
              onPress={() => this.setState({ showTerms: false, counter })}>
              <Txt center white>
                Confirmer
              </Txt>
            </Button>
          </Block>
        </Block> 
        {/* </View> */}
        {/* </View> */}
      </Modal>
    );
  }

  incrementHalder = () => {
    const { counter } = this.state;
    if (counter !== 3) {
      this.setState(prevState => ({ counter: prevState.counter + 1 }))
    }
  }
  decrementHalder = () => {
    const { counter } = this.state;
    if (counter !== 1) {
      this.setState(prevState => ({ counter: prevState.counter - 1 }))
    }
  }



  onGoBack1(location_from) {
    this.setState({ location_from, btnDisabled: false });
  }
  onGoBack2(location_to) {
    this.setState({ location_to, btnDisabled: false });
    if (this.state.location_from == location_to) {
      this.setState({ location_to: '' });
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

  _renderButton() {
    const { navigation } = this.props;
    const { location_from, location_to, counter, pickup_date } = this.state;
    const locations = { location_from, location_to, counter, pickup_date };

    if ((location_from != null && location_to != null)) {
      return (
        <Button gradient style={{ margin: 10 }}
          onPress={this._onSendLocation.bind(this)}>
          <Txt bold white center>Rechercher</Txt>
        </Button>
      );
    }
  }
  _onSendLocation() {
    const { navigation } = this.props;
    const { location_from, location_to, counter, pickup_date } = this.state;
    const locations = { location_from, location_to, counter, pickup_date };
    this.props.navigation.navigate('RoutesScreen', { locations });

  }
  render() {
    const { navigation } = this.props;
    const { counter } = this.state;


    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.dropText}>Un vaste choix de trajets</Text>
          {/* <TouchableOpacity> */}
          {/* <Feather name="x" size={24}/> */}
          {/* </TouchableOpacity> */}

          {/* <View style={styles.search}>
                       <View style={styles.inputWrapper}>
                           <View style={styles.pinkDot}/>
                           <TextInput placeholder="Where are you going?" placeholderTextColor="#afb1b6"/>
                       </View>
                       <View><Feather name="heart" size={20}/></View>
                   </View> */}

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Location', { onGoBack: this.onGoBack1.bind(this) })}
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
                <Text>{this.state.location_from}</Text>
                <TextInput
                  placeholder={this.state.location_from ? this.state.location_from.address : 'Indiquez votre depart'}
                  placeholderTextColor="#708090"
                  onChangeText={(query) => this.setState({ query })}
                  style={{ fontWeight: 'bold' }}
                  autoCorrect={false}
                  editable={false}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Location', { onGoBack: this.onGoBack2.bind(this) })}
          >
            <View style={styles.search}>
              <View style={styles.inputWrapper}>

                <Badge
                  color={rgba(theme.colors.gray, "0.2")}
                  size={14}
                  style={{ marginRight: 8 }}
                >
                  <Badge color={theme.colors.gray} size={8} />
                </Badge>
                <Text>{this.state.location_to}</Text>
                <TextInput
                  placeholder={this.state.location_to ? this.state.location_to.address : 'Indiquez votre destination'}
                  placeholderTextColor="#708090"
                  onChangeText={(query) => this.setState({ query })}
                  style={{ fontWeight: 'bold' }}
                  autoCorrect={false}
                  editable={false}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.bottomCard}>
            <View style={styles.bottomCardPin}>
              <TouchableOpacity onPress={() => this.setState({ showTerms: true })}>
                <View style={styles.allCard}>
                  <FontAwesome name="user" size={20} style={styles.bottomCardIcon} />
                  <Txt style={styles.bottomCardText}>{counter} Passenger</Txt>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={this.showDateTimePicker}>
            <View style={styles.search}>
              <View style={styles.inputWrapper}>
                <FontAwesome
                  name="calendar"
                  color="#FF7657"
                  size={12}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  placeholder="Date de trajet"
                  placeholderTextColor="#303030"
                  editable={false}
                  autoCorrect={false}
                  defaultValue={this.state.pickup_date}
                  onChangeText={text => this.setState({ pickup_date: text })}
                />
              </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                mode="datetime"
                minimumDate={Moment().toDate()}
              />
            </View>
          </TouchableOpacity>
          {/* <View style={styles.allCard}>*}
                    <View style={styles.bottomCard}>
                        <View style={styles.bottomCardPin}>
                            <FontAwesome name="calendar" size={24} style={styles.bottomCardIcon}/>
                            <Txt style={styles.bottomCardText}>{this.getCurrentDate()}</Txt>
                           
                          </View>
                       <TouchableOpacity style={styles.buttomCircle}> <FontAwesome name="arrow-right" size={20} style={{color:'#fff'}}/></TouchableOpacity> */}
          {/* </View>
                    <View style={styles.bottomCard}>
                        <View style={styles.bottomCardPin}>
                            <Txt style={styles.bottomCardText}>1 passenger</Txt>
                          </View> */}
          {/* <TouchableOpacity style={styles.buttomCircle}> <FontAwesome name="arrow-right" size={20} style={{color:'#fff'}}/></TouchableOpacity> */}
          {/* </View>
                   </View> */}
          {this._renderButton()}
        </View>
        {this.renderPassenger()}
      </SafeAreaView>
    )
  }
}



export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  card: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  drop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  dropText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 25,
    marginVertical: 50
  },
  search: {
    marginVertical: 10,
    padding: 14,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#efeff0',
    borderWidth: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinkDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#346473',
    marginRight: 10,
  },
  blueDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.gray2,
    marginRight: 10,
  },
  bottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderColor: '#efefef',
    borderWidth: 1,
    borderRadius: 20,
  },
  bottomCardPin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomCardIcon: {
    color: '#92939b',
    marginTop: 5,
    marginRight: 0
  },
  bottomCardText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
  allCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  bottomCardPin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.15,
    paddingHorizontal: 14
  },
  location: {
    height: 30,
    width: 30,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary
  },
  settings: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  startTrip: {
    position: 'absolute',
    right: (width - 330) / 2,
    bottom: 10,
  },
})

