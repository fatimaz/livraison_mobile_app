import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const foods = [
    {
        title: "title",
        description: "jdjajdha",
        price: "22",
        image: require('../../assets/icons/back.png'),
    },
    {
        title: "title",
        description: "jdjajdha",
        price: "22",
        image: require('../../assets/icons/back.png'),
    },
    {
        title: "title",
        description: "jdjajdha",
        price: "22",
        image: require('../../assets/icons/back.png'),
    },
];

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    titleStyle: {
        fontSize: 19,
        fontWeight: '600'
    }

});
export default function MenuItems() {
    const dispatch = useDispatch();
    const selectItem = (item,checkboxValue) =>
        dispatch({
            type: "ADD_TO_CART",
            payload:{
                ...item,
                checkboxValue:checkboxValue,
            },
        });
    
        const cartitems = useSelector((state) => state.cartReducer.selectedItems.items);
        const isFoodInCart = (food, cartItems) => 
            Boolean(cartItems.find((item)=> item.title == food.title));
      
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {foods.map((food, index) => (
                <View key={index}>
                    <View style={styles.menuItemStyle}>
                        <TouchableOpacity
                            onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                            isChecked = {isFoodInCart(food, cartitems)}
                        > 
                        <Text>x</Text>
                        </TouchableOpacity>
                        <FoodInfo food={food} />
                        <FoodImage food={food} />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}
const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly" }}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
);
const FoodImage = (props) => (
    <View>
        <Image source={props.food.image} style={{ width: 100, height: 100, borderRadius: 8 }} />
    </View>

)

