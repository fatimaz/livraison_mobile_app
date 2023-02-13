import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';

class LocationItem extends Component {
  _handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id)
    console.log('result', res)
  }

  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={this._handlePress}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    backgroundColor:'black'
  }
})

export default LocationItem;