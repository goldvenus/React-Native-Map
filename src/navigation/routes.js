import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import PropTypes from "prop-types";
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');
import Map from '../screens/map/Map';
import Splash from '../screens/splash';
import Login from '../screens/login';
import SignIn from '../screens/signin';
import Forgot from '../screens/forgot';
import User from '../screens/userdetail/User';
import Tutorial from '../screens/tutorial';
import ContactUs from '../screens/contactus/ContactUs';
import ReportEventDetail from '../screens/reporteventdetail';
import Reportevent from '../screens/reportevent';
import SubmitReport from '../screens/submitreport';
import Nextflight from '../screens/nextflight';
import Newflight from '../screens/newflight/Newflight';
import Mangeflight from '../screens/manageflight/Mangeflight';
import Feedflowtab from '../screens/feedflowtab/Feedflowtab';
import LoginSignUp from '../screens/loginsignup/LoginSignUp';
import Location from '../screens/location/Location';
import DrawerContent from '../components/DrawerContent';
import React, { Component } from 'react';
import ReportEventSearch from '../screens/reporteventsearch/ReportEventSearch';
import FavouriteView from '../screens/feedflowtab/FavouriteView';
import ConfirmForgot from '../screens/forgot/ConfirmForgot';
import ForgotUser from '../screens/forgot/ForgotUser';
import PaymentView from '../screens/PaymentView/Paymentview';

const MyApp = createDrawerNavigator({
    map: { screen: Map },
    user: { screen: User },
    contactus: { screen: ContactUs },

},
    {
        contentComponent: DrawerContent,
        drawerWidth: Math.min(height, width) * 0.8,
        drawerLockMode: "unlocked",
        drawerBackgroundColor:'transparent'
    }
);


MyApp.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    let activeRoute = navigation.state.routes[navigation.state.index];
    if (activeRoute.routes && activeRoute.index > 0) {
        drawerLockMode = 'locked-closed';
    }

    console.log('drawerLockMode', drawerLockMode);

    return {
        drawerLockMode,
    };
};


const AppNavigator = createStackNavigator(
    {
        splashScreen: { screen: Splash },
        login: { screen: Login },
        signin: { screen: SignIn },
        forgot: { screen: Forgot },
        tutorial: { screen: Tutorial },
        map: { screen: MyApp },
        reporteventdetail: { screen: ReportEventDetail },
        reportevent: { screen: Reportevent },
        submitReport: { screen: SubmitReport },
        nextFlight: { screen: Nextflight },
        newFlight: { screen: Newflight },
        manageFlight: { screen: Mangeflight },
        feedflowtab: { screen: Feedflowtab },
        loginsignup: { screen: LoginSignUp },
        location: { screen: Location },
        reporteventsearch: { screen: ReportEventSearch },
        favouriteview:{screen:FavouriteView},
        ConfirmForgot:{screen:ConfirmForgot},
        ForgotUser: {screen:ForgotUser},
        PaymentView:{screen:PaymentView}

    }, 
    {
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
            },
        }),
    },
    
    {
    initialRouteName: 'splashScreen',
},




)

const Main = createAppContainer(AppNavigator)
MyApp.navigationOptions = {
    header: null
};



class Routes extends Component {
    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    render() {
        return <Main />
    }
}


Routes.propTypes = {
    navigation: PropTypes.object
};

export default Routes;