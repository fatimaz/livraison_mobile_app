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
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('screen');

class SettingProfil extends Component {
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
     <TouchableOpacity
       onPress={() => navigation.navigate('SettingsScreen', { user: profile })}
     >
          <Block flex={false} row center space="between" style={styles.header}>   
          <Block flex={false} row center > 
            <Image
                 source={{ uri: profile.photo }}  
                 style={styles.avatar} />
          
            </Block>  
          <Block column>  
              <Txt h1 bold>
              {profile.name}
              name
              </Txt>
           </Block>
           <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen', { pro: profile })}>
           <Txt>Edit</Txt>
           </TouchableOpacity>
        </Block> 
        </TouchableOpacity>
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
        {/* <Block flex={false} color="#EAEAED" style={styles.hLine} /> */}
        <ScrollView >
        <View style={styles.section}>
          {(profile.email_verified_at == null) ? 
         (
            <TouchableOpacity
              onPress={this._verifyEmail.bind(this)}>
                  <View style={styles.optionE}>
                  <MaterialCommunityIcons
                      name="plus-circle-outline"
                      color="#00BFFF"
                      size={22}
                      style={{paddingRight:10}}
                    /> 
                     <Txt blue h4>Verifier {profile.email}</Txt>
                      
                  </View>
           </TouchableOpacity>    
             ) :     <View style={styles.optionE}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      color="#008000"
                      size={22}
                      style={{paddingRight:10}}
                    />
                    <Txt bold> {profile.email}</Txt>
                  </View>
            }      
          </View>  
          <View style={styles.section}>
          {(profile.phone_verified_at == null) ? 
         (
            <TouchableOpacity
            onPress={() => navigation.navigate('EnterPhone')}>  
                  <View style={styles.optionE}>
                  <MaterialCommunityIcons
                      name="plus-circle-outline"
                      color="#00BFFF"
                      size={22}
                      style={{paddingRight:10}}
                    /> 
                     <Txt blue  h4>Ajouter votre numero de telephone</Txt>
                      
                  </View>
           </TouchableOpacity>    
             ) :     <View style={styles.optionE}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      color="#008000"
                      size={22}
                      style={{paddingRight:10}}
                    />
                    <Txt bold> {profile.mobile}</Txt>
                  </View>
            }      
          </View>     
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Password')}
            >
              <View style={styles.option}>
                    <Text style={{ fontWeight: '500' }}>Mot de passe</Text>
                    <FontAwesome name='angle-right' size={24} />
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

export default connect(mapStateToProps, {  fetchProfile , verifyEmail})(SettingProfil);

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
    width: theme.sizes.padding * 2.5,
    height: theme.sizes.padding * 2.5,
    marginRight:10,
    borderRadius: theme.sizes.padding*2 ,
    borderWidth:2,
    borderColor:theme.colors.gray2
  },
  hLine: {
    marginVertical: theme.sizes.base ,
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