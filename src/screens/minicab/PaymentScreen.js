import React, { Component } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  TextInput,
  Alert,
  Keyboard
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt , Button, Input} from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../constants';
import rgba from "hex-to-rgba";
import { connect } from 'react-redux';
import {  makeOffer, fetchMyTrips } from '../../actions';

import { ThemeConsumer } from 'react-native-elements';

// const { width, height } = Dimensions.get("screen");
const { width, height } = Dimensions.get("window");

class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      reward:0,
      shipment_id:'',
      trip_id: '',
      errors: [],
      load: false,
      profile: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.added) {
        Alert.alert(
         'Merci',
         'Votre offre a été envoyée avec succès, vous pouvez la suivre dans la page des offres',       
       [
         {
           text: 'OK', onPress: () => {
              this.props.fetchMyTrips();
               this.props.navigation.navigate('MyTrips'); 
           }
         }
       ],
       { cancelable: false }
     )  
   }
 }
 _onSaveOffer() {
  const {message, reward} = this.state;
 const {  navigation } = this.props;
 const trip = navigation.getParam('trip');
 const shipment = navigation.getParam('shipment');
 const user_id = trip.user_id;
 const  trip_id  = trip.id;
 const shipment_id = shipment.id;

 const errors = [];
 Keyboard.dismiss();
 this.setState({ loading: true });
 if (!reward) errors.push('reward');

 if (!errors.length) {
 this.props.makeOffer(shipment_id, trip_id,user_id, reward, message );
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
         <Button gradient style={{margin:10, marginVertical:40}} 
           onPress={this._onSaveOffer.bind(this)}
           >
         {loading ? (
             <ActivityIndicator size="small" color="white" /> 
         ) : ( 
             <Txt bold white center> Book</Txt>
         )}
         </Button>
       );
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
  renderTrip = () => {
    const {  navigation } = this.props;
    // const item = navigation.getParam('item');
   return (
    <Block  style={{marginHorizontal:15}}>
  <Block row space="between" style={{ marginVertical: theme.sizes.base }}>
      <Txt bold style={{fontSize: 16}} spacing={0.5} caption>
         Thur 22 Sep
      </Txt>

    </Block> 
    <Block row center>
    <Txt caption gray bold>08:00</Txt>
      <Badge
        color={rgba(theme.colors.accent, "0.2")}
        size={14}
        style={{ marginRight: 8 ,marginLeft: 4}}
      >
        <Badge color={theme.colors.accent} size={8} />
      </Badge>
      <Txt  bold style={{ fontSize: 18}}  spacing={0.5} color="gray">
      Casablanca  
      </Txt>
    </Block>
    <Block row center style={{ paddingVertical: 4 }}>
    <Txt caption white bold>08:00</Txt>
      <Badge color="lightgray" size={4} style={{ marginLeft: 4.5 }} />
    </Block>
    <Block row center>
    <Txt caption gray bold >08:00</Txt>
      <Badge
        color={rgba(theme.colors.primary, "0.2")}
        size={14}
        style={{ marginRight: 8 ,marginLeft: 4 }}
      >
        <Badge color={theme.colors.primary} size={8} />
      </Badge>
      <Txt  bold style={{ fontSize: 18}}  spacing={0.5} color="gray">
       Rabat
      </Txt>
    </Block>

        <Block flex={false} color="lightgray" style={styles.hLine} />

        <Txt bold blue style={{ fontSize: 16, marginVertical: theme.sizes.base   }} spacing={0.5} caption>
             Price details
            </Txt>
        <Block space="between" row  style={{marginBottom: theme.sizes.base  }}>
            <Txt bold gray style={{ fontSize: 16, marginBottom: theme.sizes.base / 2 }} spacing={0.5} caption>
            2 Seats x 140 dh
            </Txt>
            <Txt bold style={{ fontSize: 16 }} spacing={0.5}>
               270dh
            </Txt>
        </Block>
        <Block space="between" row >
            <Txt bold gray style={{ fontSize: 16 }} spacing={0.5} caption>
              Total Prix
            </Txt>
            <Txt bold style={{ fontSize: 16 }} spacing={0.5}>
              700 dh
            </Txt>
       </Block>

</Block>
      )
  }
 



keyExtractor = (item, index) => index;
render() {
  const {  navigation } = this.props;
//   const item = navigation.getParam('item');
    return (
      <SafeAreaView  style={styles.container}>
           <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
              <Txt h2 bold style={{  marginHorizontal:15, marginBottom: 50 }}>
              check your booking details
              </Txt>     
           {this.renderTrip()}
           {this._renderButton()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     error: state.cancelOffer.error,
//     loadingcancel: state.cancelOffer.loadingcancel,
//     added: state.cancelOffer.annuler
//   }
// }

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.sizes.padding ,
    paddingHorizontal: theme.sizes.padding/2 ,
    
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },

  avatar: {
    width: theme.sizes.padding * 1.4,
    height: theme.sizes.padding * 1.4,
    marginRight:10,
    borderRadius: theme.sizes.padding ,
    borderWidth:2,
    borderColor:theme.colors.gray2
  },
  camping: {
    flex: 1,
    flexDirection: "row",
 
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  campingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14
  },
  campingImage: {
    width: width * 0.20,
    height: width * 0.15,
    borderRadius: 6
  },

  pendingBtn: {
    flexDirection: 'row',
    width:100,
    backgroundColor: theme.colors.rose,
    borderRadius: 9,
    alignItems: 'flex-end',
},
cancelText: {
    color: theme.colors.white,
    fontSize: theme.sizes.base * 0.8 ,
    paddingLeft: theme.sizes.base / 4,
  },
  startTrip: {
    position: 'absolute',
    right: (width - 330) / 2,
    bottom: 10,
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
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  inputRow: {
    alignItems: 'flex-end',
    marginTop: 2,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopColor: '#EAEAED',
    borderTopWidth: 1,
  },
});