import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    SafeAreaView,
    TextInput,
    Modal
} from "react-native";

import { Block, Button,  Txt } from "../../components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { theme } from "../../constants";
const { width, height } = Dimensions.get("screen");

class CheckoutScreen extends Component {
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
                    <Text style={styles.title}>Checkout</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                </View>
            </View>
        );
    }

    renderOderPlaced() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.showTerms}
                onRequestClose={() => this.setState({ showTerms: false })}
            >
                <Block
                    padding={[theme.sizes.padding * 2, theme.sizes.padding / 2]}
                    space="between">
                    <TouchableOpacity style={{ alignItems: "flex-start", marginLeft: 20 }} onPress={() => this.setState({ showTerms: false })}>
                        <Txt h1 bold center blue>
                            X
                        </Txt>
                    </TouchableOpacity>
                    <Block center middle>
                        <Ionicons name="checkmark-circle" color={'blue'} size={80} />
                        <Txt h1>Order places</Txt>
                    </Block>
                </Block>
            </Modal>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.renderHeader()}
                <ScrollView style={styles.container}>
                    <View style={styles.section}>
                        <View style={styles.group}>
                            <View style={styles.sectionPart} >
                                <Block row style={{ paddingHorizontal: 10 }} >
                                    <Ionicons name="location-outline" size={18} style={{ marginRight: 10 }} />
                                    <Txt style={styles.buttonText}>
                                        62 William Bonney estate sw
                                        62 William Bonney estate sw
                                    </Txt>
                                </Block>
                                <View style={{ backgroundColor: 'lightgray', padding: 10, borderRadius: 10, marginLeft: 10 }}>
                                    <Txt >Edit</Txt>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                    <View>
                            <Txt style={styles.title}>Note (Optional)</Txt>
                        </View>
                        <View style={styles.group}>
                            <View style={styles.sectionPart} >   
                                <Block row style={{ paddingHorizontal: 10 }} >
                                        <TextInput
                                            placeholder="Address name Expl(home work)"
                                            placeholderTextColor="#afb1b6"
                                            autoCorrect={false}
                                            style={styles.input}
                                            onChangeText={text => this.setState({ name: text })}
                                        />
                                </Block>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View>
                            <Txt style={styles.title}>Delivery time</Txt>
                        </View>
                        <View style={styles.group}>
                            <Block row style={{ marginLeft: 15 }} >
                                <FontAwesome name="calendar" size={18} style={{ marginRight: 10 }} />
                                <Txt style={styles.buttonText}>
                                    Select delivery Date
                                </Txt>
                            </Block>
                        </View>
                        <View style={styles.group}>
                            <Block row style={{ marginLeft: 15 }} >
                                <Ionicons name="time-outline" size={18} style={{ marginRight: 10 }} />
                                <Txt style={styles.buttonText}>
                                    Select delivery Time
                                </Txt>
                            </Block>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View>
                            <Txt style={styles.title}>Payment method</Txt>
                        </View>
                        <View style={styles.group}>
                            <Block row style={{ marginLeft: 15 }} >
                                <FontAwesome name="money" size={18} style={{ marginRight: 10 }} />
                                <Txt style={styles.buttonText}>
                                    Cash on delivery
                                </Txt>
                            </Block>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View>
                            <Txt style={styles.title}>Summary</Txt>
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
                <Button onPress={() => this.setState({ showTerms: true })}>
                    <Text center caption gray>
                        Terms of service
                    </Text>
                </Button>
                <View style={styles.buttonStyle}>
                    <Txt bold style={styles.buttonTextStyle}>Confirm order</Txt>
                </View>
                {this.renderOderPlaced()}
            </SafeAreaView>
        );
    }
}



export default CheckoutScreen;

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
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        marginVertical: 14,
        fontWeight: "bold",
        marginLeft: 15,
    },
    group: {
        flexDirection: "row",
        // borderRadius: 14,
        // borderWidth: 1,
        // borderColor: "#FF7657",
        justifyContent: "space-between"
    },
    button: {
        flex: 1,
        padding: 14,
        // alignItems: "center"
    },
    sectionPart: {
        flex: 1,
        paddingVertical: 14,
        justifyContent: "space-between",
        flexDirection: "row",
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
    first: {
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13
    },
    last: {
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13
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
        height: 60,
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