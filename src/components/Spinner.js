import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

class Spinner extends Component {
 render() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#008000' />
        </View>
     );
};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Spinner;

