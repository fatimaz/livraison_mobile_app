
import React, { Component } from 'react'
import { Animated, Image, StyleSheet, Dimensions } from 'react-native';
import { Button, Block, Txt } from '../components';
import { theme } from '../constants';
const { width, height } = Dimensions.get("window");

class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  }

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <Image
          source={require('../res/bus.png')}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: "visible" }}
          />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block>
         <Block center bottom flex={0.4}>
          <Txt h1 center bold>
            Ton Trajet.
            <Txt h1 primary>
              {" "}
              GyroShip.
            </Txt>
          </Txt>
          <Txt h4 gray2 style={{ marginHorizontal:20,
            marginTop: theme.sizes.padding / 2 }}>
            Deliver items & get paid while traveling
          </Txt>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('LoginScreen')}>
            <Txt center semibold white>Connexion</Txt>
          </Button>
          <Button shadow style={{borderRadius:3, borderWidth:1,borderColor:theme.colors.gray}} onPress={() => navigation.navigate('SignupScreen')}>
            <Txt center semibold>S'inscrire</Txt>
          </Button>
        </Block>
        <Txt center caption gray >En vous inscrivant, vous acceptez les conditions générales de l'application </Txt>
      </Block>
    )
  }
}

export default WelcomeScreen;
const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  avatar: {
    width: 190,
    height: 190,
  },
})
