import React from "react";
import { SafeAreaView,View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../../constants";
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from "../../features/basketSlice";
import AntDesign from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Badge, Button, Block, Txt, Input } from "../../components";


export default function ProductDetail({ navigation }) {
    // const { id } = route.params;
    const id = navigation.getParam('id')
    const name = navigation.getParam('name');
    const image = navigation.getParam('image');
    const price = navigation.getParam('price')
    const description = navigation.getParam('description')
    const dispatch = useDispatch();



    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    }

    const removeItemFromBasket = () => {
        if (!items.length > 0) return;
        dispatch(removeFromBasket({ id }));
    }
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.colors.white,
            }}>
            {/* <ScrollView showsVerticalScrollIndicator={false}  style={{
              flex: 1,
               */}
            {/* }}> */}

            <View style={styles.header}>
                {/* <Ionicons name={"md-arrow-back"} size={28} onPress={() => navigation.goBack()} /> */}
                <AntDesign name="shoppingcart" size={24} color="black" onPress={() => navigation.goBack()} />
                {/* <FontAwesome name="arrow-back" size={28} onPress={() => navigation.goBack()} />  */}
                {/* <FontAwesome name="shopping-cart" size={28} />  */}
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={{ flex: 1 }} />

            </View>
            <View style={styles.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
                </View>
                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: 14 }}>small 5 pcs 30g per piece</Text>
                    <View style={styles.priceTag}>
                        <Text
                            style={{
                                marginLeft: 15,
                                color: theme.colors.white,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>
                            DH {price}
                        </Text>
                    </View>
                </View>
                <View style={styles.hLine} />
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ingredients</Text>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                            marginBottom: 30
                        }}>
                        {description}
                    </Text>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        {/* {this.handleCart()} */}
                        {(!items.length > 0) ?
                            (
                                <TouchableOpacity
                                onPress={addItemToBasket}>
                                    <View style={styles.buyBtn}>
                                        <Text
                                            style={{ color: theme.colors.white, fontSize: 18, fontWeight: 'bold' }}>
                                            Add to Cart
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) :
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={removeItemFromBasket}>
                                        <View style={styles.borderBtn}>
                                            <Text style={styles.borderBtnText}>-</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginHorizontal: 10,
                                            fontWeight: 'bold',
                                        }}>
                                        {items.length}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={addItemToBasket}
                                    >
                                        <View style={styles.borderBtn}>
                                            <Text style={styles.borderBtnText}>+</Text>
                                        </View>
                                    </TouchableOpacity>


                                </View>
                                <Txt bold>MAD 767</Txt>
                            </View>
                        }

                    </View>
                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.25,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    detailsContainer: {
        flex: 0.75,
        backgroundColor: theme.colors.gray4,
        marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30,
    },
    line: {
        width: 205,
        height: 2,
        backgroundColor: theme.colors.gray2,
        marginBottom: 5,
        marginRight: 3,

    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: { fontWeight: 'bold', fontSize: 28 },
    buyBtn: {
        width: 130,
        height: 50,
        backgroundColor: theme.colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    priceTag: {
        backgroundColor: theme.colors.red,
        width: 80,
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    hLine: {
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
        height: 1,
        backgroundColor: theme.colors.gray2,
    },
});




