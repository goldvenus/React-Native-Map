import { StyleSheet } from 'react-native';
import Colors from '../../assets/Colors';



const style = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: '5%'

    },
    viewStyle: {
        backgroundColor: '#fff',
        width: '80%',
        height: '75%',
        margin: 7,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3
    },

    header: {
        width: '100%',
        padding: 12,
        justifyContent: 'center',
        // borderBottomColor: '#d3d3d3',
        // borderBottomWidth: 1,
    },
    headerText: {
        width: '100%',
        fontSize: 18,
        fontWeight: '100',
        color: Colors.white,
        textAlign: 'center'
    },
    headerRightImage: {
        right: 15,
        marginTop: 5,
        padding: 10,
        justifyContent: 'center',
        position: 'absolute'
    },

    headerleftImage: {
        left: 10,
        marginTop: 5,
        padding: 10,
        justifyContent: 'center',
        position: 'absolute'
    },

    inputStyle: {
        borderBottomColor: '#A9A9A9',
        borderBottomWidth: 1,
        color: '#A9A9A9', fontSize: 18,
        margin: 10, textAlign: "left",
    },
    submitBtnStyle: {
        bottom: 0,
        position: 'absolute',
        marginBottom: 50,
        backgroundColor: '#0D2543',
        width: '60%',
        borderWidth: 1
        ,
        borderRadius: 30,
        height: '8%', justifyContent: 'center', alignItems: 'center'
    },
    textStyle: {
        color: 'white', padding: 5, fontSize: 18, fontWeight: 'bold'
    }


})

export default style;

