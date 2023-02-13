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
import { connect } from 'react-redux';
import {  cancelOffer , fetchMyDeals} from '../actions';

const { width, height } = Dimensions.get("screen");
class DealsScreen extends Component {
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
      const trip_id = item.id;
      this.props.fetchMyDeals({trip_id});
      this.setState({load:true})
   
 }

  _onRefreshDeals() {
    const { navigation } = this.props;
    const item = navigation.getParam('trip');
    const trip_id = item.id;
    this.props.fetchMyDeals({trip_id});
    this.setState({load:true})
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
      <Txt style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
        En attente de confirmation
      </Txt>
 </View>
    )
  }else if(type =='accepted'){
    return(
      <View style={styles.campingInfo}>
        <Ionicons
          name="checkmark-done-circle-outline"
          color="#64B5F6"
          size={16}
        />
      <Txt style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
      Offre acceptée
      </Txt>
    </View>
    
    )
  }else if(type =='transit'){
    return(
      <View style={styles.campingInfo}>
        <Ionicons
          name="paper-plane-outline"
          color="#64B5F6"
          size={16}
        />
      <Txt style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
      Commande en transit
      </Txt>
    </View>   
    )
  }
}

renderList = ( item ) => {
    const { navigation } = this.props; 
      return ( 
     <Card style={{borderWidth:1,borderColor:theme.colors.gray2,borderRadius:10,margin:2}}>
             {this._renderConfirmation(item.type)}
           <TouchableOpacity
            key={item.user.name}
            style={{marginBottom:15}}
            onPress={() => navigation.navigate('RequestDetails', { item })}     
           >
                            {/* {(item.type == 'pending') ? 
                              (
                                  <View style={styles.campingInfo}>
                                      <MaterialCommunityIcons
                                        name="timer-sand"
                                        color="#64B5F6"
                                        size={16}
                                      />
                                      <Txt bold style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
                                      Waiting for confirmation
                                      </Txt>
                                </View>
                                  ) : null
                                }
                              {(item.type == 'accepted') ? 
                              (
                                  <View style={styles.campingInfo}>
                                      <Ionicons
                                        name="checkmark-done"
                                        color="#64B5F6"
                                        size={25}
                                      />
                                      <Txt bold style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
                                        Accepted
                                      </Txt>
                                </View>
                                  ) : null
                                } */}
       <View style={[styles.camping,{marginTop:5}]}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            source = {{ uri: item.shipment.photo }}
          />
          <View style={styles.campingDetails}>
            <View
              style = {{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Txt bold numberOfLines={1} style = {{ fontSize:18 }}>
                 {item.shipment.name}
              </Txt>
              <Block row space="between" style={{marginTop:5}}>
              <Txt style={{ fontSize: 16, color: "#A5A5A5" }}>
                { item.shipment.countries.name }   
               </Txt>           
                <Ionicons
                  name="airplane-outline"
                  color="#FF7657"
                  size={20}
                />
                 <Txt  style={{ fontSize: 16, color: "#A5A5A5" }}>
                    { item.shipment.countriesto.name  }
                </Txt>
                </Block>
            </View>
            <View style={{ flex: 1, flexDirection: "column" ,marginTop:7}}>
              <Txt gray bold style={{  fontSize: 13, marginLeft: 4 }}>
                   Qty: {item.shipment.qty}
                </Txt>
                <Txt gray bold style={{  fontSize: 13, marginLeft: 4, marginVertical:5 }}>
                   Prix de l'article: {item.shipment.price} €
                </Txt>
            </View>
           {/* <View style={{ flex: 1, flexDirection: "row" ,marginTop:7}}>  */}      
              {/* <View style={styles.campingInfo}>
                <MaterialCommunityIcons
                  name="weight"
                  color="#FF7657"
                  size={14}
                />
                <Txt bold gray style={{  fontSize: 14, marginLeft: 4 }}>
                 { item.shipment.weight } g
                </Txt>
              </View> */}
            {/* </View> */}
          </View>   
        </View>
  </TouchableOpacity>
        <Block flex={false} color="lightgray" style={styles.hLine} />      
        <TouchableOpacity
            key={item.shipment.user.name}
            onPress={() => navigation.navigate('ProfileScreen',{user:item.shipment.user})}     
           >
          <Block row space="between">   
          <Image
            source={{ uri: item.shipment.user.photo }}
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
                   {item.shipment.user.name}
               </Txt>
               
               {(item.user.avgstars != 0) ? 
               (
               <Block row style={{marginTop:6}}>
                   <FontAwesome name="star" color="#FFBA5A" style={{marginRight:5, marginTop:2}}  size={16} />
                      <Txt style={{ fontSize: 12 , marginTop:2}}>
                         {item.shipment.user.avgstars}
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
              {/* <View style={styles.pendingBtn}> 
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <TouchableOpacity  onPress={this._onCancelBooking.bind(this,item.id, 0 )}>
                        <Txt center style={styles.cancelText}>Cancel Offer</Txt> 
                      </TouchableOpacity>    
                    </View>
              </View> */}
            </Block>  
            </TouchableOpacity>
       </Card>

      );
  }


 
  keyExtractor = (item, index) => index;
  render() { 
    const { navigation } = this.props;
    const item = navigation.getParam('trip');
    return (
      <SafeAreaView  style={styles.container}>
      <Block flex={false} column style={styles.header}>
          <Txt h2 bold>
            Offres du trajet
          </Txt>
         <Txt h4 gray bold style={{marginTop:5}}>  {item.countries.name} - {item.countriesto.name}</Txt>
        </Block> 
         {(!this.props.fetching && this.props.data != null) ?  
         (
          <FlatList
                data={this.props.data}    
                renderItem={({ item }) => this.renderList(item)}
                keyExtractor={this.keyExtractor}  
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshDeals.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <View><Txt bold style={styles.emptyMessageStyle}>Vous n'avez aucune offre pour ce trajet </Txt>
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

export default connect(mapStateToProps, {fetchMyDeals,  cancelOffer })(DealsScreen);

const styles = StyleSheet.create({
    container: {
    flex: 1,
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
  width: theme.sizes.padding * 1.7,
  height: theme.sizes.padding * 1.7,
  marginRight:10,
  borderRadius: theme.sizes.padding *10 ,
  borderWidth:2,
  borderColor:theme.colors.gray2
},


header: {
  paddingHorizontal: theme.sizes.base,
  paddingBottom: theme.sizes.base/2,
},

});