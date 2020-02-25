import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from './Loader';


const InivteDetailComponent = props => {

    return (
        <View style={{ flex: 1, alignItems: 'center', }} onPress={()=> Keyboard.dismiss()}>
            <View style={styles.userProfileView}>
            {
                    props.loading ? <Loader /> : null
                }
                <Text style={styles.userProfiletext}>Invite Code</Text>
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('70%'), }}></View>

                <Text style={{ textAlign: 'center', padding: 10, fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>If someone uses your referral code they get a free month and you get free JS stuff</Text>
                <Text style={{ textAlign: 'center', padding: 10, fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>Your Refferal code is unique to you! Start Sharing ! </Text>

                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'center', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Your Code
                     </Text>
                    <TextInput 
                    blurOnSubmit={false} autoFocus={props.focus}
                          maxLength={6}
                          editable={false}
                        editable={props.textInputDisableStatus} placeholder={props.value.userReffCode} placeholderTextColor='#80c9ff' returnKeyType={"next"}
                        style={styles.inputStyle}></TextInput>
                </View>

            </View>
            <View style={{ bottom: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', marginBottom: '25%', backgroundColor: '', height: hp('15%'), width: wp('80%') }}>
                <TouchableOpacity onPress={() => props.handleCrossButton()} style={{ width: '40%', margin: 10, borderWidth: 2, borderRadius: 20, height: '35%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '40%', margin: 10, borderWidth: 2, borderRadius: 20, height: '35%', alignItems: 'center', justifyContent: 'center' }} onPress={props.inviteCode}>
                    <Text style={styles.buttonText}>SHARE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default InivteDetailComponent;

const styles = StyleSheet.create({
    userProfileView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        margin: 5
    }, inputStyle: {
        width: '50%',
        color: '#80c9ff', fontSize: 14,
        paddingBottom: 10, textAlign: "center", paddingTop: 10,
    },
    messageInputStyle: {
        width: '90%',
        color: '#A9A9A9', fontSize: 14, margin: 10,
        paddingBottom: 10, textAlign: "left", paddingTop: 10,
        borderWidth: 2, borderColor: "#80c9ff", borderRadius: 10, height: '60%', textAlignVertical: 'top'
    },
    userProfiletext: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', padding: 5, marginBottom: 5
    },
    detailView: {
        flexDirection: 'row',
        marginTop: 10,
        width: wp("70%"),
    }, buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center', padding: 5, marginBottom: 5
    },



});