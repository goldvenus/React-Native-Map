import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../assets/Colors";
const BottomBorder = props => {

    return <View style={styles.inputBorder} />;



};
export default BottomBorder;
const styles = StyleSheet.create({
    withoutError: {
        flex: 1,
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1
    },
    withError: {
        flex: 1,
        borderBottomColor: "red",
        borderBottomWidth: 1
    },
    inputBorder: {
        marginTop: 0,
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1
    }
});

