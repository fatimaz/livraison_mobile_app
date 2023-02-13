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
  Modal,
  SafeAreaView
} from "react-native";

import rgba from "hex-to-rgba";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt, Button } from "../../components";
import { connect } from 'react-redux';
import {  addTrip} from '../../actions';
import Moment from 'moment';
import 'moment/locale/fr';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get("window");
import { theme } from "../../constants";
import { fonts, sizes } from "../../constants/theme";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class SummaryScreen extends Component {

  state = {
    showTerms: false
  };

    componentWillReceiveProps(nextProps) {
  
        if (nextProps.added) {
          this.props.navigation.navigate('Active');  
        }
      }

      renderModalSave() {
        const { navigation } = this.props;
        return (
          <Modal
            animationType="slide"
            visible={this.state.showTerms}
            onRequestClose={() => this.setState({ showTerms: false })}
          >
            <Block
              padding={[theme.sizes.padding * 6, theme.sizes.padding]}
              space="between"
              style={{backgroundColor:'#66FFFF'}}
            >
              <Image source={require('../../res/sent.png')} style={{width:300, height:300}}/> 
                <Txt bold white h1 center style={{ margin: theme.sizes.base }}>Votre demande de réservation a été envoyée. </Txt>
                {/* <View style={styles.pendingBtn}> 
                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                         <Text style={styles.cancelText}>En attente</Text> 
                      </View>
                    </View> */}
              <Block middle style={{   justifyContent: 'center', alignItems: 'center'}}>
                <View  style={styles.okBtn}>
                  <TouchableOpacity
                         onPress={() => this.setState({ showTerms: false })}  >
                        
                  <Txt bold center blue>
                      Voir ma reservation
                  </Txt>
                  </TouchableOpacity>
                  </View>
              </Block>
            </Block>
          </Modal>
        );
      }
    _onSaveTrip() {
        const { navigation } = this.props;
       const vehicle = navigation.getParam('item');
        const locations = navigation.getParam('locations');
        const prix = navigation.getParam('prix');
        const distance = navigation.getParam('distance');
        const location_from =locations.location_from;
        const location_to = locations.location_to;
        const pickup_date = locations.pickup_date;
        const count = locations.counter;
        const vehicle_id = vehicle.id;
        this.setState({ showTerms: true });
        this.props.addTrip({vehicle_id,location_from,location_to,pickup_date,count, prix});
       
      }

renderList = () => {
    const { navigation } = this.props;
    const vehicle = navigation.getParam('item');
    const locations = navigation.getParam('locations');
    const prix = navigation.getParam('prix');
    const distance = navigation.getParam('distance');
   return (  
     <Block style={{ marginTop: theme.sizes.base /4,  marginBottom: theme.sizes.base }}>
     <Txt h2 bold style={{ marginBottom: theme.sizes.base * 2,  marginTop: theme.sizes.base}} spacing={0.5} >
       Verifiez vos informations de reservation
    </Txt>
     <Txt style={{fontSize: 18, fontWeight: "bold", marginBottom: theme.sizes.base * 2}} spacing={0.5} caption>
      {locations.pickup_date}
    </Txt>
     <Block row center>
        <Badge
          color={rgba(theme.colors.accent, "0.2")}
          size={14}
          style={{ marginRight: 8 }}
        >
           <Badge color={theme.colors.accent} size={8} />
        </Badge>
        <Txt style={{ fontSize: 16 }} bold spacing={0.5} color="gray">  
           {locations.location_from}
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
       {locations.location_to}
    </Txt>
  </Block>
         
  <Block flex={false} color="orange" style={styles.hLine} bold/> 


  <Block space="between" row  style={[ {marginTop: theme.sizes.base },styles.inputRow]}>
    <Txt style={{fontSize: 16, marginBottom: theme.sizes.base}}  caption>
       Vehicule: 
    </Txt>
    <View column>
        <Txt style={{fontSize: 16, fontWeight: "bold"}} spacing={0.5} caption>
            {vehicle.name}
        </Txt>
        <Txt bold gray style={{fontSize: 16}} spacing={0.5} caption>
            {vehicle.type}
        </Txt>
     
     </View>
  </Block>


  <Block space="between" row  style={[ {marginTop: theme.sizes.base },styles.inputRow]}>
    <Txt style={{fontSize: 16, marginBottom: theme.sizes.base}} spacing={0.5} caption>
       Prix: 
    </Txt>
    <Txt style={{fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
          {prix} DH 
    </Txt>
  </Block>
  <Block space="between" row  style={[ {marginTop: theme.sizes.base},styles.inputRow]}>
    <Txt style={{fontSize: 16, marginBottom: theme.sizes.base}} spacing={0.5} caption>
       Distance: 
    </Txt>
    <Txt style={{fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
    {distance} Km
    </Txt>
  </Block>
  <Block space="between" row  style={[ {marginTop: theme.sizes.base},styles.inputRow]}>
    <Txt style={{fontSize: 16, marginBottom: theme.sizes.base}} spacing={0.5} caption>
       Duree: 
    </Txt>
    <Txt style={{fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
    1 heures, 24 minutes
    </Txt>
  </Block>
  <Block space="between" row  style={[ {marginTop: theme.sizes.base},styles.inputRow]}>
    <Txt style={{fontSize: 16, marginBottom: theme.sizes.base}} spacing={0.5} caption>
       Moyen de paiement: 
    </Txt>
    <Txt style={{fontSize: 16, fontWeight: "bold", marginBottom: theme.sizes.base}} spacing={0.5} caption>
    Espèces
    </Txt>
  </Block>

 </Block>
  );
};



render() {
  const { navigation, loading } = this.props;
   return (      
         <ScrollView showsVerticalScrollIndicator={false}>
           <View style={styles.welcome}>
             {this.renderList()}   
                    <Button gradient style={{marginHorizontal:20}}
                     onPress={this._onSaveTrip.bind(this)}>
                        <Txt bold white center> Reservez</Txt>
                    </Button>
          </View>
          {this.renderModalSave()}
        </ScrollView>
    );
  }
}
const mapStateToProps = state => {
    return {
        loadingtrips: state.trips.loading,
        errortrips: state.trips.error,
        added: state.trips.added,
  
    };
};
export default connect(mapStateToProps, { addTrip })(SummaryScreen);

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding/2,
    paddingHorizontal: theme.sizes.padding,
    flex:1
  },
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1
  },
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1
  },

  startTrip: {
    position: "absolute",
    left: (width - 144) / 2,
    bottom: 0
  },


inputRow: {
    alignItems: 'flex-end',
    marginBottom: 2,
    paddingBottom: 15,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
},
tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
    fontSize:15
},
campingInfo: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
    fontSize:15,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
    marginBottom:15
  },
  okBtn: {
    width:150,
    height:40,
   backgroundColor: theme.colors.white,
   borderRadius: 9,
   justifyContent: 'center',
   alignItems: 'center'
},
});