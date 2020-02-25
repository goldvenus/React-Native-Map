import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import images from '../assets/images';
import CustomButton from './CustomButton';
import Fonts from '../assets/Fonts';


const CustomSucessView = props => {


    return (

        <View style={style.textView}>
            <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >
            <View style={style.textView}>

                <Text style={style.welcometextstyle}>Success !</Text>

            </View>


            <View style={style.emailcontent}>
                <Text style={style.emailtextstyle}>Welcome to JumpSeat community</Text>


            </View>

            <View style={style.getstarted}>
                <CustomButton onPress={() => props.onPressNext()} buttonText='Login' height="6%" width="50%" />

            </View>

        </View>
    )



}
export default CustomSucessView;

const style = StyleSheet.create({
    textView: {
        marginTop: 20,
        marginBottom: 10,
        width: '100%'
    },
    welcometextstyle: {
        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    emailcontent: {

        marginTop: 10,
        fontFamily: Fonts.APP_REGULAR_FONT,
        width: '100%'
    },

    logostyle: {
        top: '6%',
        alignSelf: 'center',
        marginBottom: '30%',
    },
    emailtextstyle: {
        fontSize: 18,
        marginTop: 40,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },
    getstarted: {
        marginTop: 10,
        width: '100%',
        alignItems: "center",
        height: '70%'
    },

});
