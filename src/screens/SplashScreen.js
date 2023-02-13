import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Txt } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SplashScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: null
        }
    }
  componentDidMount() {
     AsyncStorage.getItem('app_token')
       .then(token => {
        // axios.defaults.headers.Authorization = 'Bearer' + token;
           if (token) {
             this._navigate('SearchScreen');
           }else {
             this._navigate('WelcomeScreen');
           }
       });
   }
   _navigate(screen) {
     setTimeout(() => {
       this.props.navigation.navigate(screen);
     }, 2000 );

  }

  render(){
    return (
      <View style={styles.container}>
        {/* <Image source={require('../res/ios.png')} style={styles.image}/> */}
        <Txt style={{ fontSize: 45}} bold center white>miniCab</Txt>
        <ActivityIndicator size={'small'}  color='#fff'/>
      </View>
    );
  }
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 138, 128)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    paddingTop: 10
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20
  }
});