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

class ProductsList extends Component {
    state = {
        active: "Products",
        categories: [],
        counter: 0,
    };

    componentDidMount() {
        this.setState({ categories: this.props.categories });
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
                        onPress={this.decrementHalder}
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
                                {this.state.counter}
                            </Txt>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            backgroundColor: 'pink',
                        }}
                        onPress={this.incrementHalder}
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

    render() {
        const { profile, navigation } = this.props;
        const { categories } = this.state;
        const tabs = ["Products", "Inspirations", "Shop"];

        return (
            <SafeAreaView style={styles.container}>
                {this.renderSearch()}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: theme.sizes.base * 2 }}
                >
                    <Block
                        style={{
                            // marginTop: theme.sizes.base/2,
                            marginBottom: theme.sizes.base,
                            paddingHorizontal: theme.sizes.base*2
                        }}
                    >
                        <Txt bold spacing={0.7} transform="uppercase">
                           Products
                        </Txt>
                    </Block>
                    <Block flex={false} row space="around" style={styles.categories}>
                        {categories.map(category => (
                            <TouchableOpacity
                                key={category.name}
                                onPress={() => navigation.navigate("Explore", { category })}
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
                                            <FontAwesome5 name="tablets" size={24} color="orange" />
                                            {/* <Image source={category.image} /> */}
                                        </Badge>
                                    </View>

                                    <Txt medium height={14}>
                                        {category.name} hhgghghghghgggghhg
                                    </Txt>
                                    <Txt medium height={14} style={{ marginTop: 10 }}>
                                        100dh
                                    </Txt>

                                    {/* <Button style={{padding:5, borderWidth:1, borderColor:'red'}} medium height={14}>
                                            <Txt>Add to card</Txt> 
                                            </Button> */}
                                    <View style={{ marginTop: 5 }}>
                                        {this.handleCart()}
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </Block>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

ProductsList.defaultProps = {
    profile: mocks.profile,
    categories: mocks.categories
};

export default ProductsList;

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
