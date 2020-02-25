import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoginTextInput from './LoginTextInput';
import images from '../assets/images';
import CustomButton from './CustomButton';
import Fonts from '../assets/Fonts';
import Colors from '../assets/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from './Loader';



const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[style.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const CustomEmailView = props => {

    return (
        <KeyboardAwareScrollView
            scrollEnabled
            keyboardShouldPersistTaps={"always"}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flex: 1 }}>
 {/* {
                props.loading ? <Loader /> : null
            } */}
            <View style={style.container}>
                <MyStatusBar backgroundColor="grey" barStyle="light-content" />
                <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >
                {/* <View style={style.textView}>

                    <Text style={style.letstextstyle}>Lets get you signed in</Text>

                </View> */}
                {props.emailvalid ? null : <Text style={style.errorMessageStyle}>{props.errorMessage} </Text>
                }
                <View style={style.emailcontent}>
                    <Text style={style.emailtextstyle}>Please enter your email address</Text>

                    <LoginTextInput
                        textContentType='none'
                        placeholder='Email address....'
                        keyboardType={"email-address"}

                        placeholderTextColor={Colors.grey}
                        onBlur={(text) => props.onBlurEnd(text)}
                        value={props.emailValue}
                        onChangeText={(text) => props.onChangeText(text)}
                    />

                    <Text style={style.emailtextstyle}>Enter your Phone Number</Text>

                    <LoginTextInput
                        maxLength={12}
                        value={props.phoneValue}
                        placeholder='(555) 555-5555'
                        returnKeyType="done"
                        placeholderTextColor={Colors.grey}
                        onChangeText={(text) => props.onChangeTextOfPhone(text)}
                        keyboardType={"numeric"} />


<Text style={style.emailtextstyle}>Referral Code (Optional)</Text>

                    <LoginTextInput
                        textContentType='oneTimeCode'
                        placeholder='123XYZ'
                        // keyboardType={"email-address"}
                        maxLength={6}
                        placeholderTextColor={Colors.grey}
                        onBlur={(text) => props.onBlurEnd(text)}
                        value={props.referralCodeValue}
                        onChangeText={(text) => props.onChangeReferralCode(text)}/>



                </View>




                <View style={{ width: wp('100%'), alignItems: "center", height: hp("18%"), marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <CustomButton borderColor={props.borderColor} onPress={() => props.onPressBack()} buttonText='Back' height="35%" width="40%" />
                    <CustomButton borderColor={props.borderColor} disabled={props.disabled} onPress={() => props.onPressNext()} buttonText='Next' height="35%" width="40%" />

                </View>
            </View>
        </KeyboardAwareScrollView>

    );

}

export default CustomEmailView;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    emailcontent: {
        fontFamily: Fonts.APP_REGULAR_FONT,
        width: '100%'
    },
    emailtextstyle: {
        fontSize: 18,
        marginTop: 30,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    errorMessageStyle: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 18
    },

    textView: {
        marginTop: 20,
        marginBottom: 5,
        width: '100%'
    },
    logostyle: {
        top: '8%',
        marginBottom: '10%',
    },
    welcometextstyle: {
        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    letstextstyle: {
        fontSize: 18,
        fontFamily: Fonts.APP_REGULAR_FONT,
        marginTop: 10,
        textAlign: 'center'
    },

});

