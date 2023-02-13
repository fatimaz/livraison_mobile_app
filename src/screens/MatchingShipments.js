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
  Modal,
  Alert
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Block, Badge, Card, Txt , Button} from '../components';
import { connect } from 'react-redux';
import { fetchmatchingShipments } from '../actions';
import { theme } from '../constants';
import StarRating from 'react-native-star-rating';
const { width, height } = Dimensions.get("window");

class MatchingShipments extends Component {

  state = {
    showTerms: false
  };
  constructor(props){
    super(props)
}

 componentDidMount() {
  const { navigation } = this.props;
  const item = navigation.getParam('trip');
  const id = item.id;
  this.props.fetchmatchingShipments({id});
 }
  _onRefreshShipments() {
    const { navigation } = this.props;
    const item = navigation.getParam('trip');
    const id = item.id;
    this.props.fetchmatchingShipments({id});
}

  renderHeader() {
    return (
     <View style={styles.headerContainer}>
          <View style={{flexDirection: "row" }}> 
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                 {/* Pick what you are going to ship */}
                 {/* Choisissez un objet que vous pouvez livrer  */}
                 Remplissez votre valise
              </Text>        
        </View>    
      </View>
    );
  }

renderButton() {
  const { navigation } = this.props;
  return (
    <TouchableOpacity center middle style={styles.startTrip} activeOpacity={0.8} onPress={() => navigation.navigate("Shipments")}>
          <Badge color={theme.colors.accent} size={52}>
              <FAIcon name="plus" size={62 / 2.5} color="white" />
          </Badge>
    </TouchableOpacity>
  )
}

_renderStatus = ( status ) => {
  if (status == 0 ) {    
    return  ( <View style={styles.pendingBtn}> 
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Text style={styles.cancelText}>En attente</Text> 
                  </View>
                </View>
            )
  }
  return (
       <View style={styles.confirmedBtn}> 
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Text style={styles.cancelText}>Confirmé</Text> 
              </View>
        </View>
  );
}

// onShowVerify(){

//   if(this.state.showTerms){
//   return(
//     <EnterPhone showTerms={this.state.showTerms} />
//   )
// }else{
//  alert('2')
// }

// }

  renderList = ( item ) => {
    const {  navigation } = this.props;
      return (
        <Card shadow>
        <TouchableOpacity
          key={item.name}
          onPress={() => navigation.navigate('ShipmentDetails',{shipment:item, mine:0 })}     
        >
        <View style={styles.camping}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            source={{ uri: item.photo }}
          />
          <View style={styles.campingDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Txt numberOfLines={1} bold style={{ fontSize:16}}>
                { item.name }
              </Txt>
              <Block row space="between" style={{marginTop:5}}>
              <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                { item.countries.name }  
                </Text>  
                <Ionicons
                  name="airplane-outline"
                  color="#FF7657"
                  size={20}
                />
                 <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                    { item.countriesto.name  }
                </Text>
                </Block>
            </View>
            <View style={{ flex: 1, flexDirection: "row" ,marginTop:7}}>
              <View style={styles.campingInfo}>
                <Ionicons
                  name="md-pricetag"
                  color="#FF7657"
                  size={14}
                />
                <Txt gray bold style={{  fontSize: 13, marginLeft: 4 }}>
                   Récompense { item.reward } €
                </Txt>
              </View>
    
            </View>
          </View>   
        </View>
        </TouchableOpacity>
          <Block flex={false} color="lightgray" style={styles.hLine} />
          <TouchableOpacity onPress={() => navigation.navigate("SelectTrip", {shipment:item})}>
           <Block row space="between">
          <Block row space="between">
          <Image
            source={{ uri: item.user.photo }}
            style={styles.avatar}
           />
         
            <Block
              style={{
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Txt h4 bold spacing={0.5} color="black">
                   {item.user.name}
               </Txt>
               {(item.user.avgstars != 0) ? 
               (
               <Block row style={{marginTop:2}}>
                   <FontAwesome name="star" color="#FFBA5A" style={{marginRight:5, marginTop:2}}  size={16} />
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
            </Block>
           
            <View style={styles.pendingBtn}> 
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Txt  center style={styles.cancelText}> Envoyer une offre</Txt>  
                </View>
              </View>
   
              </Block>
            </TouchableOpacity>  
          </Card> 
      );
  }
  keyExtractor = (item, index) => index;
  render() {
    return (
      <SafeAreaView  style={styles.container}>
              <Txt center bold style={{ fontSize: 14,marginHorizontal:5, marginBottom: 10,   marginTop:10 }}>
              Commandes correspondantes à votre trajet
              </Txt>
        {(!this.props.fetching && this.props.data != null) ? 
         (
          <FlatList
                data={this.props.data}   
                renderItem={({ item }) => this.renderList(item)}
                   keyExtractor={this.keyExtractor}  
                  refreshControl={
                  <RefreshControl
                    enabled={true}
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshShipments.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <Txt center style={styles.emptyMessageStyle}>Aucun résultat trouvé</Txt>  
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
        error: state.matchingshipments.error,
        fetching: state.matchingshipments.loading,
        data: state.matchingshipments.suggestions,
    };
};

export default connect(mapStateToProps, { fetchmatchingShipments })(MatchingShipments);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding/8,
    backgroundColor: theme.colors.gray4
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
  },

  headerContainer: {
    top: 0,
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
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
    marginRight: 14
  },
  campingImage: {
    width: width * 0.20,
    height: width * 0.16,
    borderRadius: 6
  },
  startTrip: {
    position: 'absolute',
    right: (width - 330) / 2,
    bottom: 10,
  },
  avatar: {
    width: theme.sizes.padding * 1.4,
    height: theme.sizes.padding * 1.4,
    marginRight:10,
    borderRadius: theme.sizes.padding *4,
    borderWidth:2,
    borderColor:theme.colors.gray2
  },
  pendingBtn: {
    width:120,
    backgroundColor: theme.colors.red,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
},
  confirmedBtn: {
    flexDirection: 'row',
    width:100,
    backgroundColor: '#008000',
    borderRadius: 9,
    alignItems: 'flex-end',
},
cancelText: {
  color: theme.colors.white,
  fontSize: theme.sizes.base * 0.8 ,
},
emptyMessageStyle:{
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1, 
  marginTop:50

}
});