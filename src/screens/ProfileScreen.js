import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity ,FlatList, Route, BrowserRouter} from 'react-native';
// import StarRating from 'react-native-star-rating';
import { Block, Badge, Card, Txt , Button} from '../components';
import { theme } from '../constants';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
const { width, height } = Dimensions.get('screen');

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderUser() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    // const item = navigation.getParam('item');
    Moment.locale('fr');
    return (
   <Block>
        <Card style={{ paddingVertical: theme.sizes.padding}}>
            <Block center style={{marginBottom:20}}>
            <Image 
                spacing={0.5} 
                style={styles.avatar}  
                source={{ uri: user.photo }} 
             />
            </Block>

              <Block center>
              <Txt bold spacing={0.7} style={{paddingTop:5, fontSize: 25}}>
                  { user.name }  
              </Txt>
              </Block> 
               
               {/* <View style={[styles.row]}> */}
               {/* <StarRating
                     disabled={true}
                     maxStars={5}
                     rating = { tutor.totalstars }
                     starSize={20}
                     fullStarColor='orange'
                     emptyStarColor='orange'
                /> */}
             
              {/* {(tutor.totalstars != 0) ? 
                   (
                    <Txt style={{ color: theme.colors.active , marginLeft: 5 }}>
                        { tutor.totalstars }
                     </Txt>
                   ) : null
                 } */}
             
            {/* </View>  */}
            
            {/* <Txt style={{ fontSize: 16, marginLeft: 8,marginTop:10 ,color: theme.colors.caption }}>
              {user.reviews} avis
            </Txt> */}
        
          {/* </Block> */}
        </Card>
        <Block row style={{margin:10,backgroundColor: theme.colors.gray4, padding:5}}>
              {/* <Block center>
                <Txt size={17} bold spacing={0.6} primary style={{ marginBottom: 6 }}> {user.offers.length}</Txt>
                <Txt size={14} spacing={0.7}> Commandes</Txt>
              </Block> */}
               {/* <Block flex={false} color="gray" style={styles.vLine} /> */}
               <Block center>
                <Txt size={17} bold spacing={0.6} primary style={{ marginBottom: 6 }}> {user.shipments.length}</Txt>
                <Txt size={12} spacing={0.7}> Commandes publiées</Txt>
              </Block>
              <Block flex={false} color="gray" style={styles.vLine} />
               <Block center>
                <Txt size={17} bold spacing={0.6} primary style={{ marginBottom: 6 }}> {user.trips.length}</Txt>
                <Txt size={12} spacing={0.7}> Trajets publiés</Txt>
              </Block>
         </Block>
        <Card>
  
     
        <TouchableOpacity
            onPress={() => navigation.navigate('ListRatings', { user: user, user_id:user.id })}     
          >
          <Block row style={styles.inputRow}>
          <FontAwesome name='star' size={20} style={{marginRight: 10}} />
           <Block row space="between">
                <Txt gray bold height={22} style={{marginBottom: 10,color: '#00838F',  fontSize:16 }}>
                  {user.avgstars} / 5 -   {user.numRating} avis
                </Txt>
                <FontAwesome name='angle-right' size={24} />
           </Block>
          </Block>
          </TouchableOpacity>
          
        <Block style={styles.inputRow}>
             {/* <Txt style={{marginBottom: 10,color: '#00838F', fontSize:18 }}> Informations vérifiées</Txt> */}
             {(user.phone_verified_at != null) ? 
             (
             <Block row style={{marginBottom:10}}>
                <Ionicons
                  name="checkmark-circle-outline"
                  color="green"
                  size={20}
                  style={{paddingRight:10}}
                />
                   <Txt bold gray light height={22} style={{fontSize:16}}>
                     Phone Verified
                 </Txt>
             </Block>
               ) :  null
              }
              
             {(user.email_verified_at != null) ? 
             (
             <Block row style={{marginBottom:10}}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    color="#FF7657"
                    size={20}
                    style={{paddingRight:10}}
                  />
                   <Txt bold gray height={22} style={{fontSize:16}}>
                   E-mail vérifié
                 </Txt>
             </Block>
             ) :  null
            } 
              {(user.document_verified_at != null) ? 
             (
             <Block row style={{marginBottom:10}}>
                <Ionicons
                  name="checkmark-circle-outline"
                  color="#FF7657"
                  size={20}
                  style={{paddingRight:10}}
                />
                   <Txt bold gray light height={22} style={{fontSize:16}}>
                 Document Verified
                 </Txt>
             </Block>
               ) :  null
              } 
          </Block>
          
          <Block style={styles.inputRow}>
           <Block row space="between">
                <Txt gray height={22} style={{marginBottom: 10,fontSize:15 }}>
                 Membre depuis  {Moment(user.created_at).format('MMM D, YYYY')}
                </Txt>
           </Block>
          </Block>
          {/* <Block style={styles.inputRow}>
             <Txt style={{marginBottom: 10,color: '#00838F',  fontSize:18 }}> Reviews</Txt>
             <Block row space="between">
                <Txt gray light height={22} style={{fontSize:15}}>
                  Shopper
                </Txt>
                <Txt height={22} style={{fontSize:15}}>
                  10 ratings
                </Txt>
                <Txt height={22} style={{fontSize:15}}>
                  5/5
                </Txt>
           </Block>
           <Block row space="between">
                <Txt gray light height={22} style={{fontSize:15}}>
                  Traveler
                </Txt>
                <Txt height={22} style={{fontSize:15}}>
                  stars
                </Txt>
                <Txt height={22} style={{fontSize:15}}>
                  7
                </Txt>
           </Block>
          </Block> */}
      
         
        </Card>   
  </Block> 
  )
} 
  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
          { this.renderUser() }
        </ScrollView> 
      </React.Fragment>
    )
  }
}
const styles = StyleSheet.create({
  hLine: {
    marginVertical: theme.sizes.base,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },


  avatar: {
    width: 65,
    height: 65,
    borderRadius: 25 / 2,
  },
  row: {
    flexDirection: 'row'
  },
  inputRow: {
    // alignItems: 'flex-end',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  moreDetails: {
    flex: 2,
    paddingLeft: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
  },
})
