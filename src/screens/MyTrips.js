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
  Image
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt , Button} from '../components';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
const { width, height } = Dimensions.get("screen");

import { connect } from 'react-redux';
import { fetchMyTrips } from '../actions';

class Mytrips extends Component {
  
  static navigationOptions = {
    header: null
  };

 componentDidMount() {
     this.props.fetchMyTrips();
}
  _onRefreshTrips() {
  const { navigation } = this.props;
   this.props.fetchMyTrips();
  }

  renderList = ( item ) => {
    const { navigation } = this.props;
   return (
       <TouchableOpacity
         key={item.name}
          onPress={() => navigation.navigate('TripDetails', { trip: item })}     
       >
     <Card shadow>
      {/* {( item.offers.length > 0) ? 
         (
         <View style={styles.campingInfo}>
                <MaterialCommunityIcons
                  name="timer-sand"
                  color="#64B5F6"
                  size={16}
                />
                <Txt bold style={{  fontSize: 16, marginLeft: 4, color:"#64B5F6" }}>
                {item.offers.length} Offre en attente de confirmation
                </Txt>
           </View>
             ) : null
            } */}
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
         <Txt style={{fontSize: 12}} spacing={0.5} caption>
         {item.travel_date}
         </Txt>
         {( item.offers.length > 0) ? 
         (
         <View style={styles.campingInfo}>
                <MaterialCommunityIcons
                  name="ticket-confirmation-outline"
                  color="#64B5F6"
                  size={16}
                />
                 {( item.offers.length ==1 ) ? 
                  (
                <Txt bold style={{  fontSize: 14, marginLeft: 4, color:"#64B5F6" }}>
                {item.offers.length} offre
                </Txt>
                ) :
                <Txt bold style={{  fontSize: 14, marginLeft: 4, color:"#64B5F6" }}>
                {item.offers.length} offres
                </Txt>
              }
           </View>
             ) :
             <View style={styles.campingInfo}>
             <MaterialCommunityIcons
               name="timer-sand-empty"
               color="lightgray"
               size={16}
             />
             <Txt style={{  fontSize: 14, marginLeft: 4 }}>
               Pas d'offre
             </Txt>
        </View>
            }
         {/* <Txt style={{fontSize: 14, fontWeight: "bold"}} spacing={0.5} caption>
             No deals
         </Txt> */}
       </Block>
     
       </Card>
     </TouchableOpacity>
    );
  };
  keyExtractor = (item, index) => index;
  render() {
          const { navigation } = this.props;
    return (
     <SafeAreaView  style={styles.container}>
          <Block flex={false} row center space="between" style={styles.header}>
          <Txt h2 bold>
            Trajets
          </Txt>
          <TouchableOpacity center middle style={styles.sendMsg} activeOpacity={0.8}   onPress={() => navigation.navigate('AddTrip')}>
              <FontAwesome name='plus' size={30} color={theme.colors.primary}/>
          </TouchableOpacity>
        </Block> 
        {(!this.props.fetching && this.props.data != null) ? 
         (
          <FlatList
                data={this.props.data}   
                renderItem={({ item }) => this.renderList(item)}
                keyExtractor={this.keyExtractor}  
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.fetching}
                    onRefresh={this._onRefreshTrips.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <View><Text style={styles.emptyMessageStyle}>Vous n'avez aucun trajet</Text>
                           <Button gradient style={{margin:10}} 
                            onPress={() => navigation.navigate('AddTrip')}>
                                <Txt bold white center>Ajouter un trajet</Txt>
                            </Button> 
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

        {/* {(!this.props.fetching && this.props.data != null && this.props.data.length) ? 
            (  
              <Button gradient style={{margin:10}} 
                              onPress={() => navigation.navigate('AddTrip')}>
                                  <Txt bold white center>Ajouter Trip</Txt>
              </Button> 
              ) : null
         } */}
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
    return {
        fetching: state.trips.fetching,
        data: state.trips.trips,
    };
};

export default connect(mapStateToProps, { fetchMyTrips })(Mytrips);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding/3,
    backgroundColor: theme.colors.gray4
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingTop: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  hLine: {
    marginVertical: theme.sizes.base ,
    marginHorizontal: theme.sizes.base ,
    height: 1,
  },

  campingInfo: {
    flexDirection: "row",
    alignItems: "center",

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