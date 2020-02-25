import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ViewPropTypes, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements'

import LoginTextInput from './LoginTextInput';
import images from '../assets/images';
import CustomButton from './CustomButton';
import strings from '../localization/strings';
import Fonts from '../assets/Fonts';
import Colors from '../assets/Colors';
import Loader from './Loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { viewPlannedFlights } from '../screens/map/Action';
import HTML from 'react-native-render-html';


const CustomPaymentView = props => {
    return (
        props.showTerms ?
            <View style={{ height: '100%', width: '100%', }}>
                {
                    props.loading ? <Loader /> : null
                }
                <Text style={{ fontSize: 25, textAlign: 'center', padding: 10, fontWeight: 'bold', color: Colors.Blue, marginTop: '5%', }}>Terms And Conditions</Text>
                <ScrollView style={{ width: '90%', padding: 10, alignSelf: 'center', }}>
                    <HTML html={props.htmlData} imagesMaxWidth={Dimensions.get('window').width} />
                </ScrollView>
                <View style={{ width: wp('100%'), alignItems: "center", height: hp('10%'), flexDirection: 'row', justifyContent: 'center' }}>
                    <CustomButton onPress={() => props.skipTerms()} buttonText='Cancel' height="60%" width="40%" />
                    <CustomButton onPress={() => props.uncheck()} buttonText='Agree' height="60%" width="40%" />
                </View>
            </View>
            :
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={style.slide3}>
                    <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >
                    {
                        props.loading ? <Loader /> : null
                    }
                    <View style={style.signin}>
                        <View style={style.cardView}>
                            <View style={{
                                width: '45%', flexDirection: 'row', borderColor: props.monthSelected ? '#3a6897' : 'transparent', margin: 5,
                                borderWidth: 2,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                marginTop: 20,
                                shadowRadius: 2,
                                elevation: 5,
                                borderRadius: 15,
                                backgroundColor: props.monthSelected ? '#eeeeee' : 'white',
                                height: '80%'
                            }}>
                                <View style={{ width: '60%', margin: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={style.paymentViewTextStyle}>
                                        {props.monthPlan.name}
                                    </Text>
                                    <Text style={style.paymentViewTextStyle}>
                                        {"$" + props.monthPlan.price}
                                    </Text>
                                </View>
                                <CheckBox

                                    containerStyle={{ backgroundColor: 'transparent', borderColor: 'black', margin: 5, width: '25%', justifyContent: 'center', alignItems: 'center' }}
                                    size={20}
                                    checked={props.monthSelected}
                                    onPress={props.CheckIfMonthSelected}
                                />

                                {
                                    props.monthPlan.viewDiscountStatus === "1" ? <Text style={{ position: 'absolute', backgroundColor: '#3a6897', right: 10, height: '35%', width: '35%', borderWidth: 1, borderRadius: 10, borderColor: 'white', color: 'white', fontSize: 10, padding: 2 }}>Save {props.monthPlan.discount}%</Text>
                                        : null
                                }

                            </View>



                            <View style={{
                                width: '45%', flexDirection: 'row', borderColor: props.annualSelected ? '#3a6897' : 'transparent', margin: 5,
                                borderWidth: 2,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                marginTop: 20,

                                elevation: 5,
                                borderRadius: 15,
                                backgroundColor: props.annualSelected ? '#eeeeee' : 'white',
                                height: '80%'
                            }}>
                                <View style={{ width: '60%', margin: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={style.paymentViewTextStyle}>
                                        {props.annualPlan.name}
                                    </Text>
                                    <Text style={style.paymentViewTextStyle}>
                                        {"$" + props.annualPlan.price}
                                    </Text>
                                </View>
                                <CheckBox

                                    containerStyle={{ backgroundColor: 'transparent', borderColor: 'black', margin: 5, width: '25%', justifyContent: 'center', alignItems: 'center' }}
                                    size={20}
                                    checked={props.annualSelected}
                                    onPress={props.CheckIfAnnualSelected}
                                />

                                {
                                    props.annualPlan.viewDiscountStatus === "1" ? <Text style={{ position: 'absolute', backgroundColor: '#3a6897', right: 10, height: '35%', width: '30%', borderWidth: 1, borderRadius: 10, borderColor: 'white', color: 'white', fontSize: 10, padding: 2 }}>Save {props.annualPlan.discount}%</Text> : null
                                }
                            </View>
                            {/* <View style={{
                                width: '30%', flexDirection: 'row', borderColor: props.freeSelected ? '#3a6897' : 'transparent', margin: 5,
                                borderWidth: 2,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                marginTop: 20,

                                elevation: 5,
                                borderRadius: 15,
                                backgroundColor: props.freeSelected ? '#eeeeee' : 'white',
                                height: '80%'
                            }}>
                                <View style={{ width: '60%', margin: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={style.paymentViewTextStyle}>
                                        Free
                                    </Text>
                                  
                                </View>
                                <CheckBox

                                    containerStyle={{ backgroundColor: 'transparent', borderColor: 'black', margin: 5, width: '25%', justifyContent: 'center', alignItems: 'center' }}
                                    size={20}
                                    checked={props.freeSelected}
                                    onPress={props.CheckIffreeSelected}
                                />

                            </View> */}


                        </View>

                        <Text style={{marginLeft:18}} >Note: 30 days Free trail.After 30 days plan will be activated</Text>



                        {
                            props.paymentValid ? <Text style={style.error}>{strings.errormsg}</Text>
                                :
                                <Text style={style.error}>{strings.emptyview}</Text>
                        }





                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.creditstyle}>Credit Card</Text>
                            <View style={{ width: '72%' }}>
                                <LoginTextInput
                                    width="95%"
                                    maxLength={19}
                                    value={props.creditCardValue}
                                    keyboardType={"numeric"}
                                    onChangeText={text => props.validCardNumber(text)}
                                    placeholder='1234-5686-9987-1135'
                                    placeholderTextColor={Colors.grey} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '4%', }}>
                            <Text style={style.expiration}>Expiration</Text>
                            <View style={{ width: '72%', marginLeft: 20 }}>
                                <LoginTextInput
                                    value={props.monthyearValue}
                                    placeholder='MM/YY'
                                    maxLength={5}
                                    textContentType='none'
                                    onChangeText={text => props.onChangemonthyear(text)}
                                    keyboardType={"numeric"}
                                    placeholderTextColor={Colors.grey} />
                            </View>
                            {/* <View style={{ width: '20%' }}>
                                <LoginTextInput
                                    maxLength={2}
                                    marginTop={2}
                                    onChangeText={(text) => props.onChangeTextYear(text)}
                                    value={props.yearValue}
                                    keyboardType={"numeric"}
                                    placeholder='23'
                                    placeholderTextColor={Colors.grey} />
                            </View> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '6%' }}>
                            <Text style={style.zipcode}>Zip Code</Text>
                            <View style={{ width: '25%' }}>
                                <LoginTextInput
                                    maxLength={5}
                                    onChangeText={(text) => props.onChangeTextZip(text)}
                                    keyboardType={"numeric"}
                                    placeholder='12345'
                                    value={props.zipValue}
                                    placeholderTextColor={Colors.grey} />
                            </View>
                            <Text style={style.cvv}>CVV</Text>
                            <View style={{ width: '25%' }}>
                                <LoginTextInput
                                    placeholder='000'
                                    maxLength={3}
                                    returnKeyType="done"
                                    onSubmitEditing={() => props.onSubmit()}
                                    value={props.cvvValue}
                                    onChangeText={(text) => props.onChangeTextCvv(text)}
                                    keyboardType={"numeric"}
                                    placeholderTextColor={Colors.grey} />

                            </View>
                        </View>
                        <View style={style.nextterm}>
                            <CheckBox
                                textStyle={{ fontSize: 15 }}
                                containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                size={22}
                                checked={props.isChecked}
                                onPress={() => props.checkTheTerms()}
                            // title={"I agree to the term and conditions"}
                            />
                            <Text style={{ marginLeft: -20 }}> I agree to the</Text>
                            <TouchableOpacity style={style.inputBox}
                                onPress={() => props.checkPress()}>
                                <Text style={style.inputBoxText}>  terms and conditions</Text>
                            </TouchableOpacity>

                        </View>

                        {/* <View style={{flexDirection:'row',backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
                        <CheckBox
                            textStyle={{ fontSize: 15 }}
                            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', marginTop: 40 }}
                            size={22}
                            checked={props.isChecked}
                           
                            // title={"I agree for"}
                        />
                        <TouchableOpacity style={{alignSelf:'center'}}  onPress={() => props.checkPress()}>
                            <Text>
                           Terms and Conditions
                            </Text>
                        </TouchableOpacity>
                        </View> */}


                    </View>

                </View>
                <View style={{ width: wp('100%'), alignItems: "center", height: hp('17%'), flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
                    <CustomButton borderColor={props.borderColor} onPress={() => props.onPressBack()} buttonText='Back' height="38%" width="40%" />
                    <CustomButton disabled={props.disabled} borderColor={props.borderColor} onPress={() => props.onPress()} buttonText='Next' height="38%" width="40%" />

                </View>

            </KeyboardAwareScrollView>


    );


}

export default CustomPaymentView;
const style = StyleSheet.create({
    slide3: {
        flex: 1,
        marginTop: '2%',
        alignItems: 'center',

    },

    logostyle: {
        top: '6%',

        marginBottom: '8%',
    },
    textView: {
        marginTop: 10,
        marginBottom: 5,
        width: '100%'
    },
    welcometextstyle: {
        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    signin: {
        fontFamily: Fonts.APP_REGULAR_FONT,
        width: '100%',

    },
    paymentView: {
        width: wp('100%'),

        height: hp('10%'),
        flexDirection: 'row'
    },
    paymentMainView: {
        width: '48%', flexDirection: 'row', borderColor: 'transparent', margin: 5,
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 20,
        elevation: 5,
        height: '90%'
    },
    signintextstyle: {
        fontSize: 16,
        marginTop: 5,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },
    error: {
        marginTop: 5,
        alignSelf: 'center',
        fontFamily: Fonts.APP_REGULAR_FONT,
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    paymentViewTextStyle: {
        color: 'black',
        textAlign: 'left',
        fontSize: 12,
        fontFamily: Fonts.APP_BOLD_FONT,
        backgroundColor: 'transparent',
        padding: 2,
        fontWeight: 'bold',
        width: '95%',
        marginLeft: 5
    },
    cardView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        // backgroundColor: '#3a6897',
        width: '95%',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: '17%'
    },
    monthPaymentView: {
        width: '100%',
        margin: 5,
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    creditstyle: {
        textAlign: 'left',
        padding: 15,
        fontSize: 16,
        fontFamily: Fonts.APP_BOLD_FONT,
    },

    expiration: {
        fontSize: 16,
        fontFamily: Fonts.APP_BOLD_FONT,
        textAlign: 'left',
        marginLeft: 10,
        alignSelf: 'center'
    },
    paymentnext: {
        marginTop: '3%',
        width: '100%',
        alignItems: "center",
        height: '100%',
        marginBottom: '12%'
    },

    month: {
        textAlign: 'left',
        padding: 15,
        fontSize: 16,
        fontFamily: Fonts.APP_BOLD_FONT,
        alignSelf: 'center',
        marginLeft: '5%',
    },
    year: {
        textAlign: 'left',
        padding: 15,
        fontSize: 16,
        fontFamily: Fonts.APP_BOLD_FONT,
        alignSelf: 'center'
    },
    zipcode: {
        textAlign: 'left',
        padding: 15,
        fontSize: 16,
        fontFamily: Fonts.APP_BOLD_FONT,
        alignSelf: 'center',
    },
    cvv: {
        textAlign: 'left',
        padding: 15,
        fontSize: 16,
        fontFamily: Fonts.APP_BOLD_FONT,
        alignSelf: 'center'
    },
    inputBox: {
        justifyContent: 'center'

    },

    inputBoxText: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        paddingLeft: 0,
        paddingBottom: 10,
        paddingTop: 10,
        textAlign: 'left'
        // textDecorationColor: "red"
    },
    nextterm: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20

    },


});


