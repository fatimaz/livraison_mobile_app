import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    SafeAreaView,
    Switch,
    Modal,
    ImageBackground
} from "react-native";

import { Block, Button, Card, Txt } from "../../components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { theme } from "../../constants";
const { width, height } = Dimensions.get("screen");

class OrderDetails extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        showTerms: false
    };

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Campings")}
                    >
                        <Ionicons name="md-arrow-back" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={styles.title}>Get help</Text>
                </View>
            </View>
        );
    }


    itemOrdered() {
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
                            <Txt>x2</Txt>
                        </View>

                    </View>
                </View>
            </View>

        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.renderHeader()}
                <ScrollView style={styles.container}>

                    <View style={styles.section}>
                        <View style={styles.group}>

                            <Block row style={{ paddingHorizontal: 10 }} >
                                <Txt style={styles.buttonText}>
                                    Delivery time
                                    2hours
                                </Txt>
                            </Block>

                            <Block row space="around" >
                                <Ionicons
                                    name="checkmark-done-circle-outline"
                                    color="orange"
                                    size={20}
                                />
                                <Block flex={false} color="orange" style={styles.hLine} bold />
                                <Ionicons
                                    name="checkmark-done-circle-outline"
                                    color="orange"
                                    size={20}
                                />
                                <Block flex={false} color="orange" style={styles.hLine} bold />
                                <Ionicons
                                    name="checkmark-done-circle-outline"
                                    color="orange"
                                    size={20}
                                />
                            </Block>
                            <Txt center> Order placed</Txt>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View>
                            <Txt style={styles.title}>Payment </Txt>
                        </View>
                        <View style={styles.sectionPart}>
                            <Block row style={{ marginLeft: 15 }} >
                                <FontAwesome name="money" size={18} style={{ marginRight: 10 }} />
                                <Txt style={styles.buttonText}>
                                    Paid in cash
                                </Txt>
                            </Block>
                            <Txt style={styles.buttonText}>
                                390 MAD
                            </Txt>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View>
                            <Txt style={styles.title}>Order detail</Txt>
                        </View>
                        <View style={styles.group}>
                            <View style={styles.button} >
                                <Block row space="between" style={{ marginBottom: 10 }}>
                                    <Txt style={styles.buttonText}>
                                        Order number
                                    </Txt>
                                    <Txt style={styles.buttonText}>
                                        43434
                                    </Txt>
                                </Block>
                                <Block row space="between" >
                                    <Txt style={styles.buttonText}>
                                        Ordered on
                                    </Txt>
                                    <Txt style={styles.buttonText}>
                                        20-02-2010
                                    </Txt>
                                </Block>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View>
                            <Txt style={styles.title}>Delivery address</Txt>
                        </View>
                        <View style={styles.group}>
                            <Block row style={{ paddingHorizontal: 10 }} >
                                <Ionicons name="location-outline" size={18} style={{ marginRight: 10 }} />
                                <Txt style={styles.buttonText}>
                                    62 William Bonney estate sw
                                </Txt>
                            </Block>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View>
                            <Txt style={styles.title}>Item ordered</Txt>
                        </View>
                        <View style={styles.group}>
                            {this.itemOrdered()}
                            {this.itemOrdered()}
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View>
                            <Txt style={styles.title}>Payment details</Txt>
                        </View>
                        <View style={styles.group}>
                            <View style={styles.button} >
                                <Block row space="between" style={{ marginBottom: 10 }}>
                                    <Txt style={styles.buttonText}>
                                        Subtotal
                                    </Txt>
                                    <Txt style={styles.buttonText}>
                                        200 MAD
                                    </Txt>
                                </Block>
                                <Block row space="between" >
                                    <Txt style={styles.buttonText}>
                                        Delivery free
                                    </Txt>
                                    <Txt style={styles.buttonText}>
                                        20 MAD
                                    </Txt>
                                </Block>
                                <Block flex={false} color="lightgray" style={styles.hLine} />
                                <Block row space="between">
                                    <Txt bold style={styles.buttonText}>
                                        Total
                                    </Txt>
                                    <Txt bold style={styles.buttonText}>
                                        220 MAD
                                    </Txt>
                                </Block>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.buttonStyle}>
                    <Txt bold style={styles.buttonTextStyle}>Confirm order</Txt>
                </View>
            </SafeAreaView>
        );
    }
}



export default OrderDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.1,
        width: width,
        paddingHorizontal: 14
    },
    section: {
        flexDirection: "column",
        marginHorizontal: 14,
        paddingBottom: 14,
        borderBottomColor: "#EAEAED",
        borderBottomWidth: 1,

    },
    title: {
        fontSize: 18,
        marginVertical: 14,
        fontWeight: "bold",
        marginLeft: 15,
    },
    group: {
        flexDirection: "column",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "lightgray",
        padding: 10

    },
    button: {
        flex: 1,
        padding: 14,
        // alignItems: "center"
    },
    sectionPart: {
        flex: 1,
        paddingVertical: 14,
        paddingRight: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "lightgray",
    },
    buttonText: {
        fontWeight: "500"
    },
    active: {
        backgroundColor: "#FF7657"
    },
    activeText: {
        color: "#FFF"
    },

    option: {
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    hLine: {
        marginVertical: theme.sizes.base / 2,
        marginHorizontal: theme.sizes.base,
        height: 1,
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
    },
    camping: {
        flex: 1,
        flexDirection: "row",
        padding: 20,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2
    },
    campingDetails: {
        flex: 2,
        paddingLeft: 20,
        flexDirection: "row",
        justifyContent: "space-around",

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

});