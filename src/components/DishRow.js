import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, } from "react-native";
import Card from "./Card";
import Txt from "./Txt";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../constants";
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from "../features/basketSlice";
import Badge from "./Badge";
import Button from "./Button";

const { width, height } = Dimensions.get("screen");


const DishRow = ({ id, name, description, price, image, navigation }) => {
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
        <View >
            <View style={styles.menuItemStyle}>
                <TouchableOpacity
                    key={id}
                    onPress={() => navigation.navigate("ProductDetail",{id, name, description, price, image, navigation})}
                >
                    <Card shadow style={styles.category}>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 10
                        }}>
                            <Badge
                                margin={[0, 0, 15]}
                                size={50}
                                color="white"
                            >
                                <Image style={styles.avatar} source={{ uri: image }} />
                            </Badge>
                        </View>
                        <Txt medium height={14}>
                            {name}
                        </Txt>
                        <Txt medium height={14} style={{ marginTop: 10 }}>
                            {price}dh
                        </Txt>

                        <View style={{ marginTop: 5 }}>
                            {(!items.length > 0) ?
                                (
                                    <Button gradient style={{ height: 35 }} onPress={addItemToBasket}>
                                        <Txt bold white center>Add to card</Txt>
                                    </Button>

                                ) :
                                <View style={{
                                    height: 35,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    marginBottom: 7,
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            width: 35,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'pink',
                                            borderRadius: 5,
                                        }}
                                        onPress={removeItemFromBasket}
                                    >
                                        <Txt style={{ fontSize: 20, color: theme.colors.red }}>-</Txt>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            width: 35,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <View style={{
                                            width: 35,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 10,
                                            borderRadius: 5,
                                            backgroundColor: 'lightgray'
                                        }}>
                                            <Txt h4>
                                                {items.length}
                                            </Txt>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            width: 35,
                                            borderRadius: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'pink',
                                        }}
                                        onPress={addItemToBasket}
                                    >
                                        <Txt style={{ fontSize: 20, color: theme.colors.red }}>+</Txt>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    titleStyle: {
        fontSize: 19,
        fontWeight: '600'
    },
    categories: {
        flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base,
        marginBottom: theme.sizes.base * 0.5,
    },
    category: {
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 0.5,
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2
    },

});
export default DishRow;
