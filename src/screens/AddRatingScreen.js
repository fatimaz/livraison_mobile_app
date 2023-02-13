import React, { Component } from 'react'
import { Alert, Image, StyleSheet,ActivityIndicator, TextInput, View , ScrollView} from 'react-native'
import { connect } from 'react-redux';
import { addRating , fetchMyTrips, fetchMyShipments} from '../actions';
import StarRating from 'react-native-star-rating';

import {  Button, Block, Txt, Card} from '../components';
import { theme } from '../constants';
import { IMAGE_URL } from '../services/URLs';

class AddRatingScreen extends Component {
  constructor() {
    super();
    this.state = {
      stars: '',
      errors: [],
      review:'',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saved) {
      Alert.alert(
        'Merci',
        'Vous avez donnez votre impression',       
        [
          {
            text: 'OK', onPress: () => {
              this.props.fetchMyTrips();
              this.props.fetchMyShipments();
              this.props.navigation.navigate('ShipmentScreen'); 
            }
          }
        ],
        { cancelable: false }
      )  
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const stars = 1;
    this.setState({ stars});
  }

  onStarRatingPress(rating) {
    this.setState({
      stars: rating
    });
  }
  _onSaveRating() {
    const { stars, review } = this.state;
    const errors = [];
    const { navigation } = this.props; 
    const user = navigation.getParam('user'); 
    const rated = navigation.getParam('rated'); 
    const order_id = navigation.getParam('order_id'); 
    const receiver_id= user.id;
    if (!review) errors.push('review');
    if (!errors.length) {  
      this.props.addRating({ receiver_id,order_id, stars, review, rated});
  }else{
    Alert.alert(
      'Erreur',
      'Veuillez vérifier vos champs.',
      [
        { text: 'Réessayer', }
      ],
      { cancelable: false }
    )
  }
  
  }
   _renderButton() {
    const {  stars} = this.state;
    const { loading } = this.props;
    if(stars != 0){
      return ( 
        <Button gradient onPress={this._onSaveRating.bind(this)}>
        {loading ? (
            <ActivityIndicator size="small" color="white" /> 
        ) : ( 
          <Txt bold white center> Enregistrer</Txt>
        )}
        </Button>
       );
    }   
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user'); 
    const {  errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
    return (
      <Block style={styles.rewards}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems:"center", marginBottom:30}}>
            <Txt h3  style={{ alignItems:"center"}}>Livraison confirmée</Txt>
                <Txt h3 style={{alignItems:"center", marginBottom:10}}> Veuillez évaluer votre expérience</Txt>
              <Image spacing={0.5} style={styles.avatar}  source={{ uri: user.photo }} />
              <Txt style={{ marginBottom: 10 }} h2 primary spacing={1.7} bold>{user.name}</Txt> 
              <Txt style={{ marginBottom: 20 }} spacing={0.7}>Quelle est votre impression</Txt>
              <StarRating
                      disabled={false}
                      maxStars={5}
                      rating = {this.state.stars}
                      starSize={32}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor='orange'
                      emptyStarColor='orange'
                    />
             </View>
               <TextInput 
                      placeholder="Qu est ce que vous pensez ..."
                      placeholderTextColor="#afb1b6"
                      // onSubmitEditing={() => this.search()}
                      autoCorrect={false}
                      style={[styles.inputText, hasErrors('review')]}
                      multiline={true}
                       onChangeText={text => this.setState({ review: text })}
                 />
                 
              <Button onPress={() => navigation.goBack()}>
                <Txt blue caption center style={{ textDecorationLine: 'underline' }}>
                  Pas Maintenant
                </Txt>
              </Button>
                { this._renderButton() } 
 
     </ScrollView>
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.addrate.error,
    loading: state.addrate.loading,
    saved: state.addrate.saved
  }
}

export default connect(mapStateToProps, { addRating, fetchMyTrips, fetchMyShipments })(AddRatingScreen);

const styles = StyleSheet.create({
  rewards: {
    padding: theme.sizes.padding/4,
    paddingHorizontal:theme.sizes.padding/2,
    backgroundColor: theme.colors.gray4,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "lightgray",
    marginBottom: 20
  },
  // horizontal line
  hLine: {
    // marginVertical: theme.sizes.base * 1.5,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
  inputText:{
    marginHorizontal:5,
    borderRadius: 10,
    padding:10,
    borderColor:'#efeff0',
    borderWidth:2,
    backgroundColor: '#fff',
    height:100
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
})
