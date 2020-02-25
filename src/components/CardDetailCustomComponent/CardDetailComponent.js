import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from '../Loader';

const CardDetailComponent = props => {
    return (
        <View style={{ flex: 1, alignItems: 'center', }} onPress={() => Keyboard.dismiss()}>
            <View style={styles.userProfileView}>
                <Text style={styles.userProfiletext}>Credit Card Details</Text>
                {props.isError ? <Text style={{ fontSize: 14, textAlign: 'center', color: 'red', }}>{props.errorMessage}</Text> : null}
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), marginTop: 5, margin: 10 }}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 15, paddingBottom: 10, paddingTop: 10, multiline: true, }}>
                        Credit Card Number
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus}
                        maxLength={19}
                        value={props.creditCardNo}
                        onChangeText={(creditCardNo) => props.onChangeCardno(creditCardNo)}
                        keyboardType='numeric'
                        onSubmitEditing={() => props.dismiss()}
                        returnKeyType={"done"}
                        style={styles.inputStyle}></TextInput>
                </View>
                {
                    props.loading ? <Loader /> : null
                }
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>
                {props.clicktoAdd ?
                    <View>
                        <View style={styles.detailView}>
                            <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                                Exp Month
                     </Text>
                            <TextInput
                                blurOnSubmit={false}
                                autoFocus={props.focus}
                                editable={props.textInputDisableStatus}
                                returnKeyType={"next"}
                                maxLength={2}
                                value={String(props.month)}
                                onChangeText={(month) => props.onChangemonth(month)}
                                keyboardType='numeric'
                                style={styles.inputStyle}
                            >
                            </TextInput>
                        </View>
                        <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>
                        <View style={styles.detailView}>
                            <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                                Exp Year
                     </Text>
                            <TextInput blurOnSubmit={false} autoFocus={props.focus}
                                editable={props.textInputDisableStatus}
                                returnKeyType={"next"}
                                maxLength={2}
                                value={String(props.year)}
                                onChangeText={(year) => props.onChangeyear(year)}
                                keyboardType='numeric'
                                style={styles.inputStyle}>
                            </TextInput>
                        </View>
                        <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>
                        <View style={styles.detailView}>
                            <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                                CVV</Text>
                            <TextInput blurOnSubmit={false} autoFocus={props.focus} secureTextEntry={true}
                                editable={props.textInputDisableStatus}
                                maxLength={3}
                                value={props.cvv}
                                onSubmitEditing={() => props.dismiss()}
                                returnKeyType={"done"}
                                placeholder='***'
                                placeholderTextColor='#80c9ff'
                                onChangeText={(cvv) => props.onChangecvv(cvv)}
                                keyboardType='numeric'
                                
                                style={styles.inputStyle}></TextInput>
                        </View>
                        <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%') }}></View>
                        <View style={styles.detailView}>
                            <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                                Zip Code
                            </Text>
                            <TextInput blurOnSubmit={false} autoFocus={props.focus}
                                editable={props.textInputDisableStatus}
                                maxLength={5}
                                value={props.zipcode}
                                onChangeText={(zipcode) => props.onChangezipcode(zipcode)}
                                keyboardType='numeric'
                                onSubmitEditing={() => props.dismiss()}
                                returnKeyType={"done"}
                                style={styles.inputStyle}>
                            </TextInput>
                        </View>
                        <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>
                    </View>
                    : null}
            </View>
            <View style={{ bottom: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', marginBottom: '15%', backgroundColor: '', height: hp('15%'), width: wp('76%') }}>
                <TouchableOpacity onPress={() => props.handleCrossButton()} style={{ width: '38%', margin: 10, borderWidth: 2, borderRadius: 15, height: '35%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { props.clicktoAdd ? props.addCard() : props.deleteCard() }} style={{ width: '38%', margin: 10, borderWidth: 2, borderRadius: 15, height: '35%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>{props.clicktoAdd ? "UPDATE" : "EDIT"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CardDetailComponent;
const styles = StyleSheet.create({
    userProfileView:
    {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    inputStyle:
    {
        width: '50%',
        color: '#80c9ff', fontSize: 14,
        paddingBottom: 10, textAlign: "left", paddingTop: 10,
    },
    userProfiletext:
    {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 15,
        textAlign: 'center', padding: 5, marginBottom: 5
    },
    detailView:
    {
        flexDirection: 'row',
        width: wp("60%"),
        margin: 5,
    },
    buttonText:
    {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center', padding: 5, marginBottom: 5
    },
});

