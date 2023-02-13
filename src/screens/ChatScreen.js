import React, { useState, useCallback, useEffect,useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import {
  StyleSheet,
  Text,
  Image
} from "react-native";
import {db} from './firebase';
import { Block, Txt , Button} from '../components';
import { theme } from '../constants';
function ChatScreen ({ navigation }){
  const [messages, setMessages] = useState([]);
  const  user  = navigation.getParam('user');
  const thread = (user.id > user.id).toString() ;

  //const { navigation } = this.props;
  // useEffect(() => {
  //   const messagesListener = db
  //     .collection('THREADS')
  //     .doc(thread)
  //     .collection('CHATS')
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(querySnapshot => {
  //       const messages = querySnapshot.docs.map(doc => {
  //         const firebaseData = doc.data();
  //         const data = {
  //           _id: doc.id,
  //           text: '',
  //           createdAt: doc.data().createdAt.toDate(),
  //           ...firebaseData
  //         };
  //         if (!firebaseData.system) {
  //           data.user = {
  //             ...firebaseData.user,
  //             name: firebaseData.user.email
  //           };
  //         }
  //         return data;
  //       });
  //       setMessages(messages);
  //     });
  //   // Stop listening for updates whenever the component unmounts
  //   return () => messagesListener();
  // }, []);
 
  useLayoutEffect(()=>{
    const unsubscrive = db.collection('THREADS').doc(thread).collection('CHATS').orderBy('createdAt','desc').onSnapshot(snapshot=>setMessages(
     snapshot.docs.map(doc=>({
       _id :doc.data()._id,
       createdAt:doc.data().createdAt.toDate(),
       text:doc.data().text,
       user:doc.data().user,  
     }))    
  ))
return unsubscrive;
 },[])
 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      createdAt,
      text,
      user,
    }=messages[0]
     db.collection('THREADS').doc(thread)
     .collection('CHATS').add({
       _id,
       createdAt,
       text,
       user,
    })

    db.collection('THREADS')
    .doc(thread)
    .set(
      {
        // user:this.props.user,
        latestMessage: {
          text,
          createdAt,
          user,
        }
      },
      { merge: true }
    );
    // alert(JSON.stringify(messages[0])) 
  },[])

  return (
    <Block>
    <Block flex={false} row center style={styles.header}>
      <Button onPress={() => navigation.navigate("Settings")}>
        <Image source={{uri: user.photo}} style={styles.avatar} />
      </Button>
      <Txt h2 bold>
        {user.name}
      </Txt>
   </Block>
    <GiftedChat
      messages={messages}
      //showAvatarForEveryMessage = {true}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.id,
        name: user.name,
        avatar: user.photo
      }}
    />
    </Block>
  )
}

//make this component available to the app
export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    width: theme.sizes.padding * 1.7,
    height: theme.sizes.padding * 1.7,
    marginRight:10,
    borderRadius: theme.sizes.padding ,
    borderWidth:2,
    borderColor:'gray'
  },
});