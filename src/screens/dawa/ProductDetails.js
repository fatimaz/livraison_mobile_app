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
              Buy
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
      )
    }

  }

  render() {

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
          <Image source={require('../../res/p.png')} style={{ resizeMode: 'contain', flex: 1 }} />
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ddd</Text>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 14 }}>Delivery in 2 hours</Text>
            <View style={styles.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: theme.colors.white,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                DH33
              </Text>
            </View>
          </View>
          <View style={styles.hLine} />

          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Description</Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries.
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
    alignItems: 'center',
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
    marginVertical: theme.sizes.base / 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
    backgroundColor: theme.colors.gray2,
  },
});


