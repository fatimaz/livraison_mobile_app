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
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt , Button, Input} from '../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import { connect } from 'react-redux';
import {  cancelOffer, fetchMyTrips } from '../actions';


// const { width, height } = Dimensions.get("screen");
const { width, height } = Dimensions.get("window");

class RequestDetails extends Component {


  componentWillReceiveProps(nextProps) {  
    if (nextProps.added) {
      this.props.navigation.navigate('MyTrips'); 
    }
  }

  _onCancelBooking( id , type){
    this.props.cancelOffer({ id, type });
    this.props.fetchMyTrips()
  }
  _renderConfirmation(type, item){
    if(type =='pending'){
    return(
      <View style={styles.campingInfo}>
        <MaterialCommunityIcons
          name="timer-sand"
          color="orange"
          size={20}
        />
        <Txt style={{  fontSize: 16, marginLeft: 4, color:"orange" }}>
          Votre Offre est en attente de confirmation
        </Txt>
     </View>
    )
  }else if(type =='accepted'){
    return(
      <Block column>
      <View style={styles.campingInfo}>
      <Ionicons
        name="checkmark-done-circle-outline"
        color="orange"
        size={20}
      />
      <Txt style={{  fontSize: 16, marginLeft: 4, color:"orange" }}>
      Votre Offre a été acceptée par l'acheteur
      </Txt>
   </View>  
   <Txt center gray small style={{ margin:5, fontSize: 16, marginLeft: 4 }}>
          Veuillez confirmer la reception de la commande
        </Txt> 
   </Block> 
    )
  }else if(type =='transit'){
    return(
      <Block column>
          <View style={styles.campingInfo}>
          <Ionicons
            name="paper-plane-outline"
            color="orange"
            size={20}
          />
          <Txt style={{  fontSize: 16, marginLeft: 4, color:"orange" }}>
            La Commande est en transit 
          </Txt>
        </View>    
          <Txt center gray small style={{ margin:5, fontSize: 16, marginLeft: 4 }}>
          Veuillez comfirmer la livraison
        </Txt>
     </Block>
    )
  }
  else if(type =='delivered' && item.livraison == 0 ){
    return(
      <Block column>
      <View style={styles.campingInfo}>
       <Ionicons
        name="checkmark-done-circle-outline"
        color="orange"
        size={20}
      />
     <Txt style={{  fontSize: 16, color:"orange", textAlign: 'right', alignSelf: 'stretch' }}>
        Vous avez deliveré cette commande
    </Txt>
 </View>
 <Txt center gray small style={{ margin:5, fontSize: 16, marginLeft: 4 }}>
       Veuillez évaluer votre expérience apres la confirmation de la livraison par l'acheteur 
     </Txt>
 </Block>
     )
  }
  else if(type =='delivered' && item.livraison == 1 && item.rated_back == 0  ){
    return(
 
      <View style={styles.campingInfo}>
       <Ionicons
        name="checkmark-done-circle-outline"
        color="orange"
        size={20}
      />
     <Txt style={{  fontSize: 16, color:"orange", textAlign: 'right', alignSelf: 'stretch' }}>
     Veuillez évaluer votre expérience
    </Txt>
 </View>

     )
  }
}

renderTrip = () => {
  const {  navigation } = this.props;
  const item = navigation.getParam('item');
 return (
 <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginHorizontal:15 ,marginTop:10}}>
            Votre trajet
     </Text>
 <Card style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:2}}>
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
    <Badge color={theme.colors.primary} size={8}/>
    </Badge>
    <Txt  bold style={{ fontSize: 16}}  spacing={0.5} color="gray">
    { item.trip.countriesto.name } 
    </Txt>
  </Block>
  <Block row space="between" style={{ marginTop: theme.sizes.base }}>
    <Txt style={{fontSize: 14}} spacing={0.5} caption>
       Date:{ item.trip.travel_date } 
    </Txt>

    <Txt style={{fontSize: 14, fontWeight: "bold"}} spacing={0.5} caption>
    { item.trip.weight_total } kg Valable
    </Txt>
  </Block> 
</Card>
</View>
    )
}

renderCommande(item){
  return(
  <Block column center style={{marginVertical:20}}>
  {this._renderConfirmation(item.type, item)}
    <Block row center style={{marginBottom:10}}>
    <Block column center> 
    {(item.type == "pending") ? 
    (
     <Block flex={false} color="orange" style={styles.hLine} bold/> 
    ) : <Block flex={false} color="lightgray" style={styles.hLine} bold/> 
    }
      <Txt> offerte</Txt>
     </Block>

      <Block column center> 
              {(item.type == "accepted") ? 
              (
              <Block flex={false} color="orange" style={styles.hLine} bold/> 
              ) : <Block flex={false} color="lightgray" style={styles.hLine} bold/> 
              }
             <Txt> Acceptée</Txt>
     </Block>

         <Block column center> 
              {(item.type == "transit") ? 
              (
              <Block flex={false} color="orange" style={styles.hLine} bold/> 
              ) : <Block flex={false} color="lightgray" style={styles.hLine} bold/> 
              }
             <Txt> En transit</Txt>
         </Block>

            <Block column center> 
            {(item.type == "delivered") ? 
            (
            <Block flex={false} color="orange" style={styles.hLine} bold/> 
            ) : <Block flex={false} color="lightgray" style={styles.hLine} bold/> 
            }
            <Txt>  Livrée </Txt>
            </Block>
    </Block>
    </Block>
  )
}

renderShipment = () => {
    const {  navigation } = this.props;
    const item = navigation.getParam('item');   
      return (
      <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('ShipmentDetails',{shipment:item.shipment, mine:2 })}     
        >
           <Text style={{ fontSize: 18, fontWeight: "bold", marginHorizontal:15 ,marginTop:10}}>
                Details de l'article
            </Text>
        <Card style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:2}}>       
        <View style={styles.camping}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            source={{ uri: item.shipment.photo }}
          />
          <View style={styles.campingDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Txt numberOfLines={1} bold style={{ fontSize:16 }}>
                { item.shipment.name }
              </Txt>
              <Block row space="between" style={{marginTop:5}}>
              <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                { item.shipment.countries.name }  
                </Text>  
                <Ionicons
                  name="airplane-outline"
                  color="#FF7657"
                  size={20}
                />
                 <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                    { item.shipment.countriesto.name  }
                </Text>
                </Block>
            </View>            
            <View style={{ flex: 1, flexDirection: "column" ,marginTop:7}}>
              <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
                   Qty: {item.shipment.qty}
                </Txt>
                <Txt gray bold style={{  fontSize: 14, marginLeft: 4, marginVertical:5 }}>
                   Price: {item.shipment.price} €
                </Txt>
                <Txt gray  style={{  fontSize: 13, marginLeft: 4 }}>
                    Demandé par {item.shipment.user.name}
                </Txt>
                <Button style={{height:35,borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10}}
                onPress={() => navigation.navigate('ChatMessageScreen', { item: item.shipment, user: item.shipment.user})}> 
                
               <Txt center>Contacter acheteur</Txt></Button>
            </View>
          </View>   
        </View>
        </Card>
       </TouchableOpacity>
        <Block row space ="between" style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:2, padding:20}}>
              <Txt center h4 style={{marginBottom:5}}>
              Récompense offerée :
            </Txt>
            <Txt bold h4 center> {item.reward} €</Txt>
        </Block>
        {this.renderOrder(item)}
      </View>
      // {/* <Block flex={false} color="gray" style={styles.hLine} /> */}
      // {/* <TouchableOpacity
      //       onPress={() => navigation.navigate('ProfileScreen',{user:item.user})}     
      //    > */}
      //  {/* <Block row space="between"> */}
      //    {/* <Block row space="between">
      //      <Image
      //       resizeMode="contain"
      //        source={{ uri: item.shipment.user.photo }}
      //        style={styles.avatar}
      //      />
      //       <Block
      //          style={{
      //            flex: 1,
      //            flexDirection: "column",
      //            justifyContent: "center",
      //          }}
      //        >
      //          <Txt h4 bold spacing={0.5} color="black">
      //               {item.user.name}
      //           </Txt>
      //            <Block row style={{marginTop:6}}>
      //               <FontAwesome name="star" color="#FFBA5A" style={{marginRight:5}}  size={16} />
      //                  <Txt style={{ fontSize: 12 }}>
      //                    4.6
      //                  </Txt>
      //            </Block>
      //      </Block>
      //       </Block> */}
      //       {/* <View style={styles.pendingBtn}> 
      //           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      //               <TouchableOpacity onPress={() => navigation.navigate("SelectTrip", {shipment:item})}>
      //                   <Txt center style={styles.cancelText}>Envoyer une offre</Txt> 
      //               </TouchableOpacity>    
      //           </View>
      //         </View> */}
      //         {/* </Block> */}
      //       {/* </TouchableOpacity> */}
      );
  }
  renderOrder(item){
    const { navigation } = this.props; 
      if(  item.livraison == 1 && item.rated_back == 0 ){
      return(
        <View style={{marginTop:10}}>
        <View style={styles.section}>
        <TouchableOpacity  onPress={() => navigation.navigate('AddRatingScreen',{user:item.shipment.user,  order_id:item.id,  rated:2})}>  
           <View style={styles.option}>
                 <Txt bold>	Laisser un commentaire</Txt>
                 <FontAwesome name='angle-right' size={24} />
              </View>
         </TouchableOpacity>
         </View>  
               <View style={styles.section}>
               <TouchableOpacity  onPress={() => navigation.navigate('ReportScreen',{ order_id:item.id})}>  
                  <View style={styles.option}>
                        <Txt bold>Reporter</Txt>
                        <FontAwesome name='angle-right' size={24} />
                     </View>
                </TouchableOpacity>
                </View> 
          </View> 
      )
    }else if(item.type == "pending"){
      return(
      <View> 
      <View style={styles.section}>
        <Txt bold style={{ fontSize: 18, marginHorizontal:5 ,marginTop:10,marginBottom:10}}>
            Details de Ordre
        </Txt>
        </View>
          <View style={styles.section}>
          <TouchableOpacity  onPress={() => navigation.navigate("EditOfferScreen",{item, reward: item.reward.toString()})}>
           <View style={styles.option}>
                 <Txt bold>	Modifier Offre</Txt>
                 <FontAwesome name='angle-right' size={24} />
              </View>
         </TouchableOpacity>
         </View>
         <View style={styles.section}>
        <TouchableOpacity  onPress={this._onCancelBooking.bind(this,item.id, 0 )}>   
           <View style={styles.option}>
                 <Txt bold>	Annuler Offre</Txt>
                 <FontAwesome name='angle-right' size={24} />
              </View>
         </TouchableOpacity>
         </View> 
      </View>  
      )
    }else if (item.type =="accepted"){
      return(
      <View> 
      <View style={styles.section}>
        <Txt bold style={{ fontSize: 18,  marginHorizontal:5 ,marginTop:10,marginBottom:10}}>
            Details de Ordre
        </Txt>
        </View>
               <View style={styles.section}>
               <TouchableOpacity  onPress={this._onCancelBooking.bind(this,item.id, 4 )}>   
                  <View style={styles.option}>
                        <Txt bold>Confirmer la reception de la commande</Txt>
                        <FontAwesome name='angle-right' size={24} />
                     </View>
                </TouchableOpacity>
                </View>
         <View style={styles.section}>
        <TouchableOpacity  onPress={this._onCancelBooking.bind(this,item.id, 0 )}>   
           <View style={styles.option}>
                 <Txt bold>	Annuler Offre</Txt>
                 <FontAwesome name='angle-right' size={24} />
              </View>
         </TouchableOpacity>
         </View> 
        </View> 
      )
    }else if (item.type =="transit"){
      return(
      <View> 
      <View style={styles.section}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginHorizontal:5 ,marginTop:10,marginBottom:10}}>
            Details de Ordre
        </Text>
        </View>
               <View style={styles.section}>
               <TouchableOpacity  onPress={this._onCancelBooking.bind(this,item.id, 2 )}>   
                  <View style={styles.option}>
                        <Txt bold>	Marker comme Livrée</Txt>
                        <FontAwesome name='angle-right' size={24} />
                     </View>
                </TouchableOpacity>
                </View>
         <View style={styles.section}>
        <TouchableOpacity  onPress={this._onCancelBooking.bind(this,item.id, 0 )}>   
           <View style={styles.option}>
                 <Txt bold>	Annuler Offre</Txt>
                 <FontAwesome name='angle-right' size={24} />
              </View>
         </TouchableOpacity>
         </View> 
        </View> 
      )
    }
  }

//   renderSummary = () => {
//     const {  navigation } = this.props;
//     const item = navigation.getParam('item');
    
//       return (
//         <View>
//         <Txt bold style={{ fontSize: 16,marginHorizontal:15, marginTop:20}}>
//             Order summary
//       </Txt>
//         <Card style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:10}}>    
//               <View style={{ flex: 1, flexDirection: "column" }}>
//                <Block row space="between">
//                <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
//                Prix ​​de l'article  : 
//                {(item.shipment.qty > 1) ? 
//                  ( <Txt>(x {item.shipment.qty})</Txt>
//                  ) : 
//                   null}
//                 </Txt>
//                 <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
//                  20 €
//                 </Txt>
//                </Block>
//                <Block row space="between" style={{marginVertical:10}}>
//                <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
//                Récompense voyageur offert :
//                 </Txt>
//                 <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
//                  20 €
//                 </Txt>
//                </Block>            
//                <Block row space="between">
//                <Txt bold style={{  fontSize: 14, marginLeft: 4 }}>
//                 Total :
//                 </Txt>
//                 <Txt color="darkred" bold style={{  fontSize: 14, marginLeft: 4 }}>
//                  200 €
//                 </Txt>
//                </Block>       
//             </View>
//           </Card> 
//           </View>
//       );
// }

render() {
    const {  navigation } = this.props;
    const item = navigation.getParam('item');
    return (
      <SafeAreaView  style={styles.container}>    
           <ScrollView showsVerticalScrollIndicator={false}>
           {this.renderCommande(item)}
           {this.renderShipment()}
           {/* {this.renderSummary()} */} 
        </ScrollView>  
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
      error: state.cancelOffer.error,
      loadingcancel: state.cancelOffer.loadingcancel,
      added: state.cancelOffer.annuler
  };
};

export default connect(mapStateToProps, { cancelOffer, fetchMyTrips })(RequestDetails);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding/2,
    backgroundColor: theme.colors.white  
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base/2 ,
    borderRadius:20,
    width:80,
    height: 15,
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
    marginBottom:20
  },
  campingImage: {
    width: width * 0.20,
    height: width * 0.22,
    borderRadius: 6
  },
  pendingBtn: {
    flexDirection: 'row',
    width:100,
    backgroundColor: theme.colors.rose,
    borderRadius: 9,
    alignItems: 'flex-end',
},
  section: {
    flexDirection: 'column',
    marginHorizontal: 14,
    marginBottom: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 14,
    color: theme.colors.primary
  },
  option: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});