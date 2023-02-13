import React, { useState } from "react";
import { View, Text, Image, ScrollView ,FlatList} from "react-native";

const items = [
    {
        image: require('../../assets/icons/back.png'),
        text: "Pick-up",
    },
    {
        image: require('../../assets/icons/back.png'),
        text: "Bakery",
    },
    {
        image: require('../../assets/icons/back.png'),
        text: "Fast food",
    },
    {
        image: require('../../assets/icons/back.png'),
        text: "Deals",
    },

]
export default function Categories() {
    return (
        <View style={{
            marginTop:5,
            backgroundColor:"#fff",
            paddingVertical:10,
            paddingLeft:20
        }}>
        <ScrollView  showsHorizontalScrollIndicator={false}>
        <FlatList
                data={items}   
                renderItem={({ item }) => this.renderList(item)}
                 keyExtractor={this.keyExtractor}  
                 columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal:10 }}
                  numColumns={3}
                //   refreshControl={
                //   <RefreshControl
                //     enabled={true}
                //     refreshing={this.props.fetching}
                //     onRefresh={this._onRefreshCategories.bind(this)}
                //   />
                // } 
                 ListHeaderComponent={() => (!this.props.data.length? 
                  <Text center style={styles.emptyMessageStyle}>Aucun résultat trouvé</Text>  
                  : null)
                }         
            />

            {/* {items.map((item, index) => (
                <View key={index} style={{ alignItems: "center", marginRight: 30, }}>
                    <Image source={item.image} style={{
                        width: 50,
                        height: 40,
                        resizeMode: "contain"
                    }} />
                    <Text style={{ fontSize: 13, fontWeight: "900" }}>{item.text}</Text>
                </View>
            ))} */}

        </ScrollView>
        </View>
    )
}
