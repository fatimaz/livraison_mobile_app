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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Block, Badge, Card, Txt , Button} from '../components';
import Moment from 'moment';
import { theme } from '../constants';
import {  fetchMessages} from '../actions';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';

const { width, height } = Dimensions.get("screen");

class MessagesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedLocation: '',
        btnDisabled: true,
        chats:[],
        threads:[]
    };
}

 componentDidMount() {
    this.props.fetchMessages();
 }

 _onRefreshMessages() {
  const { navigation } = this.props;
   this.props.fetchMessages();
}

renderList = ( item ) => {
    const { navigation } = this.props; 
    Moment.locale('en');
      return (
      <TouchableOpacity   
        activeOpacity={0.8}
        key={item.id}
        onPress={() => navigation.navigate('ChatMessageScreen', { user:item.sender , item:item.shipment})}   
       >
        <Block row space="between"  style={styles.inputRow}>
            <Block row center space ="between" style={{paddingHorizontal:20, paddingVertical:10}}>          
                 <Block column>
                    <Txt h4 bold>{item.sender.name}</Txt>
                    <Block row>
                         <Text style={styles.headerLocation}>{item.shipment.countries.name} </Text>
                            <Ionicons
                                name="airplane-outline"
                                color={theme.colors.gray}
                                style={{marginTop:4}}
                                size={20}
                            />
                              <Text style={styles.headerLocation}>{item.shipment.countriesto.name} </Text>
                     </Block>
                    {/* <Txt numberOfLines={1} h5 paragraph gray style={{marginVertical:5}}> {item.shipment.countries.name} </Txt> */}
                    {/* {item.message} */}
                    <Txt style={{fontSize:10}} color="black"> {Moment(item.created_at).format('MMM D, YYYY')}</Txt> 
                 </Block>
                   <Avatar
                       source={{ uri: item.sender.photo }}
                       small
                       rounded
                   />
             
                   <FontAwesome name='angle-right' size={24} style={{marginLeft:10}} />
              </Block>
            </Block>
        </TouchableOpacity>

      );
  }
  keyExtractor = (item, index) => index;
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView  style={styles.container}>       
     <Block flex={false}  center style={styles.header}>
          <Txt h2 bold>
          Boîte de réception
          </Txt>
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
                    onRefresh={this._onRefreshMessages.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <Txt center style={styles.emptyMessageStyle}>Aucun Message trouvé</Txt>  
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
      </SafeAreaView>
    );
  }
}
// const mapStateToProps = state => {
//     return {
//         fetching: state.countries.loading,
//         data: state.countries.countries
//     };
// };
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        fetching: state.messagesList.loading,
        data: state.messagesList.messages,
        error: state.messagesList.error,
    }
}

export default connect(mapStateToProps, {  fetchMessages })(MessagesList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
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
    marginTop:90
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
headerLocation: {
  fontSize: theme.sizes.font,
  fontWeight: "500",
  paddingVertical: theme.sizes.base / 3,
  paddingHorizontal:5,
  color:theme.colors.gray
},
});