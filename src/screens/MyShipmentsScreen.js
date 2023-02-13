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
import { Block, Badge, Card, Txt, Button } from '../components';
import { theme } from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchMyShipments, cancelOffer } from '../actions';
import { connect } from 'react-redux';
import rgba from "hex-to-rgba";
const { width, height } = Dimensions.get("screen");



class MyShipmentsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isModalVisible: false,
    isRequestVisible: false,
    showTerms: false
  };

  componentDidMount() {
    this.props.fetchMyShipments();
    //  this.didFocusListener = this.props.navigation.addListener(
    //   'didFocus',
    //   () => {    this.props.fetchMyShipments(); },
    // );
  }

  _onRefreshShipments() {
    this.props.fetchMyShipments();
  }

  // _onRefreshOffers() {
  // const { navigation } = this.props;
  // this.props.fetchOffers();
  // }

  renderList = (item) => {
    const { navigation } = this.props;
    return (
      <Card shadow>
        <TouchableOpacity
          key={item.name}
          onPress={() => navigation.navigate('ShipmentsOffers', { shipment: item, mine: 1 })}
        >
          <View style={styles.camping}>
            <ImageBackground
              style={styles.campingImage}
              imageStyle={styles.campingImage}
              source={{ uri: item.photo }}
            />
            <View style={styles.campingDetails}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <Txt bold style={{ fontSize: 18 }}>
                  {item.name}
                </Txt>
                <Block row space="between" style={{ marginTop: 5 }}>
                  <Txt style={{ fontSize: 16, color: "#A5A5A5" }}>
                    {item.countries.name}
                  </Txt>
                  <Ionicons
                    name="airplane-outline"
                    color="#FF7657"
                    size={20}
                  />
                  <Txt style={{ fontSize: 16, color: "#A5A5A5" }}>
                    {item.countriesto.name}
                  </Txt>
                </Block>
              </View>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 7 }}>
                <View style={styles.campingInfo}>
                  <Ionicons
                    name="md-pricetag"
                    color="#FF7657"
                    size={14}
                  />
                  <Txt gray style={{ fontSize: 14, marginLeft: 4 }}>
                    Récompense voyageur {item.reward}€
                  </Txt>
                </View>
                {/* <View style={styles.campingInfo}>
                <MaterialCommunityIcons
                  name="weight"
                  color="#FF7657"
                  size={14}
                />
                <Txt bold gray style={{  fontSize: 14, marginLeft: 4 }}>
                 { item.weight } g
                </Txt>
              </View> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View>
        </View>
        {/* {this.showButtonOffers(item.offers.length)} */}
        {/* { this.state.isRequestVisible &&  */}
        {/* {this.showList()} */}
        {/* {this.props.loading && 
                        <View style={styles.fetching}>
                            <ActivityIndicator size="large" color="#03A9F4"/>
                        </View> 
            }       */}
        {/* {this.offersExist(item.count_orders)} */}
        {(item.offers.length > 0) ?
          (
            <View style={styles.offreStyle}>
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                color="#64B5F6"
                size={16}
              />
              {(item.offers.length == 1) ?
                (
                  <Txt bold style={{ fontSize: 14, marginLeft: 4, color: "#64B5F6" }}>
                    {item.offers.length} offre
                  </Txt>
                ) :
                <Txt bold style={{ fontSize: 14, marginLeft: 4, color: "#64B5F6" }}>
                  {item.offers.length} offres
                </Txt>
              }
            </View>
          ) :
          <View style={styles.offreStyle}>
            <MaterialCommunityIcons
              name="timer-sand-empty"
              color="lightgray"
              size={16}
            />
            <Txt style={{ fontSize: 14, marginLeft: 4 }}>
              Pas d'offre
            </Txt>
          </View>
        }
      </Card>
    );
  }
  keyExtractor = (item, index) => index;
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>
            Commandes
          </Txt>
          <TouchableOpacity center middle style={styles.sendMsg} activeOpacity={0.8} onPress={() => navigation.navigate('AddShipment')}>
            <FontAwesome name='plus' size={30} color={theme.colors.primary} />
          </TouchableOpacity>
        </Block>

        {(!this.props.loading && this.props.data != null) ?
          (
            <FlatList
              data={this.props.data}
              renderItem={({ item }) => this.renderList(item)}
              // keyExtractor={item => item.id.toString() } 
              keyExtractor={this.keyExtractor}
              extraData={this.state}
              refreshControl={
                <RefreshControl
                  enabled={true}
                  refreshing={this.props.loading}
                  onRefresh={this._onRefreshShipments.bind(this)}
                />
              }
              ListHeaderComponent={() => (!this.props.data.length ?
                <View><Text style={styles.emptyMessageStyle}>Vous n'avez aucune commande </Text>
                  <Button gradient style={{ margin: 10 }}
                    onPress={() => navigation.navigate('AddShipment')}>
                    <Txt bold white center>Ajouter une commande</Txt>
                  </Button>
                </View>
                : null)
              }
            />
          ) : null
        }
        {this.props.loading &&
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#03A9F4" />
          </View>
        }


        {/* {(!this.props.fetching && this.props.data != null && this.props.data.length) ? 
            (  
              <Button gradient style={{margin:10}} 
                              onPress={() =>  navigation.navigate('AddShipment')}>
                                  <Txt bold white center>Ajouter une expédition</Txt>
              </Button> 
              ) : null
              } */}

      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.myshipments.loading,
    data: state.myshipments.myshipments,
    error: state.cancelOffer.error,
    loadingcancel: state.cancelOffer.loading,
    saved: state.cancelOffer.saved

  };
};

export default connect(mapStateToProps, { fetchMyShipments, cancelOffer })(MyShipmentsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: theme.sizes.padding,
    // paddingHorizontal: theme.sizes.padding/3,
    backgroundColor: theme.colors.gray4
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingTop: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  hLine: {
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base,
    height: 1,
  },
  hLineCommande: {
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base / 2,
    borderRadius: 20,
    width: 100,
    height: 10,
  },
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },

  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7657"
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF"
  },
  rvMarker: {
    backgroundColor: "#FFBA5A"
  },
  tentMarker: {
    backgroundColor: "#FF7657"
  },
  settings: {
    alignItems: "center",
    justifyContent: "center"
  },

  camping: {
    flex: 1,
    flexDirection: "row",

  },
  cardcamping: {
    // borderBottomColor: "#A5A5A5",
    // borderBottomWidth: 0.5,
    // padding: 20
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 8,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  campingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    marginTop: 10
  },
  offreStyle: {
    flexDirection: "row",
    textAlign: "right",
    // alignItems: "right",
    marginRight: 5,
    marginTop: 10
  },
  campingImage: {
    width: width * 0.20,
    height: width * 0.18,
    borderRadius: 6
  },
  campingImageUser: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 6
  },
  avatar: {
    width: theme.sizes.padding * 1.7,
    height: theme.sizes.padding * 1.7,
    marginRight: 10,
    borderRadius: theme.sizes.padding,
    borderWidth: 2,
    borderColor: theme.colors.gray2
  },
  pendingBtn: {
    width: 100,
    backgroundColor: theme.colors.rose,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    color: theme.colors.white,
    fontSize: theme.sizes.base * 0.8,
  },
  emptyMessageStyle: {
    textAlign: 'center',
  },
  option: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionOffer: {
    // paddingVertical: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 14,
    marginVertical: 5
  },
});