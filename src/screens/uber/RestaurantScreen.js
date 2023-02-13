import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import React from 'react';
import BasketIcon from '../../components/BasketIcon';
import { Card, Badge, Button, Block, Txt, Input } from "../../components";
import { theme } from "../../constants";
import DishRow from '../../components/DishRow';
const { width, height } = Dimensions.get("screen");

const RestaurantScreen = ({ navigation }) => {

    const product = navigation.getParam('product');
    return (
        <>
            <BasketIcon navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={product}
                    renderItem={({ item }) => {
                        return (
                            <DishRow
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                description={item.details}
                                price={item.price}
                                image={item.photo}
                                navigation={navigation}
                            />
                        )

                    }}
                    keyExtractor={this.keyExtractor}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
                    numColumns={2}
                />
            </ScrollView>


        </>
    )
}
export default RestaurantScreen;
