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
    ActivityIndicator
} from "react-native";

import { Card, Badge, Button, Block, Txt, Input } from "../../components";
import { theme } from "../../constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addCartItems, editCartItems, DeleteCart, fetchMyCart, fetchProducts } from '../../actions';

const { width, height } = Dimensions.get("screen");

class ProductsList extends Component {
    state = {
        active: "Products",
        categories: [],
        counter: 0,
    };

    componentDidMount() {
        // this.setState({ categories: this.props.categories });
        // this.props.fetchMyCart();
        this.props.fetchProducts();
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


    incrementHalder = (item) => {
        // if (counter !== 3) {
        //   this.setState(prevState => ({ counter: prevState.counter + 1 }))
        // }
        // const { counter, qty } = this.state;
        // const { navigation } = this.props;
        // if (counter !== 5) {
        //   this.setState(prevState => ({ counter: prevState.counter + 1 }))
        // }
        // const { counter } = this.state;
        // this.setState(prevState => ({ counter: prevState.counter + 1 }))
        const cart_id = 33;
        const product_id = 7;
        const count = 1;
        const cost = 1;
        const action = 'increase';
        this.props.addCartItems({ cart_id, product_id, count, cost })
    }
    decrementHalder = (item) => {
        const { counter } = this.state;
        // if (counter !== 0) {
        //     this.setState(prevState => ({ counter: prevState.counter - 1 }))
        // }
        const cart_id = 34;
        const product_id = 7;
        const count = 1;
        const cost = 1;
        const id = 1
        const action = 'increase';
        // this.props.editCartItems({id, cart_id, product_id, count, cost })

    }


    changeHalder() {
        const { counter } = this.state;
        this.setState(prevState => ({ counter: prevState.counter + 1 }))
    }

    handleCart(item) {
        const { counter } = this.state;
        // if (counter == 0) {
        if (item.cartproduct_count == 0) {
            return (
                <Button gradient style={{ height: 35 }} onPress={this.changeHalder.bind(this)}>
                    <Txt bold white center>Add to card</Txt>
                </Button>
            )
        } else {
            return (
                <View style={{
                    height: 35,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 7,
                }}>
                    <TouchableOpacity
                        style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'pink',
                            borderRadius: 5,
                        }}
                        onPress={this.decrementHalder(item)}
                    >
                        <Txt style={{ fontSize: 20, color: theme.colors.red }}>-</Txt>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <View style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            borderRadius: 5,
                            backgroundColor: 'lightgray'
                        }}>
                            <Txt h4>
                                {item.cartproduct_count}
                            </Txt>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 35,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'pink',
                        }}
                        onPress={this.incrementHalder(item)}
                    >
                        <Txt style={{ fontSize: 20, color: theme.colors.red }}>+</Txt>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    handleAddToCart() {
        alert(1)
    }
    renderList = (item) => {
        const { navigation } = this.props;
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate("ProductDetails", { product: item })}
            >
                <Card shadow style={styles.category}>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 10
                    }}>
                        <Badge
                            margin={[0, 0, 15]}
                            size={50}
                            color="white"
                        >
                            <Image style={styles.avatar} source={{ uri: item.photo }} />
                        </Badge>
                    </View>

                    <Txt medium height={14}>
                        {item.name}
                    </Txt>
                    <Txt medium height={14} style={{ marginTop: 10 }}>
                        {item.price}dh
                        {item.cartproduct.count}
                    </Txt>
                    <View style={{ marginTop: 5 }}>
                        {/* <Txt bols>{item.cartproduct.count}</Txt> */}
                        {this.handleCart(item)}
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }
    keyExtractor = (index) => index;
    render() {
        const { navigation } = this.props;
        const product = navigation.getParam('product');
        return (
            <SafeAreaView style={styles.container}>
                {this.renderSearch()}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: theme.sizes.base * 2 }}
                >
                    <Block
                        style={{
                            marginBottom: theme.sizes.base,
                            paddingHorizontal: theme.sizes.base * 2
                        }}
                    >
                        <Txt bold spacing={0.7} transform="uppercase">
                            {product.name}
                        </Txt>
                    </Block>
                    <Block flex={false} row style={styles.categories}>
                        {(this.props.products != null) ?
                            (
                                <FlatList
                                    data={this.props.products}
                                    renderItem={({ item }) => this.renderList(item)}
                                    keyExtractor={this.keyExtractor}
                                    columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
                                    numColumns={2}
                                />
                            ) : null
                        }
                        {this.props.fetching &&
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#03A9F4" />
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
        editing: state.editcart.editing,
        errorCart: state.editcart.error,
        saved: state.editcart.saved,

        errorcart: state.carts.error,
        fetchingcart: state.carts.loading,
        cart: state.carts.carts,


        error: state.products.error,
        fetching: state.products.loading,
        products: state.products.products,

        erroradding: state.addcartitem.error,
        loading: state.addcartitem.loading,
        added: state.addcartitem.saved
    }
}

export default connect(mapStateToProps, { addCartItems, editCartItems, DeleteCart, fetchMyCart, fetchProducts })(ProductsList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: theme.sizes.padding,
        paddingHorizontal: theme.sizes.padding * 8,
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
        flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base,
        marginBottom: theme.sizes.base * 0.5,

    },
    category: {
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 0.5,
    },
    search: {
        height: theme.sizes.base * 2,
        paddingHorizontal: theme.sizes.base,
        marginVertical: 5,
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
});
