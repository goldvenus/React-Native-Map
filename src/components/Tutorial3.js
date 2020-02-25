import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity, Image } from 'react-native';
import Colors from '../assets/Colors';
import images from '../assets/images';
import { sizeNormalization } from '../utils/sizeNormalization';


const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[style.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const Tutorial3 = props => {

    return (
        <View style={style.container}>
            <MyStatusBar backgroundColor="grey" barStyle="light-content" />

            <ImageBackground style={style.canvas}
                resizeMode='cover' source={images.tut3}>

                <View style={style.bottomView} >

                    {/* <TouchableOpacity style={style.plane}
                        onPress={() => props.onPressNext()}>

                        <Image resizeMode='contain' source={images.tplane}></Image>

                    </TouchableOpacity> */}

                    <TouchableOpacity style={style.skiptouch}
                        onPress={() => props.onPressSkip()}>

                        <Text style={style.textStyle}>Skip</Text>

                    </TouchableOpacity>

                  

                    <TouchableOpacity style={style.nexttouch} onPress={() => props.onPressNext()}>

                    <TouchableOpacity style={style.menutouch} onPress={() => props.onPressNext()}>


<Image source={images.tmenu} resizeMode='contain'></Image>
</TouchableOpacity>
                        <Text style={style.textNext}>Next</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    );

}


export default Tutorial3;


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

    skiptouch: {
        position: 'absolute',
        left: 5,
        bottom: 2,
        width: '30%',
        height: 40
    },

    plane: {
        position: 'absolute',
        left: 20,
        bottom: 50,
        width: '30%',
        height: 40

    },

    nexttouch: {
        position: 'absolute',
        right: 0,
        bottom: 5,
        right: 10,
        width: '30%',
        height: 40
    },

    statusBar: {
        height: STATUSBAR_HEIGHT,
    },

    bottomView: {
        flexDirection: 'row',
        width: '100%',
        height: 30,
        position: 'absolute',
        bottom: 0
    },

    menutouch: {
        position: 'absolute',
        right: 15,
        bottom: 45,
        height: 40

    },
    
    textStyle: {
        position: 'absolute',
        left: 15,
        bottom: 10,
        padding: 5,
        color: Colors.skip_color,
        fontSize: sizeNormalization(20)
    },

    textNext: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        padding: 5,
        color: Colors.skip_color,
        fontSize: sizeNormalization(20)
    }


});

