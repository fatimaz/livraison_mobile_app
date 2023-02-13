import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import rgba from "hex-to-rgba";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// alternative for expo LinearGradient
// import LinearGradient  from 'react-native-linear-gradient';

import { Block, Button, Card, Txt } from "../../components";
import { theme, mocks } from "../../constants";

const { width } = Dimensions.get("window");

export default class MyCartScreen extends Component {



  renderTrip() {
    return (
      <View style={styles.camping}>
        <ImageBackground
          style={styles.campingImage}
          imageStyle={styles.campingImage}
          source={require('../../res/p.png')}
        />

        <View style={styles.campingDetails}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Txt style={{ fontSize: 14, fontWeight: "bold" }}>
              Paracetamol
            </Txt>
            <View style={styles.campingInfo}>
              <Ionicons name="md-pricetag" color="blue" size={12} />
              <Txt style={{ marginLeft: 4, color: "blue" }}>
                DH 200
              </Txt>
            </View>
            {/* <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                10 tablets
              </Txt> */}

          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}>
            <TouchableOpacity
              onPress={this.decrementHalder}>
              <View style={styles.borderBtn}>
                <Txt style={styles.borderBtnText}>-</Txt>
              </View>
            </TouchableOpacity>
            <View style={styles.borderCounter}>
              <Txt
                style={{
                  fontSize: 16,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                6
                {/* {this.state.counter} */}
              </Txt>
            </View>
            <TouchableOpacity
              onPress={this.incrementHalder}
            >
              <View style={styles.borderBtn}>
                <Txt style={styles.borderBtnText}>+</Txt>
              </View>
            </TouchableOpacity>
          </View>


        </View>
      </View>
    );
  }

  renderTrips() {
    return (
      <Block>
        <Block style={{ marginBottom: theme.sizes.base }}>
          <Txt spacing={0.4} caption>
            Delivery withing 2 hours
          </Txt>
          <Txt spacing={0.4} >
            Your order
          </Txt>
        </Block>
        {this.renderTrip()}
        {this.renderTrip()}
        {this.renderTrip()}
        {this.renderTrip()}
        {this.renderTrip()}
        {this.renderTrip()}
          <Block style={styles.hLine} />
          <Block row space="between" style={{paddingHorizontal:20}}>
          <Txt bold blue center>subtotal (14 items)</Txt>
           <Txt bold blue center>200dh</Txt>
          </Block>
          <Block row space="between" style={{paddingHorizontal:20}}>
          <Txt bold blue center>Delivery fee</Txt>
           <Txt bold blue center>20dh</Txt>
          </Block>
          <Block style={styles.hLine} />
          <Block row space="between" style={{paddingHorizontal:20}}>
          <Txt bold blue center>Total (14 items)</Txt>
           <Txt bold blue center>200dh</Txt>
          </Block>
        <Txt blue center>Continue shopping</Txt>
        <Txt caption gray center style={{ marginTop: 10 }}>Prices may vary across pharmacies</Txt>
      </Block>
    );
  }



  render() {
    return (
      <React.Fragment>
        <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
          {this.renderTrips()}
        </ScrollView>
        <View style={styles.buttonStyle}>
          <Txt bold style={styles.buttonTextStyle}>Go to checkout</Txt>
        </View>
        {/* <Block style={{backgroundColor:'black', height:100}}><Txt>sdd</Txt></Block> */}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding / 2,
    backgroundColor: theme.colors.gray4
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base / 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
    backgroundColor: theme.colors.gray2,
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

  camping: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  campingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
     marginTop:5,
  },
  campingImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 6
  },

  borderBtn: {
    backgroundColor: 'pink',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 28,
    marginLeft: 10,
  },
  borderBtnText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 20
  },
  borderCounter: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 28,
    marginLeft: 10,
  },
  buttonStyle: {
    backgroundColor: '#fc454e',
    width: 350,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 30,
    bottom: 20,
    right: 20
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 6
  }
});