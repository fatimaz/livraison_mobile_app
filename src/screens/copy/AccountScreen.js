import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Switch, 
  Image
} from 'react-native';
import { Txt ,Block, Button} from '../components';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {  fetchProfile } from '../actions';

const { width, height } = Dimensions.get('screen');

class AccountScreen extends Component {

  componentDidMount() {
    this.props.fetchProfile();
    this.props.navigation.setParams({ logout: this._logout.bind(this) });
  }
  _logout() {
    AsyncStorage.removeItem('app_token');
    this.props.navigation.navigate('Login');
  }
  

  renderHeader() {
    const {  navigation } =  this.props;
    const { profile, editing } = this.props;
    return (
     // <View style={styles.header}>
     <TouchableOpacity
     onPress={() => navigation.navigate('ProfileScreen', { pro: profile })}
   >
          <Block flex={false} row center space="between" style={styles.header}> 
         
          <Txt h1 bold>
            Fatima Rachid
          </Txt>
          <Block flex={false} row center > 
            {/* <Button onPress={() => navigation.navigate("ProfileScreen")}> */}
            <Image
                 source= {require("../assets/icons/back.png")}
            //  source={profile.avatar}   
                 style={styles.avatar} />
           {/* </Button> */}
            <FontAwesome name='angle-right' size={24} />
            </Block>
        </Block> 
        </TouchableOpacity>
       /* <View style={{ flex: 1}}>
          <Txt h2 bold>Paramètres</Txt>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
        </View> */
     //   </View>
    )
  }

  render() {
  
    const {  navigation } =  this.props;
    const { profile, editing } = this.props;
    const { params = {} } = navigation.state;
    const activeType = (key) => type === key;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>

       <View style={styles.section}>
            <View>
              <Text style={styles.title}>Compte</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen', { pro: profile })}
            >
                  <View style={styles.option}>
                     <Text style={{ fontWeight: '500', }}>Edit personal details</Text>
                     <FontAwesome name='angle-right' size={24} />
                  </View>
           </TouchableOpacity>       
          </View>
      
            <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Password')}
            >
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>	Changer le mot de passe</Text>
                    <FontAwesome name='angle-right' size={24} />
                 </View>
            </TouchableOpacity>
            </View>
            <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Password')}
            >
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>	Payout details</Text>
                    <FontAwesome name='angle-right' size={24} />
                 </View>
            </TouchableOpacity>
            </View>
            <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Password')}
            >
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>	My Trips</Text>
                    <FontAwesome name='angle-right' size={24} />
                 </View>
            </TouchableOpacity>
            </View>
            <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Password')}
            >
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>	My Shipments</Text>
                    <FontAwesome name='angle-right' size={24} />
                 </View>
            </TouchableOpacity>
            </View>
            <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Password')}
            >
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>	Ratings</Text>
                    <FontAwesome name='angle-right' size={24} />
                 </View>
            </TouchableOpacity>
            </View>
            <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Password')}
            >
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>	FAQ</Text>
                    <FontAwesome name='angle-right' size={24} />
                 </View>
            </TouchableOpacity>
            </View>
            <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Password')}
            >
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>	refer your friend</Text>
                    <FontAwesome name='angle-right' size={24} />
                 </View>
            </TouchableOpacity>
            </View>

          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Plus d'options</Text>
            </View>
            <View>
              <View style={styles.option}>
                <Text style={{ fontWeight: '500', }}>Notifications</Text>
                <Switch
                  // value={option_rated}
                  ios_backgroundColor="#EAEAED"
                  trackColor={{false: "#EAEAED", true: "#FF7657"}}
                  // onValueChange={() => this.props.setFilters({ option_rated: !option_rated })}
                />
              </View>
            </View>
          </View>
          <View style={styles.section}>
             <TouchableOpacity onPress={params.logout}>
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>Déconnexion</Text>
                 </View>
            </TouchableOpacity>
            </View>
      
      
        </ScrollView>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
  return {
    error: state.profileInfo.error,
    loading: state.profileInfo.loading,
    profile: state.profileInfo.profile,

   }
}

export default connect(mapStateToProps, {  fetchProfile })(AccountScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    height: height * 0.1,
    width: width,
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
    marginRight:25
  },
});