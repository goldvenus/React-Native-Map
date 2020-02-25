import React, { Component } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import LoginTextInput from '../../components/LoginTextInput';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import style from './Style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../components/Loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { resetUserPassword } from './Action';
const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[style.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class ConfirmForgot extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            userInfo: false,
            userName: "",
            enterCodeText: "",
            newPassText: "",
            confirmPassText: "",
            loading: false
        };
    }

    render() {
        const { loading } = this.state;
        const token =  this.props.navigation.getParam('token', 'nothing sent')
        return (
            <View>
                {loading && <Loader />}
                <MyStatusBar backgroundColor="grey" barStyle="light-content" />
                {this.renderConfirmForgotView(token)}
            </View>
        );
    }

   // Forgot password Api
   checkResetInputs(token) {
    const { enterCodeText,newPassText,confirmPassText } = this.state;
        this.setState({ loading: true });
        if(newPassText === ' '){
            alert('Please Enter New password')
        }
        else if(confirmPassText === ' '){
            alert('Please Enter Password to Confirm')
        }
        else if (newPassText != confirmPassText)
        {
            alert('Please Enter Same Password')
        }
        else{
         resetUserPassword({resetCode:enterCodeText, newPassword:newPassText,token:token}, (response, error) => {
        if (error) {
            alert('Unable to forgot, Please try again after sometime')

        }
        this.setState({ loading: false });
        if (response != null) {
            if (response.status === 1) {
                this.passwordAlert();
            }
            else {
                alert(response.message);
            }
        }
        else {
            this.setState({ loading: false});
            Alert('', 'Unable to forgot, Please try after sometime');
        }
    }) 
}
}

passwordAlert() {
    Alert.alert(
        "Alert",
        "Password reset sucessfully",
        [{ text: "OK", onPress: () => this.movetoLogin()}],
        { cancelable: false }
    );
}

movetoLogin = () => {
    this.props.navigation.replace('login')
}

    renderConfirmForgotView(token) {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ backgroundColor: 'white' }}>
                    <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >
                    <View style={style.textView}>
                        <Text style={style.welcometextstyle}>JumpSeat</Text>
                    </View>
                    <View style={style.signin}>
                        <Text style={style.signintextstyle}>Confirm Forgot password</Text>
                        <View style={style.ConfirmtextView}>
                            <LoginTextInput
                                placeholder=' Enter Code...'
                                keyboardType={"email-address"}
                                onChangeText={(text) => this.setState({ enterCodeText: text })}
                                placeholderTextColor='#d3d3d3' />
                        </View>
                        <View style={style.ConfirmtextView}>
                            <LoginTextInput
                                placeholder=' New Password...'
                                keyboardType={"email-address"}
                                onChangeText={(text) => this.setState({ newPassText: text })}
                                placeholderTextColor='#d3d3d3' />
                        </View>
                        <View style={style.ConfirmtextView}>
                            <LoginTextInput
                                placeholder=' Confirm Password...'
                                keyboardType={"email-address"}
                                onChangeText={(text) => this.setState({ confirmPassText: text })}
                                placeholderTextColor='#d3d3d3' />
                        </View>
                        <View style={{ width: wp('100%'), alignItems: "center", height: hp("18%"), marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                            {this.state.isFirsttime ? null : <CustomButton onPress={() => this._goBack()} buttonText='Back' height="35%" width="40%" />}
                            <CustomButton onPress={() => this.checkResetInputs(token)} buttonText='Next' height="35%" width="40%" />
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











}


