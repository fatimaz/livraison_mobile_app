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
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { Card, Badge, Button, Block, Txt, Input } from "../../components";
import { theme } from "../../constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { fetchCategories} from '../../actions';

const { width, height } = Dimensions.get("screen");

class HomeScreen extends Component {
  state = {
    active: "Products",
    categories: []
  };

  componentDidMount() {
      this.props.fetchCategories();

    // this.setState({ categories: this.props.categories });
  }
  _onRefreshCategories() {
    const { navigation } = this.props;
     this.props.fetchCategories();
  }
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{ flex: 2, flexDirection: "row", justifyContent: "space-between" }}>
            <MaterialCommunityIcons name="bread-slice-outline" size={24} color="black" />
            <Txt bold>Delivery to</Txt>
            <View style={styles.settings}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MyCartScreen")}
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
  renderAds() {
    return (
      <LinearGradient
        end={{ x: 1, y: 0 }}
        style={styles.awards}
        colors={["#FF988A", theme.colors.accent]}
      >
        <Block middle flex={1} style={styles.awards}>
          {/* <Badge color={rgba(theme.colors.white, "0.2")} size={74}>
            <Badge color={rgba(theme.colors.white, "0.2")} size={52}> */}
          {/* <MaterialCommunityIcons name="food-croissant" size={24} color="blue" /> */}
          <Image
            source={require('../../res/cr.png')}
            // resizeMode="contain"
            style={{ width, height: height / 10, overflow: "visible", padding: 10 }}
          />
          {/* </Badge>
          </Badge> */}
        </Block>
        {/* <Block middle>
          <Text size={theme.sizes.base} spacing={0.4} medium white>
            Croissant
          </Text>
          <Text size={theme.sizes.base} spacing={0.4} medium white>
            Order now
          </Text>
        </Block> */}
      </LinearGradient>
    );
  }

  renderList = ( item ) => {
    const {  navigation } = this.props;
    return (
      <TouchableOpacity
      key={item.name}
      onPress={() => navigation.navigate("RestaurantScreen", { product: item.products, navigation })}>
      <Card center middle shadow style={styles.category}>
        <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
          <Image  style={styles.avatar} source={{uri:item.photo }} />
        </Badge>
        <Txt medium height={20}>{item.name}</Txt>
      </Card>
    </TouchableOpacity>
    )
  }
  keyExtractor = (item, index) => index;
  render() {
    const { profile, navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        {/* //{this.renderSearch()} */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base / 2 }}
        >
          {this.renderAds()}
          {/* {this.renderOrder()} */}
          <Block
            style={{
              marginTop: theme.sizes.base,
              marginBottom: theme.sizes.base,
              paddingHorizontal: theme.sizes.base*2
            }}
          >
            <Txt bold spacing={0.7} transform="uppercase">
              Bakeries
            </Txt>
          </Block>
          <Block flex={false} row style={styles.categories}>
            {/*  */}
            {(!this.props.fetching && this.props.data != null) ? 
         (
          <FlatList
                data={this.props.data}   
                renderItem={({ item }) => this.renderList(item)}
                 keyExtractor={this.keyExtractor}  
                 columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal:10 }}
                  numColumns={3}
                  refreshControl={
                  <RefreshControl
                    enabled={true}
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshCategories.bind(this)}
                  />
                } 
                 ListHeaderComponent={() => (!this.props.data.length? 
                  <Txt center style={styles.emptyMessageStyle}>Aucun résultat trouvé</Txt>  
                  : null)
                }         
            />
            ) : null
          }
          {this.props.fetching && 
             <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#03A9F4"/>     
              </View> 
          } 
          </Block>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
  return {
      error: state.categories.error,
      fetching: state.categories.loading,
      data: state.categories.categories,
  };
};

export default connect(mapStateToProps, { fetchCategories })(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    backgroundColor: theme.colors.white
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
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base,
  },
  category: {
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

  settings: {
    alignItems: "center",
    justifyContent: "center"
  },
  awards: {
    padding: theme.sizes.base,
    marginHorizontal: theme.sizes.base,
    borderRadius: 10,
    flexDirection: "row",
  },
  orderBlock: {
    padding: theme.sizes.base / 2,
    marginHorizontal: theme.sizes.base,
    marginTop: theme.sizes.base / 2,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  emptyMessageStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
    marginTop:50
  },

});
