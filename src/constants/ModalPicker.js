
import React from 'react';
import {View, Text, Modal } from 'react-native';

export default function PickerModal(){
    return (
        <View>
            <Modal visible={props.isVisible}>
                <View>
                    <Text>modal open</Text>
                </View>
            </Modal>
        </View>
    )
}