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
  Image
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Block, Badge, Card, Txt , Button} from '../../components';
import { Header } from 'react-native-elements';
import { theme, mocks } from "../../constants";
const { width, height } = Dimensions.get("screen");

import { connect } from 'react-redux';


class GareScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedLocation: '',
        btnDisabled: true,
        categories: []
    };
}


componentDidMount() {
    this.setState({ categories: this.props.categories });
  }
//  onLocationSelected(item, id) {
//     const { navigation } = this.props;
//     navigation.state.params.onGoBack(item, id);
//     navigation.goBack();
// }
setSelectedLocation(item){
    this.setState({ searchResult: null, selectedLocation: item });
    const { navigation } = this.props;
    navigation.state.params.onGoBack(item.name);
    navigation.goBack();
    // this.map.animateToRegion(
    //     {
    //         latitude: item.latitude,
    //         longitude: item.longitude
    //     },
    //     350
    // );
}
//   _onRefreshCountries() {
//   const { navigation } = this.props;
//    this.props.fetchCountries();
// }

  renderHeader() {
    return (
    <View style={styles.headerContainer}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Pays
       </Text>        
    </View>
    );
  }

  renderList = ( item ) => {
    const { navigation } = this.props; 
      return (
        <View style={styles.section}>
        <TouchableOpacity
            key={item.id}    
            // onPress={() => this.onLocationSelected(item.name, item.id)}
            onPress={() => this.setSelectedLocation(item)}
             // onPress={() => navigation.navigate('AddShipment', { t: item.name})} 
            // {this.onLocationSelected(item.name)}
            // onPress={() => navigation.navigate('OneTutor', { item: item })}  
            >    
            <View style={styles.option}>
                 {/* <FontAwesome name='angle-right' size={24} /> */}
                 {/* <Image
                      resizeMode="contain"
                      source= {require("../assets/icons/back.png")}
                      style={{ width: 20, height: 24, marginRight: 10}}
                  /> */}
                 <Text style={{ fontWeight: '500', fontSize:17 }}>{item.name}</Text>  
            </View>
       </TouchableOpacity>       
      </View>
      );
  }
  keyExtractor = (item, index) => index;
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView  style={styles.container}>      
        {/* {this.renderHeader()}     */}
      
        {(this.props.categories != null) ? 
         (
          <FlatList
                data={this.state.categories}   
                renderItem={({ item }) => this.renderList(item)}
                keyExtractor={this.keyExtractor}  
                // refreshControl={
                //   <RefreshControl
                //     refreshing={this.props.fetching}
                //     onRefresh={this._onRefreshCountries.bind(this)}
                //   />
                // }           
            />
            ) : null
          }   
      </SafeAreaView>
    );
  }
}



GareScreen.defaultProps = {
    profile: mocks.profile,
    categories: mocks.countries
  };
export default GareScreen;

const styles = StyleSheet.create({

    container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding/3,
    backgroundColor: theme.colors.gray4
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
  },
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },

  headerContainer: {
    top: 0,
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  
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
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent"
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10
  },
  activeTab: {
    borderBottomColor: "#FF7657"
  },
  activeTabTitle: {
    color: "#FF7657"
  },
  map: {
    flex: 1
  },
  camping: {
    flex: 1,
    flexDirection: "row",
 
  },
  cardcamping:{
    // borderBottomColor: "#A5A5A5",
    // borderBottomWidth: 0.5,
    // padding: 20
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
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
    height: width * 0.15,
    borderRadius: 6
  },
  campingImageUser:{
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 6 
  },
  userImage:{
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 6
  },
  pendingBtn: {
    flexDirection: 'row',
    width:100,
    backgroundColor: theme.colors.rose,
    borderRadius: 9,
    alignItems: 'flex-end',
},
cancelText: {
    color: theme.colors.white,
    fontSize: theme.sizes.base * 0.8 ,
    paddingLeft: theme.sizes.base / 4,
  },
  emptyMessageStyle: {
    textAlign: 'center',
  },
  section: {
      flexDirection: 'column',
      marginHorizontal: 14,
      marginBottom: 10,
      paddingBottom: 10,
      borderBottomColor: '#EAEAED',
      borderBottomWidth: 1,
  },
   title: {
        fontSize: 18,
        marginVertical: 14,
        color: theme.colors.primary
   },
    option: {
        marginBottom: 10,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
      },
});