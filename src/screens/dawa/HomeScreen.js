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

const { width, height } = Dimensions.get("screen");

class HomeScreen extends Component {
  state = {
    active: "Products",
    categories: []
  };

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{ flex: 2, flexDirection: "row", justifyContent: "space-between" }}>
            <View style={styles.options}>
              <Ionicons name="menu-outline" size={24} color="black" />
            </View>
            <View style={styles.options}>
              <FontAwesome5 name="tablets" size={24} color="red" />
            </View>
            <View style={styles.settings}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Settings")}
              >
                <AntDesign name="shoppingcart" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderSearch() {
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;
    return (
      <View flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={text => this.setState({ searchString: text })}
          value={searchString}
          onRightPress={() =>
            isEditing ? this.setState({ searchString: null }) : null
          }
          rightStyle={styles.searchRight}
          rightLabel={
            <FontAwesome
              name={isEditing ? "close" : "search"}
              size={theme.sizes.base / 1.6}
              color={theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </View>
    );
  }

  renderOrder() {
    return (
      <Block
        style={styles.orderBlock}
      >
        <Block middle flex={0.2}>
          <FontAwesome name="dot-circle-o" size={24} color="orange" />
        </Block>
        <Block middle>
          <Txt bold size={theme.sizes.base} spacing={0.4} medium >
            Order is being prepared
          </Txt>
          <Txt gray size={theme.sizes.base} spacing={0.4} medium >
            Tap to track
          </Txt>
        </Block>
        <Block middle flex={0.1}>
          <FontAwesome name="arrow-circle-right" size={24} color="blue" />
        </Block>
      </Block>
    );
  }
  renderAwards() {
    return (
      <LinearGradient
        end={{ x: 1, y: 0 }}
        style={styles.awards}
        colors={["#FF988A", theme.colors.accent]}

      >
        <Block middle flex={0.4}>
          <Badge color={rgba(theme.colors.white, "0.2")} size={74}>
            <Badge color={rgba(theme.colors.white, "0.2")} size={52}>
              <FontAwesome5 name="tablets" size={24} color="blue" />
            </Badge>
          </Badge>
        </Block>
        <Block middle>
          <Text size={theme.sizes.base} spacing={0.4} medium white>
            Upload prescription
          </Text>
          <Text size={theme.sizes.base} spacing={0.4} medium white>
            Order now
          </Text>
        </Block>
      </LinearGradient>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;
    const tabs = ["Products", "Inspirations", "Shop"];

    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        {this.renderSearch()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          {this.renderOrder()}
          {this.renderAwards()}
          <Block
            style={{
              marginTop: theme.sizes.base,
              marginBottom: theme.sizes.base,
              paddingHorizontal: theme.sizes.base
            }}
          >
            <Txt bold spacing={0.7} transform="uppercase">
              Shop by category
            </Txt>
          </Block>
          <Block flex={false} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate("Explore", { category })}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge
                    margin={[0, 0, 15]}
                    size={50}
                    color="rgba(41,216,143,0.20)"
                  >
                    <FontAwesome5 name="tablets" size={24} color="orange" />
                    {/* <Image source={category.image} /> */}
                  </Badge>
                  <Txt medium height={14}>
                    {category.name}
                  </Txt>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

HomeScreen.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding * 8,
    backgroundColor: theme.colors.gray4
  },
  headerContainer: {
    top: 0,
    height: height * 0.10,
    width: width,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.15,
    paddingHorizontal: theme.sizes.base,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },

  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base,
    marginBottom: theme.sizes.base * 0.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 3,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 3,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  search: {
    height: theme.sizes.base * 2,
    paddingHorizontal: theme.sizes.base,
    marginBottom: 5,
    justifyContent: "center",
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: "rgba(142, 142, 147, 0.06)",
    borderColor: "rgba(142, 142, 147, 0.06)",
    paddingHorizontal: theme.sizes.base / 1.333,
    borderRadius: 20
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: "transparent"
  },
  searchIcon: {
    position: "absolute",
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  settings: {
    alignItems: "center",
    justifyContent: "center"
  },
  awards: {
    padding: theme.sizes.base / 2,
    marginHorizontal: theme.sizes.base,
    borderRadius: 10,
    flexDirection: "row",
  },
  orderBlock: {
    padding: theme.sizes.base / 2,
    marginHorizontal: theme.sizes.base,
    marginBottom: theme.sizes.base / 2,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: 'lightgray'
  }
});
