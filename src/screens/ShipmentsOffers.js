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
  Alert
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Block, Badge, Card, Txt , Button} from '../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../constants';
import rgba from "hex-to-rgba";

import { connect } from 'react-redux';
import {  cancelOffer } from '../actions';
const { width, height } = Dimensions.get("screen");

class ShipmentsOffers extends Component {
  constructor() {
    super();
    this.state = {
          load:false,
          
    }
  }
  // componentWillReceiveProps(nextProps) {
  
  //   if (nextProps.added) {
  //        Alert.alert(
  //       'Votre Commande a bien été modifier',
  //       'Nous informerons les voyageurs de votre commande. Attendez les offres des voyageurs.',       
  //       [
  //         {
  //           text: 'OK', onPress: () => {
  //              this.props.navigation.navigate('MyShipmentsScreen'); 
  //              const { navigation } = this.props;
  //              const item = navigation.getParam('trip');
  //              const trip_id = item.id;
  //              this.props.fetchMyDeals({trip_id});
  //           }
  //         }
  //       ],
  //       { cancelable: false }
  //     )  
  //   }
  // }

 componentDidMount() {
      const { navigation } = this.props;
      const item = navigation.getParam('trip');
      // const trip_id = 2;
      // this.props.fetchMyDeals({trip_id});
      // this.setState({load:true})
   
 }

  _onRefreshDeals() {
    const { navigation } = this.props;
    const item = navigation.getParam('trip');
    // const trip_id = 2;
    // this.props.fetchMyDeals({trip_id});
    // this.setState({load:true})
  }
  _onCancelBooking( id , type){
    const {  loadingcancel } = this.props; 
    this.props.cancelOffer({ id, type });
    this.setState({load:false})
    const { navigation } = this.props;
    const item = navigation.getParam('trip');
    const trip_id = item.id;
    this.props.fetchMyDeals({trip_id});

}

  _renderConfirmation(type){
   if(type =='pending'){
    return(
      <View style={styles.campingInfo}>
      <MaterialCommunityIcons
        name="timer-sand"
        color="#64B5F6"
        size={16}
      />
      <Txt bold style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
        En attente de confirmation
      </Txt>
 </View>
    )
  }else if(type =='accepted'){
    return(
      <View style={styles.campingInfo}>
      <MaterialCommunityIcons
        name="ticket-confirmation-outline"
        color="#64B5F6"
        size={16}
      />

      <Txt  style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
      Offre confirmée
      </Txt>
 </View>
    )
  }
}

renderList = ( item ) => {
    const { navigation } = this.props; 
      return ( 
     <Card style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:10}}>
             {this._renderConfirmation(item.type)}
           <TouchableOpacity
            key={item.user.name}
            style={{marginBottom:15}}
            onPress={() => navigation.navigate('ShipmentOfferDetails', {  item })}     
           >
        <Block row center>
        <Badge
            color={rgba(theme.colors.accent, "0.2")}
            size={14}
            style={{ marginRight: 8 }}
        >
            <Badge color={theme.colors.accent} size={8} />
        </Badge>
                <Txt  bold style={{ fontSize: 16}}  spacing={0.5} color="gray">
                { item.trip.countries.name } 
                </Txt>
           </Block>
            <Block row center style={{ paddingVertical: 4 }}>
            <Badge color="lightgray" size={4} style={{ marginLeft: 4.5 }} />
            </Block>
            <Block row center>
            <Badge
                color={rgba(theme.colors.primary, "0.2")}
                size={14}
                style={{ marginRight: 8 }}
            >
            <Badge color={theme.colors.primary} size={8} />
            </Badge>
            <Txt  bold style={{ fontSize: 16}}  spacing={0.5} color="gray">
            { item.trip.countriesto.name } 
            </Txt>
            </Block>
            <Block row space="between" style={{ marginTop: theme.sizes.base }}>
            <Txt style={{fontSize: 12}} spacing={0.5} caption>
                Depart le: { item.trip.travel_date } 
            </Txt>
            {/* <Txt style={{fontSize: 14, fontWeight: "bold"}} spacing={0.5} caption>
            { item.weight_total } g Valable
            </Txt> */}
    </Block> 
  </TouchableOpacity>
        <Block flex={false} color="lightgray" style={styles.hLine} />      
        <TouchableOpacity
            key={item.user.name}
            onPress={() => navigation.navigate('ProfileScreen',{user : item.user })}     
           >
          <Block row space="between">   
          <Image
            source={{ uri: item.user.photo }}
            style={styles.avatar}
           />      
           <Block
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Txt h4 bold spacing={0.5} color="black">
                  Par {item.user.name}
               </Txt>
               {(item.user.avgstars != 0) ? 
               (
               <Block row style={{marginTop:6}}>
                   <FontAwesome name="star" color="#FFBA5A" style={{marginRight:5,marginTop:2}}  size={16} />
                      <Txt style={{ fontSize: 12 }}>
                         {item.user.avgstars}
                      </Txt>
                </Block>
                    ) : 
                    <Block row style={{marginTop:2}}>
                    <FontAwesome name="star" color="gray" style={{marginRight:5, marginTop:2}}  size={16} />
                 </Block>
                  }
            </Block>        
            <View style={styles.campingInfo}>
                <Ionicons
                  name="md-pricetag"
                  color="#FF7657"
                  size={14}
                />
                <Txt gray style={{  fontSize: 14, marginLeft: 4,  color: "#000000" }}>
                    Prix offert: {item.reward}€
                </Txt>
              </View>
            </Block>  
            </TouchableOpacity>
       </Card>
      );
  }

  keyExtractor = (item, index) => index;
  
  render() { 
    const { navigation } = this.props;
    const item = navigation.getParam('shipment');
    return (
      <SafeAreaView  style={styles.container}>
      <Block flex={false} column style={styles.header}>
          <Txt h4>
             Offres pour vous livrer la commande 
          </Txt>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShipmentDetails',{ shipment:item, mine:1 })}   
           >
             <View style={styles.option}>
                    <Txt bold h3>{item.name}</Txt>
                    <FontAwesome name='angle-right' size={24} />
             </View>
      </TouchableOpacity>
        </Block> 
         {( item.offers!= null) ?  
         (
          <FlatList
                data={item.offers}    
                renderItem={({ item }) => this.renderList(item)}
                keyExtractor={this.keyExtractor}  
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshDeals.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!item.offers.length? 
                  <View><Txt style={styles.emptyMessageStyle}>Vous n'avez pas d'offre </Txt>
                 </View>
                  : null)
                }         
            />
            ) : null
          }
         {this.props.fetching && 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#03A9F4"/>
                    </View> 
         }  

        {/* {(!this.props.fetching && this.props.data != null) ? 
            (  
              <Button gradient style={{margin:10}} 
                              onPress={() => navigation.navigate('AddTrip')}>
                                  <Txt bold white center>Add Trip</Txt>
              </Button> 
              ) : null
              } */}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
    return {
        fetching: state.deals.loading,
        data: state.deals.deals,
        error: state.cancelOffer.error,
        loadingcancel: state.cancelOffer.loadingcancel,
        added: state.cancelOffer.annuler
        
    };
};

export default connect(mapStateToProps, {  cancelOffer })(ShipmentsOffers);

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding/3,
    backgroundColor: theme.colors.gray4
  },
  hLine: {
    marginBottom: theme.sizes.base/1.5 ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
  },

  userImage:{
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 6
  },
  pendingBtn: {
    backgroundColor: theme.colors.blue,
    borderRadius: 9,
    marginHorizontal:10,
    marginTop:10,
},
deliveryBtn: {
  backgroundColor: theme.colors.white,
  borderRadius: 9,
  // marginHorizontal:10,
  // marginTop:10,
  alignItems: 'flex-end',
  borderWidth:1,
  borderColor:theme.colors.blue
},
cancelText: {
    color: theme.colors.white,
    fontSize: theme.sizes.base * 0.8 ,
    padding:10
},
modifierText: {
  color: theme.colors.black,
  fontSize: theme.sizes.base * 0.8 ,
  padding:10
},
emptyMessageStyle: {
    textAlign: 'center',
    marginVertical:30,
    justifyContent: "center",
    alignItems: 'center'
},
camping: {
  flex: 1,
  flexDirection: "row",

},
campingDetails: {
  flex: 2,
  paddingLeft: 5,
  flexDirection: "column",
  justifyContent: "space-around"
},
campingInfo: {
  flexDirection: "row",
  alignItems: "center",
  marginRight: 14,
  marginBottom:10

},
campingImage: {
  width: width * 0.20,
  height: width * 0.22,
  borderRadius: 6
},
avatar: {
  width: theme.sizes.padding * 1.4,
  height: theme.sizes.padding * 1.4,
  marginRight:10,
  borderRadius: theme.sizes.padding*4 ,
  borderWidth:2,
  borderColor:theme.colors.gray2
},
header: {
  paddingHorizontal: theme.sizes.base * 2,
  paddingVertical: theme.sizes.base,
},
option: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
});