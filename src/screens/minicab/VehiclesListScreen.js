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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Block, Badge, Card, Txt , Button} from '../../components';
import { connect } from 'react-redux';
import { fetchVehicles , addTrip, countDist} from '../../actions';
import { theme } from '../../constants';


const { width, height } = Dimensions.get("window");

class VehiclesListScreen extends Component {

  state = {
    showTerms: false,
    distance:0,
  };
  constructor(props){
    super(props)
 }

  // renderTermsService() {
  //   return (
  //     <Modal
  //       animationType="slide"
  //       visible={this.state.showTerms}
  //       onRequestClose={() => this.setState({ showTerms: false })}
  //     >
  //       <Block
  //         padding={[theme.sizes.padding * 2, theme.sizes.padding/2]}
  //         space="between">
  //             <TouchableOpacity style={{alignItems:"flex-start", marginLeft:20}} onPress={() => this.setState({ showTerms: false })}>
  //             <Txt h1 bold center blue>
  //                   X
  //             </Txt>
  //             </TouchableOpacity>
  //             <Block middle>
  //               <EnterPhone/>
  //             </Block>
  //       </Block>
  //     </Modal>
  //   );
  // }

 componentDidMount() {
   this.props.fetchVehicles();
   const { navigation } = this.props;
   const locations = navigation.getParam('locations');
   const location_from =locations.location_from;
   const location_to = locations.location_to;
   this.props.countDist({location_from, location_to});
 }
 _onRefreshTrips() {
  this.props.fetchVehicles();
}

  renderHeader() {
    return (
     <View style={styles.headerContainer}>
          <View style={{flexDirection: "row" }}> 
              <Txt bold style={{ fontSize: 18 }}>
                 Remplissez votre valise
              </Txt>        
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

// onShowVerify(){
//   if(this.state.showTerms){
//   return(
//     <EnterPhone showTerms={this.state.showTerms} />
//   )
//  }else{
//   alert('2')
//  }
// }
  renderList = (item) => {
    const { navigation } = this.props;
    const locations = navigation.getParam('locations');
    const distance = this.props.distance;

    const prix = item.price * distance;

      return (
       <Card shadow>
        <View style={styles.camping}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            source={require('../../res/mini.png')}/>      
          <View style={styles.campingDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
             <View style={{ flexDirection: "row",   justifyContent: "space-between"}}>
              <Txt numberOfLines={1} bold style={{ fontSize:16}}>
                {item.name}
              </Txt>
              <Txt bold>{prix}DH</Txt>
              </View>
              <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                {item.type}
               </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" ,marginTop:7,paddingVertical:5, justifyContent: "space-between"}}>
                <View style={{flexDirection: "row" , paddingVertical:10 }}>
                            <View style={styles.campingInfo}>
                                <FontAwesome
                                  name="user-o"
                                  color="#FF7657"
                                  size={14}
                                />
                                <Txt gray bold style={{  fontSize: 13, marginLeft: 4 }}>
                                {item.place_number}
                                </Txt>
                            </View>
                        
                            <View style={styles.campingInfo}>
                                <MaterialIcons
                                  name="luggage"
                                  color="#FF7657"
                                  size={18}
                                />
                                <Txt gray bold style={{  fontSize: 13, marginLeft: 4 }}>
                                {item.valise_number} 
                                </Txt>
                            </View>
                            <View style={styles.campingInfo}>
                                <Ionicons
                                    name="wifi"
                                    color="#FF7657"
                                    size={18}
                                />
                                <Txt gray bold style={{  fontSize: 13, marginLeft: 4 }}>
                                 Wifi
                                </Txt>
                            </View>
                  </View>
                  <TouchableOpacity
                       style={styles.pendingBtn}
                        //  onPress={this._onSaveTrip.bind(this,item)}> 
                              key={item.id}
                               onPress={() => navigation.navigate('SummaryScreen',{item , prix, locations, distance})} >  
                       <View> 
                        <Txt  center style={styles.cancelText}> Commander</Txt>  
                       </View>
                 </TouchableOpacity>
            </View>
          </View>   
        </View>
     </Card> 
      );
  }
  keyExtractor = (item, index) => index;
  render() {
    return (
      <SafeAreaView  style={styles.container}>
        {/* {this.renderHeader()} */}
              <Txt center bold style={{ fontSize: 14,marginHorizontal:5, marginBottom: 10,   marginTop:10 }}>
               Choose your car
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
                    onRefresh={this._onRefreshTrips.bind(this)}
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
        error: state.vehicles.error,
        loading: state.vehicles.loading,
        data: state.vehicles.vehicles,

      //loading: state.sendlocation.loading,
        sent: state.sendlocation.sent,
        distance: state.sendlocation.distance,
    };
};

export default connect(mapStateToProps, { fetchVehicles , countDist})(VehiclesListScreen);

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
    backgroundColor: theme.colors.accent,
    borderRadius: 9,
     justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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