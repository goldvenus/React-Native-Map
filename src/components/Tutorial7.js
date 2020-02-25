import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import Colors from '../assets/Colors';
import images from '../assets/images';
import { sizeNormalization } from '../utils/sizeNormalization';




const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[style.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const Tutorial7 = props => {


    return (
        <View style={style.container}>
            <MyStatusBar backgroundColor="grey" barStyle="light-content" />

            <ImageBackground style={style.canvas}
                resizeMode='cover' source={images.tut7}>


                <View style={style.centernext}>


                    <TouchableOpacity
                        onPress={() => props.onPressNext()}>


                        <Text style={style.textNext}>Next</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>

        </View>
    );

}


export default Tutorial7;


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'transparent'


    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    centernext: {
        position: 'absolute',
        top: 0, left: 0,
        right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    statusBar: {
        height: STATUSBAR_HEIGHT,
    },

    bottomView: {
        width: '100%',
        justifyContent: "center",
        alignItems: 'center',
        height: 30,
    },



    textNext: {

        marginTop: '45%',
        color: Colors.skip_color,
        fontSize: sizeNormalization(20)
    }


});

