import React, { useState } from "react";
import { View, Text, Image } from "react-native";


const image = require('../../assets/icons/back.png');

const title = 'farmhouse';
const description = 'Desc';

export default function About() {

    return (
        <View>
            <RestaurantImage image={image} />
            <RestaurantTitle title={title} />
            <RestaurantDescription description={description} />
        </View>
    )
}

const RestaurantImage = (props) => (
    <Image source={props.image} style={{
        width: '100%',
        height: 180,
    }} />
);
const RestaurantTitle = (props) => (
    <Text style={{
        fontSize: 29,
        fontWeight: '600',
        marginTop: 10,
        marginHorizontal: 15
    }}>{props.title}</Text>
);
const RestaurantDescription = (props) => (
    <Text style={{
        fontSize:15.5 ,
        fontWeight: '400',
        marginTop: 10,
        marginHorizontal: 15
    }}>{props.description}</Text>
);
