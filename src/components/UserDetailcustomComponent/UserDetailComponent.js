import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,Keyboard} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from '../Loader';


const UserDetailComponent = props => {

    return (
        <View style={{ flex: 1, alignItems: 'center', }} onPress={()=> Keyboard.dismiss()}>
           
            <View style={styles.userProfileView}>
            {
                    props.loading ? <Loader /> : null
                }
                <Text style={styles.userProfiletext}>Update User Profile</Text>
              {props.isError ? <Text style={{fontSize: 14,textAlign: 'center',color:'red',}}>{props.errorMessage}</Text> : null}



                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, margin: 10, width: wp('60%') }}></View>

                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Name
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus}
                        returnKeyType={"done"}
                        style={styles.inputStyle}
                        value={props.firstname}
                        onSubmitEditing={() => props.dismiss()}

                        onChangeText={(text) => props.onChangeFirstname(text)}>

                    </TextInput>
                </View>

                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        User Name
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus}
                       
                        returnKeyType={"done"}
                        style={styles.inputStyle}
                        onChangeText={(username) => props.onChangeUsername(username)}
                        onSubmitEditing={() => props.dismiss()}
                        value={props.username}>

                    </TextInput>
                </View>
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Password
                     </Text>
                    <TextInput
                        blurOnSubmit={false}
                        autoFocus={props.focus}
                        secureTextEntry={true}
                        editable={props.textInputDisableStatus}
                        placeholder="*******"
                        placeholderTextColor='#80c9ff'
                        returnKeyType="done"
                        onSubmitEditing={() => props.dismiss()}
                        style={styles.inputStyle}>

                    </TextInput>
                </View>
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '48%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Email
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus} 
                        returnKeyType={"done"}
                        onSubmitEditing={() => props.dismiss()}

                        style={styles.inputStyle}
                        onChangeText={(email) => props.onChangeEmail(email)}
                         
                        value={props.email}>

                    </TextInput>
                </View>
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Phone Number
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus} 
                        keyboardType='numeric'
                        maxLength={14}
                        returnKeyType="done"
                        onSubmitEditing={() => props.dismiss()}
                        onKeyPress={props.handleKeyDown}
                        style={styles.inputStyle}
                        value={props.phone}
                        onChangeText={(phone) => props.onChangePhone(phone)}

                    ></TextInput>
                </View>
                <View style={{ borderBottomColor: '#80c9ff', borderBottomWidth: 2, width: wp('60%'), }}></View>


            </View>
            <View style={{ bottom: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', marginBottom: '17%', backgroundColor: '', height: hp('15%'), width: wp('76%') }}>
                <TouchableOpacity onPress={() => props.handleCrossButton()} style={{ width: '38%', margin: 10, borderWidth: 2, borderRadius: 15, height: '35%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.updateProfile()}
                    style={{ width: '38%', margin: 10, borderWidth: 2, borderRadius: 15, height: '35%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default UserDetailComponent;

const styles = StyleSheet.create({
    userProfileView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
       
    }, inputStyle: {
        width: '52%',
        color: '#80c9ff', fontSize: 14,
        paddingBottom: 10, textAlign: "left", paddingTop: 10,
    },
    userProfiletext: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', padding: 5, marginBottom: 5
    },
    detailView: {
        flexDirection: 'row',
        width: wp("60%"),
        margin: 7
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center', padding: 5, marginBottom: 5
    },



});

