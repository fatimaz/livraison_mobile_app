import React, { Component } from 'react';
import { View, Text, StyleSheet , Image} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import Moment from 'moment';
import { Block, Badge, Card, Txt , Button} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
class ChatItem extends Component {
    state = {
        user_id: '',
      }

      componentDidMount() {
        AsyncStorage.getItem("user_id").then((value) =>
       this.setState({ user_id: value })
       );
     }

  

    showAvatarOrNoT(message) {
        const {user_id}= this.state;
        if (message.sender.id !== parseInt(user_id) ) {
            return (
                <Avatar
                    source={{ uri: message.sender.photo }}
                    small
                    rounded
                />
            );
        }

        return <View/>
    }
    render() {
        Moment.locale('en');
        const message = this.props.item;
        const {user_id}= this.state;
        const isMyMessage = message.sender.id === parseInt(user_id);
        const textContainerExtra = isMyMessage ? styles.textContainerRight : styles.textContainerLeft;
        return (
            <View style={styles.messageContainer}>
                {this.showAvatarOrNoT(message)}
                <View style={[styles.textContainer, textContainerExtra ]}>
                <Text style={styles.message}>{message.message}</Text>
                    <Txt gray style={styles.sender}>{Moment(message.created_at).format('D MMM. H:mm')}</Txt>       
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        padding: 20
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        borderRadius: 5,
        marginHorizontal:10,
        paddingVertical: 5
    },
    textContainerLeft:{
        alignItems: 'flex-start',
        backgroundColor: '#FFFAF0',
        padding:10,
    },
    textContainerRight: {
        alignItems: 'flex-end',
        backgroundColor: '#f3f3f3'
    },
    message: {
        fontSize: 16
    },
    sender: {
        fontSize:10,
        paddingRight: 10
    }
});

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(ChatItem);