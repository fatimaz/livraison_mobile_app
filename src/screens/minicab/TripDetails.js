import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  SafeAreaView,
  Modal
} from "react-native";

import rgba from "hex-to-rgba";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt, Button } from "../../components";
import { connect } from 'react-redux';
import { fetchMyTrips } from '../../actions';
import Moment from 'moment';
import 'moment/locale/fr';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get("window");
import { theme } from "../../constants";
import { fonts, sizes } from "../../constants/theme";


class TripDetails extends Component {

  state = {
    showTerms: false,
    counter: 1,
  }


  confirmationModal() {
    // const { counter } = this.state;
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
    
      >
            <Block
              style={{ justifyContent: 'center', padding: 10, marginTop: 100, borderWidth:1,borderRadius:40,borderColor:'gray' }}
              // backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding={[theme.sizes.padding , theme.sizes.padding]}
              space="between"
            >
                  
            <Button
              onPress={() => this.setState({ showTerms: false })}
              // style={{backgroundColor: 'lightgray' }}
            >
              <Txt size={25}>
                X
              </Txt>
            </Button>
            
              <Block middle>
              <Txt center bold black h2 style={{marginBottom:50}}>Trip has been booked successfuly </Txt>
              <Button
                gradient
              >
                <Txt bold center white>
                  Book your return trip
                </Txt>
              </Button>
              <Button
                gradient
              >
                <Txt bold center white>
                  View your trip details
                </Txt>
              </Button>
              <Button
                style={{borderColor:'lightgray',borderWidth:1,borderRadius:10}}
              >
                <Txt bold center>
                  Done
                </Txt>
              </Button>
              </Block>
              {/* <Block middle>
                <Button
                  gradient
                  onPress={() => this.setState({ showTerms: false })}>
                  <Txt center white>
                    Confirmer
                  </Txt>
                </Button>
              </Block> */}
            </Block>
      </Modal>
    );
  }


  renderList = () => {
    const { navigation } = this.props;
   const item = navigation.getParam('item');
    return (
      <Block style={{ marginTop: theme.sizes.base / 4, marginBottom: theme.sizes.base }}>
        <Txt h4 gray style={{ marginTop: theme.sizes.base * 2, marginBottom: theme.sizes.base * 2 }} spacing={0.5} >
          Ligne   {item.line_num} 
        </Txt>
        <Txt style={{ fontSize: 20, fontWeight: "bold", marginBottom: theme.sizes.base * 2 }} spacing={0.5} caption>
           {item.date} 
          {/* Lundi 18 August */}
        </Txt>
        <Block row center>
          <Txt caption gray bold>08:00</Txt>
          <Badge
            color={rgba(theme.colors.accent, "0.2")}
            size={14}
            style={{ marginRight: 8, marginLeft: 10 }}
          >
            <Badge color={theme.colors.accent} size={8} />
          </Badge>

          <View style={{ flexDirection: 'column' }}>
            <Txt style={{ fontSize: 16 }} bold spacing={0.5} color="gray">
            {item.ligne.station1.name}
            </Txt>
            <Txt spacing={0.5} bold color="black">
            {item.ligne.station1.ville.name}
            </Txt>
          </View>
        </Block>
        <Block row center style={{ paddingVertical: 4 }}>
          <Txt style={{ color: 'white' }}>8:00</Txt>
          <Badge color="gray2" size={4} style={{ marginLeft: 4.5, marginLeft: 20 }} />
        </Block>
        <Block row center>
          <Txt caption gray bold>12:00</Txt>
          <Badge
            color={rgba(theme.colors.primary, "0.2")}
            size={14}
            style={{ marginRight: 8, marginLeft: 10 }}
          >
            <Badge color={theme.colors.primary} size={8} />
          </Badge>

          <View style={{ flexDirection: 'column' }}>
            <Txt style={{ fontSize: 16 }} bold spacing={0.5} color="gray">
            {item.ligne.station2.name}
            </Txt>
            <Txt spacing={0.5} bold color="black">
            {item.ligne.station2.ville.name}
            </Txt>
          </View>
        </Block>

        <Block flex={false} color="lightgray" style={styles.hLine} />
        <Block space="between" row style={styles.inputRow}>
          <Txt style={{ fontSize: 16, marginBottom: theme.sizes.base }} spacing={0.5} caption>
            Places :
          </Txt>
          <Txt style={{ fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base }} spacing={0.5} caption>
          {item.seat_left}
          </Txt>
        </Block>
        <Block space="between" row style={[{ marginTop: theme.sizes.base * 2 }, styles.inputRow]}>
          <View style={{ flexDirection: 'column' }}>
            <Txt bold gray style={{ fontSize: 16, marginBottom: theme.sizes.base / 2 }} spacing={0.5} caption>
              Total Prix
            </Txt>
            <Txt bold style={{ fontSize: 16, }} spacing={0.5}>
            {item.price}
            </Txt>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Txt bold gray style={{ fontSize: 16, marginBottom: theme.sizes.base / 3 }} spacing={0.5} caption>
              personnes
            </Txt>
            <View style={{
              // marginTop: 10,
              // width: theme.sizes.width,
              // height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              // backgroundColor:'black'
            }}
            >

              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: theme.colors.gray4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0.5,
                    borderRadius: 25,
                    borderColor: '#A5A5A5',
                  }}
                  onPress={this.decrementHalder}
                >
                  <Txt bold h4>-</Txt>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 30,
                  // backgroundColor: theme.colors.gray4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderWidth: 0.5,
                  borderColor: '#A5A5A5',
                  marginHorizontal: 10
                }}>
                <Txt bold h3>
                  {/* {this.state.counter} */}
                  3
                </Txt>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: theme.colors.gray4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderRadius: 25,
                    borderColor: '#A5A5A5',
                    borderWidth: 0.5,

                  }}
                  onPress={this.incrementHalder}
                >
                  <Txt bold h4>+</Txt>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Block>
      </Block>
    );
  };

  render() {
    const { navigation, loading } = this.props;
    // const item = navigation.getParam('trip');
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcome}>
          {this.renderList()}
          <View>

          <Button gradient style={{ marginHorizontal: 20, marginTop: 20 }} onPress={() => navigation.navigate('PaymentScreen')}> 
              <Txt bold white center> Vas y </Txt>
             </Button> 
            <TouchableOpacity onPress={() => this.setState({ showTerms: true })}>
              <View style={styles.allCard}>
                <FontAwesome name="user" size={20} style={styles.bottomCardIcon} />
                <Txt style={styles.bottomCardText}> Passenger</Txt>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {this.confirmationModal()}
      </ScrollView>
    );
  }
}
export default TripDetails;

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding / 2,
    paddingHorizontal: theme.sizes.padding,
    flex: 1
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1
  },
  inputRow: {
    alignItems: 'flex-end',
    marginBottom: 2,
    paddingBottom: 15,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },

});