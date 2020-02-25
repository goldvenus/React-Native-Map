import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from './Loader';

const ContactDetailComponent = props => {
    return (
        <View style={{ flex: 1, alignItems: 'center', }} onPress={() => Keyboard.dismiss()}>
            <View style={styles.userProfileView}>
                {props.loading ? <Loader /> : null}
                <Text style={styles.userProfiletext}>Contact Us</Text>
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('70%'), }}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '35%', textAlign: 'left', alignSelf: 'center', fontSize: 15, multiline: true, }}>
                        Your Email
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus} placeholder={props.emailcontact} returnKeyType={"next"}
                        style={styles.inputStyle}></TextInput>
                </View>
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('66%'), }}></View>
                <View style={{ width: wp("70%"), }}>
                    <Text style={{ fontWeight: 'bold', width: '50%', textAlign: 'left', fontSize: 15, paddingBottom: 10, paddingTop: 10, multiline: true, }}>
                        Message
                     </Text>
                    {props.isError ? <Text style={{ fontSize: 14, textAlign: 'center', color: 'red', }}>{props.errorMessage}</Text> : null}
                    <TextInput
                        multiline
                        value={props.contactmessege}
                        onChangeText={(zipcode) => props.onChangecontactmessege(zipcode)}
                        editable={props.messegestatus}
                        onSubmitEditing={() => props.dismiss}
                        returnKeyType={"done"}
                        blurOnSubmit={true}
                        numberOfLines={6}
                        style={styles.messageInputStyle}></TextInput>
                </View>
            </View>
            <View style={{ bottom: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', marginBottom: '15%', backgroundColor: '', height: hp('15%'), width: wp('80%') }}>
                <TouchableOpacity onPress={() => props.handleCrossButton()} style={{ width: '40%', margin: 10, borderWidth: 2, borderRadius: 20, height: '35%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.callContact()} style={{ width: '40%', margin: 10, borderWidth: 2, borderRadius: 20, height: '35%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>SEND</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ContactDetailComponent;
const styles = StyleSheet.create({
    userProfileView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    inputStyle: {
        width: '65%',
        margin: 10,
        color: '#A9A9A9', fontSize: 13,
        paddingBottom: 10, textAlign: "left", paddingTop: 10,
    },
    messageInputStyle: {
        width: '90%',
        color: '#A9A9A9', fontSize: 14, margin: 10, justifyContent: 'center',
        paddingBottom: 10, textAlign: "left", paddingTop: 10, paddingLeft: 10, paddingRight: 10,
        borderWidth: 2, borderColor: "#80c9ff", borderRadius: 10, height: '60%', textAlignVertical: 'top'
    },
    userProfiletext: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', padding: 5, marginBottom: 5
    },
    detailView: {
        flexDirection: 'row',
        width: wp("70%"),

    }, buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center', padding: 5, marginBottom: 5
    },
});