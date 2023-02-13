import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView,TextInput,TouchableOpacity, Text , Container } from 'react-native';
// import MapView , { Marker, Location } from 'react-native-maps';
import { FormLabel, FormInput, List, ListItem, ThemeConsumer } from 'react-native-elements';
import axios from 'axios';
import { Block, Badge, Card, Txt, Input ,Button, Spinner} from "../../components";
// import apiKey from "../google_api_key";
import { theme, mocks } from "../../constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createAppContainer } from 'react-navigation';




const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.048;
const LONG_DELTA = LAT_DELTA * ASPECT_RATIO;

class LocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initMap: true,
            userLocation: {},
            query: '',
            searchResult: null,
            selectedLocation: null,
            btnDisabled: true
        };
    }
 
 

    async componentDidMount(){
               //getCurrentPositionAsync.
            //    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            //    const userLocation = { latitude, longitude };
            //    this.setState({ initMap: false, userLocation });
            this.setState({ initMap: false });
    }
    search(){
        //google api later
         let searchResult = [];
         for (let i=0; i < 50 ; i++) {
            searchResult[i] = { name: `Name ${i}`, address:`Address ${i}` };
        //   searchResult[i] = { name: `Name ${i}`, address:`Address ${i}`, latitude: 48.85880774018563, longitude: 2.3104028933020424 };
      }
        this.setState({ searchResult });
    }

    //search with google
    // search = async () => {
    //     let endPoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
    //     endPoint += this.state.query;
    //     endPoint += `&key=${FbConfig.mapAPIKey}`;
    //     try {
    //         const { data } = await axios.get(endPoint);
    //         this.setState({ searchResult: data.results });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
 
    toggleSearchResult(){
      const {params} = this.props.navigation.state;
       if (!this.state.searchResult)return;
     return (
            <ScrollView style={{ height:200,marginBottom: 20 }}>
                <View style={{ marginHorizontal: 15 }}>      
                {
                    this.state.searchResult.map((item, i) => (
                        <View style={styles.section}>
                        <TouchableOpacity
                            key={item.id}    
                            // onPress={this.setSelectedLocation.bind(this, item)}
                            onPress={() => this.setSelectedLocation(item)}
                            >    
                            <View style={styles.option}>
                                <Block column>
                                 <Text style={{ fontWeight: '500', fontSize:17 }}>{item.name}</Text> 
                                 <Txt gray style={{ fontWeight: '500', fontSize:17 }}>{item.address}</Txt> 
                                 </Block>
                                 <FontAwesome name='angle-right' size={24} /> 
                            </View>
                       </TouchableOpacity>       
                      </View>
                    ))
                }
                </View>
            </ScrollView>
        );
 
    }

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
    // show map marker
    // showMapMarker() {
    //     if (!this.state.selectedLocation) return;
    //     const { latitude, longitude, name } = this.state.selectedLocation;
    //     return (
    //         <MapView.Marker
    //             title={name}
    //             coordinate={{ latitude, longitude }}
    //         />
    //     );
    // }
    onLocationSel() {
        const { navigation } = this.props;
        navigation.state.params.onGoBack(this.state.selectedLocation);
        navigation.goBack();
    }
    renderButton(){
        if (this.state.selectedLocation) {
            return(
                <Button gradient style={{marginHorizontal:10}} onPress={this.onLocationSel.bind(this)}>
                     <Txt bold white center>Confirmer</Txt>          
                </Button>
            )
        }
    }

    render() {
        if (this.state.initMap) {
            return <Spinner />;
        }
        const { query } = this.state;

        return (
        // <ScrollView >
        <View style={{flex:1}}>
                  <View style={styles.search}>
                       <View style={styles.inputWrapper}>
                           <View style={styles.pinkDot}/> 
                           {/* <FontAwesome name="search" style={{marginRight:10}} size={18} /> */}
                           <TextInput
                            placeholder="Indiquez votre destination"
                            placeholderTextColor="#afb1b6"
                            onSubmitEditing={() => this.search()}
                            onChangeText={(query) => this.setState({ query})}
                            autoCorrect={false}
                            />
                          <FontAwesome name="remove" style={{marginRight:10}} size={18} />
                       </View>
                       {/* <View><Feather name="heart" size={20}/></View> */}
                   </View>
               
                   { this.toggleSearchResult() }
        </View>
 
     );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white
    },
    destinationInput: {
        height: 40,
        borderWidth: 0.5,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: "white"
      },
      search:{
        marginVertical:10,
        marginHorizontal:15,
        padding:10,
        backgroundColor: '#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderRadius: 20,
        borderColor:'#efeff0',
        borderWidth:2,
     },
     inputWrapper:{
         flexDirection:'row',
         alignItems: 'center',
     },
     pinkDot:{
         width:10,
         height:10,
         borderRadius:10,
         backgroundColor:'#ff4858',
         marginRight:10,
     },
     option: {
        marginBottom: 10,
        flexDirection: 'row',
         justifyContent: 'space-between',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'column',
        marginHorizontal: 14,
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomColor: '#EAEAED',
        borderBottomWidth: 1,
    },
});

export default LocationScreen;


