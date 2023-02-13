import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Modal,
  FlatList
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Block, Txt } from "../../components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme, mocks } from "../../constants";

const { width } = Dimensions.get("window");

class Location extends Component {


  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: '',
    };

    this.arrayNew = [
      'Rabat',
      'Casablanca',
      'Fes',
      'Marrakech',
      'Agadir',
      'Tanger'
     
    ];
    this.state = {
        initMap: true,
        userLocation: {},
        query: '',
        searchResult: null,
        selectedLocation: null,
        btnDisabled: true,
        active: "Favorites",
        categories: [],
        gares:[],
        villes:[  
            {name:'Rabat'  } ,
            {name:'Casablanca'},
            {name:'Meknes'},
            {name:'Fes'},
  
        ],
        data: [],
        showTerms: false,
        list:'',
        

        
    };
}
  componentDidMount() {
    this.setState({ categories: this.props.categories });
    this.setState({ gares: this.props.gares });
  }
// 
renderModalSave() {
  const { navigation } = this.props;
  const {list} = this.state;
  return (
    <Modal
      animationType="slide"
      visible={this.state.showTerms}
      onRequestClose={() => this.setState({ showTerms: false })}
    >
         <Block
              padding={[theme.sizes.padding * 4, theme.sizes.padding]}
              space="between"
            >
                 <Block padding={[theme.sizes.base , theme.sizes.base*2]} style={{   justifyContent: 'flex-end',
                    marginTop: 20,
                    position: 'absolute', }}>
                    <Button
                      onPress={() => this.setState({ showTerms: false })}
                    >
                      <Txt size={25}>
                      X
                      </Txt>
                    </Button>
                  </Block>
                 {(list== 'airport') ? 
                  (
                  <FlatList
                          data={this.state.categories}   
                          renderItem={({ item }) => this.renderList(item)}
                          keyExtractor={this.keyExtractor}           
                      />
                      ) : 
                      <FlatList
                        data={this.state.gares}   
                        renderItem={({ item }) => this.renderList(item)}
                        keyExtractor={this.keyExtractor}           
                  />
                    }
             </Block>
    </Modal>
  );
}
renderList = ( item ) => {
  const { navigation } = this.props; 
  
    return (
      <View style={styles.section}>
      <TouchableOpacity
          key={item.id}    
          onPress={() => this.setSelectedLocation(item)}
          >    
          <View style={styles.option}>
               <Text style={{ fontWeight: '500', fontSize:17 }}>{item.name}</Text>  
          </View>
     </TouchableOpacity>       
    </View>
    );
}
  // 
  search= text => {
    //google api later
     let searchResult = [];
     const { villes }= this.state;

     for (let i=0; i < 3 ; i++) {  
        villes[i] = { name:  villes[i]};
        searchResult[i] =  villes[i]

    // { name: `Name ${i}`, address:`Address ${i}`};
    //   searchResult[i] = { name: `Name ${i}`, address:`Address ${i}`, latitude: 48.85880774018563, longitude: 2.3104028933020424 };
  }
  // 
  let newData = villes.filter(item => {
  // const itemData = `${item.name.toUpperCase()}`;
  //   const textData = text.toUpperCase();
  // if(text.length >0 ){
  //   return itemData.indexOf(textData) > -1;
  // }
  });
  // this.setState({
  //   data: newData,
  //   value: text,
  // });


  // 
    this.setState({ searchResult });
    // console.log(searchResult)
}

searchItems = text => {

  // const {searchResult } = this.state;
  let newData = this.arrayNew.filter(item => {
    const itemData = `${item.toUpperCase()}`;
    const textData = text.toUpperCase();
  if(text.length >0 ){
    return itemData.indexOf(textData) > -1;
  }
  });

  this.setState({
    searchResult: newData,
    value: text,
  });

};

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase())
    );
    this.setState({ active: tab, categories: filtered });
  };

  setSelectedLocation(item){
        this.setState({ searchResult: null, selectedLocation: item });
        const { navigation } = this.props;
        navigation.state.params.onGoBack(item);
        alert(item)
        // navigation.goBack();
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
  
     if (!this.state.searchResult ){
         return(
           <ScrollView
           showsVerticalScrollIndicator={false}
           style={{ paddingVertical: theme.sizes.base * 2 }}
         >
           {/* <Block flex={false} column space="between" style={styles.categories}>
           <View style={styles.section}>
               <TouchableOpacity
               >
                <View style={styles.option}>
                  <View style={{ flexDirection: 'row'}}>
                  <Ionicons
                        name='home-outline'
                        size={18}
                        color={theme.colors.gray}
                    />
                    <Txt style={{marginHorizontal:10}}>Maison</Txt>
                    </View>
                  <FontAwesome name='angle-right' size={24} />
               </View>
               </TouchableOpacity>
               </View>
               <View style={styles.section}>
               <TouchableOpacity
               >
                <View style={styles.option}>
                  <View style={{ flexDirection: 'row'}}>
                  <MaterialIcons
                        name='work-outline'
                        size={18}
                        color={theme.colors.gray}
                    />
                    <Txt style={{marginHorizontal:10}}>Travail</Txt>
                    </View>
                  <FontAwesome name='angle-right' size={24} />
               </View>
               </TouchableOpacity>
               </View>
             <View style={styles.section}>
               <TouchableOpacity
                onPress={() => this.setState({ showTerms: true , list:'airport'})}  
               >
                <View style={styles.option}>
                  <View style={{ flexDirection: 'row'}}>
                  <Ionicons
                        name='airplane-outline'
                        size={18}
                        color={theme.colors.gray}
                    />
                    <Txt style={{marginHorizontal:10}}>Les aeroports les plus proches</Txt>
                    </View>
                  <FontAwesome name='angle-right' size={24} />
               </View>
               </TouchableOpacity>
               </View>
               <View style={styles.section}>
               <TouchableOpacity
                 onPress={() => this.setState({ showTerms: true , list:'gare'})}  
               >
                 
                <View style={styles.option}>
                <View style={{ flexDirection: 'row'}}>
                  <Ionicons
                        name='train-outline'
                        size={18}
                        color={theme.colors.gray}
                    />
                  <Txt style={{marginHorizontal:10}}>Les gares les plus proches</Txt>
                  </View>
                  <FontAwesome name='angle-right' size={24} />
               </View>
               </TouchableOpacity>
               </View>
           </Block> */}
           
         </ScrollView>
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
                               <Text style={{ fontWeight: '500', fontSize:16 }}>{item}</Text> 
                               {/* <Txt gray style={{ fontWeight: '500', fontSize:14 }}>{item}</Txt>  */}
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

    return (
      <Block>
             <View style={styles.search}>
                <View style={styles.inputWrapper}>
                    <View style={styles.pinkDot}/> 
                           {/* <FontAwesome name="search" style={{marginRight:10}} size={18} /> */}
                        <TextInput
                            placeholder="Indiquez address exacte"
                            placeholderTextColor="#afb1b6"
                            onChangeText={text => this.searchItems(text)}
                            // onSubmitEditing={text => this.searchItems(text)}
                            // onChangeText={(query) => this.setState({ query})}
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
                {this.renderModalSave()}
       
      </Block>
    );
  }
}

Location.defaultProps = {
  profile: mocks.profile,
  categories: mocks.countries,
  gares: mocks.gares,
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
