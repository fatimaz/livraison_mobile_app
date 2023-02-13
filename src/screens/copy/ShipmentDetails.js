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
  
} from "react-native";

import rgba from "hex-to-rgba";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt, Button } from "../components";
import { connect } from 'react-redux';
import { addBooking } from '../actions';
import Moment from 'moment';
import 'moment/locale/fr';

const { width, height } = Dimensions.get("window");
import { theme } from "../constants";
import { fonts, sizes } from "../constants/theme";


class ShipmentDetails extends Component {

  componentWillReceiveProps(nextProps) {
 
    if (nextProps.saved) {
         Alert.alert(
        '',
        'réservé! profitez de votre voyage',       
        [
          {
            text: 'OK', onPress: () => {
               this.props.navigation.navigate('Active'); 
            }
          }
        ],
        { cancelable: false }
      )  
    }
  }

  _onSaveBooking() {

    const { navigation } = this.props;

    this.props.addBooking({trip_id, last_price,qty});
    
  }
  showErrorMessage() {
    if (this.props.error) {
        return (
            <View style={styles.containerWithMargin}>
                <Txt accent style={styles.errorMessage}>{this.props.error}</Txt>
            </View>
        );
    }
}
 
  _renderButton() {
    const { navigation,loading } = this.props;
    const shipment = navigation.getParam('shipment');

        return ( 
            <Button gradient style={{margin:10}} onPress={this._onSaveBooking.bind(this)}>
            {loading ? (
                <ActivityIndicator size="small" color="white" /> 
            ) : ( 
                <Txt bold white center>Réserver</Txt>
           )} 
            </Button>
          );
     
    }


   renderListDetails = () => {

      return (  
  
      <Block style={{paddingVertical:10}}>  
            <Block row center style={{marginBottom:10}}>
                      {/* <Txt spacing={0.5} bold color="gray" style={{marginRight:10}}>
                        65:00
                      </Txt> */}
                      <Badge
                        color={rgba(theme.colors.accent, "0.2")}
                        size={14}
                        style={{ marginRight: 8 }}
                      >
                        <Badge color={theme.colors.accent} size={8} />
                      </Badge>
                      <Block column>  
                  <Txt spacing={0.5} bold>
                    From: Montreal
                  </Txt>
                
                </Block>
                </Block>      
                {/* <Block row  style={{ paddingVertical: 4 ,marginRight:190}}>
                {/* <Txt spacing={0.5} color="white" style={{marginRight:10}}>
                            13:00
                </Txt> */}
                {/* <Badge color="gray2" size={4} style={{ marginLeft:100 }} /> */}
                {/* </Block>    */} 
                {/* <Block flex={false} color="red" style={styles.vLine} /> */}
                <Block row center style={{marginBottom:10}}>
                      {/* <Txt spacing={0.5} bold color="gray" style={{marginRight:10}}>
                    65:00
                      </Txt> */}
                      <Badge
                        color={rgba(theme.colors.accent, "0.2")}
                        size={14}
                        style={{ marginRight: 8 }}
                      >
                        <Badge color={theme.colors.accent} size={8} />
                      </Badge>
                      <Block column>  
                  <Txt spacing={0.5} bold>
                    To : London
                  </Txt>             
                </Block>
          
                </Block> 
              <Txt medium gray style={{fontSize: 14}}>
                Expected by 07 jul 2021
             </Txt>
              </Block> 
          
      )
}

 

    renderTrips() {
      const { navigation } = this.props;
      const item = navigation.getParam('shipment');

      return (  
      <Block style={styles.inputs}>  
           <Txt h2 bold>
           {item.name}
          </Txt>
          <Block flex={false} row margin={[theme.sizes.base, 0]}>   
              <Txt caption gray bold style={styles.tag}>
                Rewards : {item.reward}
              </Txt>
                <Txt caption gray bold style={styles.tag}>
                Weight :  {item.weight} kg
              </Txt>
               {/* <Txt caption gray style={styles.tag}>
                Price :  { item.price } dh
              </Txt> */}
          </Block>
            {/* <Txt gray light height={22}>
              jhjh
            </Txt> */}

          {/* <Divider margin={[theme.sizes.padding * 0.9, 0]} />  */}
      
         {/* <Txt>{Moment(item.date,"YYYY-MM-DD hh:mm:ss", true).format('ddd DD MMM')} </Txt> */}
         <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
         {this.renderListDetails()}
         {/* <FlatList
              data={item.stations}
              vertical
              renderItem={({ item }) => this.renderListDetails(item)}
              keyExtractor={item => item.id.toString() }   
        /> */}
        </Block>
    <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
        <Block>
          <Txt medium gray style={{fontSize: 14, marginBottom:5, fontWeight: 'bold'}}>
            Link  :  {item.link}
          </Txt>
          <Txt medium gray style={{fontSize: 14,marginBottom:5, fontWeight: 'bold'}}>
            Quantity  :  {item.qty}
          </Txt>
           <Txt medium gray style={{fontSize: 14,marginBottom:5, fontWeight: 'bold'}}>
            Category  : clothes
          </Txt> 
          <Txt medium gray style={{fontSize: 14, marginBottom:5,fontWeight: 'bold'}}>
            weight  : 2kg
          </Txt> 
           <Txt medium gray style={{fontSize: 14, marginBottom:5,fontWeight: 'bold'}}>
            price  : 29dg
          </Txt> 
        </Block> 
       </Block>
      <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
        <Block>
          <Txt medium gray style={{fontSize: 14, fontWeight: 'bold', marginBottom:10}}>
           Requested by ahmed
          </Txt>
           <Txt medium blue style={{fontSize: 14}}>
           Contact ahmed
          </Txt>
        </Block> 
        <Txt medium style={{fontSize: 14, fontWeight: 'bold'}}>
        {/* { item.vehicle.name} */}
           <Image
              style={styles.tutImage}
            //   source={{uri: IMAGE_URL + booking_details.image }}
            source= {require("../assets/icons/back.png")}
            
            />
        </Txt>
       </Block>
         {/* <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
           <Block>
          <Txt medium gray style={{fontSize: 14, fontWeight: 'bold'}}>
            Reward  
          </Txt>
    
        </Block> 
        <Txt medium style={{fontSize: 14, fontWeight: 'bold'}}>
             25dh
         </Txt>
       </Block> */}
 
 {/*  */}
   <Block flex={false} row margin={[theme.sizes.base, 0]}>   
              <Txt caption gray bold style={styles.tag}>
                Accept
              </Txt>
                <Txt caption gray bold style={styles.tag}>
                Reject
              </Txt>
               {/* <Txt caption gray style={styles.tag}>
                Price :  { item.price } dh
              </Txt> */}
    </Block>
    <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
        
        <Block>
          <Txt medium gray style={{fontSize: 14, fontWeight: 'bold', marginBottom:10}}>
           Offered by ahmed
          </Txt>
          <Txt medium blue style={{fontSize: 14}}>
           Total :
          </Txt>
           <Txt medium blue style={{fontSize: 14}}>
           Accept
          </Txt>
          <Txt medium blue style={{fontSize: 14}}>
           Reject
          </Txt>
        </Block> 
        <Txt medium style={{fontSize: 14, fontWeight: 'bold'}}>
        {/* { item.vehicle.name} */}
           <Image
              style={styles.tutImage}
            //   source={{uri: IMAGE_URL + booking_details.image }}
            source= {require("../assets/icons/back.png")}
            
            />
        </Txt>
       </Block>

 {/*  */}
   
       <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
        <Block>
          <Txt medium gray  style={{fontSize: 14, fontWeight: 'bold'}}>
            {/* { booking_details.firstname }  */}
            Note
          </Txt>
          <Txt gray3 style={{ marginTop: 10 }}>Pellentesque in ipsum id orci porta dapibus.
           Proin eget tortor risus. Donec sollicitudin molestie malesuada. Quisque velit nisi</Txt>
             {/* {this.showRating(booking_details.stars )} */}
        </Block> 
        
        {/* {(price==0) ? 
           (     <Txt medium style={{fontSize: 14, fontWeight: 'bold'}}>{ item.price}</Txt>

          ) :      <Txt medium style={{fontSize: 14, fontWeight: 'bold'}}>{ price}</Txt>
        }
      */}
       </Block>
   </Block>
   );
  };

  render() {
    return (
        
    //    <ScrollView  showsVerticalScrollIndicator={false}>
            <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            // source={item}
            source= {require("../assets/icons/back.png")}
            resizeMode="contain"
            style={{ width, height: height / 3.8, padding:20 }}
          />
           <View style={styles.welcome}>
          {this.renderTrips()} 
          {this.showErrorMessage()}       
          { this._renderButton() }
          </View>
        </ScrollView>
   
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     error: state.bookTrip.error,
//     loading: state.bookTrip.loading,
//     saved: state.bookTrip.saved
//   }
// }

// export default connect(mapStateToProps, { addBooking })(ShipmentDetails);
export default  ShipmentDetails;

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding/2,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4
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
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base/6,
  },
  inputRow: {
    alignItems: 'flex-end',
    marginBottom: 2,
    paddingBottom: 15,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
 
  tutImage: {
    height: theme.sizes.base * 2.4,
    width: theme.sizes.base * 2.4,
    marginBottom:15,
    borderRadius: 20,
  },
  containerWithMargin: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
    tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625
  },
  
});