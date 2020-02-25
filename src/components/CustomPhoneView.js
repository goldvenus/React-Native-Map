import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginTextInput from './LoginTextInput';
import images from '../assets/images';
import CustomButton from './CustomButton';
import Fonts from '../assets/Fonts';
import Colors from '../assets/Colors';
import Loader from './Loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const CustomPhoneView = props => {

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flexGrow: 1 }}>
            {
                props.loading ? <Loader /> : null
            }
            <View style={style.slide1}>


                <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >

                <View style={style.emailcontent}>
                    {props.phonenovalid ? null : <Text style={style.errorMessageStyle}>{props.errorMessage} </Text>
                    }
                    <Text style={style.emailtextstyle}>Enter your Phone Number</Text>

                    <LoginTextInput
                        maxLength={10}
                        value={props.value}

                        placeholder='(555) 555-5555'
                        placeholderTextColor={Colors.grey}
                        onChangeText={(text) => props.onChangeText(text)}
                        keyboardType={"numeric"} />

                </View>

                <View style={{ marginTop: 10, width: wp('100%'), alignItems: "center", height: hp('17%'), marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <CustomButton onPress={() => props.onPressBack()} buttonText='Back' height="40%" width="40%" />
                    <CustomButton onPress={() => props.onPressNext()} buttonText='Next' height="40%" width="40%" />

                </View>

            </View>
        </KeyboardAwareScrollView>

    );

}

export default CustomPhoneView;

const style = StyleSheet.create({
    slide1: {
        flex: 1,
        marginTop: '12%',
        alignItems: 'center',

    },
    logostyle: {
        top: '12%',
        marginBottom: '20%',
    },
    textView: {
        marginTop: 20,
        marginBottom: 10,
        width: '100%'
    },
    emailcontent: {

        marginTop: 10,
        fontFamily: Fonts.APP_REGULAR_FONT,
        width: '100%',

    },
    welcometextstyle: {
        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    emailtextstyle: {
        fontSize: 18,
        marginTop: 40,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },
    errorMessageStyle: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center'
    },
});

