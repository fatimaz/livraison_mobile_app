import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  Keyboard,
  ScrollView
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Block, Badge, Card, Txt , Button} from '../components';
import Moment from 'moment';
import { theme } from '../constants';
import { addMsg,  fetchMyMessages} from '../actions';
import { connect } from 'react-redux';
import ChatItem from './ChatItem';
import { Header } from 'react-navigation-stack';

const { width, height } = Dimensions.get("screen");

class ChatMessageScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedLocation: '',
        btnDisabled: true,
        chats:[],
        threads:[],
        message:'',
        disabled: true,
        savedData: "",

    };
}
componentWillReceiveProps(nextProps) {
  if (nextProps.saved) {
    const { navigation}=this.props;
    const item = navigation.getParam('user');
    const id = item.id;
    //  this.props.fetchMyMessages({id});
    this._onRefreshMessages.bind(this);
  }
}
 componentDidMount() {
    const { navigation}=this.props;
    const item = navigation.getParam('user');
    const id = item.id;
    this.props.fetchMyMessages({id});
 }
 _onRefreshMessages() {
  const { navigation } = this.props;
  const item = navigation.getParam('user');
  const id = item.id;
   this.props.fetchMyMessages({id});
}


 renderHeader() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const user = navigation.getParam('user');
    return (
        // <TouchableOpacity
        //       onPress={() => navigation.navigate('ShipmentDetails',{shipment:item, mine:0 })}     
        // >
          <View style={styles.header2}>
            <View style={styles.header}>       
                <Block row>
                        <Text style={styles.headerLocation}>{item.countries.name} </Text>
                         
                            <Ionicons
                              name="airplane-outline"
                              color="#FF7657"
                              size={20}
                              style={{marginTop:3}}
                            />
                              <Text style={styles.headerLocation}>{item.countriesto.name} </Text>
                  </Block>
                {/* <FontAwesome name='angle-right' size={30} style={{marginRight:15}} /> */}
             </View>
             <Txt style={{marginLeft:10}} gray small> Contacte {user.name} </Txt>
        </View>
        // </TouchableOpacity>
 
    );
  }

  showListOrSpinner() {
    if (this.props.fetching) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
            inverted
            data={this.props.messages}
            renderItem={this.renderChatItem}
            keyExtractor={this.keyExtractor}
            refreshControl={
                <RefreshControl
                  refreshing={this.props.fetching}
                  onRefresh={this._onRefreshMessages.bind(this)}
                />
              } 
        />
        </SafeAreaView>
    );
}

renderChatItem({ item }) {
    return <ChatItem item={item} />
}
onSendBtnPressed () {
    const {   message } = this.state;
    const {loading, navigation}=this.props
    const errors = [];
    Keyboard.dismiss();
    this.setState({ loading: true });
    if (!message) errors.push('message');

    const item = navigation.getParam('user');

    const shipment = navigation.getParam('item');
    const shipment_id=shipment.id;
    const id = item.id;
    const receiver_id = item.id;

    this.props.addMsg({receiver_id,shipment_id, message});
    this.textInput.clear();
     this.props.fetchMyMessages({id});
     this.setState({disabled:true})
    }
//      if (!errors.length) {
//     this.props.addMsg({receiver_id,object, message});
//     }else{
//       this.setState({ loading: false });
//       Alert.alert(
//         'Erreur',
//         'Veuillez vérifier vos champs.',
//         [
//           { text: 'Réessayer', }
//         ],
//         { cancelable: false }
//       )
//   }


onTyping(text) {
    if (text && text.length >= 2 ) {
        this.setState({
            disabled: false,
            text,
            message: text
        });

    } else {
        this.setState({
            disabled: true
        })
    }
 }

  keyExtractor = (item, index) => index;
  render() {
    const extraBtnStyle = this.state.disabled ? styles.disabledBtn : styles.enabledBtn;
    let behavior = '';
    if (Platform.OS == 'ios')  {
        behavior = 'padding'
    }
    const { navigation } = this.props;
    return (
    
      <KeyboardAvoidingView
      keyboardVerticalOffset = {Header.HEIGHT + 20} // adjust the value here if you need more padding
      style = {{ flex: 1 }}
      behavior = "padding" >
      < View
          style={{
            flex: 1, 
            backgroundColor: "#FFFFFF",
        }}
      >       
        {/* <ScrollView
          contentContainerStyle={{ justifyContent: "flex-end", flex: 1 }}> */}
                   {this.renderHeader()}  
                   { this.showListOrSpinner () } 
              {/* </ScrollView> */}

        
              <View style={styles.inputBar}>     
                        <TextInput 
                            placeholder="Tapez votre message ici"
                            style={styles.textBox} 
                            multiline
                            onChangeText={(text) => this.onTyping(text)}
                            ref={input => { this.textInput = input; } }
                            autoCorrect={false}
                        />

                        <TouchableHighlight 
                            style={[styles.sendBtn, extraBtnStyle ]}
                            disabled={this.state.disabled}
                            onPress={this.onSendBtnPressed.bind(this)}
                        >
                        <Ionicons
                            name="send-sharp"
                            color={theme.colors.primary}
                            size={30}
                        />
                        </TouchableHighlight>
                    </View>
              </ View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
    return {
        fetching: state.userMessages.loading,
        messages: state.userMessages.messages,
        error: state.userMessages.error,
        loading: state.addmessage.loading,
        saved: state.addmessage.saved
    }
}

export default connect(mapStateToProps, { addMsg,  fetchMyMessages })(ChatMessageScreen);

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding/3,
    backgroundColor: theme.colors.gray4
 },
inputBar: {
      borderTopColor:"gray",
      borderTopWidth:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      backgroundColor: '#f3f3f3'
},
textBox: {
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: 'gray',
    fontSize: 14,
  //  paddingHoriztonal: 10,
    flex: 1,
    paddingVertical: 5,
    paddingLeft:10,
    marginLeft: 5
},
sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginLeft: 5
},
enabledBtn: {
    backgroundColor: '#476DC5'
},
disabledBtn: {
    backgroundColor: 'lightgray'
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
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingTop: 45,
    paddingBottom: 25
  },
 emptyMessageStyle: {
    textAlign: 'center',
 },
avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight:10,
      marginHorizontal:10,
},
inputRow: {
      alignItems: 'flex-end',
      marginBottom: 2,
      paddingBottom: 15,
      borderBottomColor: '#EAEAED',
      borderBottomWidth: 1,
},
header: {
    flexDirection: "row",

  },
  header2: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: theme.sizes.base ,
    paddingTop: theme.sizes.base ,
    paddingBottom: theme.sizes.base ,
    backgroundColor:'#f3f3f3'
  },
headerLocation: {
    fontSize: theme.sizes.font*1.2,
    fontWeight: "500",
    paddingHorizontal:10,
  },
  headerTitle: {
    color: theme.colors.gray
  },
});