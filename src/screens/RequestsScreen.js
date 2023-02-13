import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  Modal,
  Alert
} from "react-native";

import rgba from "hex-to-rgba";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt, Button } from "../components";
import { theme } from "../constants";
import { fetchOffers, cancelOffer } from '../actions';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("screen");
import FAIcon from 'react-native-vector-icons/FontAwesome';
//const { width } = Dimensions.get("window");

class RequestsScreen extends Component {


  state = {
    isModalVisible: false,
  };


  componentDidMount() {
     this.props.fetchOffers();
 }
  _onRefreshOffers() {
  const { navigation } = this.props;
   this.props.fetchOffers();
  }

  _renderStatus = ( status ) => {
  
    if (status == 'pending' ) {    
      return  ( <View style={styles.pendingBtn}> 
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <Text style={styles.cancelText}>En attente</Text> 
                    </View>
                  </View>
              )
    }else if (status == 'accepted') {
      return (
        <View style={styles.confirmedBtn}> 
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.cancelText}>Confirmé</Text> 
               </View>
         </View>
   );
    }else{
    return (
         <View style={styles.canceledBtn}> 
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <Text style={styles.btncancelText}>Canceled</Text> 
                </View>
          </View>
    );
  }
  }
  
  renderList = ( item ) => {

     const { navigation } = this.props;
    return (
     <TouchableOpacity
          key={item.name}
          // onPress={() => navigation.navigate('RequestDetails', { trip_details: item })}     
          onPress= {() => this.setState({isModalVisible: true })}
     >
      <Card shadow>
        <Block row center>
          <Badge
            color={rgba(theme.colors.accent, "0.2")}
            size={14}
            style={{ marginRight: 8 }}
          >
            <Badge color={theme.colors.accent} size={8} />
          </Badge>
          <Txt  style={{ fontSize: 16}} bold spacing={0.5} color="gray">
          { item.trip.countries.name }
          </Txt>
        </Block>

        <Block row center style={{ paddingVertical: 4 }}>
          <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
        </Block>
        <Block row center>
          <Badge
            color={rgba(theme.colors.primary, "0.2")}
            size={14}
            style={{ marginRight: 8 }}
          >
            <Badge color={theme.colors.primary} size={8} />
          </Badge>
          <Txt  style={{ fontSize: 16}} bold spacing={0.5} color="gray">
          { item.trip.countriesto.name }
          </Txt>
        </Block>
        <Block row space="between" style={{ marginTop: theme.sizes.base }}>
          <Txt style={{fontSize: 14}} spacing={0.5} caption>
           Travel Date :   {item.trip.travel_date}
          </Txt>
          <Txt spacing={0.5} caption medium primary>
            {/* {trip.score} */}
          </Txt>
          <Txt style={{fontSize: 15, fontWeight: "bold"}} spacing={0.5} caption>
               {item.trip.weight_free}kg available
          </Txt>
        </Block>
        <Block flex={false} color="gray" style={styles.hLine} />

        <Block row center>
         {/*  */}
         <Block row space="between">
           {/* <Txt spacing={0.5} caption> */}
         <Image
           resizeMode="contain"
            source={{ uri: item.user.photo }}
            style={styles.avatar}
           />
           <Block
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
               <Txt h4 spacing={0.5} color="gray">
                   {item.user.name}
               </Txt>
              <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
              <FontAwesome name="star" color="#FFBA5A" size={12} />
              </Txt>
            </Block>
            {this._renderStatus(item.type)}          
        </Block>
        
        </Block>
        {/* <Block row space="between" style={{marginHorizontal:40, marginTop:10}}>
        <View style={styles.pendingBtn}> 
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <TouchableOpacity onPress={() => navigation.navigate("SelectTrip")}>
                        <Txt center style={styles.cancelText}>Accept</Txt> 
                      </TouchableOpacity>    
                    </View>
        </View>
        <View style={styles.pendingBtn}> 
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <TouchableOpacity onPress={() => navigation.navigate("SelectTrip")}>
                        <Txt center style={styles.cancelText}>Reject</Txt> 
                      </TouchableOpacity>    
                    </View>
        </View>
        </Block> */}
            {/* {this.renderTermsService()} */}
         
       <Modal
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => this.setState({ isModalVisible: false })}
          animationType={'fade'}>
        <View
          style={{ backgroundColor:'rgba(0, 0, 0, 0.7)', flex: 1, justifyContent: 'center', padding: 10, height:100 }}>
        <View style={{ borderRadius:10,  backgroundColor: '#fff', padding: 10 }}>
               <Block row space="between" style={{ flex:1,
                    marginBottom:90}}>  
                    
                     
                     <Button style={{alignItems: 'center', paddingHorizontal:5}}><Txt bold h3> Request</Txt></Button>
                       
                    <Button onPress= {() => this.setState({isModalVisible: false} )} style={{alignItems: 'center', marginRight:10}}><Txt bold h2>X</Txt></Button>     
             </Block>        
          {this.renderRequestModal(item, item.type)}
        </View>
        </View>
      </Modal>

     </Card>
      </TouchableOpacity>
     );
   }
   renderTrips() {
    return (
      <React.Fragment>
        {(!this.props.fetching && this.props.data != null) ? 
         (
          <FlatList
                data={this.props.data}   
                renderItem={({ item }) => this.renderList(item)}
                // keyExtractor={item => item.id.toString() } 
                   keyExtractor={this.keyExtractor}  
                  refreshControl={
                  <RefreshControl
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshOffers.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <Txt style={styles.emptyMessageStyle}>Aucun résultat trouvé</Txt>  
                  : null)
                }         
            />
            ) : null
          }
         {this.props.fetching && 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#03A9F4"/>
                    </View> 
         } 
      </React.Fragment>
    );
  }
  


  _renderButtonAccept(item) {
    const { loading } = this.props;
  //  alert(item.type)
   if(item.type != 'rejeted'){
    return (
      <Button gradient style={{marginTop:20, marginHorizontal:20}}
      onPress={this._onCancelBooking.bind(this,item, 1)}>
          {loading? (
          <ActivityIndicator size="small" color="white" /> 
          // <Spinner size='small'/>
          ) : (
          <Txt bold white center>Accept</Txt>
        )}    
      </Button>
    );
    }
  }
  _renderButtonReject(item) {
    const { loading } = this.props;
    return (
        <Button shadow style={{borderRadius:3, borderWidth:1,borderColor:theme.colors.gray, marginHorizontal:40, marginTop:10 }}
         onPress={this._onCancelBooking.bind(this,item, 0)}>
          {loading? (
          <ActivityIndicator size="small" color="white" /> 
          // <Spinner size='small'/>
          ) : (
          <Txt center bold caption gray >Reject</Txt>
        )}    
      </Button>
    );
  }

    _onCancelBooking( id , type){

    if(type == 0){
      Alert.alert(
        'Alert',    
        'Êtes-vous sûr de vouloir annuler',   
        [
          {
            text: 'Oui', onPress: () => {
               this.props.navigation.navigate('ShipmentScreen');
               this.props.cancelOffer({ id, type });
                this.props.fetchOffers(); 
                this.setState({isModalVisible: false}) ; 
            }
          },
  
          {
            text: 'Non', onPress: () => {
              this.props.navigation.goBack;  
              this.setState({isModalVisible: false}) ; 
            }
          },
        ],
        { cancelable: false }
      )  
    }else{
      Alert.alert(
        'Alert',    
        'Accepte',   
        [
          {
            text: 'Oui', onPress: () => {
               this.props.navigation.navigate('ShipmentScreen');
               this.props.cancelOffer({ id, type });
                this.props.fetchOffers(); 
                this.setState({isModalVisible: false}) ; 
            }
          },
  
          {
            text: 'Non', onPress: () => {
              this.props.navigation.navigate('ShipmentScreen');  
              this.setState({isModalVisible: false}) ; 
            }
          },
        ],
        { cancelable: false }
      )  
    }
   
}


renderRequestModal = ( item, type ) => {

  return (
    <SafeAreaView  style={styles.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
         <Card shadow style={{marginHorizontal:15}}>
         <Block row space="between" style={{marginBottom:20}}>
          <Image
            resizeMode="contain"
            source={{ uri: item.user.photo }}
              style={styles.avatar}
            />
              <Block
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <Txt spacing={0.5} color="gray">
                    {item.user.name}
                  </Txt>
                  <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                  <FontAwesome name="star" color="#FFBA5A" size={12} />
                  </Txt>
                </Block>
       </Block>
           
     <Block row center>
        <Badge
          color={rgba(theme.colors.accent, "0.2")}
          size={14}
          style={{ marginRight: 8 }}
        >
           <Badge color={theme.colors.accent} size={8} />
        </Badge>
        <Txt style={{ fontSize: 16 }} bold spacing={0.5} color="gray">  
           {item.trip.countries.name}
        </Txt>
      </Block>

  <Block row center style={{ paddingVertical: 4 }}>
    <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
  </Block>
  <Block row center>
    <Badge
      color={rgba(theme.colors.primary, "0.2")}
      size={14}
      style={{ marginRight: 8 }}
    >
      <Badge color={theme.colors.primary} size={8} />
    </Badge>
    <Txt style={{ fontSize: 16 }} bold spacing={0.5} color="gray">
        {item.trip.countriesto.name}
    </Txt>
  </Block>
  <Block column style={{ marginTop: theme.sizes.base * 2 }}>
    <Txt style={{fontSize: 14, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
     Travel Date :  {item.trip.travel_date}
    </Txt>

    <Txt style={{fontSize: 14, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
        Weight available:    {item.trip.weight_total} kg available
    </Txt>
    {(item.message != null) ? 
     (
    <Txt style={{fontSize: 14, fontWeight: "bold"}} spacing={0.5} caption>
        Message :   {item.message}
    </Txt>
      ) : null
    }
  </Block>
 </Card>
    {(type == 'pending') ? 
     (
      <Block>
         {this._renderButtonAccept(item.id)}
         {this._renderButtonReject(item.id)}
        </Block>
           ) : null
          }
      </ScrollView>
    </SafeAreaView>
  );
}
  render() {
    return (
    <SafeAreaView  style={styles.welcome}>
      {/* {this.renderHeader()} */}  
        <ScrollView showsVerticalScrollIndicator={false}>              
          {this.renderTrips()}
        </ScrollView>
  </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
      fetching: state.offers.loading,
      data: state.offers.offers,

     error: state.cancelOffer.error,
    loading: state.cancelOffer.loading,
    saved: state.cancelOffer.saved
      
  };
};

export default connect(mapStateToProps, { fetchOffers , cancelOffer})(RequestsScreen);

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding/2,
    backgroundColor: theme.colors.gray4
  },

  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
    height: 1
  },
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
  },
    emptyMessageStyle: {
    textAlign: 'center',
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
    startTrip: {
      position: 'absolute',
      right: (width - 330) / 2,
      bottom: 10,
    },

  cancelText: {
    color: theme.colors.white,
    fontWeight:'bold',
    fontSize: theme.sizes.base * 0.8 ,
  },
  campingInfo: {
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 14
  },
  avatar: {
    width: theme.sizes.padding * 1.4,
    height: theme.sizes.padding * 1.4,
    marginRight:10,
    borderRadius: theme.sizes.padding ,
    borderWidth:2,
    borderColor:'red'
  },

  pendingBtn: {
    flexDirection: 'row',
    width:100,
    backgroundColor: theme.colors.rose,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
},
  confirmedBtn: {
    flexDirection: 'row',
    width:100,
    backgroundColor: '#008000',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
},
canceledBtn: {
  flexDirection: 'row',
  width:100,
  borderColor:theme.colors.gray,
  borderRadius: 9,
  borderWidth:1,
  justifyContent: 'center',
  alignItems: 'center',
},
btncancelText: {
  fontWeight:'bold',
  fontSize: theme.sizes.base * 0.8  
},

cancelText: {
  color: theme.colors.white,
  fontWeight:'bold',
  fontSize: theme.sizes.base * 0.8  
},
});

