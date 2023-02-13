import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import HeaderTabs from "../../components/home/HeaderTabs";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import RestaurantItem from "../../components/home/RestaurantItem";
import Header from "../../components/home/Header";

export default function Home() {
    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <HeaderTabs />
                <SearchBar />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header/>
                <Categories />
                {/* <RestaurantItem /> */}
            </ScrollView>

        </SafeAreaView>
    )
}



