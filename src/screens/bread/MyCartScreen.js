import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
  FlatList
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, Button, Card, Txt } from "../../components";
import { theme } from "../../constants";

const { width } = Dimensions.get("window");

export default class MyCartScreen extends Component {

  renderCart = ( item ) => {
    return (
      <View style={styles.camping}>
        <ImageBackground
          style={styles.campingImage}
          imageStyle={styles.campingImage}
          source={{uri:item.photo }}
        />
        <View style={styles.campingDetails}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Txt style={{ fontSize: 14, fontWeight: "bold" }}>
            {item.name}
            </Txt>
            <View style={styles.campingInfo}>
              <Ionicons name="md-pricetag" color="gray" size={12} />
              <Txt style={{ marginLeft: 4, color: "gray" }}>
                DH {item.price}
              </Txt>
            </View>
            {/* <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                10 tablets
              </Txt> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}>
            <TouchableOpacity
              onPress={this.decrementHalder}>
              <View style={styles.borderBtn}>
                <Txt style={styles.borderBtnText}>-</Txt>
              </View>
            </TouchableOpacity>
            <View style={styles.borderCounter}>
              <Txt
                style={{
                  fontSize: 16,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                 6
                {/* {this.state.counter} */}
              </Txt>
            </View>
            <TouchableOpacity
              onPress={this.incrementHalder}
            >
              <View style={styles.borderBtn}>
                <Txt style={styles.borderBtnText}>+</Txt>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  keyExtractor = ( index) => index;
  render() {
    const { navigation } = this.props;
    const cart = navigation.getParam('cart');
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex={false} row style={styles.categories}>
        {(cart.products != null) ? 
        (
             <FlatList
                data={cart.products}   
                renderItem={({ item }) => this.renderCart(item)}
                 keyExtractor={this.keyExtractor}  
                 columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal:10 }}
                  numColumns={3}                
            />
            ) : null
        }
        </Block>
        </ScrollView>
        <View style={styles.viewStyle}>
          <Block style={styles.hLine} />
          <Block row space="between" style={{ paddingHorizontal: 20 }}>
            <Txt bold blue center>Subtotal (14 items)</Txt>
            <Txt bold blue center>{cart.price} MAD</Txt>
          </Block>
          <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CheckoutScreen")}
              >
          <View style={styles.buttonStyle}>
            <Txt bold style={styles.buttonTextStyle}>Go to checkout</Txt>
          </View>
          </TouchableOpacity>
        </View>    
        {/* <Block style={{backgroundColor:'black', height:100}}><Txt>sdd</Txt></Block> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding / 2,
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base / 2,
    marginHorizontal: theme.sizes.base * 2,
    backgroundColor: theme.colors.gray2,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1
  },
  awards: {
    padding: theme.sizes.base,
    marginBottom: theme.sizes.padding
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: "absolute",
    right: theme.sizes.base,
    top: theme.sizes.base
  },
  startTrip: {
    position: "absolute",
    left: (width - 144) / 2,
    bottom: 0
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  camping: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  campingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
    marginTop: 5,
  },
  campingImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 6
  },
  borderBtn: {
    backgroundColor: 'pink',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 22,
    marginLeft: 10,
  },
  borderBtnText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 20
  },
  borderCounter: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 22,
    marginLeft: 10,
  },
  buttonStyle: {
    backgroundColor: '#fc454e',
    width: 350,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
  },
  viewStyle: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 20,
    right: 20
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 6
  }
});