import { StyleSheet } from 'react-native';
import Fonts from '../../assets/Fonts';



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
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

    welcometextstyle: {
        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    error: {
        alignSelf: 'center',
        fontFamily: Fonts.APP_REGULAR_FONT,
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
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

    textView: {
        marginTop: 20,
        marginBottom: 10,
        width: '100%'
    },
    ConfirmtextView: {
        marginTop: 20,
        width: '100%'
    },
    nextbtn: {
        marginTop: 35,
        width: '100%',
        alignItems: "center",
        height: '70%',
        marginBottom: '10%'

    },
    confirmnextbtn: {
    flexDirection:'row',
    alignItems: 'center',
    marginTop: 10,
    fontFamily: Fonts.APP_REGULAR_FONT,

        
    }
})

export default style;




