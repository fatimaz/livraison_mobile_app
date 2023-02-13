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
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Block, Badge, Card, Txt , Button} from '../components';
import { connect } from 'react-redux';
import { fetchMyShipments } from '../actions';
import { theme } from '../constants';
import {db} from './firebase';

const { width, height } = Dimensions.get("window");

class AllShipmentsScreen extends Component {
  static navigationOptions = {
    header: null
  };


 componentDidMount() {
     this.props.fetchMyShipments();
     this.props.user;
 }

  _onRefreshShipments() {
  const { navigation } = this.props;
   this.props.fetchMyShipments();
}

  renderHeader() {
    return (
     <View style={styles.headerContainer}>
          <View style={{flexDirection: "row" }}> 
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                 {/* Pick what you are going to ship */}
                Shipments
              </Text>        
        </View>    
      </View>
    );
  }

renderButton() {
  const { navigation } = this.props;
  return (
    <TouchableOpacity center middle style={styles.startTrip} activeOpacity={0.8} onPress={() => navigation.navigate("Shipments")}>
          <Badge color={theme.colors.accent} size={52}>
              <FAIcon name="plus" size={62 / 2.5} color="white" />
          </Badge>
    </TouchableOpacity>
  )
}

_renderStatus = ( status ) => {
  if (status == 0 ) {    
    return  ( <View style={styles.pendingBtn}> 
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Text style={styles.cancelText}>En attente</Text> 
                  </View>
                </View>
            )
  }
  return (
       <View style={styles.confirmedBtn}> 
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Text style={styles.cancelText}>Confirmé</Text> 
              </View>
        </View>
  );
}

renderType =(item) => {

const id =this.props.user.id;
alert(JSON.stringify(this.props.user))
    if(id == item.user_id ){
        return(
        <TouchableOpacity
        onPress={() => navigation.navigate('RequestsScreen')}     
          >
          <Block flex={false} color="gray" style={styles.hLine} />
        <View style={styles.campingInfo}>
              <MaterialCommunityIcons
                name="bell-ring-outline"
                color="#FF7657"
                size={14}
              />
        
              <Txt bold spacing={0.5} style={{  fontSize: 14, marginLeft: 4,  color: "#FF7657" }}>
                2 New requests
            </Txt>
            </View>
         
        </TouchableOpacity>
        )
    }else{
        return(
            <Block row space="between">
            <Image
              resizeMode="contain"
              source={{ uri: item.user.photo }}
              style={styles.avatar}
              />
              <Block
                 style={{
                   flex: 1,
                   flexDirection: "column",
                   justifyContent: "center",
                 }}
               >
                 <Txt h4 spacing={0.5} color="gray">
                      {item.user.name}
                  </Txt>
                 <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                 <FontAwesome name="star" color="#FFBA5A" size={12} />
                 </Txt>
               </Block>
                 <View style={styles.pendingBtn}> 
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("SelectTrip", {shipment:item})}>
                           <Txt center style={styles.cancelText}>Send Request</Txt> 
                         </TouchableOpacity>    
                       </View>
                 </View>
               </Block>
            )
    }

}

  renderList = ( item ) => {
    const {  navigation } = this.props;
   const { user } = this.props;
  
      return (
        <Card shadow>
        <TouchableOpacity
          key={item.name}
          onPress={() => navigation.navigate('ShipmentDetails',{shipment:item, mine:0 })}     
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
              <Text style={{ fontSize:20, fontWeight: "bold" }}>
                { item.name }
              </Text>
              <Block row space="between" style={{marginTop:5}}>
              <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                { item.countries.name }  
                </Text>
                
                <Ionicons
                  name="airplane-outline"
                  color="#FF7657"
                  size={20}
                />
                 <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                    { item.countriesto.name  }
                </Text>
                </Block>
            </View>
            <View style={{ flex: 1, flexDirection: "row" ,marginTop:7}}>
              <View style={styles.campingInfo}>
                <Ionicons
                  name="md-pricetag"
                  color="#FF7657"
                  size={14}
                />
                <Txt gray bold style={{  fontSize: 14, marginLeft: 4 }}>
                   Reward { item.reward }
                </Txt>
              </View>
              <View style={styles.campingInfo}>
                <MaterialCommunityIcons
                  name="weight"
                  color="#FF7657"
                  size={14}
                />
                <Txt bold gray style={{  fontSize: 14, marginLeft: 4 }}>
                   Weight { item.weight }
                </Txt>
              </View>
            </View>
          </View>   
        </View>
        </TouchableOpacity>
          <Block flex={false} color="gray" style={styles.hLine} />


          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
        
          {this.renderType(item)}
          {/*  */}
       
          </Card>
   
      );

  }
  keyExtractor = (item, index) => index;
  render() {
    return (  
      <SafeAreaView  style={styles.container}>
        {this.renderHeader()}
           <ScrollView showsVerticalScrollIndicator={false}>     
        {(!this.props.fetching && this.props.data != null) ? 
         (
          <FlatList
                data={this.props.data}   
                renderItem={({ item }) => this.renderList(item)}
                   keyExtractor={this.keyExtractor}  
                  refreshControl={
                  <RefreshControl
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshShipments.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <Txt center style={styles.emptyMessageStyle}>Aucun résultat trouvé</Txt>  
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

        </ScrollView>
        {/* {this.renderButton()} */}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
    return {
        error: state.shipments.error,
        fetching: state.shipments.loading,
        data: state.shipments.shipments,
        user: state.auth.user,

    };
};

export default connect(mapStateToProps, { fetchMyShipments })(AllShipmentsScreen);





const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding/2,
    backgroundColor: theme.colors.gray4
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
  },

  headerContainer: {
    top: 0,
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingTop: 45,
    paddingBottom: 25
  },

  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
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
    height: width * 0.16,
    borderRadius: 6
  },


  startTrip: {
    position: 'absolute',
    right: (width - 330) / 2,
    bottom: 10,
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
    width:100,
    backgroundColor: theme.colors.rose,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
},
  confirmedBtn: {
    flexDirection: 'row',
    width:100,
    backgroundColor: '#008000',
    borderRadius: 9,
    alignItems: 'flex-end',
},
cancelText: {
  color: theme.colors.white,
  fontSize: theme.sizes.base * 0.8 ,
},
});