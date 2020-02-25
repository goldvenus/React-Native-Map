import { StyleSheet } from 'react-native';



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },


    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    card: {
        marginLeft: '5%',
        marginTop: '10%',
        backgroundColor: 'white',
        width: '90%',
        height: '80%',
        margin: 5,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },

    manageView: {
        backgroundColor: 'transparent',
        width: '95%',
        height: '32%',
        margin: 5,
    },

    managetext: {
        width: '90%',
        textAlign: 'center',
        fontSize: 22,
        padding: 5,
        fontWeight: 'bold',
        margin: 10
    },

    favouritetext: {
        width: '90%',
        textAlign: 'left',
        fontSize: 20,
        padding: 5,
        margin: 10
    },
    tabelView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },
    search: {
        textAlign: 'left',
        padding: 2,
        backgroundColor: 'transparent',
        width: '80%',
        margin: 3
    },

    tabelmainview: {
        backgroundColor: '#DCDCDC',
        flexDirection: 'row',
        width: '90%',
        height: '25%',
        borderWidth: 2,
        borderColor: '#A9A9A9'
    },
    tabelsubView: {
        backgroundColor: 'transparent',
        width: '30%',
        borderRightWidth: 2,
        borderColor: '#A9A9A9'
    },
    tabletext: {
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: 16
    },
    currentfav: {
        backgroundColor: 'transparent',
        height: '27%',
        width: '95%',
        margin: 10
    },
    icadmainview: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: '#A9A9A9',
        marginBottom: 4
    },
    icadsubview: {
        backgroundColor: 'transparent', width: '30%',
    },
    icadstext: {
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: 16
    },

    eventsfeedMainview: {
        width: '100%',
        height: '10%',
        bottom: 0,
        position: 'absolute',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    eventesfeedSubview: {
        justifyContent: 'center',
        width: '45%',
        alignItems: 'center',
        height: '80%',
        borderRadius: 20,
        borderColor: '#808080',
        borderWidth: 2,
        margin: 5
    }





})

export default style;

