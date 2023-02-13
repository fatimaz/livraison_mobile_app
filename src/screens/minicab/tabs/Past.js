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
import { Block, Badge, Card, Txt, Button } from '../../../components';
import { connect } from 'react-redux';
import { fetchRoutes, addTrip, countDist } from '../../../actions';
import { theme } from '../../../constants';


const { width, height } = Dimensions.get("window");

class Past extends Component {

  state = {
    showTerms: false,
    distance: 0,
    isModalVisible: false,
  };
  constructor(props) {
    super(props)
  }

  //  
  renderTrip() {
    const { navigation } = this.props;
    return (
      <Card shadow>
        <TouchableOpacity
          onPress={() => navigation.navigate('TicketScreen')}
        >
          <Block row>
            <View column>
              <Txt bold caption gray style={{ marginBottom: 5 }}>11/02/2020</Txt>
              <Txt bold black>8:00</Txt>
            </View>

            <Block>
              <Block row center>
                <Badge
                  color={rgba(theme.colors.accent, "0.2")}
                  size={14}
                  style={{ marginRight: 8, marginLeft: 10 }}
                >
                  <Badge color={theme.colors.accent} size={8} />
                </Badge>
                <View style={{ flexDirection: 'column' }}>
                  <Txt bold spacing={0.5} color="black">
                    Rabat
                  </Txt>
                </View>
              </Block>
              <Block row center style={{ paddingVertical: 4 }}>
                <Badge color="gray2" size={4} style={{ marginLeft: 4.5, marginLeft: 15 }} />
              </Block>
              <Block row center>
                <Badge
                  color={rgba(theme.colors.primary, "0.2")}
                  size={14}
                  style={{ marginRight: 8, marginLeft: 10 }}
                >
                  <Badge color={theme.colors.primary} size={8} />
                </Badge>
                <View style={{ flexDirection: 'column' }}>
                  <Txt bold spacing={0.5} color="black">
                    Rabat
                  </Txt>
                </View>
              </Block>
            </Block>
        
          </Block>
          <Block row space="between">
          <View style={{ padding: 5,   alignItems: "center",
              justifyContent: "center", borderRadius: 5, backgroundColor: 'lightgray', marginTop:10 }} >
                <Txt >Z300</Txt>
              </View>
              <View style={{ padding: 5,   alignItems: "center",
              justifyContent: "center", borderRadius: 5,marginTop:10 }}>
                <Txt>Cash 100dh</Txt>
              </View>
              </Block>
        </TouchableOpacity>
      </Card>
    );
  };

  renderTrips() {
    return (
      <React.Fragment>
        {this.renderTrip()}
        {this.renderTrip()}
        {this.renderTrip()}
        {this.renderTrip()}
      </React.Fragment>
    );
  }
  //  componentDidMount() {
  //    this.props.fetchVehicles();
  //    const { navigation } = this.props;
  //    const locations = navigation.getParam('locations');
  //    const location_from =locations.location_from;
  //    const location_to = locations.location_to;
  //    this.props.countDist({location_from, location_to});
  //  }
  _onRefreshTrips() {
    this.props.fetchRoutes();
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
    loading: state.routes.loading,
    data: state.routes.routes,

    //loading: state.sendlocation.loading,
    sent: state.sendlocation.sent,
    distance: state.sendlocation.distance,
  };
};

export default connect(mapStateToProps, { fetchRoutes, countDist })(Past);

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