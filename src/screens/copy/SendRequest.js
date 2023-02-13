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
  TextInput
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Block, Badge, Card, Txt , Button, Input} from '../components';
import { theme } from '../constants';
import rgba from "hex-to-rgba";
import { ThemeConsumer } from 'react-native-elements';

// const { width, height } = Dimensions.get("screen");
const { width, height } = Dimensions.get("window");

class SendRequest extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      password: '',
      errors: [],
      load: false,
      profile: null,
    };
  }

  renderShipment = () => {
    const {  navigation } = this.props;
      return (
  
        <Card shadow style={{marginHorizontal:15}}>
        {/* <View style={styles.cardcamping}> */}
        <View style={styles.camping}>
          <ImageBackground
            style={styles.campingImage}
            imageStyle={styles.campingImage}
            // source={{ uri: camping.image }}
            // source={{ uri: item.url }}
            // {require("../../assets/icons/back.png")}
          />

          <View style={styles.campingDetails}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
               Name
              </Text>
              <Text style={{ fontSize: 14, color: "#A5A5A5", paddingTop: 5 }}>
               From  -  to
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {/* <View style={styles.campingInfo}>
              <Ionicons name="md-pricetag" color="black" size={12} />
                <Text style={{ marginLeft: 4, color: "#FFBA5A" }}>
                 Reward $ 20
                </Text>
              </View> */}
              <View style={styles.campingInfo}>
                <FontAwesome
                  name="location-arrow"
                  color="#FF7657"
                  size={12}
                />
                <Text style={{  fontSize: 10, marginLeft: 4, marginTop:5, color: "#FF7657" }}>
                   before20
                </Text>
              </View>
            </View>
          </View>   
        </View>
          <Block flex={false} color="gray" style={styles.hLine} />

          <Block row space="between">
           {/* <Txt spacing={0.5} caption> */}
         <Image
           resizeMode="contain"
             source= "https://static.dezeen.com/uploads/2020/10/netina-shoose-shoes-design_dezeen_2364_col_9-852x1001.jpg"
            style={{ width: 20, height: 24, marginRight: 8 }}
           />
           {/*  */}
           <Block
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Txt spacing={0.5} color="gray">
                  name
               </Txt>
              <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
              <FontAwesome name="star" color="#FFBA5A" size={12} />
              </Txt>
            </Block>
           <View style={styles.campingInfo}>
              <Ionicons name="md-pricetag" color="black" size={12} />
                <Text style={{ marginLeft: 4, color: "#FFBA5A" }}>
                 Reward $ 20
                </Text>
              </View>
            </Block>
          </Card>

      );
  }

  renderTrip = () => {
    const {  navigation } = this.props;
      return (
    <Card shadow style={{marginHorizontal:15}}>
    <Block row center>
      <Badge
        color={rgba(theme.colors.accent, "0.2")}
        size={14}
        style={{ marginRight: 8 }}
      >
        <Badge color={theme.colors.accent} size={8} />
      </Badge>
      <Txt spacing={0.5} color="gray">
         Name
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
      <Txt spacing={0.5} color="gray">
     uk
      </Txt>
    </Block>
    <Block row space="between" style={{ marginTop: theme.sizes.base }}>
      <Txt style={{fontSize: 10}} spacing={0.5} caption>
       Travel Date :  20/02/2020
      </Txt>

      <Txt style={{fontSize: 10, fontWeight: "bold"}} spacing={0.5} caption>
           20kg available
      </Txt>
    </Block>
    {/* <Block flex={false} color="gray" style={styles.hLine} /> */}
    {/* <Block row center> */}
     {/*  */}
     {/* <Block row space="between">
     <Image
       resizeMode="contain"
        source={require("../assets/icons/back.png")}
        style={{ width: 20, height: 24, marginRight: 8 }}
       />
       <Block
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Txt spacing={0.5} color="gray">
            Fatima
           </Txt>
          <Txt style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
          <FontAwesome name="star" color="#FFBA5A" size={12} />
          </Txt>
        </Block>
       <Txt spacing={0.5} caption>
        send request
       </Txt>
    </Block>
    </Block> */}
 </Card>
      )
  }
  _renderButton() {
    const { loading } = this.props;
        return ( 
            <Button gradient style={{margin:10}} 
            //   onPress={this._onSaveTrip.bind(this)}
              >
            {loading ? (
                <ActivityIndicator size="small" color="white" /> 
            ) : ( 
                <Txt bold white center>Send Request</Txt>
            )}
            </Button>
          );
    }
  requestReward = () => {
    const {  navigation } = this.props;
    // const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
      return (
        <Block padding={[10, theme.sizes.base ]}>
          <Block middle>
            <Txt style={{marginLeft:10}} black accent>Delivery rewards</Txt>
            <TextInput
              label="Delivery Rewards"
              
            //   error={hasErrors('name')}
              style={[styles.input]}
              defaultValue={this.state.name}
              selectionColor= {theme.colors.accent}
              onChangeText={text => this.setState({ name: text })}
            />
            <Txt style={{marginLeft:10}} black accent>Message</Txt>
            <TextInput
              placeholder="Hi, Sarag I am Travelling from UK to Madrid"
            //   error={hasErrors('email')}
              style={[styles.inputText]}
              defaultValue={this.state.email}
              selectionColor= {theme.colors.accent}
              multiline={true}
              onChangeText={text => this.setState({ email: text })}
            />         
            {/* {this.showErrorMessage()} */}
            <Txt center caption gray >En vous inscrivant, vous acceptez les conditions générales de l'application </Txt>
            { this._renderButton() }
     
          </Block>
        </Block>
  )
}

  keyExtractor = (item, index) => index;
  render() {
    return (
      <SafeAreaView  style={styles.container}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginHorizontal:15, marginBottom: 10 }}>
                Send Request
              </Text>
           <ScrollView showsVerticalScrollIndicator={false}>
           {this.renderTrip()}
           <Block flex={false} color="gray" style={styles.hLine} />
           {this.renderShipment()}
           <Block>
           <Txt center bold h4>
                Recommended reward starts from 7$
            </Txt>
           {this.requestReward()}
           
           </Block>
        </ScrollView>
        {/* {this.renderButton()} */}
      </SafeAreaView>
    );
  }
}




//make this component available to the app
export default SendRequest;

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
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },

  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.15,
    paddingHorizontal: 14
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
  tabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent"
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10
  },
  activeTab: {
    borderBottomColor: "#FF7657"
  },
  activeTabTitle: {
    color: "#FF7657"
  },
  map: {
    flex: 1
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
});