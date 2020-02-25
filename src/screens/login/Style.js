import { StyleSheet } from 'react-native';
import Fonts from '../../assets/Fonts';



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    containernew: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    getstarted: {
        marginTop: 10,
        width: '100%',
        alignItems: "center",
        height: '70%'
    },

    logostyle: {
        top: '6%',
        alignSelf: 'center',
        marginBottom: '30%',
    },
    emailtextstyle: {
        fontSize: 18,
        marginTop: 40,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },
    slide1: {
        flex: 1,
        alignItems: 'center',

    },

    welcometextstyle: {
        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 20,
        textAlign: 'center'
    },
    error: {
        alignSelf: 'center',
        fontFamily: Fonts.APP_REGULAR_FONT,
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },

    letstextstyle: {
        fontSize: 18,
        fontFamily: Fonts.APP_REGULAR_FONT,
        marginTop: 10,
        textAlign: 'center'
    },
    emailcontent: {

        marginTop: 10,
        fontFamily: Fonts.APP_REGULAR_FONT,
        width: '100%'
    },

    createcontent: {
        marginTop: 20,
        fontFamily: Fonts.APP_REGULAR_FONT,
        marginBottom: 20,
        width: '100%'
    },
    signin: {
        fontFamily: Fonts.APP_REGULAR_FONT,
        marginBottom: 20,
        width: '100%'
    },
    signintextstyle: {
        fontSize: 18,
        marginTop: 20,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },
    slide3: {
        flex: 1,
        alignItems: 'center',

    },

    forgotstyle: {
        color: '#0091ff',
        marginTop: 35,
        fontSize: 18,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },

    forgotstylenew: {
        color: '#0091ff',
        marginTop: 20,
        fontSize: 18,
        fontFamily: Fonts.APP_REGULAR_FONT,
        textAlign: 'center'
    },
    textView: {
        width: '100%'
    },
    nextbtn: {
        marginTop: 10,
        width: '100%',
        alignItems: "center",
        height: '70%',
        marginBottom: '10%'
    }
})

export default style;

