import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Text
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, Block, Txt } from "../../components";
import { theme, mocks } from "../../constants";

const { width } = Dimensions.get("window");

class Location extends Component {



  constructor(props) {
    super(props);
    this.state = {
        initMap: true,
        userLocation: {},
        query: '',
        searchResult: null,
        selectedLocation: null,
        btnDisabled: true,
        active: "Favorites",
        categories: []
    };
}
  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  search(){
    //google api later
     let searchResult = [];
     for (let i=0; i < 50 ; i++) {
        searchResult[i] = { name: `Name ${i}`, address:`Address ${i}` };
    //   searchResult[i] = { name: `Name ${i}`, address:`Address ${i}`, latitude: 48.85880774018563, longitude: 2.3104028933020424 };
  }
    this.setState({ searchResult });
}
  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, categories: filtered });
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Txt size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Txt>
      </TouchableOpacity>
    );
  }
      setSelectedLocation(item){
        this.setState({ searchResult: null, selectedLocation: item });
        const { navigation } = this.props;
        navigation.state.params.onGoBack(item.name);
        navigation.goBack();
        // this.map.animateToRegion(
        //     {
        //         latitude: item.latitude,
        //         longitude: item.longitude
        //     },
        //     350
        // );
    }

  toggleSearchResult(){
    const {params} = this.props.navigation.state;
    const { profile, navigation } = this.props;
    const { categories } = this.state;
  

     if (!this.state.searchResult || !this.state.query){
        const tabs = ["Favorites", "Aeroport", "Gare"];
         return(
            <Block>
            <Block flex={false} row style={styles.tabs}>
            {tabs.map(tab => this.renderTab(tab))}
          </Block>
           <ScrollView
           showsVerticalScrollIndicator={false}
           style={{ paddingVertical: theme.sizes.base * 2 }}
         >
           <Block flex={false} column space="between" style={styles.categories}>
             {categories.map(category => (
              <View style={styles.section}>
               <TouchableOpacity
                 key={category.name}
                 onPress={() => this.setSelectedLocation(category)}
               >
                <View style={styles.option}>
                  <Txt>{category.name}</Txt>
                  <FontAwesome name='angle-right' size={24} />
               </View>
               </TouchableOpacity>
               </View>
             ))}
           </Block>
         </ScrollView>
         </Block>
         )
     }else{
      return (
          <ScrollView style={{ height:200,marginBottom: 20 }}>
              <View style={{ marginHorizontal: 15 }}>      
              {
                  this.state.searchResult.map((item, i) => (
                      <View style={styles.section}>
                      <TouchableOpacity
                          key={item.id}    
                          // onPress={this.setSelectedLocation.bind(this, item)}
                          onPress={() => this.setSelectedLocation(item)}
                          >    
                          <View style={styles.option}>
                              <Block column>
                               <Text style={{ fontWeight: '500', fontSize:16 }}>{item.name}</Text> 
                               <Txt gray style={{ fontWeight: '500', fontSize:14 }}>{item.address}</Txt> 
                               </Block>
                               <FontAwesome name='angle-right' size={24} /> 
                          </View>
                     </TouchableOpacity>       
                    </View>
                  ))
              }
              </View>
          </ScrollView>
      );
    }
  }
  deleteText(){
      this.textInput.clear();
      this.setState({ searchResult: null});
  }
  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;
    const tabs = ["Favorites", "Aeroport", "Shop"];

    return (
      <Block>
             <View style={styles.search}>
                <View style={styles.inputWrapper}>
                    <View style={styles.pinkDot}/> 
                           {/* <FontAwesome name="search" style={{marginRight:10}} size={18} /> */}
                        <TextInput
                            placeholder="Indiquez votre destination"
                            placeholderTextColor="#afb1b6"
                            onSubmitEditing={() => this.search()}
                            onChangeText={(query) => this.setState({ query})}
                            autoCorrect={false}
                            ref={input => { this.textInput = input }}
                            
                        />
                    </View>
                    <TouchableOpacity
                            onPress={this.deleteText.bind(this)}> 
                            
                    <FontAwesome name="remove" style={{marginRight:3, color:theme.colors.gray}} size={16} />
                   </TouchableOpacity>
                </View>

                { this.toggleSearchResult() }
    
       
      </Block>
    );
  }
}

Location.defaultProps = {
  profile: mocks.profile,
  categories: mocks.countries
};

export default Location;

const styles = StyleSheet.create({
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    // flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base/2 ,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 14,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
},
option: {
    marginBottom: 10,
    flexDirection: 'row',
     justifyContent: 'space-between',
    alignItems: 'center',
  },
search:{
    marginVertical:10,
    marginHorizontal:15,
    padding:10,
    backgroundColor: '#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor:'#efeff0',
    borderWidth:2,
},
inputWrapper:{
    flexDirection:'row',
    alignItems: 'center',
},
pinkDot:{
    width:10,
    height:10,
    borderRadius:10,
    backgroundColor:'#ff4858',
    marginRight:10,
},
});
