import React, { Component } from 'react'
import { Animated, Image, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Block, Txt } from '../../components';
import { theme } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("window");

class GetAddress extends Component {
    static navigationOptions = {
        header: null,
    }

    render() {
        const { navigation } = this.props;
        return (
            <Block>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LocationScreen')}>
                    <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                        <Txt h2 center bold>
                            Set a delivery address
                        </Txt>
                    </Block>
                </TouchableOpacity>
                <Block center bottom flex={0.4}>
                    <Txt h2 center bold>
                        We ll bring you anthing
                    </Txt>
                    <Txt h4 gray style={{
                        marginHorizontal: 20,
                        marginTop: theme.sizes.padding / 2
                    }}>
                        just tell us where
                    </Txt>
                </Block>
                <Block center middle >
                    <Ionicons name="map-outline" size={94} color="black" />
                </Block>

                <Txt center caption gray >En vous inscrivant, vous acceptez les conditions générales de l'application </Txt>
            </Block>
        )
    }
}

export default GetAddress;
