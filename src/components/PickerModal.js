import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, Modal, FlatList, StyleSheet , Dimensions} from 'react-native';
export default class PickerModal extends Component {

    render() {
        const { isVisible,data } = this.props;
        const WIDTH = Dimensions.get('window').width;
        const HEIGHT = Dimensions.get('window').height;


        const renderItemView =(item) => {
            return <View style={[styles.modal,{width: WIDTH - 200, height: HEIGHT/2}]}>
                <Text style={{fontSize:20}}>{item}</Text>
            </View>
        }
     
    return (
       
        <View>
            <Modal visible={isVisible}>
                <View style={{flex:1}}>
                    <FlatList data={data}
                      style ={[styles.containers,{width: WIDTH - 20, height: HEIGHT/2}]}
                      renderItem={({item, index}) => renderItemView(item, index)}/>
                </View>
            </Modal>
        </View>
    )
    }
}
const styles = StyleSheet.create({
    containers:{
        flex:1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor:'#000000',
        borderRadius: 10,
    },
    modal:{
        backgroundColor:'white',   
        alignItems:'center',
        justifyContent:'center'
    }
})