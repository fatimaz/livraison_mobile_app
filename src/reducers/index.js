import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SignupReducer from './SignupReducer';
import ShipmentsReducer from './ShipmentsReducer';
import AddShipmentReducer from './AddShipmentReducer';
import TripsReducer from './TripsReducer';
import SettingsReducer from './SettingsReducer';
import EditProfileReducer from './EditProfileReducer';
import CountriesReducer from './CountriesReducer';
import CategoriesReducer from './CategoriesReducer';
import OffersReducer from './OffersReducer';
import SendOfferReducer from './SendOfferReducer';
import CancelOfferReducer from './CancelOfferReducer';
import PhotoReducer from './PhotoReducer';
import DealsReducer from './DealsReducer';
import ForgetPassReducer from './ForgetPassReducer';
import SendPhoneReducer from './SendPhoneReducer';

import EditShipmentReducer from './EditShipmentReducer';
import EditPasswordReducer from './EditPasswordReducer';
import DeleteShipmentReducer from './DeleteShipmentReducer';
import DeleteTripReducer from './DeleteTripReducer';
import VerifyEmailReducer from './VerifyEmailReducer';
import AddRatingReducer from './AddRatingReducer';
import RatingsReducer from './RatingsReducer';
import GivenRatingReducer from './GivenRatingReducer';
import ReceivedRatingReducer from './ReceivedRatingReducer';
import SendMessageReducer from './SendMessageReducer';
import MessagesListReducer from './MessagesListReducer';
import MyShipmentsReducer from './MyShipmentsReducer';
import EditOfferReducer from './EditOfferReducer';
import VerifCodeReducer from './VerifCodeReducer';
import MessagesListUserReducer from './MessagesListUserReducer';
import ReportReducer from './ReportReducer';
import MatchingShipmentReducer from './MatchingShipmentReducer';

import VehicleReducer from './VehicleReducer';
import SendLocationReducer from './SendLocationReducer';

import cartReducer from './cartReducer';
import EditCartReducer from './EditCartReducer';
import AddCartItemReducer from './AddCartItemReducer';
import ProductsReducer from './ProductsReducer';

import basketReducer from '../features/basketSlice';



export default combineReducers({
    signup:SignupReducer,
    auth: AuthReducer,
    shipments:ShipmentsReducer,
    addShipment:AddShipmentReducer,
    trips: TripsReducer,
    profileInfo: SettingsReducer,
    editprofile: EditProfileReducer,
    countries: CountriesReducer,
    categories:CategoriesReducer,
    offers:OffersReducer,
    addoffers:SendOfferReducer,
    cancelOffer: CancelOfferReducer,
    deals: DealsReducer,
    photo:PhotoReducer,
    forgetPass: ForgetPassReducer,
    phone:SendPhoneReducer,

    editShipment:EditShipmentReducer,
    editPass: EditPasswordReducer,
    deleteShip: DeleteShipmentReducer,
    deleteTrip: DeleteTripReducer,
    verifyEmail: VerifyEmailReducer,
    addrate: AddRatingReducer,
    ratingList: RatingsReducer,
    ratingGiven: GivenRatingReducer,
    ratingReceived: ReceivedRatingReducer,
    addmessage: SendMessageReducer,
    messagesList: MessagesListReducer,
    myshipments: MyShipmentsReducer,
    editOffer: EditOfferReducer,
    verify: VerifCodeReducer,
    userMessages: MessagesListUserReducer,
    report: ReportReducer,
    matchingshipments: MatchingShipmentReducer,
    routes:VehicleReducer,
    sendlocation: SendLocationReducer,
     editcart:EditCartReducer,
    addcartitem:AddCartItemReducer,
    products:ProductsReducer,
     cartReducer: cartReducer,
    basket: basketReducer,
});