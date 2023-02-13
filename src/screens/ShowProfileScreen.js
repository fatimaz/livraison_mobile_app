import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity ,FlatList, View} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Block, Badge, Card, Txt , Button} from '../components';
import { theme } from '../constants';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGE_URL } from '../services/URLs';

const { width, height } = Dimensions.get('screen');

export default class ShowProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //starCount: 3.5
    };
  }
  renderButton() {
    const { navigation } = this.props;
    const tutor = navigation.getParam('tutor');
    const sujet = navigation.getParam('sujet');
    return (
      <Button gradient style={{margin:10}} onPress={() => navigation.navigate('BookingScreen', { tutor_name: tutor, sujet: sujet.id })} >
          <Txt bold white center>Continuer</Txt>        
       </Button>
    )
  }

  renderListCetificate = ( item ) => {
       return (    
           <View style={styles.details}>
               <FAIcon name="university" size={18} color={theme.colors.primary} />
            <View style={styles.moreDetails}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Block row space="between">
                  <Txt spacing={0.5} caption style={{ fontSize: 14}}> {item.name}</Txt>
                </Block>
              </View>
            </View>
          </View>
        )
  }

  renderListSubject = ( item ) => {
      return (  
            <Txt caption style={styles.tag}>
              {item.name}
            </Txt>
        )
  }
  renderListLevel = ( item ) => {
    return (  
          <Txt caption style={styles.tag}>
            {item.name}
          </Txt>
      )
   }
  experience(exp){
    if (exp == 0 ) {  
    return(
      <Block center>
          {/* <Txt size={15} spacing={0.6} primary style={{ marginBottom: 6 }}>Nouveau</Txt> */}
         
          <FAIcon name="check-circle" size={18} style={{ marginBottom: 6 }} color={theme.colors.primary} />
          <Txt size={10} spacing={0.7}> vérifié</Txt>
      </Block>
    )
    }
    return(
      <Block center>
          <Txt size={15} spacing={0.6} primary style={{ marginBottom: 6 }}>{exp} heures</Txt>
          <Txt size={10} spacing={0.7}> Experiences</Txt>
       </Block>
    )
  }
  renderTutor() {
    const { navigation } = this.props;
    const tutor = navigation.getParam('tutor');
    return (
   <Block>
        <Card style={{ paddingVertical: theme.sizes.padding}}>
          <Block>
            <Block center>
            <Image spacing={0.5} style={styles.avatar}  source={{uri: IMAGE_URL + tutor.image }} />
              <Txt spacing={0.7} style={{paddingTop:5, fontSize: 20,fontWeight: 'bold'}}>{ tutor.firstname }</Txt>
              <Txt style={{ fontSize: 13, color: '#A5A5A6', padding: 5 }}>
               { tutor.age}  ans
               </Txt>
              <Txt style={{ fontSize: 13, color: '#00838F', paddingTop: 5 }}>  
              { tutor.studies}
               </Txt>
               <Txt style={{ fontSize: 13, color: '#A5A5A6', paddingTop: 5 }}>  
               {tutor.region}, { tutor.city.name}
               </Txt>
               
               <View style={[styles.row]}>
               <StarRating
                     disabled={true}
                     maxStars={5}
                     rating = { tutor.totalstars }
                     starSize={20}
                     fullStarColor='orange'
                     emptyStarColor='orange'
                />
             
              {(tutor.totalstars != 0) ?
                   (
                    <Txt style={{ color: theme.colors.active , marginLeft: 5 }}>
                        { tutor.totalstars }
                     </Txt>
                   ) : null
                 }
             
            </View>
           
            <Txt style={{ fontSize: 12, marginLeft: 8, color: theme.colors.caption }}>
            ({ tutor.numRating } notes)
            </Txt>
            </Block>
          </Block>
        </Card>
        <Block row style={{margin:10,backgroundColor: theme.colors.gray4, padding:5}}>
              <Block center>
                <Txt size={15} spacing={0.6} primary style={{ marginBottom: 6 }}>{tutor.price} DH</Txt>
                <Txt size={10} spacing={0.7}> par heure</Txt>
              </Block>
               <Block flex={false} color="gray" style={styles.vLine} />
               { this.experience(tutor.experience)}
            </Block>
       
   
        <Card style={{ paddingVertical: theme.sizes.padding }}>
        <Block style={styles.inputRow}>
             <Txt style={{ marginBottom: 10, color: '#00838F' }}>À propos</Txt>
            <Txt gray light height={22}>
              {tutor.about}
            </Txt>
          </Block>
          <Block style={styles.inputRow}>
          <Txt style={{ marginBottom: 10,  color: '#00838F' }}>Certificats</Txt>
              <FlatList
                    data={tutor.certificates}  
                    renderItem={({ item }) => this.renderListCetificate(item)}
                    keyExtractor={item => item.id.toString() }  
              />
          </Block>
          <Block style={styles.inputRow}>
             <Txt  style={{ marginBottom: 10,  color: '#00838F' }}>Matières Enseignées</Txt>
             <Block flex={false} row margin={[theme.sizes.base, 0]}>
                <FlatList
                        data={tutor.subjects}
                        horizontal
                        renderItem={({ item }) => this.renderListSubject(item)}
                        keyExtractor={item => item.id.toString() }  
                  />
              </Block>
          </Block>
          <Block style={styles.inputRow}>
             <Txt  style={{ marginBottom: 10,  color: '#00838F' }}>Niveaux</Txt>
             <Block flex={false} row margin={[theme.sizes.base, 0]}>
                <FlatList
                    data={tutor.levels}
                    horizontal
                    renderItem={({ item }) => this.renderListLevel(item)}
                    keyExtractor={item => item.id.toString() }  
                 />
              </Block>
          </Block>
        </Card>  
  </Block>
    )
  }
  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
          { this.renderTutor() }
        </ScrollView>
        {this.renderButton()}
      </React.Fragment>
    )
  }
}
const styles = StyleSheet.create({
  hLine: {
    marginVertical: theme.sizes.base * 2,
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
