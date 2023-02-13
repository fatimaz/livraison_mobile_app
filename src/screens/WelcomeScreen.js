
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
          source={require('../res/p.png')}
          resizeMode="contain"
          style={{ width, height: height / 2, overflow: "visible", marginTop:10 }}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block>
         <Block center bottom flex={0.4}>
          <Txt h1 center bold>
            <Txt h1 accent>
              {" "}
              miniCab..
            </Txt>
          </Txt>
          <Txt h4 gray style={{ marginHorizontal:20,
            marginTop: theme.sizes.padding / 2}}>
             Plus autour de la ville
          </Txt>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('LoginScreen')}>
            <Txt center semibold white>Se connecter</Txt>
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
