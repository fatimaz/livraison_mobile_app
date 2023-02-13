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
import {  cancelOffer , fetchMyShipments} from '../actions';


// const { width, height } = Dimensions.get("screen");
const { width, height } = Dimensions.get("window");

class ShipmentOfferDetails extends Component {


  componentWillReceiveProps(nextProps) {  
    if (nextProps.added) {
      // this.props.fetchMyShipments();
      this.props.fetchMyShipments();
      this.props.navigation.navigate('MyShipmentsScreen'); 
    }
  }

  _onCancelBooking( id , type){
    // this.props.fetchMyShipments();
    this.props.cancelOffer({ id, type });
  }
  _renderConfirmation(item){
    if(item.type =='pending'){
    return(
      <Block column>
      <View style={styles.campingInfo}>
        <MaterialCommunityIcons
          name="timer-sand"
          color="orange"
          size={16}
        />
   
        <Txt  style={{  fontSize: 16, marginLeft: 4, color:"orange" }}>
           Offre est en attente de confirmation
        </Txt>
     </View>
       <Txt center gray small style={{ margin:5, fontSize: 16, marginLeft: 4 }}>
       Veuillez la confirmer
     </Txt>
     </Block>
    )
  }else if(item.type =='accepted'){
    return(

   <Block column center>
      <View style={styles.campingInfo}>
      <Ionicons
        name="checkmark-done-circle-outline"
        color="orange"
        size={20}   
      />
   
        <Txt  style={{  fontSize: 16, marginLeft: 4, color:"orange" }}>
        Vous avez acceptée cet offre
        </Txt>
     </View>
       <Txt center gray small style={{ margin:5, fontSize: 16, marginLeft: 4 }}>
       Veuillez attendre la confirmation de reception par le voyageur
     </Txt>
     </Block>

    )

    }else if(item.type =='transit'){
      return(
        <View style={styles.campingInfo}>
       <Ionicons
        name="paper-plane-outline"
        color="orange"
        size={16}
      />
        <Txt style={{  fontSize: 16, marginLeft: 4, color:"orange" }}>
          Votre commande est en transit 
        </Txt>
     </View>    
      )
    }
  else if(item.type =='delivered' && item.livraison ==0 ){
    return(
      <Block column center>
      <View style={styles.campingInfo}>
       <Ionicons
        name="checkmark-done-circle-outline"
        color="orange"
        size={16}
      />
    <Txt center style={{  fontSize: 16, color:"orange", textAlign: 'right', alignSelf: 'stretch'}}>
    Livraison est confirmée par le voyageur
    </Txt>
  </View>
    <Txt center  gray small style={{ margin:10, fontSize: 16, marginLeft: 4 }}>
    Veuillez confirmer la reception de votre commande
    </Txt>
    </Block>
     )
  }else if(item.livraison ==1 && item.rated == 0){
    return(
      <Block column>
      <View style={styles.campingInfo}>
       <Ionicons
        name="checkmark-done-circle-outline"
        color="orange"
        size={16}
      />
    <Txt  style={{  fontSize: 16, color:"orange", textAlign: 'right', alignSelf: 'stretch' }}>
       Livraison confirmée par acheteur     
    </Txt>
    
  </View>
     <Txt gray style={{  fontSize: 16,  textAlign: 'right', alignSelf: 'stretch' }}>
     Veuillez évaluer votre expérience 
    </Txt>
    </Block>
     )
  }
  }


  _renderButtonAccept(item) {
    const { loadingcancel } = this.props;
   if(item.type != 'rejeted'){
    return (
      <Button gradient style={{marginTop:10, marginHorizontal:20}}
      onPress={this._onCancelBooking.bind(this,item, 1)}>
          {loadingcancel? (
          <ActivityIndicator size="small" color="white" /> 
          // <Spinner size='small'/>
          ) : (
          <Txt bold white center>Confirmer</Txt>
        )}    
      </Button>
    );
    }
  }
  _renderButtonReject(item) {
    const { loadingcancel } = this.props;
    return (
        <Button shadow style={{borderRadius:3, borderWidth:1,borderColor:theme.colors.gray, marginHorizontal:40, marginTop:10 }}
         onPress={this._onCancelBooking.bind(this,item, 0)}>
          {loadingcancel? (
          <ActivityIndicator size="small" color="white" /> 
          ) : (
          <Txt center bold gray >Rejeter</Txt>
        )}    
      </Button>
    );
  }

  _renderConfirmdelivery(item){
    const { loadingcancel } = this.props;
    return (
        <Button gradient style={{marginTop:10, marginHorizontal:20}}
         onPress={this._onCancelBooking.bind(this,item, 3)}>
          {loadingcancel? (
          <ActivityIndicator size="small" color="white" /> 
          ) : (
          <Txt center bold white >Confirmer la livraison</Txt>
        )}    
      </Button>
    );
  }

  // _renderConfirmTransit(item){
  //   const { loadingcancel } = this.props;
  //   return (
  //       <Button gradient style={{marginTop:10, marginHorizontal:20}}
  //        onPress={this._onCancelBooking.bind(this,item, 4)}>
  //         {loadingcancel? (
  //         <ActivityIndicator size="small" color="white" /> 
  //         ) : (
  //         <Txt center bold white >Confirmer la reception de la commande</Txt>
  //       )}    
  //     </Button>
  //   );
  // }
  _renderReview(item){
    const { navigation } = this.props; 
    return (
        <Button gradient style={{marginTop:10, marginHorizontal:20}}
           onPress={() => navigation.navigate('AddRatingScreen',{user:item.user,  order_id:item.id , rated:1})}> 
          <Txt center bold white >Veuillez évaluer votre expérience</Txt>
      </Button>
    );
  }
  _renderReport(item){
    const { navigation } = this.props; 
    return (
        <Button shadow style={{borderRadius:3, borderWidth:1,borderColor:theme.colors.gray, marginHorizontal:40, marginTop:10 }}
          onPress={() => navigation.navigate('ReportScreen',{ order_id:item})}> 
          <Txt center bold gray >Reporter ce voyageur</Txt>
      </Button>
    );
  }

renderTrip = () => {
  const {  navigation } = this.props;
  const item = navigation.getParam('item');
 return (
<View>
        <Txt bold style={{ fontSize: 18, marginHorizontal:15 ,marginTop:10}}>
            Votre trajet
        </Txt>
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
  {this._renderConfirmation(item)}
    <Block row center style={{marginBottom:10}}>
    <Block column center> 
    {(item.type == "pending") ? 
    (
     <Block flex={false} color="orange" style={styles.hLine} bold/> 
    ) : <Block flex={false} color="lightgray" style={styles.hLine} bold/> 
    }
      <Txt> Offerte</Txt>
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
     {(item.type == "delivered" || item.livraison == 1) ? 
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

renderTrip = (item) => {
    const {  navigation } = this.props;
      return (
      <View>
   
           <Text style={{ fontSize: 18, fontWeight: "bold", marginHorizontal:15 ,marginTop:10}}>
                Details du trajet
            </Text>
        <Card style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:10}}>       
        <Block row center>
            <Badge
              color={rgba(theme.colors.accent, "0.2")}
              size={14}
              style={{ marginRight: 8 }}
            >
               <Badge color={theme.colors.accent} size={8} />
            </Badge>
            <Txt style={{ fontSize: 16 }} bold spacing={0.5}>  
               {item.trip.countries.name}
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
        <Txt style={{ fontSize: 16 }} bold spacing={0.5} >
            {item.trip.countriesto.name}
        </Txt>
      </Block>
      <Block column style={{ marginTop: theme.sizes.base * 2 }}>
        <Txt gray style={{fontSize: 14, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
          Date de voyage :  {item.trip.travel_date}
        </Txt>
    
        <Txt gray style={{fontSize: 14, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
            Poid valable: {item.trip.weight_total} kg 
        </Txt>
         </Block>
         <Block row space="between">
              <Txt gray bold style={{  marginTop:10,fontSize: 14 }}>
                  Envoyée par {item.user.name}
              </Txt>
              <Button style={{height:40,borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10, padding:8}}
                   onPress={() => navigation.navigate('ChatMessageScreen', { item:item.trip, user:item.user})}> 
                  <Txt center>Contacter voyageur</Txt>
              </Button>
        </Block>
        </Card>
        <Block row space ="between" style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:10, padding:20}}>
              <Txt center h4 style={{marginBottom:5}}>
              Récompense offerée :
            </Txt>
            <Txt bold h3 center> {item.reward} €</Txt>
        </Block>
      </View>
  
      );
  }

  renderSummary = () => {
    const {  navigation } = this.props;
    const item = navigation.getParam('item'); 

    const price= item.shipment.price;
    const qty =item.shipment.qty;
    const priceqty= price * qty;
    const reward= item.reward ;
    const total = priceqty + reward;
      return (
        <View>
        <Txt bold style={{ fontSize: 16,marginHorizontal:15, marginTop:10}}>
            Details de l'ordre
      </Txt>
        <Card style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:10}}>    
              <View style={{ flex: 1, flexDirection: "column" }}>
               <Block row space="between">
               <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
               Prix ​​de l'article : 
               {(item.shipment.qty > 1) ? 
                 ( <Txt>(x {item.shipment.qty})</Txt>
                 ) : 
                  null}
                </Txt>
                <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
                    {item.shipment.price } €
                </Txt>
               </Block>
               <Block row space="between" style={{marginVertical:10}}>
               <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
                    Récompense voyageur offert :
                </Txt>
                <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
                {item.reward } €
                </Txt>
               </Block>            
               <Block row space="between">
               <Txt bold style={{  fontSize: 14, marginLeft: 4 }}>
                   Total :
                </Txt>
                <Txt color="darkred" bold style={{  fontSize: 14, marginLeft: 4 }}>
                    {total} €
                </Txt>
               </Block>       
            </View>
          </Card> 
          <Txt bold style={{ fontSize: 16,marginHorizontal:15, marginTop:10}}>
            Mode de paiement
        </Txt>
        <Card style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:10}}>    
              <View style={{ flex: 1, flexDirection: "column" }}>
               <Block row space="between">
               <MaterialCommunityIcons
                name="cash-multiple"
                color="orange"
                size={20}
              />
                <View style={{ flex: 1, flexDirection: "column",  marginLeft: 4  }}>
                   <Txt bold style={{  fontSize: 16, marginBottom:5}}>
                      Cash : 
                    </Txt>
                    <Txt  caption light>Vous pouvez gardé avec nous votre argent jusqu’à ce que vous recevez votre marchandise et il vous sera rendu dans le cas contraire.</Txt>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ReportScreen',{ order_id:item.id})}> 
                        <Txt  caption blue style={{ textDecorationLine: 'underline' }} light>Contactez-nous</Txt>
                    </TouchableOpacity>
                </View>
                <Ionicons
                  name="checkmark-circle-outline"
                  color="green"
                  size={20}
                  style={{paddingRight:10}}
                />
               </Block>                   
            </View>
          </Card> 
   </View>
      );
}

render() {
    const {  navigation } = this.props;
    const item = navigation.getParam('item');
    return (
      <SafeAreaView  style={styles.container}>    
           <ScrollView showsVerticalScrollIndicator={false}>
           {this.renderCommande(item)}
             {this.renderTrip(item)}
           {this.renderSummary()}
           {(item.type == 'pending') ? 
       (
        <Block>
           {this._renderButtonAccept(item.id)} 
           {this._renderButtonReject(item.id)} 
        </Block>
       ) :  null   
  }  
   {(item.type == 'accepted') ? 
    (
        <Block>
        {/* {this._renderConfirmTransit(item.id)}  */}
        {this._renderButtonReject(item.id)} 
      </Block>
       ) :  null  
    } 

    {/* {(item.type == 'transit') ? 
    (
        <Block>
        {this._renderButtonReject(item.id)} 
      </Block>
       ) :  null  
    }  */}
     {(item.type == 'delivered' && item.livraison == 0 ) ? 
    (
        <Block>
             {this._renderConfirmdelivery(item.id)} 
             {this._renderReport(item.id)}
        </Block>
       ) :    
       null
      }   
      {(item.livraison == 1 && item.rated == 0) ? 
    (
        <Block>
             {this._renderReview(item)} 
        </Block>
       ) :    
       null
      } 
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

export default connect(mapStateToProps, { cancelOffer, fetchMyShipments })(ShipmentOfferDetails);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding/3,
    backgroundColor: theme.colors.white  
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base/2 ,
    borderRadius:20,
    width:80,
    height: 10,
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
    marginRight: 14,
    marginBottom:10
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