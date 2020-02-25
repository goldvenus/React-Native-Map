import { StyleSheet } from 'react-native';
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewStyle: {
        backgroundColor: '#fff',
        width: '80%',
        height: '40%',
        margin: 10,
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

    inputStyle: {
        borderBottomColor: '#A9A9A9',
        borderBottomWidth: 1,
        color: '#A9A9A9', fontSize: 18,
        margin: 20, textAlign: "left",
    },
    submitBtnStyle: {
        bottom: 0,
        position: 'absolute',
        marginBottom: 50,
        backgroundColor: '#0D2543',
        width: '60%',
        borderWidth: 1,
        borderRadius: 30,
        height: '8%', justifyContent: 'center', alignItems: 'center'
    },
    textStyle: {
        color: 'white', padding: 5, fontSize: 18, fontWeight: 'bold'
    }
})
export default style;