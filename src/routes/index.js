import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { TouchableOpacity, Image, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import MatchingShipments from '../screens/MatchingShipments';

import SearchScreen from '../screens/minicab/SearchScreen';


import Location from '../screens/minicab/Location';
import SummaryScreen from '../screens/minicab/SummaryScreen';
import TripDetails from '../screens/minicab/TripDetails';
import SettingProfil from '../screens/minicab/SettingProfil';
import AirpotScreen from '../screens/minicab/AirpotScreen';
import GareScreen from '../screens/minicab/GareScreen';
import WalletScreen from '../screens/minicab/WalletScreen';



import TicketScreen from '../screens/minicab/tabs/TicketScreen';
import PaymentScreen from '../screens/minicab/PaymentScreen';






import OrderDetails from '../screens/dawa/OrderDetails';
import HelpScreen from '../screens/dawa/HelpScreen';

import AccountScreen from '../screens/dawa/AccountScreen';


import LocationScreen from '../screens/bread/LocationScreen';
import Outarea from '../screens/bread/Outarea';
import HomeScreen from '../screens/bread/HomeScreen';
import Home from '../screens/uber/Home';

import ProductsList from '../screens/bread/ProductsList';
import ProductDetail from '../screens/uber/ProductDetail';
import MyCartScreen from '../screens/bread/MyCartScreen';
import CheckoutScreen from '../screens/bread/CheckoutScreen';
import AddressDetails from '../screens/bread/AddressDetails';
import MyOrderScreen from '../screens/bread/MyOrderScreen';
import AddCart from '../screens/bread/AddCart';
//test
import RestaurantScreen from '../screens/uber/RestaurantScreen';
import BasketScreen from '../screens/uber/BasketScreen';
import PreparingOrderScreen from '../screens/uber/PreparingOrderScreen';



import VehiclesListScreen from '../screens/minicab/VehiclesListScreen';
import RoutesScreen from '../screens/minicab/RoutesScreen';
import Active from '../screens/minicab/tabs/Active';
import Past from '../screens/minicab/tabs/Past';

import AddItem from '../screens/AddItem';
import AddShipment from '../screens/AddShipment';

import AddTrip from '../screens/AddTrip';

import MyShipmentsScreen from '../screens/MyShipmentsScreen';
import ListRatings from '../screens/ListRatings';
import AddRatingScreen from '../screens/AddRatingScreen';
import EditOfferScreen from '../screens/EditOfferScreen';
import ShipmentOfferDetails from '../screens/ShipmentOfferDetails';
import ReportScreen from '../screens/ReportScreen';

import received from '../screens/avisTabs/received';
import given from '../screens/avisTabs/given';

import MessageDetails from '../screens/MessageDetails';
import EnterPhone from '../screens/EnterPhone';
import VerifyScreen from '../screens/VerifyScreen';

import MyTrips from '../screens/MyTrips';
import ProfileScreen from '../screens/ProfileScreen';
import CountriesScreen from '../screens/CountriesScreen';
import ShipmentDetails from '../screens/ShipmentDetails';
import MakeOfferScreen from '../screens/MakeOfferScreen';
import SelectTrip from '../screens/SelectTrip';

import RequestsScreen from '../screens/RequestsScreen';

import RequestDetails from '../screens/RequestDetails';
import ShipmentsOffers from '../screens/ShipmentsOffers';




import DealsScreen from '../screens/DealsScreen';
import SettingsScreen from '../screens/SettingsScreen';


import Forgot from '../screens/Forgot';
import EditTripScreen from '../screens/EditTripScreen';
import EditShipmentScreen from '../screens/EditShipmentScreen';
import EditItem from '../screens/EditItem';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Password from '../screens/Password';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Txt } from '../components';


const TabStack = createMaterialTopTabNavigator({
  Active: Active,
  Past: Past,
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    // tabStyle: {
    //   marginTop:10,
    // },
    activeTintColor: 'red',
    inactiveTintColor: 'black',
    borderBottomWidth: 3,
    indicatorStyle: { backgroundColor: 'red' },
    style: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderWidth: 1,
      borderBottomColor: '#ccc',
      borderTopColor: '#fff',
      marginTop: 100,
    }
  }
});
const TabAddStack = createMaterialTopTabNavigator({
  MyShipmentsScreen: {
    screen: MyShipmentsScreen,
    navigationOptions: {
      title: 'Vos envois',
      headerTitle: 'Vos envois',
      tabBarLabel: 'Vos envois',
    }
  },
  MyTrips: {
    screen: MyTrips,
    navigationOptions: {
      title: 'Vos Trajets',
      headerTitle: 'Vos Trajets',
      tabBarLabel: 'Vos Trajets',
    }
  },

}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      marginTop: 50,
    },
    activeTintColor: 'red',
    inactiveTintColor: 'black',
    borderBottomWidth: 3,
    indicatorStyle: { backgroundColor: 'red' },
    style: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderWidth: 1,
      borderColor: '#ccc'
    }
  }
});

const TabReviewStack = createMaterialTopTabNavigator({
  received: {
    screen: received,
    navigationOptions: {
      title: 'Reçus',
      headerTitle: 'Reçus',
      tabBarLabel: 'Reçus',
    }
  },
  given: {
    screen: given,
    navigationOptions: {
      title: 'Laissés',
      headerTitle: 'Laissés',
      tabBarLabel: 'Laissés',
    }
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      marginTop: 50,
    },
    activeTintColor: 'red',
    inactiveTintColor: 'black',
    borderBottomWidth: 3,
    indicatorStyle: { backgroundColor: 'red' },
    style: {
      backgroundColor: 'white',
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS,
      // borderWidth:1,
      // borderColor:'#ccc'
    }
    // style: {
    //   backgroundColor: theme.colors.white,       
    //   // marginRight: theme.sizes.base * 2,
    //   // paddingBottom: theme.sizes.base,
    //   // pressColor: 'green',
    //   // showIcon: true,
    // }
  }
});


const TabBottomStack = createBottomTabNavigator({
  
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      // headerLeft: <LogoutButton navigation={navigation} />,

      tabBarIcon: ({ tintColor }) => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <FontAwesome
              name='home'
              size={25}
              color={tintColor}
            />
          </TouchableOpacity>
        );
      },
    })
  },

  MyOrderScreen: {
    screen: MyOrderScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Commandes',
      tabBarIcon: ({ tintColor }) => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate('MyOrderScreen')}>
            <FontAwesome
              name='list-alt'
              size={25}
              color={tintColor}
            />
          </TouchableOpacity>
        );
      },
    })
  },
  MyCartScreen: {
    screen: MyCartScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      // headerLeft: <LogoutButton navigation={navigation} />,

      tabBarIcon: ({ tintColor }) => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate('MyCartScreen')}>
            <AntDesign
              name='shoppingcart'
              size={25}
              color={tintColor}
            />
                   
          </TouchableOpacity>
        );
      },
    })
  },

  AccountScreen: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Profil',
      // headerLeft: <LogoutButton navigation={navigation} />,
      tabBarIcon: ({ tintColor }) => {
        return (
          <FontAwesome
            name='user'
            size={25}
            color={tintColor}
          />
        );
      }
    })
  },
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: theme.colors.red,
    inactiveTintColor: 'black',
    borderBottomWidth: 10,
    indicatorStyle: { backgroundColor: theme.colors.red },
    pressColor: theme.colors.red,
    style: {
      backgroundColor: theme.colors.white,
      // marginRight: theme.sizes.base * 2,
      // paddingBottom: theme.sizes.base,
      // pressColor: 'green',
      //showIcon: true,
    }
  }
});

// const AppStack = createStackNavigator({
//     Home: HomeScreen,
//     WelcomeScreen:WelcomeScreen,
//     Main: TabStack,
// });
const AuthStack = createStackNavigator({
  LocationScreen: LocationScreen,
  HomeScreen:HomeScreen,
  BasketScreen:BasketScreen,
  RestaurantScreen:RestaurantScreen,
  PreparingOrderScreen:PreparingOrderScreen,
  AddCart:AddCart,
  TabBottomStack:{
    screen: TabBottomStack,
    navigationOptions: {
       header: null
    },
  },

  Outarea:Outarea,

   ProductsList: ProductsList,
   ProductDetail: ProductDetail,
   MyCartScreen:MyCartScreen,
   CheckoutScreen:CheckoutScreen,
   AddressDetails:AddressDetails,
  // HomeScreen: HomeScreen,
  // TabBottomStack:{
  //   screen: TabBottomStack,
  //   navigationOptions: {
  //      header: null
  //   },
  // }, 
  AccountScreen:AccountScreen,
  MyOrderScreen:MyOrderScreen,
  

  OrderDetails:OrderDetails,
  HelpScreen:HelpScreen,
 

 
 
 

  // RoutesScreen:RoutesScreen,
  
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  SignupScreen: SignupScreen,
  LoginScreen: LoginScreen,
  Forgot: Forgot,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      height: theme.sizes.base * 3,
      marginTop: 20,
      backgroundColor: theme.colors.white, // or 'gray4
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerLeft:
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name={"md-arrow-back"} size={30} paddingRight={550} paddingVertical={50} />
        {/* <Ionicons ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'red'}}/>  */}
      </TouchableOpacity>,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  })
});

const AppStack = createStackNavigator({
 
  MyCartScreen:MyCartScreen,
  ProductsList: ProductsList,



  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },



  AddShipment: AddShipment,
  CountriesScreen: {
    screen: CountriesScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Txt bold style={{ marginTop: 5, fontSize: 16, marginLeft: 10 }}>Pays</Txt>,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={30} />
        </TouchableOpacity>
      )
    }),
  },

  // Active :Active,
  TabStack: TabStack,
  SearchScreen: SearchScreen,

  Location: Location,
  SummaryScreen: SummaryScreen,
  RoutesScreen: RoutesScreen,
  VehiclesListScreen: VehiclesListScreen,
  TripDetails: TripDetails,
  AccountScreen: AccountScreen,
  SettingProfil: SettingProfil,
  AirpotScreen: AirpotScreen,
  GareScreen: GareScreen,
  WalletScreen: WalletScreen,

  TicketScreen: TicketScreen,
  PaymentScreen: PaymentScreen,

  // 

  SelectTrip: SelectTrip,
  AddTrip: AddTrip,
  AddItem: AddItem,
  RequestsScreen: RequestsScreen,
  MakeOfferScreen: MakeOfferScreen,

  RequestDetails: RequestDetails,
  EditOfferScreen: EditOfferScreen,

  MatchingShipments: MatchingShipments,
  DealsScreen: DealsScreen,
  ProfileScreen: ProfileScreen,
  SettingsScreen: SettingsScreen,
  ShipmentDetails: ShipmentDetails,
  EditTripScreen: EditTripScreen,
  EditShipmentScreen: EditShipmentScreen,
  EditItem: EditItem,
  Password: Password,
  ListRatings: ListRatings,
  AddRatingScreen: AddRatingScreen,
  ShipmentsOffers: ShipmentsOffers,
  ShipmentOfferDetails: ShipmentOfferDetails,
  ReportScreen: ReportScreen,
  EnterPhone: {
    screen: EnterPhone,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Txt h1 bold blue>X</Txt>
        </TouchableOpacity>
      )
    }),
  },
  VerifyScreen: VerifyScreen,
  MessageDetails: MessageDetails,
  TabReviewStack: {
    screen: TabReviewStack,
    navigationOptions: { headerTitle: 'Avis' },
    // navigationOptions:{
    //    title:'Avis',
    //    style:{
    //      // borderBottomColor: theme.colors.gray2,
    //      // borderBottomWidth: StyleSheet.hairlineWidth,
    //      marginVertical: theme.sizes.base * 2,
    //      marginHorizontal: theme.sizes.base * 2,
    //      marginRight: theme.sizes.base
    //    },
    //    headerTitleStyle: {
    //      fontWeight: 'bold',
    //      fontSize: 25,
    //    },
    //    // headerStyle: {
    //    // height: theme.sizes.base * 2,
    //      backgroundColor: theme.colors.gray4, // or 'white
    //      borderBottomColor: "red",
    //      // elevation: 0, // for android
    //    // },
    // }
  },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerLeft: <TouchableOpacity style={{ paddingRight: 30, paddingLeft: 5 }} onPress={() => navigation.goBack()}>
      <Ionicons name="md-arrow-back" size={30} />
    </TouchableOpacity>,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  })
});

///


const Root = createSwitchNavigator({
  // TabStack:TabStack,
  // TabBottomStack:TabBottomStack,
  Login: AuthStack,
  App: AppStack,
}, {
  initialRouteName: 'Login',
});

const container = createAppContainer(Root);
export default container; 
