import { StyleSheet } from 'react-native';



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

    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },


    card: {

       
        margin: 5,
        backgroundColor: 'white',
        width: '90%',
        height: '85%',
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

    eventstext: {
        width: '90%',
        textAlign: 'center',
        fontSize: 22,
        padding: 5,
        fontWeight: 'bold',
        margin: 10
    },

    tabView: {
        width: '100%',
        height: '8%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
       
      
        marginTop: 10
    },

    globalview: {
        width: '45%', height: '100%', alignItems: 'center', justifyContent: 'center',borderRadius:5,margin:5,borderWidth:2,
    },

    favouriteview: {
        width: '45%', height: '100%', alignItems: 'center', justifyContent: 'center',borderRadius:5,margin:5,borderWidth:2,
    },

    favtext: {
        fontSize: 16,
    },

    globaltext: {
        fontSize: 16,
    },

    flatview: {
        height: '63%', backgroundColor: 'transparent', marginTop: 10, width: '100%'
    },
    flatFavview: {
        height: '63%', backgroundColor: 'white', marginTop: 10, width: '100%'
    },

    renderflatView: {

        marginTop: 10,
        width: '97%',
        margin: 2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        padding: 5
    },
    renderfavouriteView: {

        marginTop: 10,
        width: '95%',
        margin: 5,
        // backgroundColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 5,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        padding: 5
    },
    listtext: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 12,
        padding: 2,
        marginLeft: 5,
        width:'80%',
       

    },

    manageMainView: {
        width: '100%',
        height: '10%',
        bottom: 0,
        position: 'absolute',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection:'row'
    },
    managesubView: {
        justifyContent: 'center', width: '45%', alignItems: 'center', height: '85%', borderRadius: 20, borderColor: '#808080', borderWidth: 2, margin: 5
    },
    managetext: {
        textAlign: 'center', fontSize: 16, padding: 5,
    },
    listimg: {
        position: 'absolute', right: 0
    },
    listtextnew: {
        marginLeft: 20, fontSize: 13, textAlign: 'left', padding: 2,
    },
    listtextnew1: {
        marginLeft: 20, fontSize: 13, textAlign: 'left', padding: 5
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
    arrowimgview: {
        flexDirection: 'row', bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center', margin: 10
    },
    iconStyle: { width: '30%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }





})

export default style;


