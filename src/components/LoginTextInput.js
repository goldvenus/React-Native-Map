import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

const LoginTextInput = props => {
    return (
        <View>
            <View style={[styles.textView, { width: props.width },{marginTop:props.marginTop}]}>
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    secureTextEntry={props.secureTextEntry}
                    keyboardType={props.keyboardType}
                    value={props.value}
                    textContentType={props.textContentType}
                    returnKeyType={props.returnKeyType}
                    maxLength={props.maxLength}
                    onChangeText={props.onChangeText}
                    blurOnSubmit={props.blurOnSubmit}
                    ref={props.ref}
                    onSubmitEditing={props.onSubmitEditing}
                    onBlur={props.onBlurEnd}
                    onEndEditing={props.onEndEditing}
                    style={styles.textInputStyle}
                    onStartShouldSetResponder={props.onStartShouldSetResponder}
                />
            </View>
        </View>


    );

}

export default LoginTextInput;

const styles = StyleSheet.create({

    textInputStyle: {
        height: '100%',
        width: '90%',
        fontSize: 15,
        alignItems: 'center',
        color: 'black',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 2,
        textAlign: 'center',
        fontWeight: "bold",
        margin: "5%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',

    },
    textView: {
        marginTop: 5,
        height: 55,

        fontWeight: 'bold',
        alignItems: 'center',

    },
    iconStyle: {
        width: '15%', height: '80%', resizeMode: 'contain', margin: 10
    }


});
