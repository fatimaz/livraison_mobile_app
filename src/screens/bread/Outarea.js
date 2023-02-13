import React, { Component } from 'react'
import { Animated, Image, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Block, Txt } from '../../components';
import { theme } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("window");

class Outarea extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block>
         <Block center bottom flex={0.4}>
          <Txt h2 center bold>
            Sorry! We don't deliver here yet
          </Txt>
          <Txt h4 gray style={{ marginHorizontal:20,
            marginTop: theme.sizes.padding / 2}}>
            We don't deliver to your area yet, but you can vote for it so we can work
                            on changing that
          </Txt>
        </Block>
        <Block center middle >
        <Ionicons name="map-outline" size={94} color="black" />
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('LoginScreen')}>
            <Txt center semibold white>Vote for this area</Txt>
          </Button>
          <Button shadow style={{borderRadius:3, borderWidth:1,borderColor:theme.colors.gray}} onPress={() => navigation.navigate('LocationScreen')}>
            <Txt center semibold>Change Location</Txt>
          </Button>
        </Block>
        <Txt center caption gray >En vous inscrivant, vous acceptez les conditions générales de l'application </Txt>
      </Block>
    )
  }
}

export default Outarea;
const styles = StyleSheet.create({

})
