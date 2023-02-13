import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Block, Txt, Button, Spinner } from "../../components";
import { theme, mocks } from "../../constants";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import FbConfig from '../../FbConfig';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LocationItem from '../../components/LocationItem';
import { stubFalse } from 'lodash';
navigator.geolocation = require('@react-native-community/geolocation');
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
            location: "",
            predictions: []

        };

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
        const { latitude, longitude } = this.state.selectedLocation;
        return (
            <Marker
              coordinate={{ latitude, longitude }}
                // title={name}
            />
        );
    }

    onLocationSelected() {
       const { navigation } = this.props;
       alert(JSON.stringify(this.state.selectedLocation))
       navigation.navigate('HomeScreen',{selectedLocation: this.state.selectedLocation});
    }

    render() {
        const { latitude, longitude } = this.state;
        // if (this.state.initMap) {
        //     return <Spinner />;
        // }
        return (
            <View style={{ flex: 1 }}>
                <Txt center bold h2>Select delivery Location</Txt>


                <GooglePlacesAutocomplete
                    placeholder='Search'
                    debounce={1000}
                    minLength={5}
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                            marginVertical: 10,
                            marginHorizontal: 15,
                            padding: 10,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            borderRadius: 10,
                            borderColor: '#efeff0',
                            borderWidth: 2,
                        }
                    }}
                    enablePoweredByContainer={false}
                    returnKeyType={'search'}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        this.setState({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            // selectedLocation:details.geometry.location,
                            error: null,

                        });
                        const formattedItem = {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            address: data.description,
                        }
                        this.setState({ selectedLocation: formattedItem })
                        this.map.animateToRegion({
                            latitude: formattedItem.latitude,
                            longitude: formattedItem.longitude,
                        },
                            350
                        )
                        // console.log('data '+data+" detaul "+ details.geometry.location.lat +' dsecr '+ data.description);
                    }}
                    fetchDetails={true}
                    currentLocation={true}
                    currentLocationLabel='Current location'
                    nearbyPlacesAPI={'GoogleReverseGeocoding'} // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        key: '',
                        language: 'en',
                    }}
                    query={{
                        key: FbConfig.mapAPIKey,
                        language: 'en',
                        components: 'country:ma',
                    }}
                />
                {/* {({ handleTextChange,
                        locationResults,
                        fetchDetails,
                        isSearching,
                        inputValue ,
                        clearSearchs}) => (
                        <View style={{backgroundColor:'black'}}> */}
                {/* <View style={styles.inputWr}>
                                <TextInput placeholder='enter destination'
                                    value={inputValue}
                                    style={styles.textIpt}
                                    onChangeText={handleTextChange}
                                    // style={styles.locationInput}
                                     />
                                    <Button style={{borderColor:"red", borderWidth:1, backgroundColor:'black'}} title="Clear" onPress={clearSearchs}/>
                            </View> */}
                {/* {isSearching && <ActivityIndicator size="large" color="red" />} */}
                {/* <ScrollView>
                                {locationResults.map(el => (
                                    <LocationItem
                                        {...el}
                                        key={el.id}
                                        fetchDetails={fetchDetails}
                                    />
                                ))}
                            </ScrollView> */}
                {/* </View>
                    )}
                </GooglePlacesAutocomplete> */}

                <MapView
                    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    ref={map => this.map = map}
                    mapType="mutedStandard"
                    // onRegionChange={(region) =>this.onRegionChange(region)}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: LAT_DELTA,
                        longitudeDelta: LONG_DELTA,
                    }}
                >
                    {this.showMapMarker()}
                </MapView>


                <TouchableOpacity
                    onPress={this.onLocationSelected.bind(this)}
                >
                    <View style={styles.buttonStyle}>
                        <Txt bold style={styles.buttonTextStyle}>CONFIRM LOCATION</Txt>
                    </View>
                </TouchableOpacity>
            </View>
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
    locationInput: {
        height: 40,
        borderWidth: 1,
        marginTop: 30,
        marginLeft: 5,
        padding: 5,
        backgroundColor: 'white'
    },
    suggestions: {
        backgroundColor: "white",
        padding: 5,
        fontSize: 18,
        borderWidth: 0.5,
        marginRight: 5,
        marginLeft: 5
    },
    inputWr: {
        marginTop: 80,
        flexDirection: "row",
        backgroundColor: 'black'
    },
    textIpt: {
        height: 40,
        width: 300,
        borderWidth: 1,
        paddingHorizontal: 16
    }
});


export default LocationScreen;


