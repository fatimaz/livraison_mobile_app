import React, { Component } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    ImageBackground,
    SafeAreaView

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import rgba from "hex-to-rgba";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


import { Block, Button, Card, Txt } from "../../components";
import { theme, mocks } from "../../constants";

const { width, height } = Dimensions.get("window");


export default class MyCartScreen extends Component {

    renderHeader() {
        return (

            <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View style={{ flex: 2, flexDirection: "row", justifyContent: "space-between" }}>
              <Ionicons name={"md-arrow-back"} size={30} paddingRight={550} paddingVertical={50} />
                <Txt bold> Your orders</Txt>
                <View style={styles.settings}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("MyCartScreen")}
                  >
                    <AntDesign name="shoppingcart" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>


        );
    }


    renderTrip() {
        return (
            <View style={styles.camping}>
                <FontAwesome name="shopping-bag" size={24} style={{ marginTop: 20, color:'orange' }} />
                <View style={styles.campingDetails}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <Txt blue style={{ fontSize: 14, fontWeight: "bold" }}>
                            Order is being prepared
                        </Txt>
                        <View style={styles.campingInfo}>
                            <Txt style={{ color: "gray" }}>
                                4 oct 2022 11:41 AM
                            </Txt>
                        </View>
                        <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                            5 items : Dettol skin care ...
                        </Txt>
                        <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                            Total : MAD 345
                        </Txt>
                    </View>
                    <FontAwesome name='angle-right' size={24} style={{ marginTop: 20 }} />


                </View>
            </View>
        );
    }

    renderTrips() {
        return (
            <Block>
                {this.renderTrip()}
                {this.renderTrip()}
                {this.renderTrip()}
                {this.renderTrip()}
                {this.renderTrip()}
                {this.renderTrip()}
            </Block>
        );
    }



    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.renderHeader()}
                <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
                    {this.renderTrips()}
                </ScrollView>
           </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: theme.sizes.padding,
        backgroundColor: theme.colors.white
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
    headerContainer: {
        top: 0,
        height: height * 0.10,
        width: width,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.15,
        paddingHorizontal: theme.sizes.base,
    },

    camping: {
        flex: 1,
        flexDirection: "row",
        padding: 15,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
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
        marginTop: 5,
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