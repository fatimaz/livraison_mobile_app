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
import { Block, Badge, Card, Txt , Button} from '../components';
import { Header } from 'react-native-elements';
import { theme } from '../constants';
import { fetchShipments } from '../actions';
const { width, height } = Dimensions.get("screen");

import { connect } from 'react-redux';


class MyShipmentsScreen extends Component {
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
            <View style={styles.options}>
              <Text style={{ fontSize: 22,  marginBottom: 5 }}>
               My shipments 
              </Text>
            </View>
          </View>
          <View style={styles.settings}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Ionicons name="ios-settings" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View> 
      </View>
    );
  }

  renderList = ( item ) => {
    const { filters, campings, navigation } = this.props;

      return ( 
      <TouchableOpacity
          key={item.name}
          onPress={() => navigation.navigate('ShipmentDetails', { shipment: item})}     
        >
          <Card shadow>
        {/* <View style={styles.cardcamping}> */}
        <View style={styles.camping}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            // source={{ uri: camping.image }}
            source=  {require("../assets/icons/back.png")}
            // {{ uri: item.url }}  
          />

          <View style={styles.campingDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {item.name}
              </Text>
              <Text style={{ fontSize: 14, color: "#A5A5A5", paddingTop: 5 }}>
               { item.from }  -  { item.to }
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {/* <View style={styles.campingInfo}>
              <Ionicons name="md-pricetag" color="black" size={12} />
                <Text style={{ marginLeft: 4, color: "#FFBA5A" }}>
                 Reward $ 20
                </Text>
              </View> */}
              <View style={styles.campingInfo}>
                <FontAwesome
                  name="location-arrow"
                  color="#FF7657"
                  size={12}
                />
                <Text style={{  fontSize: 10, marginLeft: 4, marginTop:5, color: "#FF7657" }}>
                 before {item.expected_date}
                </Text>
              </View>
            </View>
          </View>   
        </View>
          <Block flex={false} color="gray" style={styles.hLine} />
          {/*  */}
          {/*  */}
          <Block row space="between">
           {/* <Txt spacing={0.5} caption> */}
           {/*  */}
           <Block
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              {/* <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Sara
              </Text> */}
              <Txt spacing={0.5} color="gray">
                   2 offers waiting confirmations 
               </Txt>
            </Block>

           {/*  */} 
           {/* </Txt> */}
       
           {/* <Txt spacing={0.5} caption>
            send request
           </Txt> */}
           <View style={styles.campingInfo}>
              {/* <Ionicons name="md-pricetag" color="black" size={12} /> */}

                {/* <FontAwesome name="star" color="#FFBA5A" size={12} /> */}
                <Text style={{ marginLeft: 4, color: "#FFBA5A" }}>
                 See offers
                </Text>
                <FontAwesome name='angle-down' size={24} />
              </View>
          </Block>
          
        </Card>
       </TouchableOpacity>
      );

  }
  keyExtractor = (item, index) => index;
  render() {
          const { navigation } = this.props;

    return (
      <SafeAreaView  style={styles.container}>      
        {/* {this.renderHeader()} */}    
           <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
                  <View><Text style={styles.emptyMessageStyle}>You dont have any shipments </Text>
                  <Text style={styles.emptyMessageStyle}> Add a new one </Text>
                           <Button gradient style={{margin:10}} 
                            onPress={() => navigation.navigate('AddShipment')}>
                                <Txt bold white center>Add shipment</Txt>
                            </Button> 
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
        </ScrollView>

        {(!this.props.fetching && this.props.data != null && this.props.data.length) ? 
            (  
              <Button gradient style={{margin:10}} 
                              onPress={() =>  navigation.navigate('AddShipment')}>
                                  <Txt bold white center>Add Shipment</Txt>
              </Button> 
              ) : null
              }


             {/* <Button gradient style={{margin:10}} 
                              onPress={() =>  navigation.navigate('AddShipment', {countries: this.props.country})}>
                                  <Txt bold white center>Add Shipment</Txt>
              </Button>  */}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
    return {
        fetching: state.shipments.fetching,
        data: state.shipments.shipments,
    };
};

//make this component available to the app
export default connect(mapStateToProps, { fetchShipments })(MyShipmentsScreen);

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff"
  // },
    container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding/3,
    backgroundColor: theme.colors.gray4
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
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF"
  },
  rvMarker: {
    backgroundColor: "#FFBA5A"
  },
  tentMarker: {
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
  map: {
    flex: 1
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
    height: width * 0.15,
    borderRadius: 6
  },
  campingImageUser:{
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 6 
  },
  userImage:{
    width: width * 0.1,
    height: width * 0.1,
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
   emptyMessageStyle: {
    textAlign: 'center',
    }
});