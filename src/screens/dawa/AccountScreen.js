import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Switch, 
  Image,
  Linking,
  Modal
} from 'react-native';
import { Txt ,Block, Button} from '../../components';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  fetchProfile, verifyEmail } from '../../actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
const { width, height } = Dimensions.get('screen');

class AccountScreen extends Component {
  state = {
    showTerms: false
  };

  componentDidMount() {
    this.props.fetchProfile();
    this.props.navigation.setParams({ logout: this._logout.bind(this) });
  }
  renderVerifyEmail() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
        <Block
          padding={[theme.sizes.padding * 6, theme.sizes.padding]}
          space="between"
          style={{backgroundColor:'#F3534A'}}
        >

           <FontAwesome name='send-o' size={70} style={{marginBottom:50, marginHorizontal:120, color:'white'}}/>
            <Txt bold white h1  style={{ margin: theme.sizes.base }}>Envoyé!  </Txt>
            <Txt bold white h1  style={{ margin: theme.sizes.base }}>Vous recevrez un email de confirmation. </Txt>
            {/* <View style={styles.pendingBtn}> 
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Text style={styles.cancelText}>En attente</Text> 
                  </View>
                </View> */}
          <Block middle style={{   justifyContent: 'center', alignItems: 'center'}}>
            <View  style={styles.okBtn}>
              <TouchableOpacity
                    onPress={() => this.setState({ showTerms: false })}  
                >
              <Txt bold center blue>
              j'ai compris
              </Txt>
              </TouchableOpacity>
              </View>
          </Block>
        </Block>
      </Modal>
    );
  }
  _logout() {
    AsyncStorage.removeItem('app_token');
    this.props.navigation.navigate('Login');
  }
  _verifyEmail(){
    const { profile, editing } = this.props;
    const email = profile.email;
    this.setState({ showTerms: true });
    this.props.verifyEmail({email} );
  }
  renderHeader() {
    const {  navigation } =  this.props;
    const { profile, editing } = this.props;
    Moment.locale('fr');
    return (
      <View>
          <Block flex={false} row center space="between" style={styles.header}>   
              <Txt h2 bold> Welcome Sara </Txt>
          </Block> 
       </View>
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
        <Block flex={false} color="#00BFFF" style={styles.hLine} />
        <ScrollView >

          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Active', { pro: profile })} style={{marginTop:10}}>
                  <View style={styles.option}>
                     <Text style={{ fontWeight: '500' }}>e-prescriptions</Text>
                     <FontAwesome name='angle-right' size={24} />
                  </View>
           </TouchableOpacity>       
          </View>
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingProfil', { pro: profile })} style={{marginTop:10}}>
                  <View style={styles.option}>
                     <Text style={{ fontWeight: '500' }}>your orders</Text>
                     <FontAwesome name='angle-right' size={24} />
                  </View>
           </TouchableOpacity>       
          </View>    
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WalletScreen')} style={{marginTop:10}}>
                  <View style={styles.option}>
                     <Text style={{ fontWeight: '500' }}>Account settings</Text>
                     <FontAwesome name='angle-right' size={24} />
                  </View>
           </TouchableOpacity>       
          </View>
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen', { pro: profile })} style={{marginTop:10}}>
                  <View style={styles.option}>
                     <Text style={{ fontWeight: '500' }}>Support</Text>
                     <FontAwesome name='angle-right' size={24} />
                  </View>
           </TouchableOpacity>       
          </View>    
           
            <View style={styles.section}>
            <TouchableOpacity
             onPress={() => Linking.openURL('https://www.facebook.com/Yawy-100369455795784')}>
            
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>Besoin d' aide? </Text>
                    <FontAwesome name='angle-right' size={24} />
             </View>
            </TouchableOpacity>
            </View>
      
      
           <View style={styles.section}>
             <TouchableOpacity onPress={params.logout}>
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500', }}>Déconnexion</Text>
                    <MaterialCommunityIcons name='logout' size={24} />
               </View>
            </TouchableOpacity>
            </View>    
        </ScrollView>
        {this.renderVerifyEmail()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.profileInfo.error,
    loading: state.profileInfo.loading,
    profile: state.profileInfo.profile,

    error: state.verifyEmail.error,
    loadingemail: state.verifyEmail.loading,
    pass: state.verifyEmail.pass

   }
}

export default connect(mapStateToProps, {  fetchProfile , verifyEmail})(AccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical:10
  },
  header: {
    flexDirection: 'row',
    height: height * 0.1,
    width: width,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
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
  optionE: {
    marginBottom: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: theme.sizes.padding * 1.7,
    height: theme.sizes.padding * 1.7,
    marginRight:10,
    borderRadius: theme.sizes.padding*2 ,
    borderWidth:2,
    borderColor:theme.colors.gray2
  },
  hLine: {
   // marginVertical: theme.sizes.base/2 ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
  },
  okBtn: {
     width:150,
     height:40,
    backgroundColor: theme.colors.white,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
},
tag: {
  borderWidth: StyleSheet.hairlineWidth,
  borderRadius: theme.sizes.base *8,
  backgroundColor:theme.colors.red,
  padding: theme.sizes.base/6,
  marginLeft: theme.sizes.base,
  fontSize:15,
  // paddingLeft:20,
  // marginBottom:20
  // backgroundColor: theme.colors.gray2,
},
messageBtn: {
  width:150,
  backgroundColor: '#F8F8F8',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  marginLeft:10,
  paddingVertical:5
},

});