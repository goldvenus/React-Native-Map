import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import images from '../../assets/images';
import Fonts from '../../assets/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class LoginSignup extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

   componentDidMount(){
   }

    render() {
        return (
            <View style={style.slide1}>
                <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >
                <View style={style.emailcontent}>
                    <CustomButton onPress={() => this.props.navigation.navigate('login')} buttonText='Login' height="16%" width="40%"  />
                    <CustomButton onPress={() => this.props.navigation.replace('signin')} buttonText='Sign Up' height="16%" width="40%" type="signup"/>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    slide1: {
        flex: 1,
        marginTop: '12%',
        alignItems: 'center',
    },
    logostyle: {
        top: '12%',
        marginBottom: '20%',
    },
    emailcontent: {
        height:'45%',
        justifyContent: 'center',
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 10,
        fontFamily: Fonts.APP_REGULAR_FONT,
        width: wp('100%'),
    },
    emailtextstyle: {
        fontSize: 18,
        marginTop: 30,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },
});