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
    cardShape: {
        marginTop: '2%',
        margin: 5,
        backgroundColor: 'white',
        width: '90%',
        height: '80%',
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
    adlocation: {
        backgroundColor: 'white',
        margin: 5,
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    adlocationsub: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '90%'
    },
    adtext: {
        fontWeight: "bold",
        backgroundColor: 'white'
    },
    kden: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808080',
        borderWidth: 1,
        width: '65%',
        height: '60%',
        marginRight: 10
    },

    kdebview: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808080',
        borderWidth: 1,
        width: '65%',
        height: '60%'
    },

    aaview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '90%'
    },


    report: {
        width: '90%',
        textAlign: 'center',
        fontSize: 22,
        padding: 5,
        fontWeight: 'bold',
        margin: 10
    },

    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    GridViewInsideTextItemStyle: {

        color: 'black',
        padding: 5,
        fontSize: 12,
        justifyContent: 'center',
        textAlign: 'center'

    },

    subcontent: {

        color: 'black',
        padding: 5,
        fontSize: 12,
        textAlign: 'center'


    },
    addbottomView: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 3

    },
    bottomView: {
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        bottom: 0,
        position: 'absolute',
        marginBottom: 10,
        justifyContent: 'center',

    },
    addBtn: {
        justifyContent: 'center',
        width: '45%',
        alignItems: 'center',
        height: '100%',
        borderRadius: 10,
        borderColor: '#808080',
        borderWidth: 2,
        margin: 10
    },
    bottamBtn: {
        justifyContent: 'center',
        width: '30%',
        alignItems: 'center',
        height: '80%',
        borderRadius: 20,
        borderColor: '#808080',
        borderWidth: 2,
        margin: 10
    },

    bottamtext: {
        textAlign: 'center',
        fontSize: 14,
        padding: 5,
    },
    listStyle: {
        marginTop: 10,
        width: '95%',
        margin: 3,


        marginRight: 5,


    },
    radiobtn: {

        marginLeft: 5,
        justifyContent: "center",
        alignItems: 'center'


    },
    plannedDataOuterView:
    {
        height: '45%',
        width: '80%',
        margin: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 2
    },
    noPlanTextStyle:
    {
        textAlign: 'left',
        fontWeight: 'bold'
    },
    flightInnerView:
    {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        borderWidth: 1,
        borderColor: 'black'
    },
    flightOuterView:
    {
        height: '100%'
    },

    flightTextStyle:
    {
        width: '50%',
        fontWeight: 'bold',
        paddingLeft: 8,
        padding: 5
    },
    dateTextStyle:
    {
        width: '50%',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 5
    },
    listOuterView:
    {
        flexDirection: 'row',
        width: '100%'
    },
    listInnerView:
    {
        width: '50%',
        flexDirection: 'row',
    },
    airportCodeTextStyle:
    {
        fontWeight: 'bold',
        width: '80%',
        textAlign: 'left',
        paddingLeft: 5
    },
    dateTextStyle:
    {
        textAlign: 'right',
        paddingRight: 5,
        width: '50%',
    },


















})

export default style;

