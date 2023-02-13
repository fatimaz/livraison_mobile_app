import React, { Component } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    SafeAreaView,
    ImageBackground
} from "react-native";

import { Card, Badge, Button, Block, Txt, Input } from "../../components";
import { theme, mocks } from "../../constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import rgba from "hex-to-rgba";
import LinearGradient from 'react-native-linear-gradient';


// const { width } = Dimensions.get("window");
const { width, height } = Dimensions.get("screen");

class ProductDetailssss extends Component {

    state = {
        active: "Products",
        categories: [],
        counter: 0,
    };
    incrementHalder = () => {
        const { counter } = this.state;
        this.setState(prevState => ({ counter: prevState.counter + 1 }))
        // if (counter !== 3) {
        //   this.setState(prevState => ({ counter: prevState.counter + 1 }))
        // }
    }
    decrementHalder = () => {
        const { counter } = this.state;
        if (counter !== 1) {
            this.setState(prevState => ({ counter: prevState.counter - 1 }))
        }
    }



    changeHalder() {
        const { counter } = this.state;
        this.setState(prevState => ({ counter: prevState.counter + 1 }))
    }
    handleCart() {
        const { counter } = this.state;
        if (counter == 0) {
            return (
                <Button gradient style={{ height: 35 }} onPress={this.changeHalder.bind(this)}>
                    <Txt bold white center>Add to card</Txt>
                </Button>
            )

        } else {
            return (
                <View style={{
                    // width: theme.sizes.width,
                    height: 35,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    // marginBottom: 5,
                    // marginVertical: 10,
                    // marginRight: 60
                    marginTop: 10
                }}>
                    <TouchableOpacity
                        style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // borderWidth: 2,
                            backgroundColor: 'pink',
                            // borderColor: theme.colors.gray2,
                            borderRadius: 5,

                        }}
                        onPress={this.decrementHalder}
                    >
                        <Txt style={{ fontSize: 20, color: theme.colors.red }}>-</Txt>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // marginRight: 10,
                        }}>
                        <View style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            // borderColor: theme.colors.gray2,
                            borderRadius: 5,
                            // borderWidth: 2,
                            backgroundColor: 'lightgray'
                        }}>
                            <Txt h4>
                                {this.state.counter}
                            </Txt>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // borderColor: theme.colors.gray2,
                            borderRadius: 5,
                            backgroundColor: 'pink',
                            // borderWidth: 2,
                            // marginRight: 20,
                        }}
                        onPress={this.incrementHalder}
                    >
                        <Txt style={{ fontSize: 20, color: theme.colors.red }}>+</Txt>
                    </TouchableOpacity>
                </View>
            )
        }

    }

    render() {

        return (
            <SafeAreaView style={{ backgroundColor: theme.colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                             height: 280,
                        }}>
                        <Image source={require('../../res/p.png')} style={{ height: 220, width: 220 }} />
                    </View>
                    <View style={styles.details}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Txt
                                style={{ fontSize: 25, fontWeight: 'bold' }}>
                                ddd
                            </Txt>

                            <View style={styles.iconContainer}>
                                <Txt>200dh</Txt>
                                {/* <Icon name="favorite-border" color={theme.colors.primary} size={25} /> */}
                            </View>
                        </View>
                        <Txt 
                            style={{ fontSize: 15 }}>
                            Delivery within 1-2 hours
                        </Txt>
                        <Block flex={false} color="lightgray" style={styles.hLine} />
                        <Txt bold>Description</Txt>
                        <Txt style={styles.detailsText}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It has survived not
                            only five centuries.          
                        </Txt>
                    </View>
                </ScrollView>
                <View style={{marginTop: 80,backgroundColor:'black'}}>
                    <Button style={{backgroundColor:'black'}}><Txt>Add To Cart</Txt></Button> 
                </View>
                {/* <View style={{marginBottom:10}}>
                {this.handleCart()}
                </View> */}

                 
            </SafeAreaView>
        );
    }
}

ProductDetailsss.defaultProps = {
    profile: mocks.profile,
    categories: mocks.categories
};

export default ProductDetailssss;

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    details: {
        paddingHorizontal: 20,
        paddingTop: 40,
        // paddingBottom: 60,
        backgroundColor: theme.colors.gray3,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    iconContainer: {
        backgroundColor: theme.colors.white,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        // color: theme.colors.white,
    },
    // horizontal line
    hLine: {
        marginVertical: theme.sizes.base * 2,
        marginHorizontal: theme.sizes.base * 2,
        height: 1
    },
});


