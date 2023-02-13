import React, { Component } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    SafeAreaView,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Image,
    Modal,
    Alert
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import rgba from "hex-to-rgba";
import { Block, Badge, Card, Txt, Button } from '../../components';
import { connect } from 'react-redux';
import { fetchRoutes, addTrip, countDist } from '../../actions';
import { theme } from '../../constants';


const { width, height } = Dimensions.get("window");

class RoutesScreen extends Component {

    state = {
        showTerms: false,
        distance: 0,
        isModalVisible: false,
    };
    constructor(props) {
        super(props)
    }

    componentDidMount() {  
        const { navigation } = this.props;
        const locations = navigation.getParam('locations');
        const location_from =locations.location_from;
        const location_to = locations.location_to;
        const counter = locations.counter;
        const pickup_date = locations.pickup_date;
        alert(pickup_date)
        this.props.fetchRoutes( { location_from, location_to, counter, pickup_date });
      }

    _onRefreshTrips() {
        const { navigation } = this.props;
        const locations = navigation.getParam('locations');
        const location_from =locations.location_from;
        const location_to = locations.location_to;
        const counter = locations.counter;
        const pickup_date = locations.pickup_date;

      
        this.props.fetchRoutes( { location_from, location_to, counter, pickup_date });
    }

    renderButton() {
        const { navigation } = this.props;
        return (
            <TouchableOpacity center middle style={styles.startTrip} activeOpacity={0.8} onPress={() => navigation.navigate("Shipments")}>
                <Badge color={theme.colors.accent} size={52}>
                    <FAIcon name="plus" size={62 / 2.5} color="white" />
                </Badge>
            </TouchableOpacity>
        )
    }

    //  
    renderTrip = ( item ) => {
        const {  navigation } = this.props;
        return (
            <Card shadow>
                     <TouchableOpacity

          onPress={() => navigation.navigate('TripDetails', {  item })}     
        >
                {/* <Block row space="between" style={{ marginBottom: theme.sizes.base }}>
          <Txt gray spacing={0.5} caption>
          Lundi
          </Txt>
          <Txt spacing={0.5} caption medium primary>
          12:00
          </Txt>
          <Txt spacing={0.5} caption>
          2seats left
          </Txt>
        </Block> */}
                <Block row>
                    {/* <View column>
                        <Txt caption gray style={{marginBottom:5}}>Lundi</Txt>
                        <Txt bold black>8:00</Txt>

                    </View> */}

                    <Block>
                        <Block row center>
                            <Txt bold gray caption>13:40</Txt>
                            <Badge
                                color={rgba(theme.colors.accent, "0.2")}
                                size={14}
                                style={{ marginRight: 8, marginLeft:10 }}
                            >
                                <Badge color={theme.colors.accent} size={8} />
                            </Badge>
                            <View style={{flexDirection:'column'}}>
                            <Txt spacing={0.5} color="gray">

                            {item.ligne.station1.name}
                            </Txt>
                            <Txt bold spacing={0.5} color="black">
                            {item.ligne.station1.ville.name}
                            </Txt>
                            </View>             
                        </Block>

                        <Block row center style={{ paddingVertical: 4 }}>
                        <Txt style={{color:'white'}}>8:00</Txt>
                            <Badge color="lightgray" size={4} style={{ marginLeft: 4.5, marginLeft:15 }} />
                        </Block>
                        <Block row center>
                        <Txt bold gray caption>{item.hour}</Txt>
                            <Badge
                                color={rgba(theme.colors.primary, "0.2")}
                                size={14}
                                style={{ marginRight: 8, marginLeft:10 }}
                            >
                                <Badge color={theme.colors.primary} size={8} />
                            </Badge>
                            <View style={{flexDirection:'column'}}>
                            <Txt spacing={0.5} color="gray">
                            {item.ligne.station2.name}
                            </Txt>
                            <Txt bold spacing={0.5} color="black">
                       
                            {item.ligne.station2.ville.name}
                            </Txt>
                            </View>
                        </Block>
                    </Block>
                    {/* <Txt style={{color:"#FF7657"}} >120DH</Txt> */}
                    {/* <MaterialCommunityIcons
                        name="seatbelt"
                        color="#FF7657"
                        size={20}
                    /> */}
                </Block>
                 <Block flex={false} color="lightgray" style={styles.hLine} />
                <Block row space="between" style={{paddingHorizontal:10}}>
                    <View style={{ alignItems: "center",justifyContent: "center",padding:5, borderRadius:5,backgroundColor:'lightgray' }} > 
                    <Txt>{item.line_num}</Txt>
                       {/* <Txt>2</Txt>
                    <MaterialCommunityIcons
                        name="seatbelt"
                        color="#FF7657"
                        size={20}
                    /> 
                    <Txt>| 3hours</Txt> */}
                    </View>
                            <Txt style={{color:"#FF7657"}} bold>{item.price} DH</Txt>
                     </Block> 
                     </TouchableOpacity>
            </Card>
        );
    };

    renderTrips() {
        return (
            <React.Fragment>
                <Block style={{ marginBottom: theme.sizes.base }}>
                    <Txt spacing={0.4} transform="uppercase">
                        Recent Trips
                    </Txt>
                </Block>
                <FlatList
                    data={this.props.data}   
                    renderItem={({ item }) => this.renderTrip(item)}
                    keyExtractor={this.keyExtractor}  
                    refreshControl={
                    <RefreshControl
                        refreshing={this.props.fetching}
                        onRefresh={this._onRefreshTrips.bind(this)}
                    />
                }
                
                  />
            </React.Fragment>
        );
    }



    keyExtractor = (item, index) => index;
    render() {
        return (
            <React.Fragment>
                <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
                    {this.renderTrips()} 
                </ScrollView>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        error: state.routes.error,
        fetching: state.routes.loading,
        data: state.routes.routes,

        //loading: state.sendlocation.loading,
        sent: state.sendlocation.sent,
        distance: state.sendlocation.distance,
    };
};

export default connect(mapStateToProps, { fetchRoutes, countDist })(RoutesScreen);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: theme.sizes.padding,
        paddingHorizontal: theme.sizes.padding / 8,
        backgroundColor: theme.colors.gray4
    },
    hLine: {
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base,
        height: 1,
    },

    headerContainer: {
        top: 0,
        width: width,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    camping: {
        flex: 1,
        flexDirection: "row",

    },
    campingDetails: {
        flex: 2,
        paddingLeft: 5,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    campingInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 14
    },
    campingImage: {
        width: width * 0.20,
        height: width * 0.16,
        borderRadius: 6
    },
    startTrip: {
        position: 'absolute',
        right: (width - 330) / 2,
        bottom: 10,
    },
    avatar: {
        width: theme.sizes.padding * 1.4,
        height: theme.sizes.padding * 1.4,
        marginRight: 10,
        borderRadius: theme.sizes.padding * 4,
        borderWidth: 2,
        borderColor: theme.colors.gray2
    },
    pendingBtn: {
        width: 120,
        backgroundColor: theme.colors.accent,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cancelText: {
        color: theme.colors.white,
        fontSize: theme.sizes.base * 0.8,
    },
    emptyMessageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 50
    },
    welcome: {
        paddingVertical: theme.sizes.padding,
        paddingHorizontal: theme.sizes.padding / 2,
        backgroundColor: theme.colors.gray4
    },
    // horizontal line

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
    }
});