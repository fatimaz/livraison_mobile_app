import React, { Component } from 'react';
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  RefreshControl
} from 'react-native';

import { Block,Txt } from '../../components';
import { connect } from 'react-redux';
import { fetchGivenMyRatings } from '../../actions';
import { theme } from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import Moment from 'moment';

import ViewPager from '@react-native-community/viewpager';
const { width, height } = Dimensions.get('screen');

class given extends Component {

componentDidMount() {
  const { navigation } = this.props;
   const id = navigation.getParam('user_id');
  this.props.fetchGivenMyRatings();
}

_onRefreshRatings() {
  const { navigation } = this.props;
  const id = navigation.getParam('user_id');
  this.props.fetchGivenMyRatings();
}

renderList = ( item ) => {
const {  navigation } =  this.props;
Moment.locale('en');
return (  
          <View style={styles.camping}>
            <View style={styles.campingDetails}>
            <Block flex={false} row center space="between" style={{  marginVertical: 10}}>   
            <Block column>  
            <Block row>  
                <Txt h3>
                {item.receiver.name}
                </Txt>
                <View style={{  marginLeft: 10 }}>
                   <View column style={styles.campingInfo}>
                   <StarRating
                     disabled={true}
                     maxStars={5}
                     rating = {item.stars}
                     starSize={10}
                     starContainerStyle={{justifyContent: 'space-between'}}
                     fullStarColor='orange'
                     emptyStarColor='orange'
                />   
                  </View>           
               </View>
            </Block> 
            <Txt gray caption>
            
            {Moment(item.created_at).format('MMM D, YYYY')}</Txt>
            </Block>   
              <Block flex={false} row center > 
                    <Image
                        source={{ uri: item.receiver.photo }}  
                        style={styles.avatar} />
                    </Block>
                </Block>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                  <Txt spacing={0.5}  style={{ marginLeft: 4, color: '#00838F' }}>{ item.review } </Txt>            
              </View>
            </View>
            <View style={{ flex: 0.2, justifyContent: 'center' }}>
              {/* <SimpleLineIcons name="options-vertical" color="#A5A5A5" size={24} /> */}
            </View>
          </View>
    
        )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
          {(!this.props.loading && this.props.data != null) ? 
          (
          <FlatList
                data={this.props.data}   
                renderItem={({ item }) => this.renderList(item)}
                keyExtractor={item => item.id.toString() }   
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.loading}
                    onRefresh={this._onRefreshRatings.bind(this)}
                  />
                } 
                ListHeaderComponent={() => (!this.props.data.length? 
                  <Txt center style={{marginVertical:60}}>Aucun résultat trouvé</Txt>  
                  : null)
                }     
          />
          ) : null
          }   
             {this.props.loading && 
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#03A9F4"/>     
                    </View> 
         } 
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.ratingGiven.error,
    loading: state.ratingGiven.loading,
    data: state.ratingGiven.ratingsgiven
   }
}

export default connect(mapStateToProps, { fetchGivenMyRatings })(given);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    top: 0,
    width: width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 34,
    paddingTop: 45,
    paddingBottom: 25
  },
  camping: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    marginHorizontal: 14,
    paddingVertical: 15,
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  campingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    paddingTop: 8
  },
  avatar: {
    width: theme.sizes.padding * 1.7,
    height: theme.sizes.padding * 1.7,
    borderRadius: theme.sizes.padding ,
    borderWidth:2,
    borderColor:'lightgray'
  },

});