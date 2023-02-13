import React, { Component } from 'react';
import { SafeAreaView, ActivityIndicator, TouchableOpacity, View, StyleSheet , ScrollView, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Block, Button, Txt } from '../components';
import { theme } from '../constants';
import Moment from 'moment';

class MessageDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message:'',
          object:'',
        };
    }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    Moment.locale('en');
    return (   
        <SafeAreaView  style={styles.container}>      
       <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={[50, theme.sizes.base * 2]}>
        <Block row space="between"> 
           <Block
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
    
              <Txt h4 bold spacing={0.5} color="black">
                  De :  {item.sender.name}
               </Txt>
            </Block>
              <Txt style={{fontSize:13}} gray bold> {Moment(item.created_at).format('MMM D, YYYY')}</Txt> 
            </Block>
           <Txt style={{fontSize:15, marginVertical:25}} color="black" > {item.message} </Txt>   
        </Block>
     </ScrollView>
     <TouchableOpacity onPress={() => navigation.navigate("MessageScreen", {user: item.sender})}>
        <View style={styles.repondreBtn}> 
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name='reply' size={24} color='#64B5F6'/>
           <Txt center style={styles.repondreText}>Repondre</Txt> 
       </View>
    </View>
    </TouchableOpacity>
    </SafeAreaView>
    )
  }
}

export default MessageDetails;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: theme.sizes.padding,
        paddingHorizontal: theme.sizes.padding/3,
        backgroundColor: theme.colors.gray4
      },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical:10,
    paddingVertical:10
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  containerWithMargin: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessage: {
      color: theme.colors.red,
      fontSize: 16
  },
  section: {
    flexDirection: 'column',
    marginBottom: 10,
    // paddingBottom: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  option: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: theme.sizes.padding * 1.4,
    height: theme.sizes.padding * 1.4,
    marginRight:10,
    borderRadius: theme.sizes.padding ,
    borderWidth:2,
    borderColor:'gray'
  },
  repondreBtn: {
    width:130,
    backgroundColor: theme.colors.white,
    borderRadius: 9,
    paddingHorizontal:15,
    paddingVertical:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:theme.colors.gray,
    borderWidth:1,
    borderRadius:5,
    marginLeft:20,
},
repondreText:{
    marginLeft:10
}
})
