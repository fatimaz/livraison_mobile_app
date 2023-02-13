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
  Image
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt , Button} from '../components';
import { connect } from 'react-redux';
import { fetchShipments } from '../actions';
import { theme } from '../constants';

// const { width, height } = Dimensions.get("screen");
const { width, height } = Dimensions.get("window");

class ShipmentScreen extends Component {
  static navigationOptions = {
    header: null
  };

 componentDidMount() {
     this.props.fetchShipments();
 }

  _onRefreshShipments() {
  const { navigation } = this.props;
   this.props.fetchShipments();
}

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View style={styles.settings}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SendRequest")}
            >
              <Ionicons name="ios-settings" size={24} color="black" />
            </TouchableOpacity>
              {/* <View style={styles.location}>
                <FontAwesome
                  name="location-arrow"
                  size={14}
                  color="white"
                />
              </View> */}
            </View>
            <View style={styles.options}>
              <Text style={{ fontSize: 20, fontWeight: "300" }}>
               Pick what you are going to ship
              </Text>
            </View>
          </View>
          {/* <View style={styles.settings}>
            <TouchableOpacity
            style={{
              flexDirection:'row',
              height: 40,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5,
              paddingHorizontal: 5,
              borderRadius:20,
              backgroundColor:theme.colors.gray3
            }}
              onPress={() => this.props.navigation.navigate("TripsScreen")}
            >
                  <FontAwesome
                        name='user'
                        size={25}
                        color='red'
                        style={{
                          marginTop: 10,
                          // marginRight:10,
                          height: 20,
                          width: 20
                        }}
                    />

            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.settings}>
            <TouchableOpacity
            style={{
              flexDirection:'row',
              height: 40,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5,
              paddingHorizontal: 5,
              borderRadius:20,
              backgroundColor:theme.colors.gray3
            }}
              onPress={() => this.props.navigation.navigate("TripsScreen")}
            >
                  <FontAwesome
                        name='plane'
                        size={25}
                        color='red'
                        style={{
                          marginTop: 10,
                          marginRight:10,
                          height: 20,
                          width: 20
                        }}
                    />
             
             
              <Text
              style={{
                alignSelf:'center',
                marginRight: 5,
                color: 'red'
              }}>Switch to traveller</Text>
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.settings}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Ionicons name="ios-settings" size={24} color="black" />
            </TouchableOpacity>
          </View> */}
        </View>
      
      </View>
    );
  }
//   renderTabs() {
//     const { filters } = this.props;

//     return (
//       <View style={styles.tabs}>
//         <View
//           style={[styles.tab, filters.type === "all" ? styles.activeTab : null]}
//         >
//           <Text
//             style={[
//               styles.tabTitle,
//               filters.type === "all" ? styles.activeTabTitle : null
//             ]}
//             onPress={() => this.handleTab("all")}
//           >
//             All Spots
//           </Text>
//         </View>
//         <View
//           style={[
//             styles.tab,
//             filters.type === "tent" ? styles.activeTab : null
//           ]}
//         >
//           <Text
//             style={[
//               styles.tabTitle,
//               filters.type === "tent" ? styles.activeTabTitle : null
//             ]}
//             onPress={() => this.handleTab("tent")}
//           >
//             Tenting
//           </Text>
//         </View>
//         <View
//           style={[styles.tab, filters.type === "rv" ? styles.activeTab : null]}
//         >
//           <Text
//             style={[
//               styles.tabTitle,
//               filters.type === "rv" ? styles.activeTabTitle : null
//             ]}
//             onPress={() => this.handleTab("rv")}
//           >
//             RV Camping
//           </Text>
//         </View>
//       </View>
//     );
//   }
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

  renderList = ( item ) => {
    const {  navigation } = this.props;
      return (
      <TouchableOpacity
          key={item.name}
          onPress={() => navigation.navigate('ShipmentDetails')}     
        >
        <Card shadow>
        {/* <View style={styles.cardcamping}> */}
        <View style={styles.camping}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            source={{ uri: item.photo }}
            // {require("../../assets/icons/back.png")}
          />
          <View style={styles.campingDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize:20, fontWeight: "bold" }}>
                { item.name }
              </Text>
              {/* <View style={{  paddingTop: 2, fl }}> */}
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
            <View style={{ flex: 1, flexDirection: "row" ,marginTop:7,}}>
              {/* <View style={styles.campingInfo}>
              <Ionicons name="md-pricetag" color="black" size={12} />
                <Text style={{ marginLeft: 4, color: "#FFBA5A" }}>
                 Reward $ 20
                </Text>
              </View> */}
              <View style={styles.campingInfo}>
                <Ionicons
                  name="md-pricetag"
                  color="#FF7657"
                  size={14}
                />
                <Txt bold style={{  fontSize: 14, marginLeft: 4,  color: "#FF7657" }}>
                   Reward starts from { item.reward }
                </Txt>
              </View>
            </View>
          </View>   
        </View>
          <Block flex={false} color="gray" style={styles.hLine} />
          <Block row space="between">
         <Image
           resizeMode="contain"
           source={{ uri: item.user.photo }}
           style={styles.avatar}
            // style={{ width: 20, height: 24, marginRight: 8 }}
           />
           <Block
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Sara
              </Text> */}
              <Txt h4 spacing={0.5} color="gray">
                   {item.user.name}
               </Txt>
              <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
              <FontAwesome name="star" color="#FFBA5A" size={12} />
              </Txt>
            </Block>
           {/*  */} 
           {/* </Txt> */}
        
           {/* <Txt spacing={0.5} caption>
            send request
           </Txt> */}
              {/* <View style={styles.campingInfo}> */}
              <View style={styles.pendingBtn}> 
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <Txt center style={styles.cancelText}>Send Request</Txt> 
                    </View>
                  </View>
              {/* <Ionicons name="md-pricetag" color="black" size={12} /> */}
                {/* <FontAwesome name="star" color="#FFBA5A" size={12} /> */}
                {/* <Text style={{ fontSize:14,marginLeft: 4, color: "#FFBA5A" }}>
                 Reward $ {item.reward}
                </Text> */}
              {/* </View> */}
            </Block>
          {/* </View> */}
       
          </Card>
        </TouchableOpacity>
      );

  }
  keyExtractor = (item, index) => index;
  render() {
    return (
      <SafeAreaView  style={styles.container}>
        {this.renderHeader()}
              <Text style={{ fontSize: 14, fontWeight: "300", marginHorizontal:10, marginBottom: 10 }}>
                Recents orders by other shoppers
              </Text>
           <ScrollView showsVerticalScrollIndicator={false}>
        {(!this.props.fetching && this.props.data != null) ? 
         (
          <FlatList
                data={this.props.data}   
                renderItem={({ item }) => this.renderList(item)}
                // keyExtractor={item => item.id.toString() } 
                   keyExtractor={this.keyExtractor}  
                  refreshControl={
                  <RefreshControl
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshShipments.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <Text style={styles.emptyMessageStyle}>Aucun résultat trouvé</Text>  
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
     
        </ScrollView>
        {this.renderButton()}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
    return {
        error: state.shipments.error,
        fetching: state.shipments.loading,
        data: state.shipments.shipments,
    };
};

//make this component available to the app
export default connect(mapStateToProps, { fetchShipments })(ShipmentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding/2,
    backgroundColor: theme.colors.gray4
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
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
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7657"
  },

  settings: {
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent"
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10
  },
  activeTab: {
    borderBottomColor: "#FF7657"
  },
  activeTabTitle: {
    color: "#FF7657"
  },

  camping: {
    flex: 1,
    flexDirection: "row",
 
  },
  cardcamping:{
    // borderBottomColor: "#A5A5A5",
    // borderBottomWidth: 0.5,
    // padding: 20
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
    borderRadius: theme.sizes.padding ,
    borderWidth:2,
    borderColor:'red'
  },
  pendingBtn: {
    width:100,
    backgroundColor: theme.colors.rose,
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
});