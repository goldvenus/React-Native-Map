import { StyleSheet } from 'react-native';
import Fonts from '../../assets/Fonts';



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    containernew: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cardView: {
        marginTop: '10%',
        margin: 5,
        backgroundColor: 'white',
        width: '90%',
        height: '88%',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8, shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
        alignSelf: 'center'
    },
    location: {
        width: '40%',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        marginLeft: 10
    },

    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },


    kden: {
        width: '50%',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        marginLeft: 10,
        borderColor: '#808080',
        borderWidth: 2,
        backgroundColor: '#C0C0C0'
    },

    typeevent: {
        width: '90%',
        textAlign: 'center',
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold',
        margin: 10
    },
    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 120,
        margin: 5,

    },

    GridViewInsideTextItemStyle: {

        color: 'black',
        padding: 5,
        fontSize: 12,
        justifyContent: 'center',
        textAlign: 'center'

    },
    itemText: {
        fontSize: 14,
        padding: 5
    },

    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    drodowntext: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,

        backgroundColor: '#FAF7F6',
    },



    dropItemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF7F6',
        borderColor: '#bbb',
        borderWidth: 1,
    },

    wheretext: {
        marginTop: 5,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },

    errorView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40%',
    },


    errortext: {
        alignSelf: 'center',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    },
    autoCompleteContainer:
    {
        width: '85%',
        margin: 10,
        backgroundColor: 'transparent'
    },
    autoCompleteList:
    {
        zIndex: 1,
        position: 'absolute',
        height: 200,
        width: '100%',
    },
    listViewStyle:
    {
        margin: 2,
        borderBottomColor: 'grey',
        borderBottomWidth: 2
    },







})

export default style;


