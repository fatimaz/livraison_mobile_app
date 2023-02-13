import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ImageBackground
} from "react-native";

import { Card, Badge, Button, Block, Txt, Input } from "../../components";
import { theme, mocks } from "../../constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import rgba from "hex-to-rgba";
import LinearGradient from 'react-native-linear-gradient';


// const { width } = Dimensions.get("window");
const { width, height } = Dimensions.get("screen");

class ProductDetails extends Component {

  state = {
    active: "Products",
    categories: [],
    counter: 0,
  };
  incrementHalder = () => {
    const { counter } = this.state;
    this.setState(prevState => ({ counter: prevState.counter + 1 }))
    // if (counter !== 3) {
    //   this.setState(prevState => ({ counter: prevState.counter + 1 }))
    // }
  }
  decrementHalder = () => {
    const { counter } = this.state;
    if (counter !== 0) {
      this.setState(prevState => ({ counter: prevState.counter - 1 }))
    }

  }



  changeHalder() {
    const { counter } = this.state;
    this.setState(prevState => ({ counter: prevState.counter + 1 }))
  }
  handleCart() {
    const { counter } = this.state;
    if (counter == 0) {
      return (
        <TouchableOpacity
          onPress={this.changeHalder.bind(this)}>
          <View style={styles.buyBtn}>
            <Text
              style={{ color: theme.colors.white, fontSize: 18, fontWeight: 'bold' }}>
            Add to Cart
            </Text>
          </View>
        </TouchableOpacity>
        // <Button gradient style={{ height: 35 }} onPress={this.changeHalder.bind(this)}>
        //     <Txt bold white center>Add to card</Txt>
        // </Button>
      )

    } else {
      return (
        <View
        style={{
          flexDirection: 'row',
          flex:1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={this.decrementHalder}>
            <View style={styles.borderBtn}>
              <Text style={styles.borderBtnText}>-</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 10,
              fontWeight: 'bold',
            }}>
            {this.state.counter}
          </Text>
          <TouchableOpacity
            onPress={this.incrementHalder}
          >
            <View style={styles.borderBtn}>
              <Text style={styles.borderBtnText}>+</Text>
            </View>
          </TouchableOpacity>

         
        </View>
        <Txt bold>MAD 767</Txt>
        </View>  
      )
    }

  }

  render() {
    const { profile, navigation } = this.props;
    const product = navigation.getParam('product');
    const id = navigation.getParam('id');
    const name = navigation.getParam('name');
    const description = navigation.getParam('description');
    const price = navigation.getParam('price');
    const image = navigation.getParam('image');
    const length = navigation.getParam('length');


    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.white,
        }}>
        {/* <ScrollView showsVerticalScrollIndicator={false}  style={{
              flex: 1,
               */}
        {/* }}> */}

        <View style={styles.header}>
          <Ionicons name={"md-arrow-back"} size={28} onPress={() => navigation.goBack()} />
          <AntDesign name="shoppingcart" size={24} color="black" onPress={() => navigation.goBack()} />
          {/* <FontAwesome name="arrow-back" size={28} onPress={() => navigation.goBack()} />  */}
          {/* <FontAwesome name="shopping-cart" size={28} />  */}
        </View>
        <View style={styles.imageContainer}>
          <Image  source={{uri:image }} style={{ flex: 1 }} />
          
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 14 }}>small 5 pcs 30g per piece</Text>
            <View style={styles.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: theme.colors.white,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                DH {price}
              </Text>
            </View>
          </View>
          <View style={styles.hLine} />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ingredients</Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
                marginBottom:30
              }}>
              {description}
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {this.handleCart()}

            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}

ProductDetails.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories
};

export default ProductDetails;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.25,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.75,
    backgroundColor: theme.colors.gray4,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 205,
    height: 2,
    backgroundColor: theme.colors.gray2,
    marginBottom: 5,
    marginRight: 3,

  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: 'bold', fontSize: 28 },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: theme.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: theme.colors.red,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
    backgroundColor: theme.colors.gray2,
  },
});


