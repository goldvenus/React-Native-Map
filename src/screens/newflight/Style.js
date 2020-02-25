import { StyleSheet } from 'react-native';

const style = StyleSheet.create({


    container: {
        flex: 1,
        alignItems: 'center'
    },
DepartureDateView:{flexDirection:'row',width:'80%',margin:10},

DepartureDateText:{fontSize:16,width:'50%',textAlign:'left',padding:3},
dateTimeText:{fontSize:14,width:'50%',textAlign:'center',padding:3},


    cardShape: {
        marginTop: '4%',
        marginLeft: '5%',
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

    reportInvition: {

        width: '90%',
        textAlign: 'center',
        fontSize: 16,
        padding: 5,
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


    bottomView: {
        alignItems: 'center',
        width: '100%',
        height: '10%',
        position: 'absolute',
        bottom: '10%',
        justifyContent: 'center',
    },

    bottamBtn: {
        justifyContent: 'center',
        width: '45%',
        alignItems: 'center',
        height: '80%',
        borderRadius: 10,
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
        backgroundColor: '#d3d3d3',
        borderWidth: 1,
        marginRight: 5,
        borderRadius: 5,
        shadowColor: '#d3d3d3',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },


})

export default style;

