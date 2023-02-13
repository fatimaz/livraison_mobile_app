import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Block, Txt, Button, Spinner } from "../../components";
import { theme, mocks } from "../../constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import FbConfig from '../../FbConfig';
import _ from "lodash";

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
            btnDisabled: true,
            latitude: 0,
            longitude: 0,
            location:"",
            predictions:[]

        };
        this.onChangeLocationDebounced = _.debounce(this.onChangeLocation, 1000);
    }



    async componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,

                });

            },

            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
        );
        this.setState({ initMap: false });

        // this.getGeocodeAsync(this.state.latitude, this.state.longitude).catch(err => {this.setState({errorMessage: err})})
        // const geocode = await Geolocation.reverseGeocodeAsync({
        //     latitude : this.state.latitude,
        //     longitude :  this.state.longitude
        // });
        // console.log(geocode[0].city);
    }

    locationToAdress = async (location) => {

        const locationPublish = `${location.latitude},${location.longitude}`; //PUBLISH
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationPublish}&sensor=true&key=${FbConfig.mapAPIKey}`;

        try {
            const q = await axios.get(url)
            if (q.data.results[1].address_components[3].long_name == "Rabat"){
                this.props.navigation.navigate('HomeScreen',{location});
            } else {
                Alert.alert(
                    '',
                    'This is out delivery area for now, but try again soon.',       
                  [
                    {
                      text: 'OK', onPress: () => {
                        this.props.fetchMyTrips()
                          this.props.navigation.goBack(); 
                      }
                    }
                  ],
                  { cancelable: false }
                ) 
            }
        } catch (e) {
            console.log('error')
        }
    }
    // fetch(url)
    // .then((result) => {
    // const { results } = result;
    // console.log('results '+JSON.stringify(result));
    // })
    // .catch((e) => {
    // console.log(e);
    // });
    // getGeocodeAsync= async (location) => {
    //     let geocode = await Geolocation.reverseGeocodeAsync(location)
    //     this.setState({geocode: geocode})

    //     // check console for geocode response
    //     console.log(geocode+'geocode')
    //   }

    search = async () => {
        let endPoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
        endPoint += this.state.query;
        endPoint += `&key=${FbConfig.mapAPIKey}`;

        try {
            const { data } = await axios.get(endPoint);
          
            this.setState({ searchResult: data.results });
        } catch (e) {
        }
        // AIzaSyAe7DxYoOZacc79Wj_9ccNLRqyMq-tc2Ew
        //google api later
        // let searchResult = [];
        // for (let i = 0; i < 50; i++) {
        //     // searchResult[i] = { name: `Name ${i}`, address: `Address ${i}` };
        //   searchResult[i] = { name: `Name ${i}`, address:`Address ${i}`, latitude: 48.85880774018563, longitude: 2.3104028933020424 };
        // }
        // this.setState({ searchResult });
    }


    toggleSearchResult() {
        const { params } = this.props.navigation.state;
        if (!this.state.searchResult) return;
        return (
            <ScrollView style={{ height: 100, marginBottom: 300 }}>
                <Txt>Use current location</Txt>
                <View style={{ marginHorizontal: 15 }}>
                    {
                        this.state.searchResult.map((item, i) => (
                            <View style={styles.section}>
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={this.setSelectedLocation.bind(this, item)}
                                >
                                    <View style={styles.option}>
                                        <Block column>
                                            <Text style={{ fontWeight: '500', fontSize: 17 }}>{item.name}</Text>
                                            <Txt gray style={{ fontWeight: '500', fontSize: 17 }}>{item.formatted_address}</Txt>
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

    setSelectedLocation(item) {
        const { geometry: { location } } = item;
        // console.log('item '+JSON.stringify(item))
        const formattedItem = {
            name: item.name,
            address: item.formatted_address,
            latitude: location.lat,
            longitude: location.lng,
        }
        this.setState({ searchResult: null, selectedLocation: formattedItem });
        const { navigation } = this.props;
        // navigation.state.params.onGoBack(item.name);
        // navigation.goBack();
        this.map.animateToRegion(
            {
                latitude: formattedItem.latitude,
                longitude: formattedItem.longitude
            },
            350
        );
    }
    // show map marker

    onLocationSel() {
        const { navigation } = this.props;
        // console.log(this.state.selectedLocation)

    }
    renderButton() {
        if (this.state.selectedLocation) {
            return (
                <Button gradient style={{ marginHorizontal: 10 }} onPress={this.onLocationSel.bind(this)}>
                    <Txt bold white center>Confirmer</Txt>
                </Button>
            )
        }
    }

    showMapMarker() {
        if (!this.state.selectedLocation) return;
        const { latitude, longitude, name } = this.state.selectedLocation;
        return (
            <Marker
                title={name}
                coordinate={{ latitude, longitude }}
            />
        );
    }

    onLocationSelected() {
        const obj = this.state.selectedLocation;
        console.log(this.state.selectedLocation)
        this.locationToAdress(this.state.selectedLocation)
        // console.log(this.state.selectedLocation)
        // this.props.navigation.navigate('HomeScreen',{});
        // navigation.navigate('', {this.state.selectedLocation})
    }

    async onChangeLocation(location){
        this.setState({
            location
        })
        let apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
        apiUrl += `?key=${FbConfig.mapAPIKey}`;
        apiUrl += `&input=${location}`;
        apiUrl += `&location=${this.state.latitude}, ${this.state.longitude}&radius=2000`;
         try {
            const result = await fetch(apiUrl);
            const json = await result.json();
        
            this.setState({
                predictions: json.predictions
            })
         } catch (err){
            console.error(err);
         }
   



    }
    render() {
        const predictions = this.state.predictions.map(prediction =>(
             <Text key={prediction.id} style={styles.suggestions}>{prediction.description}</Text>));
        if (this.state.initMap) {
            return <Spinner />;
        }
        const { query, latitude, longitude } = this.state;

        return (
            //    <ScrollView >
            <View style={{ flex: 1 }}>
                <Txt center bold h2>Select delivery Location</Txt>
                <View style={styles.search}>
                    <View style={styles.inputWrapper}>
                        <View style={styles.pinkDot} />
                        {/* // <FontAwesome name="search" style={{marginRight:10}} size={18} /> */}
                        <TextInput
                            placeholder="Indiquez votre destination"
                            placeholderTextColor="#afb1b6"
                            onSubmitEditing={() => this.search()}
                            onChangeText={(query) => this.setState({ query })}
                            autoCorrect={false}
                        />
                        <FontAwesome name="remove" style={{ marginRight: 10 }} size={18} />
                    </View>
                    {/* <View><Feather name="heart" size={20}/></View> */}
                </View>
                <TextInput placeholder='enter destination' value={this.state.location}
                 onChangeText={location => this.onChangeLocationDebounced(location)}
                 style={styles.locationInput}/>

                 {predictions}

                <MapView
                    //  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    ref={map => this.map = map}

                    // onRegionChange={(region) =>this.onRegionChange(region)}
                    initialRegion={{
                        latitude: 37.785834,
                        longitude: -122.406417,
                        latitudeDelta: LAT_DELTA,
                        longitudeDelta: LONG_DELTA,
                    }}
                >
                    {this.showMapMarker()}
                </MapView>

                {this.toggleSearchResult()}
                <TouchableOpacity
                    onPress={this.onLocationSelected.bind(this)}>
                    <View style={styles.buttonStyle}>
                        <Txt bold style={styles.buttonTextStyle}>CONFIRM LOCATION</Txt>
                    </View>
                </TouchableOpacity>
            </View>
            // </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white
    },
    search: {
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#efeff0',
        borderWidth: 2,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pinkDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#ff4858',
        marginRight: 10,
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
    buttonStyle: {
        backgroundColor: '#fc454e',
        width: 350,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 30,
        bottom: 20,
        right: 20
    },
    map: {
        flex: 1,
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 18,
        marginBottom: 6
    },
    locationInput:{
        height:40,
        borderWidth:1,
        marginTop:30,
        marginLeft:5,
        padding:5,
        backgroundColor:'white'
    },
    suggestions:{
        backgroundColor:"white",
        padding:5,
        fontSize:18,
        borderWidth:0.5,
        marginRight:5,
        marginLeft:5
    }
});


export default LocationScreen;


