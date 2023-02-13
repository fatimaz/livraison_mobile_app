import React ,{useState} from "react";
import { View, Dimensions, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { theme } from "../../constants";
import Block from "../Block";

export default function Header(){

const { width, height } = Dimensions.get("screen");

    return (
        <LinearGradient
        end={{ x: 1, y: 0 }}
        style={{
            padding: theme.sizes.base,
            marginHorizontal: theme.sizes.base,
            borderRadius: 10,
            flexDirection: "row",
          }}
        colors={["#FF988A", theme.colors.accent]}
      >
        <Block middle flex={1}  style={{
            padding: theme.sizes.base,
            marginHorizontal: theme.sizes.base,
            borderRadius: 10,
            flexDirection: "row",
          }}>
          <Image
            source={require('../../res/cr.png')}
            // resizeMode="contain"
            style={{ width, height: height / 10, overflow: "visible", padding: 10 }}
          />

        </Block>

      </LinearGradient>
    )
}
