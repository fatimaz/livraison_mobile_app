import React, { useState, useCallback, useEffect } from 'react'
import { Alert, Text, StyleSheet, ScrollView, Keyboard, TextInput, View } from 'react-native'
import { connect } from 'react-redux';
import {  addShipment } from '../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Button, Block, Txt, Input, Badge } from '../components';
import { GiftedChat } from 'react-native-gifted-chat';
// import firestore from '@react-native-firebase/firestore'; 

export default function ChatScreen() {
        const [messages, setMessages] = useState([]);
       
        useEffect(() => {
          setMessages([
              {
                  _id:1,
                  text:'hello',
                  createdAt: new Date(),
                  user : {
                      _id:2,
                      name: 'react',
                      avatar:'ssss'
                  }
              }
      
            
          ])
        }, [])
       
        const onSend = (messageArray)  =>{
            const msg = messageArray[0]
            const mymsg = {
                ...msg,
                sendBy:user.uid,
                sendTo:uid,
                createdAt: new Date()
            }
           setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        //    const docid = uid > user.uid ? user.uid +  "-"+ uid : uid+ "-"+ user.uid
        //    firestore().collection('chatroom').doc(docid)
        }
       
        return (
          <GiftedChat
            messages={messages}
            onSend={text => onSend(text)}
            user={{
              _id: 1,
            }}
            renderChatEmpty ={()=>{
                return(
                    <View style={{ flex:1, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{ transform:[{scaleY: -1 }]}}>No message yet</Text>
                    </View>
                )
            }}
          />
        )
      }