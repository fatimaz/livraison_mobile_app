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
  TextInput,
  Alert,
  Keyboard
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt , Button, Input} from '../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import { connect } from 'react-redux';
import {  editOffer, fetchMyTrips } from '../actions';

const { width, height } = Dimensions.get("window");

class MakeOfferScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      reward:0,
      shipment_id:'',
      trip_id: '',
      errors: [],
      load: false,
      profile: null,
    };
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.edited) {
        Alert.alert(
         'Merci',
         'Votre demande a été modifiée avec succès, vous pouvez suivre votre demande dans la page des offres.',       
       [
         {
           text: 'OK', onPress: () => {
            this.props.fetchMyTrips(); 
            this.props.navigation.navigate('MyTrips'); 
           }
         }
       ],
       { cancelable: false }
     )  
   }
 }
 componentDidMount() {
  const { navigation } = this.props;
  const item = navigation.getParam('item');
  const reward = navigation.getParam('reward');
   this.setState({reward});
  // this.setState({ message: item.message });
 
}
 _onSaveOffer() {
  const {message, reward} = this.state;
 const { navigation } = this.props;
 const item = navigation.getParam('item');
 const id  = item.id;

 const errors = [];
 Keyboard.dismiss();
 this.setState({ loading: true });
 if (!reward) errors.push('reward');

 if (!errors.length) {
 this.props.editOffer({id,reward });
 }else{ 
  this.setState({ errors, loading: false });
  Alert.alert(
    'Erreur',
    'Veuillez vérifier vos champs.',
    [
      { text: 'Réessayer', }
    ],
    { cancelable: false }
  )
}
}

_renderButton() {
 const { loading } = this.props;
     return ( 
         <Button gradient style={{margin:10}} 
           onPress={this._onSaveOffer.bind(this)}
           >
         {loading ? (
             <ActivityIndicator size="small" color="white" /> 
         ) : ( 
             <Txt bold white center> Modifier</Txt>
         )}
         </Button>
       );
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
  renderTrip = () => {
    const {  navigation } = this.props;
    const item = navigation.getParam('item');
   return (
    <Card shadow style={{marginHorizontal:5}}>
    <Block row center>
      <Badge
        color={rgba(theme.colors.accent, "0.2")}
        size={14}
        style={{ marginRight: 8 }}
      >
        <Badge color={theme.colors.accent} size={8} />
      </Badge>
      <Txt  bold style={{ fontSize: 16}}  spacing={0.5} color="gray">
      { item.trip.countries.name } 
      </Txt>
  
    </Block>

    <Block row center style={{ paddingVertical: 4 }}>
      <Badge color="lightgray" size={4} style={{ marginLeft: 4.5 }} />
    </Block>
    <Block row center>
      <Badge
        color={rgba(theme.colors.primary, "0.2")}
        size={14}
        style={{ marginRight: 8 }}
      >
        <Badge color={theme.colors.primary} size={8} />
      </Badge>
      <Txt  bold style={{ fontSize: 16}}  spacing={0.5} color="gray">
      { item.trip.countriesto.name } 
      </Txt>
    </Block>
    <Block row space="between" style={{ marginTop: theme.sizes.base }}>
      <Txt style={{fontSize: 14}} spacing={0.5} caption>
         Date:{ item.trip.travel_date } 
      </Txt>

      {/* <Txt style={{fontSize: 14, fontWeight: "bold"}} spacing={0.5} caption>
      { item.weight_total } g Valable
      </Txt> */}
    </Block> 
</Card>
      )
  }
 
  renderShipment = () => {
    const {  navigation } = this.props;
    const item = navigation.getParam('item');
      return (
        <TouchableOpacity
        key={item.user.name}
        style={{marginBottom:15}}
        onPress={() => navigation.navigate('ShipmentDetails',{shipment:item.shipment, mine:2 })}     
       >
        <Card shadow style={{marginHorizontal:5}}>
        <View style={styles.camping}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            source={{ uri: item.shipment.photo }}
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
                { item.shipment.name }
              </Text>
              <Block row space="between" style={{marginTop:5}}>
              <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                { item.shipment.countries.name }  
                </Text>
                
                <Ionicons
                  name="airplane-outline"
                  color="#FF7657"
                  size={20}
                />
                 <Text style={{ fontSize: 16, color: "#A5A5A5" }}>
                    { item.shipment.countriesto.name  }
                </Text>
                </Block>            
            </View>
            {/* <View style={{ flex: 1, flexDirection: "row" ,marginTop:7}}>
              <View style={styles.campingInfo}>
                <MaterialCommunityIcons
                  name="weight"
                  color="#FF7657"
                  size={14}
                />
                <Txt bold style={{  fontSize: 14, marginLeft: 4,  color: "#FF7657" }}>
                    { item.weight } g
                </Txt>
              </View>
            </View> */}
          </View>   
        </View>
      
          <Block flex={false} color="lightgray" style={styles.hLine} />
          <Block row space="between">
         <Image
           source={{ uri: item.shipment.user.photo }}
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
                   {item.shipment.user.name}
               </Txt>
               {(item.shipment.user.avgstars != 0) ? 
               (
               <Block row style={{marginTop:2}}>
                   <FontAwesome name="star" color="#FFBA5A" style={{marginRight:5, marginTop:2}}  size={16} />
                      <Txt style={{ fontSize: 12 }}>
                         {item.shipment.user.avgstars}
                      </Txt>
                </Block>     
                ) : 
                <Block row style={{marginTop:2}}>
                <FontAwesome name="star" color="gray" style={{marginRight:5, marginTop:2}}  size={16} />
            </Block>
              }

            </Block>
            </Block>
          </Card> 
          </TouchableOpacity>
      );
  }
 
  requestReward = () => {
    const {  errors } = this.state;
    const { navigation } = this.props; 
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
      return (
        <Block padding={[20, theme.sizes.base ]}>
          <Block middle>
            <Txt style={{marginLeft:10}} black accent>Montant de récompense souhaité en Euro</Txt>
            <TextInput
              placeholder="Montant de récompense souhaité en Euro"          
              style={[styles.input, hasErrors('reward')]}
              defaultValue={this.state.reward}
              keyboardType = 'numeric'
              selectionColor= {theme.colors.accent}
              onChangeText={text => this.setState({ reward: text })}
            />
            {/* <Txt style={{marginLeft:10}} black accent>Message</Txt>
            <TextInput
              placeholder="Discutez le coût, la récompense,  la date de livraison, et le lieu de rendez-vous... (optionnel)"
              style={[styles.inputText]}
              autoCorrect={false}
              defaultValue={this.state.message}
              selectionColor= {theme.colors.accent}
              multiline={true}
              onChangeText={text => this.setState({ message: text })}
            />          */}
            {this.showErrorMessage()}
            <Txt center caption gray >En vous inscrivant, vous acceptez les conditions générales de l'application </Txt>
            {/* { this._renderButton() }   */}
          </Block>
        </Block>
  )
}

keyExtractor = (item, index) => index;
render() {
  const {  navigation } = this.props;
  const item = navigation.getParam('item');
    return (
      <SafeAreaView  style={styles.container}>
           <ScrollView showsVerticalScrollIndicator={false}>
           <Txt center style={{ fontSize: 18, fontWeight: "bold", marginHorizontal:15, marginBottom: 10 }}>
              Modifier votre offre
              </Txt>
           {this.renderTrip()}
           {this.renderShipment()}
           <Block> 
           <Txt center h4>
              Récompense recommandée
            </Txt>
            <Txt bold h3 center>A partir de {item.shipment.reward} €</Txt>
           {this.requestReward()}
           
           </Block>
           {this._renderButton()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
        loading: state.editOffer.loading,
        error: state.editOffer.error,
        edited: state.editOffer.edit
  }
}

export default connect(mapStateToProps, {fetchMyTrips, editOffer })(MakeOfferScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: theme.sizes.padding/2,
    backgroundColor: theme.colors.gray4
    
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

  avatar: {
    width: theme.sizes.padding * 1.4,
    height: theme.sizes.padding * 1.4,
    marginRight:10,
    borderRadius: theme.sizes.padding ,
    borderWidth:2,
    borderColor:theme.colors.gray2
  },
  camping: {
    flex: 1,
    flexDirection: "row",
 
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
  startTrip: {
    position: 'absolute',
    right: (width - 330) / 2,
    bottom: 10,
  },
  input: {
    // borderRadius: 0,
    // borderWidth: 0,
    // borderBottomColor: theme.colors.gray2,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical:10,
    marginHorizontal:5,
    borderRadius: 10,
    padding:10,
    borderColor:'#efeff0',
    borderWidth:2,
    backgroundColor: '#fff',
  },
  inputText:{
    marginVertical:10,
    marginHorizontal:5,
    borderRadius: 10,
    padding:10,
    borderColor:'#efeff0',
    borderWidth:2,
    backgroundColor: '#fff',
    height:100
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});