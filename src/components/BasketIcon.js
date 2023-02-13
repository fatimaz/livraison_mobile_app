import { View, Text, TouchableOpacity } from "react-native"
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
// import {useNavigation} from "@react-navigation/native";


const BasketIcon = ({navigation}) => {
    const items = useSelector(selectBasketItems);
    // const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);
    if(items.length === 0) return null;
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 100,
            zIndex: 999,
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%"
            }}>
                <TouchableOpacity style={{
                    marginTop: 20,
                    backgroundColor: 'black',
                    flexDirection: "row",
                     justifyContent: "space-between",
                    padding: 15,
                    borderRadius: 30,
                    width: 300,
                    position: "relative"
                }}
                onPress={() => navigation.navigate("BasketScreen")}
                 
                >
                    <Text style={{ color: "white", fontSize: 20, }}>View Cart</Text>
                    <Text style={{ color: "white", fontSize: 20, marginRight:10 }}>{items.length}</Text>
                    <Text style={{ color: "white", fontSize: 20 }}>{basketTotal}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BasketIcon;