import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput ,TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { userdetail } from '../screens/userdetail/Action';


const UserDetailComponent = props => {

    return (
<View style={{flex:1,alignItems:'center',}}>
        <View style={styles.userProfileView}>
            <Text style={styles.userProfiletext}>Update User Profile</Text>
            <View style={{ borderBottomColor: 'blue', borderBottomWidth: 2, width: wp('70%'),}}></View>
     
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Name
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus} placeholder="First Name" returnKeyType={"next"}
                        style={styles.inputStyle}></TextInput>
                </View>
                <View style={{ borderBottomColor: 'blue', borderBottomWidth: 2, width: wp('70%'),}}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        User Name
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus} placeholder="User Name" returnKeyType={"next"}
                        style={styles.inputStyle}></TextInput>
                </View>
                <View style={{ borderBottomColor: 'blue', borderBottomWidth: 2, width: wp('70%'),}}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Password
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus} secureTextEntry={true}
                        editable={props.textInputDisableStatus} placeholder="*****" returnKeyType={"next"}
                        style={styles.inputStyle}></TextInput>
                </View>
                <View style={{ borderBottomColor: 'blue', borderBottomWidth: 2, width: wp('70%'),}}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Email
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus} placeholder="abc@gmail.com" returnKeyType={"next"}
                        style={styles.inputStyle}></TextInput>
                </View>
                <View style={{ borderBottomColor: 'blue', borderBottomWidth: 2, width: wp('70%'),}}></View>
                <View style={styles.detailView}>
                    <Text style={{ width: '50%', textAlign: 'left', fontSize: 14, paddingBottom: 10, paddingTop: 10, }}>
                        Phone Number
                     </Text>
                    <TextInput blurOnSubmit={false} autoFocus={props.focus}
                        editable={props.textInputDisableStatus} placeholder="123-456-7891" returnKeyType={"next"}
                        style={styles.inputStyle}></TextInput>
                </View>
                <View style={{ borderBottomColor: 'blue', borderBottomWidth: 2, width: wp('70%'),}}></View>

            
        </View>
        <View style={{bottom:0,alignItems:'center',justifyContent:'center', flexDirection:'row', position:'absolute',marginBottom:'25%',backgroundColor:'',height:hp('15%'),width:wp('80%')}}>
<TouchableOpacity style={{width:'40%',margin:10,borderWidth:2,borderRadius:20,height:'35%',alignItems:'center',justifyContent:'center'}}>
<Text style={styles.buttonText}>CANCEL</Text>
</TouchableOpacity>
<TouchableOpacity style={{width:'40%',margin:10,borderWidth:2,borderRadius:20,height:'35%',alignItems:'center',justifyContent:'center'}}>
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
        margin: 5
    }, inputStyle: {
        width: '50%',
        color: '#A9A9A9', fontSize: 14,
        paddingBottom: 10, textAlign: "left", paddingTop: 10,
    },
    userProfiletext: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', padding: 5,marginBottom:5
    },
    detailView: {
        flexDirection: 'row',
        width: wp("70%"),
    }, buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center', padding: 5,marginBottom:5
    },



});

