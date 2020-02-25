import { StyleSheet } from 'react-native';
import Fonts from '../../assets/Fonts';



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },


    card: {
        marginTop: '10%',
        margin: 5,
        backgroundColor: 'white',
        width: '90%',
        height: '88%',
        margin: 5,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8, shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },


    locationrow: {
        flexDirection: 'row',
        height: '6%',
        justifyContent: 'center',
    
    },
    submitreporttxt: {
        fontSize: 20,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },


    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },


    location: {
        width: '50%',
        textAlign: 'right',
        fontSize: 17,
        padding: 5,
        fontWeight: 'bold',

    },

    kden: {
        width: '50%',
        textAlign: 'left',
        fontSize: 17,
        padding: 5,
        fontWeight: 'bold',

        // borderColor: '#808080',
        // borderWidth: 2,
        // backgroundColor: '#C0C0C0'
    },
    evebtType: {
        width: '90%',
        textAlign: 'center',
        fontSize: 18,
        padding: 5,
        fontWeight: 'bold',
        margin: 10
    },
    GridViewBlockStyle: {
        flex: 1,

        width: '90%',
        justifyContent: 'center',

        margin: 15,


    },

    row: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },

    GridViewErrorBlockStyle: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '15%',
        alignItems: 'center',
        margin: 5,


    },


    GridViewInsideTextItemStyle: {
        padding: 5,
        fontSize: 13,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    date: {
        borderWidth: 2,
        borderColor: '#808080',
        width: '35%',
        fontSize: 16,
        padding: 1,
        textAlign: 'center',

    },


    howLong: {
        width: '95%',
        textAlign: 'center',
        fontSize: 14,
        padding: 5,
        margin: 5,
    },
    gratitudeTextInput: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
        padding: 8,
       marginBottom:5,
       marginLeft:20,
       marginRight:20,
       width:'95%',
        textAlignVertical: 'top',
        borderWidth: 2,
        borderColor: '#808080',
        height: '35%'

    },


    submit: {
        marginBottom: 10,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        position: 'absolute',
        borderRadius: 10,
        borderColor: '#808080',
        borderWidth: 2
    },


})

export default style;


