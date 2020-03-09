import React, { Component } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, PermissionsAndroid, Alert, Platform } from 'react-native';
import LoginTextInput from '../../components/LoginTextInput';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import style from './Style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../components/Loader';
import { loginUser } from './Action';
import { checkIfEmpty } from './Controller';
import strings from '../../localization/strings';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { _storeData } from '../../utils/AsyncStorageMethods';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[style.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            isHidden: false,
            userName: "",
            password: "",
            userPress: "",
            emailPress: "",
            loading: false,
            userInfo: false,
            forgetView: false,
            isLogin: null,
            isFirsttime: false,
            token: "",
        };
    }

    render() {
        const { loading } = this.state;
        return (
            <View style={style.textView}>
                {loading && <Loader />}
                <MyStatusBar backgroundColor="grey" barStyle="light-content" />
                {this.state.isHidden ? this.checkfirstTime() : this.renderSignInView()}
            </View>
        );
    }

    async componentDidMount() {
        this.getToken();
        if (this.props.navigation.isFirstRouteInParent()) {
            this.setState({ isFirsttime: this.props.navigation.state.params.signedUp })
        }
        else { }
    }

    checkfirstTime = () => {
        let instance = this;
        setTimeout(() => {
            AsyncStorage.getItem('islogin')
                .then(function (value) {
                    if (value === null) {
                        instance.props.navigation.replace('location')
                    }
                    else if (value === 'true') {
                        instance.props.navigation.replace('location')
                    }
                    else if (value === 'false') {
                        AsyncStorage.getItem(AsyncStorageKyes.subscriptionPlanStatus).then((value) => {
                            if (value === '3') {
                                instance.props.navigation.replace('PaymentView')
                            }
                            else {
                                instance.props.navigation.replace('map')
                            }
                        })
                    }
                })
        },
            1000)
    }

    renderSignInView() {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ backgroundColor: 'white' }}>
                    <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >
                    <View style={style.signin}>
                        <Text style={style.signintextstyle}>Sign in</Text>
                        {this.state.userInfo ? <Text style={style.error}>{strings.fieldRequire}</Text>
                            : <Text style={style.error}>{strings.emptyview}</Text>
                        }
                        <LoginTextInput
                            placeholder='UserEmail'
                            keyboardType={"email-address"}
                            onChangeText={(text) => this.setState({ userName: text })}
                            placeholderTextColor='#d3d3d3' />
                        <TouchableOpacity>
                            <Text style={style.forgotstylenew}></Text>
                        </TouchableOpacity>
                        <LoginTextInput
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={(text) => this.setState({ password: text })}
                            placeholderTextColor='#d3d3d3' />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('forgot', { emailPress: "2" })}>
                            <Text style={style.forgotstyle}>Forgot Password</Text>
                        </TouchableOpacity>
                        <View style={{ width: wp('100%'), alignItems: "center", height: hp("18%"), marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                            {this.state.isFirsttime ? null : <CustomButton onPress={() => this._goBack()} buttonText='Back' height="35%" width="40%" />}
                            <CustomButton onPress={() => this.checkSignInputs()} buttonText='Next' height="35%" width="40%" />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    async getToken() {
        let fcmToken = await firebase.messaging().getToken();
        this.setState({ token: fcmToken }, () => {
            AsyncStorage.setItem(AsyncStorageKyes.FCM_TOKEN, fcmToken).then(() => {
                strings.FCM_TOKEN = this.state.token;
            })
        })
        console.log("fcm token login" + fcmToken)
    }
    // Login API 
    checkSignInputs() {
        const { userName, password, deviceToken, token } = this.state;
        if (checkIfEmpty(this.state.userName)) {
            this.setState({ userInfo: true });
        }
        else if (checkIfEmpty(this.state.password)) {
            this.setState({ userInfo: true });
        }
        else {
            this.setState({ userInfo: false });
            this.setState({ loading: true });
            var logincomponent = { email: userName, password: password, deviceToken: Platform.OS === 'ios' ? token : token };
            loginUser(logincomponent, (response, error) => {
                console.log("res", userName, password, response);
                if (error) {
                    alert('Unable to login, Please try again after sometime')
                }
                this.setState({ loading: false });
                if (response != null) {
                    if (response.status === 1) {
                        this.setState({ isHidden: true })
                        _storeData(AsyncStorageKyes.subscriptionPlanStatus, response.data.subscriptionPlanStatus)
                        _storeData(AsyncStorageKyes.USER_TOKEN, response.data.token)
                        _storeData(AsyncStorageKyes.userHaveCardStatus, response.data.userHaveCardStatus)
                        _storeData(AsyncStorageKyes.EMAIL, response.data.email)
                    }
                    else {
                        alert(response.message);
                    }
                }
                else {
                    this.setState({ loading: false });
                    Alert('', 'Unable to login, Please try after sometime');
                }
            })
        }
    }
}