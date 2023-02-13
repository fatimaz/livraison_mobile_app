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
import { Block, Badge, Card, Txt, Button } from "../../../components";
import { connect } from 'react-redux';
import { fetchMyTrips } from '../../../actions';
import Moment from 'moment';
import 'moment/locale/fr';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get("window");
import { theme } from "../../../constants";
import { fonts, sizes } from "../../../constants/theme";


class TicketScreen extends Component {


  renderList = () => {
    const { navigation } = this.props;
    // const item = navigation.getParam('trip');
    return (
      <Block style={{ marginTop: theme.sizes.base / 4 }}>
        <Txt h2 bold style={{ marginTop: theme.sizes.base , marginBottom: theme.sizes.base  }} spacing={0.5} >
          Boarding pass 31
        </Txt>
        <Block space="between" row style={styles.inputRow}>
          <Txt style={{ fontSize: 16, marginBottom: theme.sizes.base }} spacing={0.5} caption>
          Ahmed mohamed 5stars
          </Txt>
          <Button style={{borderColor:'red',borderWidth:2, paddingHorizontal:10, borderRadius:50, backgroundColor:'red'}}><Txt white bold>Call</Txt></Button>
          <Button style={{borderColor:'gray',borderWidth:2, paddingHorizontal:10, borderRadius:50, height:50, width:50}}><Txt black bold center>X</Txt></Button>
        </Block>
    
        <Block row center style={{marginTop:5}}>
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
              Bab challa
            </Txt>
            <Txt spacing={0.5} bold color="black">
              Rabat
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
              Bab challa
            </Txt>
            <Txt spacing={0.5} bold color="black">
              Rabat
            </Txt>
          </View>
        </Block>

        <Block flex={false} color="lightgray" style={styles.hLine} />
        <Block space="between" row style={styles.inputRow}>
          <Txt style={{ fontSize: 16, marginBottom: theme.sizes.base }} spacing={0.5} caption>
            Ligne :
          </Txt>
          <Txt style={{ fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base }} spacing={0.5} caption>
           P 21
          </Txt>
        </Block>
        <Block space="between" row style={styles.inputRow}>
          <Txt style={{ fontSize: 16, marginBottom: theme.sizes.base }} spacing={0.5} caption>
            number of seats :
          </Txt>
          <Txt style={{ fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base }} spacing={0.5} caption>
          3
          </Txt>
        </Block>
        <Block space="between" row style={styles.inputRow}>
          <Txt style={{ fontSize: 16, marginBottom: theme.sizes.base }} spacing={0.5} caption>
            Prix :
          </Txt>
          <Txt style={{ fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base }} spacing={0.5} caption>
          70dh
          </Txt>
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
        </View>  
      </ScrollView>
    );
  }
}
export default TicketScreen;

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding / 2,
    paddingHorizontal: theme.sizes.padding,
    flex: 1
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base ,
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
    marginTop:15,
    paddingBottom: 15,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
});