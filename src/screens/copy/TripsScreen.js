import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
  SafeAreaView
} from "react-native";

import rgba from "hex-to-rgba";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt } from "../components";
import { theme } from "../constants";
import { fetchTrips } from '../actions';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("screen");
import FAIcon from 'react-native-vector-icons/FontAwesome';
//const { width } = Dimensions.get("window");

class TripsScreen extends Component {

  componentDidMount() {
     this.props.fetchTrips();
 }
  _onRefreshTrips() {
  const { navigation } = this.props;
   this.props.fetchTrips();
}
renderHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View style={styles.settings}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ShipmentScreen")}
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
            <Text style={{ fontSize: 12, color: "#A5A5A5", marginBottom: 5 }}>
              Detected Location
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "300" }}>
              Shopper
            </Text>
          </View>
        </View>
        <View style={styles.settings}>
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
            onPress={() => this.props.navigation.navigate("ShipmentScreen")}
          >
                <FontAwesome
                      name='shopping-bag'
                      size={25}
                      color='red'
                      style={{
                        marginTop: 10,
                        marginRight:10,
                        height: 20,
                        width: 20
                      }}
                  />
            {/* <Image
             source= {require("../assets/icons/back.png")}
             style={{
               marginTop: 10,
               marginRight:10,
               height: 20,
               width: 20
             }}
            /> */}
            <Text
            style={{
              alignSelf:'center',
              marginRight: 5,
              color: 'red'
            }}>Switch to shopper</Text>
          </TouchableOpacity>
        </View>
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
  static navigationOptions = {
    headerTitle: <Txt style={theme.fonts.header}>Welcome</Txt>,
    headerRight: (
      <TouchableOpacity>
        <Block flex={false}>
          <Image
            resizeMode="contain"
            source={require("../assets/icons/back.png")}
            style={{ width: 20, height: 24 }}
          />
          <Badge
            size={13}
            color={theme.colors.accent}
            style={{ position: "absolute", top: -4, right: -4 }}
          />
        </Block>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity>
        <Block flex={false}>
          <Image
            resizeMode="contain"
            source={require("../assets/icons/back.png")}
            style={{ width: 20, height: 24 }}
          />
          <Badge
            size={13}
            color={theme.colors.accent}
            style={{ position: "absolute", top: -4, right: -4 }}
          />
        </Block>
      </TouchableOpacity>
    )
  };
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

     const { navigation } = this.props;
    return (
        <TouchableOpacity
          key={item.name}
          onPress={() => navigation.navigate('TripDetails', { trip_details: item })}     
        >
      <Card shadow>
        <Block row center>
          <Badge
            color={rgba(theme.colors.accent, "0.2")}
            size={14}
            style={{ marginRight: 8 }}
          >
            <Badge color={theme.colors.accent} size={8} />
          </Badge>
          <Txt spacing={0.5} color="gray">
              { item.countries.name } 
          
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
          <Txt spacing={0.5} color="gray">
          { item.countries.name }
          </Txt>
        </Block>
        <Block row space="between" style={{ marginTop: theme.sizes.base }}>
          <Txt style={{fontSize: 10}} spacing={0.5} caption>
           Travel Date :   {item.travel_date}
          </Txt>
          <Txt spacing={0.5} caption medium primary>
            {/* {trip.score} */}
          </Txt>
          <Txt style={{fontSize: 10, fontWeight: "bold"}} spacing={0.5} caption>
               {item.weight_free}kg available
          </Txt>
        </Block>
        <Block flex={false} color="gray" style={styles.hLine} />

        <Block row center>
         {/*  */}
         <Block row space="between">
           {/* <Txt spacing={0.5} caption> */}
         <Image
           resizeMode="contain"
            source={require("../assets/icons/back.png")}
            style={{ width: 20, height: 24, marginRight: 8 }}
           />
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
                  {item.user.name }
               </Txt>
              <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
              <FontAwesome name="star" color="#FFBA5A" size={12} />
              </Txt>
            </Block>

           {/*  */}
           {/* </Txt> */}
           <Txt spacing={0.5} caption medium primary>
             {/* {trip.score} */}
           </Txt>
           <Txt spacing={0.5} caption>
            send request
           </Txt>
        </Block>
          {/*  */}
        </Block>
       {/*  */}
     </Card>
      </TouchableOpacity>
     );
   };

  renderTrips() {
    return (
      <React.Fragment>
        {/* <Block style={{ margin: theme.sizes.base*2 }}>
          <Txt spacing={0.4} transform="uppercase">
            Recent Trips
          </Txt>
        </Block> */}
              {/* {this.renderTrip()} */}
        {/* <ScrollView style={styles.container}> */}
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
                    onRefresh={this._onRefreshTrips.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <Txt style={styles.emptyMessageStyle}>Aucun résultat trouvé</Txt>  
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
     
        {/* </ScrollView>     */}
      </React.Fragment>
    );
  }

  // renderTripButton() {
  //   const { navigation } = this.props;

  //   return (
  //     <Block center middle style={styles.startTrip}>
  //       <Badge color={rgba(theme.colors.primary, "0.1")} size={144}>
  //         <TouchableOpacity
  //           activeOpacity={0.8}
  //           onPress={() => navigation.navigate("Trip")}
  //         >
  //           <Badge color={theme.colors.primary} size={62}>
  //             <FontAwesome
  //               name="automobile"
  //               size={62 / 2.5}
  //               color="white"
  //             />
  //           </Badge>
  //         </TouchableOpacity>
  //       </Badge>
  //     </Block>
  //   );
  // }

  render() {
    return (
    <SafeAreaView  style={styles.welcome}>
      {/* {this.renderHeader()} */}
        <Text style={{ fontSize: 14, fontWeight: "300", marginHorizontal:10, marginBottom: 10 }}>
        Recent Trips
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
                
      
          {this.renderTrips()}
        </ScrollView>
        {/* {this.renderButton()} */}
       {/* {this.renderTripButton()} */}
  </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
      // fetching: state.tripsPlane.fetching,
      // data: state.tripsPlane.data
      error: state.trips.error,
      fetching: state.trips.fetching,
      data: state.trips.trips
  };
};

export default connect(mapStateToProps, { fetchTrips })(TripsScreen);

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding/2,
    backgroundColor: theme.colors.gray4
  },

  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
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
    emptyMessageStyle: {
    textAlign: 'center',
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
    startTrip: {
      position: 'absolute',
      right: (width - 330) / 2,
      bottom: 10,
    },
});