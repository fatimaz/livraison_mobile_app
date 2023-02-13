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
  Linking
} from "react-native";

import rgba from "hex-to-rgba";

import { Block, Badge, Card, Txt, Button } from "../components";
import Moment from 'moment';
import 'moment/locale/fr';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("window");
import { theme } from "../constants";
import { connect } from 'react-redux';
import {  deleteShipment, fetchMyShipments } from '../actions';


class ShipmentDetails extends Component {

  componentWillReceiveProps(nextProps) {
 
    if (nextProps.saved) {
      this.props.fetchMyShipments();
      this.props.navigation.navigate('MyShipmentsScreen'); 
      //    Alert.alert(
      //   '',
      //   'réservé! profitez de votre voyage',       
      //   [
      //     {
      //       text: 'OK', onPress: () => {
      //          this.props.navigation.navigate('Active'); 
      //       }
      //     }
      //   ],
      //   { cancelable: false }
      // )  
    }
  }


_onSaveShipment() {
  const { navigation, loading } = this.props; 
  const errors = [];
  const shipment = navigation.getParam('shipment');
  const id = shipment.id;
  this.setState({ loading: true });
  this.props.deleteShipment({id} );     
}
  _renderButton() {
    const { navigation,loading } = this.props;
    const shipment = navigation.getParam('shipment');
    const mine = navigation.getParam('mine');
     if(mine == 0){ 
        return ( 
            <Button gradient style={{margin:10}}  onPress={() => navigation.navigate("SelectTrip", {shipment})}>
                <Txt bold white center>Envoyer une offre de livraison</Txt>
            </Button>
          );
        }else if(mine == 1){
          return ( 
            <View>
            <Button gradient style={{marginHorizontal:20}}  onPress={() => navigation.navigate("EditShipmentScreen",{shipment, country_from:shipment.countries.name,country_to:shipment.countriesto.name})}>
                <Txt bold white center>Modifier</Txt>
            </Button>
            <Button shadow 
            style={{borderRadius:3, borderWidth:1,borderColor:theme.colors.gray, marginHorizontal:40, marginTop:10 }}  
            onPress={this._onSaveShipment.bind(this)}> 
              {loading ? (
                <ActivityIndicator size="small" color="white" /> 
              ) : ( 
              <Txt center bold  gray >Supprimer</Txt>
              )}
           </Button>

          </View>
          );
        }      
    }

   renderListDetails = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('shipment');
      return (  
      <Block style={{paddingVertical:10}}>  
            <Block row center style={{marginBottom:10}}>
                      {/* <Txt spacing={0.5} bold color="gray" style={{marginRight:10}}>
                        65:00
                      </Txt> */}
                      <Badge
                        color={rgba(theme.colors.accent, "0.2")}
                        size={14}
                        style={{ marginRight: 8 }}
                      >
                        <Badge color={theme.colors.accent} size={8} />
                      </Badge>
                      <Block row>  
                  <Txt h4 spacing={0.5} style={{marginRight:10}} gray>
                    Livraison à : 
                  </Txt>
                  <Txt h4 spacing={0.5} black>{item.countriesto.name}</Txt>
                </Block>
                </Block>      
                {/* <Block row  style={{ paddingVertical: 4 ,marginRight:190}}>
                {/* <Txt spacing={0.5} color="white" style={{marginRight:10}}>
                            13:00
                </Txt> */}
                {/* <Badge color="gray2" size={4} style={{ marginLeft:100 }} /> */}
                {/* </Block>    */} 
                {/* <Block flex={false} color="red" style={styles.vLine} /> */}
                <Block row center>
                      {/* <Txt spacing={0.5} bold color="gray" style={{marginRight:10}}>
                    65:00
                      </Txt> */}
                      <Badge
                        color={rgba(theme.colors.accent, "0.2")}
                        size={14}
                        style={{ marginRight: 8 }}
                      >
                        <Badge color={theme.colors.accent} size={8} />
                      </Badge>
                      <Block row>  
                        <Txt h4 spacing={0.5} style={{marginRight:10}} gray>
                          Depart: 
                        </Txt>    
                        <Txt h4 spacing={0.5} black>
                           {item.countries.name}
                        </Txt>          
                     </Block>
                </Block> 
              {/* <Txt medium gray style={{fontSize: 14}}>
              Attendu le {item.expected_date}
             </Txt> */}
           </Block>         
      )
}

 requestedBy(){
  const { navigation } = this.props;
  const mine = navigation.getParam('mine');
  const item = navigation.getParam('shipment');
   if(mine == 0 || mine == 2 ){
     return(
      <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
      <Block>
      <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen", {user: item.user})}>    
        <Txt medium gray style={{fontSize: 14, fontWeight: 'bold', marginBottom:10}}>
          Demandé par {item.user.name}
        </Txt>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("ChatMessageScreen", {user:item.user, item })}>
          <Txt medium blue style={{fontSize: 14}}>
          Contacte {item.user.name}
          </Txt>
        </TouchableOpacity> */}
      </Block> 
      <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen", {user: item.user})}>
         <Image
            source={{ uri: item.user.photo }}
            style={styles.avatar}
          />
      </TouchableOpacity>
     </Block>
     )
   }
 }

renderShips() {
  const { navigation } = this.props;
  const item = navigation.getParam('shipment');
  const mine = navigation.getParam('mine');

  return (  
      <Block style={styles.inputs}>  
           <Txt numberOfLines={1} h2 bold>
           {item.name}
          </Txt>
          <Block flex={false} row margin={[theme.sizes.base, 0]}>   
               <Ionicons
                  name="md-pricetag"
                  color="#FF7657"
                  size={14}
                /> 
              <Txt h4  gray bold style={{marginHorizontal:5}}> 
                Récompense de voyageur a partir de: {item.reward}€
              </Txt>
             </Block>
               {/* <Txt caption gray style={styles.tag}>
                Price :  { item.price } dh
              </Txt> */}
         
            {/* <Txt gray light height={22}>
              jhjh
            </Txt> */}

          {/* <Divider margin={[theme.sizes.padding * 0.9, 0]} />  */}
      
         {/* <Txt>{Moment(item.date,"YYYY-MM-DD hh:mm:ss", true).format('ddd DD MMM')} </Txt> */}
         <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
          {this.renderListDetails()}
         </Block>
         {/* <FlatList
              data={item.stations}
              vertical
              renderItem={({ item }) => this.renderListDetails(item)}
              keyExtractor={item => item.id.toString() }   
        /> */}
       
    <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
        <Block>

            <Block row space="between">  
                  <Txt medium gray style={{fontSize: 15,marginBottom:8}}>
                  Quantité: 
                        </Txt>    
                        <Txt  style={{ color: 'black' }} > {item.qty}</Txt>       
                </Block>
                <Block row space="between">  
                  <Txt bold medium gray style={{fontSize: 15,marginBottom:8}}>
                    Prix: 
                   </Txt>    
                        <Txt  style={{ color: 'black' }} > {item.price} €</Txt>       
                </Block>
                <Block row space="between">  
                  <Txt medium bold gray style={{fontSize: 15,marginBottom:8,marginRight:3}}>
                    Lien: 
                   </Txt>    
                     <Txt numberOfLines={1} blue onPress={() => Linking.openURL(item.link)}>{item.link}</Txt>      
                </Block>

        </Block> 
       </Block>
       {(item.description != null) ? 
       (
       <Block column margin={[10, 0]} >
          <Txt medium gray style={{fontSize: 15, marginBottom:5,fontWeight: 'bold'}}>
            Détails 
          </Txt>
          <Txt > {item.description} </Txt>
          </Block>
             ) : null
          }
        {this.requestedBy()}
         {/* <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
           <Block>
          <Txt medium gray style={{fontSize: 14, fontWeight: 'bold'}}>
            Reward  
          </Txt>
    
        </Block> 
        <Txt medium style={{fontSize: 14, fontWeight: 'bold'}}>
             25dh
         </Txt>
       </Block> */}
 
 {/*  */}

    {/* <Block flex={false} color="gray" style={styles.hLine} /> */}
    {/* <Txt medium gray style={{fontSize: 14, fontWeight: 'bold', marginBottom:10}}>
           Requests
          </Txt>
    <Block row space="between" margin={[10, 0]} style={styles.inputRow}>      
        <Block>
          <Txt medium gray style={{fontSize: 14, fontWeight: 'bold', marginBottom:10}}>
           Ahmed
          </Txt>
          <Txt medium blue style={{fontSize: 14}}>
           Total :
          </Txt>
        </Block>  */}
        {/* <Txt medium style={{fontSize: 14, fontWeight: 'bold'}}> */}
        {/* { item.vehicle.name}
           <Image
              // style={styles.tutImage}
            //   source={{uri: IMAGE_URL + booking_details.image }}
      //       source= {require("../assets/icons/back.png")}        
      //       />
      //   </Txt>
      //  </Block>
 {/*  */}
     {(item.note != null) ? 
     (
       <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
        <Block>
          <Txt medium gray  style={{fontSize: 14, fontWeight: 'bold'}}>
            {/* { booking_details.firstname }  */}
            Note
          </Txt>
          <Txt gray3 style={{ marginTop: 10 }}>{item.note}</Txt>
             {/* {this.showRating(booking_details.stars )} */}
        </Block> 
        </Block>
          ) : null
        }    
   </Block>
   );
  };

  render() {
    const{navigation}= this.props;
    const item = navigation.getParam('shipment');
    return (      
       <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source = {{ uri: item.photo }}
            style={{ width, height: width/2}}
          />
           <View style={styles.welcome}>
          {this.renderShips()}     
        { this._renderButton() }
          </View>
        </ScrollView>
   
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.deleteShip.error,
    loading: state.deleteShip.loading,
    saved: state.deleteShip.saved
  }
}

export default  connect(mapStateToProps, {deleteShipment, fetchMyShipments})(ShipmentDetails);

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding/2,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.white,

  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1
  },

  avatar: {
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    marginRight:10,
    borderRadius: theme.sizes.padding * 4 ,
    borderWidth:2,
    borderColor:'lightgray'
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
  
});