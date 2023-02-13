import React, { Component } from 'react'
import { Alert,Keyboard, StyleSheet, ScrollView, ActivityIndicator , Image, TouchableOpacity} from 'react-native'
import {  Button, Block, Txt,  Input} from '../components';
import { theme } from '../constants';
import { connect } from 'react-redux';
import {  editProfile, fetchProfile , editImage } from '../actions';
import ImagePicker from 'react-native-image-picker';
import {  Avatar } from 'react-native-elements';
class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      errors: [],
      load: false,
      photo: '',
      imageName: '',
      noData:false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.saved) {
      Alert.alert(
        'Success!',
        'Votre compte a été enregistré ',
        [
          {
            text: 'Continuer', onPress: () => {
              this.props.fetchProfile();
              this.props.navigation.goBack();
             
            }
          }
        ],
        { cancelable: false }
      )  
    }
  }

  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  onSelectPostImage = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
     
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }
  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;
    this.setState({ profile });
  }

  renderEdit(name) {
    const { profile, errors } = this.state;
     const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
      return (
        <Input
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
          selectionColor= {theme.colors.accent}
          error={hasErrors(name)}
          style={[styles.input, hasErrors(name)]}
        />
      )
  }

  _onSaveProfile() { 
    const { profile , photo, imageName} = this.state;
    const errors = [];
     Keyboard.dismiss();
     this.setState({ loadingedit: true });
     const name= profile['name'];
     const email= profile['email'];
    //  const mobile= profile['mobile'];
     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!email || !re.test(email) ) errors.push('email');
     if (!name) errors.push('name');

     if (!errors.length) {
      this.props.editProfile({ name, email, photo } );
     } else {
       this.setState({ errors, loadingedit: false });
       Alert.alert(
            'Erreur',
            'Veuillez remplir tous les champs requis.',
            [
              { text: 'Réessayer', }
            ],
            { cancelable: false }
        )
     }
      // const data = new FormData();
      // data.append("image", {
      //   uri: this.state.profileImage[0].path,
      //   type: this.state.profileImage[0].mime,
      //   size: this.state.profileImage[0].size,
      //   name: filename
      // });
      // this.props.sendInspection(data)
  }

  showErrorMessage() {
    if (this.props.error) {
        return (
            <View style={styles.containerWithMargin}>
                <Txt accent style={styles.errorMessage}>{this.props.error}</Txt>
            </View>
        );
    } 
 }

  _renderButton() {
    const { loadingedit } = this.props;
    return (
       <Button gradient style={{margin:10}} onPress={this._onSaveProfile.bind(this)}>
              {loadingedit? (
              <ActivityIndicator size="small" color="white" /> 
              ) : (
              <Txt bold white center> Enregistrer</Txt>
              )}      
      </Button>
    );
  }
  // onSelectPostImage = () => {
  //   const options = {
  //     noData: true,
  //   }
  //   ImagePicker.showImagePicker(options, response => {
  //     if (response.uri) {
  //       this.setState({ profileImage: response })
  //     }
  //   })
  // }
  // 
//   onSelectPostImage() {
//     const options = {
//         title: 'Select Image to share',
//         quality: 0.1, //Image quality 0 lowest , 1 heights
//         mediaType: 'photo',
//         maxHeight: 200 // Speed up android loading
//     };
//     ImagePicker.showImagePicker(options, (response) => {
//         if (response) {
//            const imageName = `${1}-${response.fileName}`;
     
//            // const imageName = `${response.fileName}`;
//             this.setState({
//                 profileImage: response.uri,
//                 imageName,
//                 disabled: false,
//             });
//         } else {
//             this.setState({ disabled: true });
//         }
//     });
// }
render() {
    return (
      <Block>
        <Block flex={false} row center style={styles.header}>

        {(this.state.photo.uri  != null) ? 
         (
        <TouchableOpacity  onPress={this.onSelectPostImage.bind(this)}> 
            <Image
                //  source={{ uri: this.props.profile.photo }}
                source={{ uri:this.state.photo.uri }}
                 style={styles.avatar} />
          </TouchableOpacity>
            ) : 
            <TouchableOpacity  onPress={this.onSelectPostImage.bind(this)}>     
            <Image
            //  source={{ uri: this.props.profile.photo }}
            source={{ uri: this.state.profile.photo }}
             style={styles.avatar} />
               </TouchableOpacity>
          }  
          {/* <Avatar
                large
                overlayContainerStyle={{backgroundColor: '#efeff0',padding: 30, margin: 10}}
                 onPress={this.onSelectPostImage.bind(this)}
                 source={{ uri: this.state.profileImage.uri }}
                 icon={{name: 'camera',color: 'red', type: 'font-awesome'}}             
           />  */}
        </Block>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Txt gray >Nom</Txt>
                {this.renderEdit('name')}
              </Block>
            </Block>
           <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Txt gray>Email</Txt>
                {this.renderEdit('email')}
              </Block>         
            </Block>
          {/* <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Txt gray>Numéro de téléphone</Txt>
                {this.renderEdit('mobile')}
              </Block>   
            </Block> */}
           {/* <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block> 
                <Txt gray2 >Adresse</Txt>
                {this.renderEdit('address')}
              </Block>   
            </Block> */}
            {/*  */}
            {this.showErrorMessage()}
          </Block>
          { this._renderButton() }
        </ScrollView>
      </Block>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.profileInfo.error,
    loading: state.profileInfo.loading,
    profile: state.profileInfo.profile,

    erroredit: state.editprofile.error,
    loadingedit: state.editprofile.loading,
    saved: state.editprofile.saved,

    errorphoto: state.photo.error,
    loadingphoto: state.photo.loading,
    savedphoto: state.photo.saved

  }
}

export default connect(mapStateToProps, { editProfile, fetchProfile, editImage })(SettingsScreen);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    alignItems: 'center',
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputs: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end'
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  avatar: {
    height: theme.sizes.base * 5,
    width: theme.sizes.base * 5,
    marginRight:25,
    borderWidth:2,
    borderRadius:40,
    borderColor:theme.colors.gray2,
    alignItems: 'center'
  },
  containerWithMargin: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessage: {
      color: theme.colors.red,
      fontSize: 16
  }
})