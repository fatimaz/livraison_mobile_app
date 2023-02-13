import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { selectBasketItems, removeFromBasket, selectBasketTotal } from "../../features/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../../constants";
import { Block, Button, Card, Txt } from "../../components";
const { width } = Dimensions.get("window");
import Ionicons from 'react-native-vector-icons/Ionicons';

const BasketScreen = ({navigation}) => {
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Text>Restaurant</Text>
                </View>
                {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                    <View style={styles.camping}>
                        {/* <ImageBackground
                            style={styles.campingImage}
                            imageStyle={styles.campingImage}
                            source={{uri:item.photo }}
                            /> */}
                        <View style={styles.campingDetails}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}
                            >
                                <Txt style={{ fontSize: 14, fontWeight: "bold" }}>
                                    {items[0]?.name}
                                </Txt>
                                <View style={styles.campingInfo}>
                                    <Ionicons name="md-pricetag" color="gray" size={12} />
                                    <Txt style={{ marginLeft: 4, color: "gray" }}>
                                        DH {items[0]?.price}
                                    </Txt>
                                </View>
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
                                        {items.length}
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
                        <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                            <Text>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                    // <View key= {key}>
                    //     <Text>{items.length} x</Text>
                    //     {/* <Image
                    //     source = {{uri : urlFor(items[0]?.image.url()) }}/> */}
                    //     <Text>{items[0]?.name}</Text>
                    //     <Text>{items[0]?.price}</Text>
                    // </View>
                ))}
            </ScrollView>
            <View style={styles.viewStyle}>
                <Block style={styles.hLine} />
                <Block row space="between" style={{ paddingHorizontal: 20 }}>
                    <Txt bold blue center>Subtotal (14 items)</Txt>
                    <Txt bold blue center> { basketTotal } MAD</Txt>
                </Block>
                <Block row space="between" style={{ paddingHorizontal: 20 }}>
                    <Txt bold blue center>Delivery</Txt>
                    <Txt bold blue center> 20 MAD</Txt>
                </Block>
                <Block style={styles.hLine} />
                <Block row space="between" style={{ paddingHorizontal: 20 }}>
                    <Txt bold blue center>Total</Txt>
                    <Txt bold blue center> { basketTotal + 20} MAD</Txt>
                </Block>
                <TouchableOpacity
                      onPress={() => navigation.navigate("PreparingOrderScreen")}
                >
                    <View style={styles.buttonStyle}>
                        <Txt bold style={styles.buttonTextStyle}> Place order</Txt>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}
export default BasketScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: theme.sizes.padding,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.sizes.padding / 2,
    },
    // horizontal line
    hLine: {
        marginVertical: theme.sizes.base / 2,
        marginHorizontal: theme.sizes.base * 2,
        backgroundColor: theme.colors.gray2,
        height: 1,
    },
    // vertical line
    vLine: {
        marginVertical: theme.sizes.base / 2,
        width: 1
    },
    moreIcon: {
        width: 16,
        height: 17,
        position: "absolute",
        right: theme.sizes.base,
        top: theme.sizes.base
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
        height: 22,
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
        height: 22,
        marginLeft: 10,
    },
    buttonStyle: {
        backgroundColor: 'green',
        width: 350,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 30,
    },
    viewStyle: {
        position: 'absolute',
        justifyContent: 'center',
        bottom: 20,
        right: 20
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 20,
        // marginBottom: 6,
        justifyContent: 'center',
        alignItems: 'center',
    }
});