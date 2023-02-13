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
import { Header } from 'react-native-elements';
import { theme } from '../constants';
import {  fetchMessages} from '../actions';
import {db} from './firebase';
import { connect } from 'react-redux';


const { width, height } = Dimensions.get("screen");
// const [users,setUsers] = useState(null)
// const getUsers = async ()=>{
//          const querySanp = await firestore().collection('users').where('uid','!=',user.uid).get()
//          const allusers = querySanp.docs.map(docSnap=>docSnap.data())
//         //  console.log(allusers)
//          setUsers(allusers)


// }


class ChatListScreen extends Component {

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
  // .then(docRef => {
  //   docRef.collection('CHATS').add({
  //     text: `You have joined the room .`,
  //     createdAt: new Date().getTime(),
  //     system: true
  //   });
  //   navigation.navigate('ChatListScreen');
  // });
  // this.props.fetchMessages();

//  db.collection('THREADS')
//  .get().then(
//  doc => {
//    if (doc.exists) {
//     alert('subcollection exists');

//       //   db.collection('CHATS').get().
//       //  then(sub => {
//       //    if (sub.docs.length < 0) {
//       //      alert('subcollection exists');
//       //    }
//       //  });
//    }else{
//     alert(' exists');
//    }
//  });
     const unsubscribe = db
     .collection('THREADS')
     .orderBy('latestMessage.createdAt', 'desc')
     .onSnapshot(querySnapshot => {
       const threads = querySnapshot.docs.map(documentSnapshot => {
         return {
           _id: documentSnapshot.id,
           // give defaults
           name: '',
           latestMessage: {
           text: '',
           user:''
           },
           ...documentSnapshot.data()
         };
       });

     //  setThreads(threads);
    //  alert(JSON.stringify(threads))
    this.setState({threads})
      //  if (loading) {
      //    setLoading(false);
      //  }
    });
  
   /**
    * unsubscribe listener
    */
  return () => unsubscribe();
 }


  _onRefreshCountries() {
  const { navigation } = this.props;
   this.props.fetchMessages();
}


renderHeader() {
  return (
   <View style={styles.headerContainer}>
        <View style={{flexDirection: "row" }}> 
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
               Messages
            </Text>        
      </View>    
    </View>
  );
}

  renderList = ( item ) => {
    const { navigation } = this.props; 
    // alert(JSON.stringify(item))
    const time = item.latestMessage.createdAt.toString()
      return (

        <TouchableOpacity   
        activeOpacity={0.8}
        key={item._id}
        // onPress={() => navigation.navigate('ChatScreen',{thread:1})}  
        onPress={() => navigation.navigate('ChatScreen', { user: item })}   
      >

        <Block row space="between"  style={styles.inputRow}>
             {/* <Block column>
                   <Txt h3 bold>{item.latestMessage.user.name}</Txt>
                   <Txt h3 bold>{item.latestMessage.user.name}</Txt>
                   <Txt h3 bold>{item.latestMessage.user.name}</Txt>
                   {/* <Txt h5 paragraph gray style={{paddingVertical:5}}>{item.latestMessage.text}</Txt>
                   <Txt style={{fontSize:10}}  color="black">ss</Txt>  */}
              {/* </Block>
              <Block row>
              <Image
                  style={styles.avatar}
                  source={{ uri: item.latestMessage.user.avatar }}
                />
                 <FontAwesome name='angle-right' size={24} />
              </Block> */}
            <Block row center space ="between" style={{paddingHorizontal:20, paddingVertical:10}}>       
                 <Block column>
                   <Txt h3 bold>{item.latestMessage.user.name}</Txt>
                   <Txt h5 paragraph gray >{item.latestMessage.text}</Txt>
                   <Txt style={{fontSize:10}} color="black">20-10-201</Txt> 
                   </Block>
                   <Image
                      style={styles.avatar}
                      source={{ uri: item.latestMessage.user.avatar }}
                    />
                  <FontAwesome name='angle-right' size={24} />
              </Block>
              {/* <Block style={{paddingHorizontal:10, paddingBottom:10}}> */}
                     {/* <Txt style={{fontSize:10}} right color="black">{item.latestMessage.createdAt.toDate()}</Txt> */}
              {/* </Block> */}        
            </Block>
        </TouchableOpacity>
      //   <Block row space="between" >        
      //       <Block row center>
      //         <Block>
      //           <Image
      //             style={styles.avatar}
      //             source={{ uri: item.latestMessage.user.avatar }}
      //           />
      //         </Block>
      //         <Block flex={2}>
      //             <Txt>{item.latestMessage.user.name}</Txt>
      //           {/* <Txt h3>{item._id}</Txt> */}
      //           <Txt h5 paragraph gray style={{paddingVertical:5}}>{item.latestMessage.text}</Txt>
      //         </Block>
      //         <Block>
      //           <Txt style={{fontSize:10}} small right color="black">12 octobre </Txt>
      //         </Block>
      //       </Block>
      //     </TouchableOpacity>
      //   </Block>
      // </Block>
      );

  }
  keyExtractor = (item, index) => index;
  render() {
    const { navigation } = this.props;
    // alert(JSON.stringify(this.props.data))
    return (
      <SafeAreaView  style={styles.container}>      
        {this.renderHeader()}    
       <ScrollView showsVerticalScrollIndicator={false}>
        {(!this.props.fetching && this.props.data != null) ? 
         (
          <FlatList
                data={this.state.threads}   
                renderItem={({ item }) => this.renderList(item)}
                // keyExtractor={item => item.id.toString() } 
                   keyExtractor={this.keyExtractor}  
                //   refreshControl={
                //   <RefreshControl
                //     refreshing={this.props.fetching}
                //     onRefresh={this._onRefreshCountries.bind(this)}
                //   />
                // } 
                ListHeaderComponent={() => (!this.state.threads.length? 
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
        </ScrollView> 
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


//make this component available to the app
export default ChatListScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding/3,
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
});