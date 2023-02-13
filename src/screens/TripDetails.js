import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  SafeAreaView
} from "react-native";

import rgba from "hex-to-rgba";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt, Button } from "../components";
import { connect } from 'react-redux';
import {   fetchMyTrips} from '../actions';
import Moment from 'moment';
import 'moment/locale/fr';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get("window");
import { theme } from "../constants";
import { fonts, sizes } from "../constants/theme";


class TripDetails extends Component {

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.saved) {
  //     this.props.fetchMyTrips();
  //     this.props.navigation.navigate('MyTrips');   
  //   }
  // }


    // Alert.alert(
    //   'Etes-vous sur de vouloir supprimer ce trajet',    
    //     [
    //       {
        //  text: 'Non', onPress: () => {  this.props.deleteTrip({id} );  
    //         }
    //       },
  
    //       {
    //         text: 'Non', onPress: () => {
    //           this.props.navigation.navigate('MyTrips'); 
    //         }
    //       },
    //     ],
    //     { cancelable: false }
    //   )   
 
     


renderList = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('trip');
   return (  
     <Block style={{ marginTop: theme.sizes.base /4,  marginBottom: theme.sizes.base }}>
     <Txt h1 bold style={{ marginBottom: theme.sizes.base * 2,  marginTop: theme.sizes.base}} spacing={0.5} >
        Plan de trajet
    </Txt>
     <Txt style={{fontSize: 20, fontWeight: "bold", marginBottom: theme.sizes.base * 2}} spacing={0.5} caption>
      {item.travel_date}
    </Txt>
     <Block row center>
        <Badge
          color={rgba(theme.colors.accent, "0.2")}
          size={14}
          style={{ marginRight: 8 }}
        >
           <Badge color={theme.colors.accent} size={8} />
        </Badge>
        <Txt style={{ fontSize: 16 }} bold spacing={0.5} color="gray">  
           {item.countries.name}
        </Txt>
      </Block>
     <Block row center style={{ paddingVertical: 4 }}>
    <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
  </Block>
      <Block row center>
    <Badge
      color={rgba(theme.colors.primary, "0.2")}
      size={14}
      style={{ marginRight: 8 }}
    >
      <Badge color={theme.colors.primary} size={8} />
    </Badge>
    <Txt style={{ fontSize: 16 }} bold spacing={0.5} color="gray">
        {item.countriesto.name}
    </Txt>
  </Block>
 
  <Block space="between" row  style={[ {marginTop: theme.sizes.base * 2},styles.inputRow]}>
    <Txt style={{fontSize: 16, marginBottom: theme.sizes.base}} spacing={0.5} caption>
       Poid valable : 
    </Txt>
    <Txt style={{fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
          {item.weight_total} kg 
    </Txt>
    {/* {(item.message != null) ? 
     (
    <Txt style={{fontSize: 14, fontWeight: "bold"}} spacing={0.5} caption>
        Message :   {item.message}
    </Txt>
      ) : null
    } */}
  </Block>
  <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
       <Block>
        <Txt blod h3  style={{ color: 'black', marginBottom:10 }} > Notes</Txt>
        <Txt medium  style={{fontSize: 15,marginBottom:5}}>
            Aucune note disponible
          </Txt> 
        </Block> 
       </Block>

       {(item.offers.length != 0) ? 
         (    
      <TouchableOpacity onPress={() => navigation.navigate('DealsScreen', { trip: item })}>
          <Block row space="between" margin={[20, 0]} style={styles.inputRow}>
            <Block>
              <Txt medium blue style={{fontSize: 18}}> Offres envoyées</Txt>
              {/* hna khes my deals lisafi ghadi njib m3aya */}
              </Block> 
              <Txt medium style={{fontSize: 16, fontWeight: 'bold'}}>
              <FontAwesome name='angle-right' size={24} />
              </Txt>
            </Block>
        </TouchableOpacity>
      ) : 
       <Block row space="between" margin={[20, 0]} style={styles.inputRow}>
      <Block>
        <Txt medium gray  style={{fontSize: 16}}> Pas d'offre envoyée pour ce trajet</Txt>
        </Block> 
      </Block>
    }


        <TouchableOpacity onPress={() => navigation.navigate('MatchingShipments', { trip: item })}>
          <Block row space="between" margin={[20, 0]} style={styles.inputRow}>
            <Block>
              <Txt medium blue style={{fontSize: 18}}> Commandes correspondantes</Txt>
              </Block> 
              <Txt medium style={{fontSize: 16, fontWeight: 'bold'}}>
              <FontAwesome name='angle-right' size={24} />
              </Txt>
            </Block>
        </TouchableOpacity>
 </Block>
  );
};

render() {
  const { navigation, loading } = this.props;
  const item = navigation.getParam('trip');
   return (      
         <ScrollView showsVerticalScrollIndicator={false}>
           <View style={styles.welcome}>
         {/* {( item.offers.length > 0) ? 
         (
          <TouchableOpacity onPress={() => navigation.navigate('TripOfferDetails', { item: item.offers })}>
         <View style={styles.campingInfo}>
                <MaterialCommunityIcons
                  name="timer-sand"
                  color="#64B5F6"
                  size={16}
                />
                <Txt bold style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
                {item.offers.length} Offre en attente de confirmation
                </Txt>
           </View>
           </TouchableOpacity>
             ) : null
            } */}
             {this.renderList()}   
             <View>
             <TouchableOpacity   onPress={() => navigation.navigate("EditTripScreen", {trip:item, weight:item.weight_total.toString(), country_from:item.countries.name, country_to: item.countriesto.name})}>
             <Block row space="between" margin={[5, 0]} style={styles.inputRow}>
                <Block>
                <Txt medium style={{fontSize: 18}}> Modifier ce trajet</Txt>
                </Block> 
                <Txt medium style={{fontSize: 16, fontWeight: 'bold'}}>
                <FontAwesome name='angle-right' size={24} />
               </Txt>
            </Block>
            </TouchableOpacity>

      {/* <Button gradient style={{marginHorizontal:20}}  
            onPress={() => navigation.navigate("EditTripScreen", {trip:item, weight:item.weight_total.toString(), country_from:item.countries.name, country_to: item.countriesto.name})}>
                <Txt bold white center> Modifier </Txt>
            </Button> */}
          </View>   
          </View>
        </ScrollView>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     error: state.deleteTrip.error,
//     loading: state.deleteTrip.loading,
//     saved: state.deleteTrip.saved
//   }
// }


export default  TripDetails;

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding/2,
    paddingHorizontal: theme.sizes.padding,
    // backgroundColor: theme.colors.gray4,
    flex:1
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1
  },
  awards: {
    padding: theme.sizes.base,
    marginBottom: theme.sizes.padding
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: "absolute",
    right: theme.sizes.base,
    top: theme.sizes.base
  },
  startTrip: {
    position: "absolute",
    left: (width - 144) / 2,
    bottom: 0
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base/6,
  },
  inputRow: {
    alignItems: 'flex-end',
    marginBottom: 2,
    paddingBottom: 15,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
 
  tutImage: {
    height: theme.sizes.base * 2.3,
    width: theme.sizes.base * 2.3,
    marginBottom:15,
    borderRadius: 20,
  },
  containerWithMargin: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
    tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
    fontSize:15
  },
  campingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
    marginBottom:15
  },
  
});