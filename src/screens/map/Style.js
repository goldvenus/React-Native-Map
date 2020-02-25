import { StyleSheet } from 'react-native';
import Fonts from '../../assets/Fonts';

const style = StyleSheet.create({

    tabelView: {
        top: 24,
        alignSelf: 'center',

        backgroundColor: 'white',
        borderTopWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderColor: 'white',
        borderWidth: 2,
        margin: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,

    },

    search: {
        textAlign: 'center',
        padding: 2,
        backgroundColor: 'transparent',
        width: '75%',
        margin: 3,
        textAlignVertical: 'center'
    },

    // itemText: {
    //     fontSize: 12,
    //     padding:5,textAlign:'left',marginLeft:8,backgroundColor:'transparent',width:'82%'
    // },

    itemText:
    {
        fontSize: 12, paddingLeft: 10,
        textAlign: 'left', backgroundColor: 'transparent', width: '100%',
    },

    itemView: {
        backgroundColor: 'transparent', width: '80%', height: 30, justifyContent: 'center'
    },

    calloutText: {
        width: '100%',
        height: "60%",
        backgroundColor: 'red',
    },

    customView: {
        width: '100%',
        height: "60%",
        backgroundColor: 'red',
    },

    listtextnew: {
        marginRight: 15,
        fontSize: 14,
        textAlign: 'left',
        padding: 2
    },

    arrowimgview: {
        flexDirection: 'row', bottom: 0, width: '97%', justifyContent: 'center', alignItems: 'center', margin: 2,
    },
    listtextnew: {
        width: '100%',
        fontSize: 14,
        textAlign: 'left',
        padding: 2,
        fontFamily: Fonts.APP_REGULAR_FONT,

    },
    iconStyle: { width: '30%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    listtextnew1: {
        width: '100%',
        fontSize: 14,
        textAlign: 'left',
        padding: 5,
        fontFamily: Fonts.APP_REGULAR_FONT,


    },

    listtext: {
        width: '88%',
        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 14,
        fontWeight: 'bold'
        ,


    },
    locationName: {

        fontFamily: Fonts.APP_BOLD_FONT,
        fontSize: 14,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        marginTop: 2,

    },

    listimg: {
        position: 'absolute',
        right: 0,
        backgroundColor: 'red'
        ,

    },
    renderflatView: {
        flex: 1,
        marginTop: 10,
        width: '95%',
        margin: 5,
        // backgroundColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 5,
        // shadowColor: 'white',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 5,
        padding: 5
    },
    renderflatView2: {

        alignSelf: 'center',
        width: '95%',
        margin: 10,
        height: '100%',

        // borderWidth: 1,
        // borderRadius: 5,
        shadowColor: '#d3d3d3',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center'

    },
    rowViewContainer: {
        fontSize: 17,
        padding: 10
    },

    TextInputStyleClass: {

        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF"

    },


    autocompleteContainer: {
        flex: 1,
        marginLeft: 5, marginRight: 5,
        position: 'absolute',
        top: 0,
        zIndex: 1

    },

    bottamView: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1

    },
    reportEventButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        alignItems: 'center',
        height: '15%',
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 8,
        borderColor: '#808080',
        borderWidth: 2,
        bottom: 0, position: 'absolute',
    },
    eventsfeedsub: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        alignItems: 'center',
        height: '80%',
        backgroundColor: "white",
        borderRadius: 2,
        borderColor: '#808080',
        borderWidth: 2,
        margin: 5
    },

    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    showSearchOuterView:
    {
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderColor: 'white',
        borderWidth: 2,
        margin: 10,
        alignItems: 'center',
        height: 300,
    },
    curentLocContainer:
    {
        margin: 10,
        marginLeft: 25,
        marginTop: '23%',
        width: 35,
        height: 40
    },
    reportEventtextStyle:
    {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        padding: 5,
        backgroundColor: 'white'
    },
    searchView:
    {
        width: 1,
        height: 25,
        backgroundColor: "#d3d3d3",
        left: 25,
        zIndex: 1
    },

    tableinnerView:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noEventTextStyle:
    {
        color: 'black',
        textAlign: 'center',
        fontSize: 16
    },
    calloutOuterView:
    {
        width: '85%', flexGrow: 1, marginTop: '30%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: '57%',
        position: 'absolute',
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 30,
        elevation: 5,
    },
    calloutInnerView:
    {
        margin: 10,
        width: '95%',
        height: '95%',
        backgroundColor: 'transparent'
    },
    flatlistContainerView:
    {
        flexGrow: 1,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    eventFeedTextStyle:
    {
        color: 'black',
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        fontSize: 14,
        marginTop: 5
    },
    selectedAirportTextStyle:
    {
        color: 'black',
        width: '90%',
        padding: 2,
        textAlign: 'center',
        fontSize: 15,
    },
    selectedAirCodeStyle:
    {
        color: 'black',
        width: '90%',
        textAlign: 'center',
        fontSize: 16,
    },
    noEventsOuterView:
    {
        width: '90%',
        margin: 10,
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seperatorStyle:
    {
        height: .5,
        width: "100%",
        backgroundColor: "transparent"
    },
    mapOuterStyle:
    {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,    
    },






























})

export default style;

