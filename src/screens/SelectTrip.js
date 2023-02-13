import React, { Component } from 'react';
import {
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
import { Block, Badge, Card, Txt , Button} from '../components';
import { Header } from 'react-native-elements';
import { theme } from '../constants';
const { width, height } = Dimensions.get("screen");
import rgba from "hex-to-rgba";
import { connect } from 'react-redux';
import { fetchMyTrips } from '../actions';

class SelectTrip extends Component {

componentDidMount() {
     this.props.fetchMyTrips();
}

_onRefreshTrips() {
  const { navigation } = this.props;
   this.props.fetchMyTrips();
}

renderHeader() {
    return (
      <View style={styles.headerContainer}>
          <Txt bold style={{ fontSize: 16}}>
             Sélectionnez un trajet
          </Txt>        
      </View>
    );
}

  renderList = ( item ) => {
    const { navigation } = this.props;
    const shipment = navigation.getParam('shipment');
    // if((shipment.countries.name == item.countries.name) && (shipment.countriesto.name == item.countriesto.name) ){
      return (
        <TouchableOpacity
          key={item.name}
          onPress={() => navigation.navigate('MakeOfferScreen', { trip: item, shipment })}     
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
          <Txt bold style={{ fontSize: 16}} spacing={0.5} color="gray">
              { item.countries.name } 
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
          <Txt bold style={{ fontSize: 16}} spacing={0.5} color="gray">
          { item.countriesto.name }
          </Txt>
        </Block>
   
        <Block row space="between" style={{ marginTop: theme.sizes.base }}>
        <Txt style={{fontSize: 14}} spacing={0.5} caption>
            Date de trip : {item.travel_date}
          </Txt>
          {/* <Txt style={{fontSize: 14, fontWeight: "bold"}} spacing={0.5} caption>
               {item.weight_total} kg valable
          </Txt> */}
        </Block>
     </Card>
      </TouchableOpacity>
     );
    // }
 
  };
  keyExtractor = (item, index) => index;
  render() {
          const { navigation } = this.props;
    return (
      <SafeAreaView  style={styles.container}>     
        {this.renderHeader()}    
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
                    onRefresh={this._onRefreshTrips.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <View><Text style={styles.emptyMessageStyle}>Vous n'avez aucun trajet </Text>
                           {/* <Button gradient style={{margin:10}} 
                            onPress={() => navigation.navigate('AddTrip')}>
                                <Txt bold white center>Ajouter un voyage</Txt>
                            </Button>  */}
                 </View>
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


        {(!this.props.fetching && this.props.data != null) ? 
            (  
              <Button gradient style={{margin:10}} 
                              onPress={() => navigation.navigate('AddTrip')}>
                                  <Txt bold white center>Ajouter </Txt>
              </Button> 
              ) : null
              }
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
    return {
        fetching: state.trips.fetching,
        data: state.trips.trips
    };
};

//make this component available to the app
export default connect(mapStateToProps, { fetchMyTrips })(SelectTrip);

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding/3,
    backgroundColor: theme.colors.white
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },

  headerContainer: {
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingBottom:10
  },

  settings: {
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
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
    }
});