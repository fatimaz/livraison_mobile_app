import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import HeaderTabs from "../../components/home/HeaderTabs";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import About from "../../components/restaurantDetail/About";
import MenuItems from "../../components/restaurantDetail/MenuItems";
import ViewCart from "../../components/restaurantDetail/ViewCart";


export default function RestaurantDetail({navigation}) {
    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <About/>
            <MenuItems/>
            <ViewCart navigation ={navigation}/>
        </SafeAreaView>
    )
}



