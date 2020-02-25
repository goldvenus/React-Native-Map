import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginTextInput from './LoginTextInput';
import images from '../assets/images';
import CustomButton from './CustomButton';
import Fonts from '../assets/Fonts';
import Colors from '../assets/Colors';
import strings from '../localization/strings';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomDetailView = props => {
   
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={style.slide2}>
                <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >
                <Text style={style.emailtextstyle}>Username and Password</Text>

                <View style={style.createcontent}>
                    {props.userDetailValid ? <Text style={style.error}>{strings.fieldRequire}</Text>
                        : <Text style={style.error}>{strings.emptyview}</Text>
                    }
                    <LoginTextInput
                        ref={props.ref1}
                        marginTop={5}
                        placeholder='First Name'
                        returnKeyType='next'
                        blurOnSubmit={false}
                        // onSubmitEditing={() => this.refs['2'].focus()}
                        onChangeText={(text) => props.onChangeFirstName(text)}
                        value={props.firstNameValue}
                        placeholderTextColor={Colors.grey} />

                    <LoginTextInput
                        // ref={props.ref2}
                        marginTop={5}
                        returnKeyType='next'
                        // blurOnSubmit={false}
                        placeholder='Last Name'
                        onChangeText={(text) => props.onChangeLastName(text)}
                        value={props.lastNameValue}
                        placeholderTextColor={Colors.grey} />

                    <LoginTextInput
                    //    ref={props.ref3}
                        returnKeyType='next'
                        marginTop={5}
                        placeholder='UserName'
                        blurOnSubmit={false}
                        onChangeText={(text) => props.onChangeUserName(text)}
                        value={props.userNameValue}
                        placeholderTextColor={Colors.grey} />

                    <LoginTextInput
                        // ref={props.ref4}
                        returnKeyType="done"
                        marginTop={5}
                        onSubmitEditing={()=> props.onSubmit()}
                        secureTextEntry={true}
                        placeholder='Password'
                        value={props.passwordValue}
                        blurOnSubmit={false}
                        onChangeText={(text) => props.onChangePasswrd(text)}
                        placeholderTextColor={Colors.grey} />

                </View>
                <View style={{ marginTop: 10, width: wp('100%'), alignItems: "center", height: hp('18%'), marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <CustomButton borderColor={props.borderColor} onPress={() => props.onPressBack()} buttonText='Back' height="35%" width="40%" />
                    <CustomButton borderColor={props.borderColor} disabled={props.disabled} onPress={() => props.onPressNext()} buttonText='Next' height="35%" width="40%" />

                </View>

            </View>



        </KeyboardAwareScrollView>

    );

}

export default CustomDetailView;

const style = StyleSheet.create({
    logostyle: {
        top: '8%',
        marginBottom: '20%',
    },
    createcontent: {
        marginTop: 5,
        fontFamily: Fonts.APP_REGULAR_FONT,
        marginBottom: 5,
        width: '100%'
    },
    slide2: {
        flex: 1,
        alignItems: 'center',

    },
    error: {
        marginTop: 5,
        alignSelf: 'center',
        fontFamily: Fonts.APP_REGULAR_FONT,
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },

    emailtextstyle: {
        fontSize: 18,
        marginTop: 20,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },


    welcometextstyle: {
        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center'
    },

});

