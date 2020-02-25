import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../assets/Colors';


const CustomButton = props => {

    return (

        <TouchableOpacity

           disabled={props.disabled}
            style={props.type==="signup" ? [styles.buttonViewStylenew, { width: props.width },{borderColor:props.borderColor}, { height: props.height }]: [styles.buttonViewStyle, { width: props.width }, { height: props.height },{borderColor:props.borderColor},]}
            onPress={props.onPress}>
             
             {props.type==="signup"?  
             <Text 
             style={styles.buttonTextStylenew}>{props.buttonText}
             
             
             </Text> :
             
             <Text style={styles.buttonTextStyle}>{props.buttonText}</Text>}


        </TouchableOpacity>


    );

}

export default CustomButton;

const styles = StyleSheet.create({
    buttonViewStyle: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
       backgroundColor:'white',
        margin: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8, shadowRadius: 2,
        elevation: 8,

    },

    buttonViewStylenew: {
        borderRadius: 15,
        backgroundColor:Colors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8, shadowRadius: 2,
        elevation: 5,
        margin: 10,

    },




    buttonTextStyle: {
        color: Colors.black,
        fontSize: 15,
        fontWeight: 'bold',

    },


    buttonTextStylenew: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: 'bold',

    }
});
