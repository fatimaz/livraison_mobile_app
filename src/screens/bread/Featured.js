import React, { Component } from 'react'
import { ActivityIndicator,Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList,SafeAreaView, View, RefreshControl  } from 'react-native'
import { Card, Badge, Block, Txt } from '../../components';
import { theme } from '../../constants';
import { connect } from 'react-redux'
import { fetchCategories } from '../../actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { IMAGE_URL } from '../../services/URLs';
const { width, height } = Dimensions.get('screen');

const numColumns = 2;
class Featured extends Component {

  componentDidMount() {
    if(this.props.loading){
      <ActivityIndicator size="small" color="black" />
    }else{
      this.props.fetchCategories();
    }

  }
  _onRefreshCategories() {
    this.props.fetchCategories();
  }
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={styles.settings}>
              <View style={styles.location}>
                <FontAwesome name="location-arrow" size={14} color="white" />
              </View>
            </View>
            <View style={styles.options}>
                <Txt style={{ fontSize: 14, color: '#A5A5A5', marginBottom: 5, }}>
                    Rabat
                </Txt>
            </View>
          </View>                 
          <View style={styles.settings}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Account')}>
              <FAIcon name="user-circle" size={24} color="black" />
              {/* color='#A5A5A5'  */}
              {/* <Ionicons name="ios-settings" size={24} color="black" /> */}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header}>
        <View style={styles.options}>
            <Txt h1 bold>Sujets</Txt>
        </View>
      </View>
   </View>
    )
  }
  renderTutorButton() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity center middle style={styles.startTrip} activeOpacity={0.8} onPress={() => navigation.navigate("Active")}>
            <Badge color={theme.colors.accent} size={62}>
                <FAIcon name="graduation-cap" size={62 / 2.5} color="white" />
            </Badge>
      </TouchableOpacity>
    )
  }
  renderListCategory = (item)=>{
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        key={item.name}
        onPress={() => navigation.navigate('ListTutors',{ sujet: item })}>
        <Card center middle shadow style={styles.category}>
           {/* <Badge margin={[0, 0, 15]} size={50}> */} 
          <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
            {/* <Image  style={styles.avatar} source={{uri:IMAGE_URL+ item.image }} /> */}
          </Badge>
          <Txt medium height={20}>{item.name}</Txt>
          {/* <Txt gray caption> pieces</Txt> */}
        </Card>
      </TouchableOpacity> 
    )
  }

  render() {
    const { navigation } = this.props;
      return (  
      <SafeAreaView style={styles.container}>
      {this.renderHeader()}
        <ScrollView
          showsVerticalScrollIndicator={false}
         >
          <Block flex={false} row space="between" style={styles.categories}>
             <FlatList
               data={this.props.data}
               renderItem={({item})=>this.renderListCategory(item)}
                keyExtractor={item => item.id }
                numColumns= {3}
                refreshControl={
                  <RefreshControl
                    refreshing={this.props.loading}
                    onRefresh={this._onRefreshCategories.bind(this)}
                  />
                }
              /> 
         
          </Block>
        </ScrollView>
        {this.renderTutorButton()}
      {/* </Block> */}
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.categories.error,
    loading: state.categories.loading,
    data: state.categories.categories,
   }
}

export default connect(mapStateToProps, { fetchCategories })(Featured);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    // header: {
    //   paddingHorizontal: theme.sizes.base * 2,
    // },
    avatar: {
      height: theme.sizes.base * 2.2,
      width: theme.sizes.base * 2.2,
      borderRadius: 20,
    },
  
    active: {
      borderBottomColor: theme.colors.secondary,
      borderBottomWidth: 3,
    },
    categories: {
      flexWrap: 'wrap',
      flexDirection:'row',
      paddingHorizontal: theme.sizes.base * 2,
      marginBottom: theme.sizes.base * 3.5,
    },
    category: {
      // this should be dynamic based on screen width
      minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 3,
      maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 3,
      maxHeight: (width - (theme.sizes.padding * 6) - theme.sizes.base) / 2,
      margin:3,
      borderTopRightRadius: theme.sizes.radius,
      borderTopLeftRadius: theme.sizes.radius,
      flex:0.5,
     
      // justifyContent: "space-around"
      
    },
    startTrip: {
      position: 'absolute',
      right: (width - 330) / 2,
      bottom: 10,
    },
    settings: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    options: {
      flex: 1,
      paddingHorizontal: 14,
    },
    location: {
      height: 20,
      width: 20,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF7657',
    },
    headerContainer: {
      top: 0,
      height: height * 0.15,
      width: width,
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: height * 0.15,
      paddingHorizontal: 14,
    },
  })
