import { StyleSheet } from 'react-native';
import Fonts from '../../assets/Fonts';
import { isiPhone } from '../../utils/utils';

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    card: {
        marginTop: '10%',
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
    locationrow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    location: {
        width: '55%',
        textAlign: 'right',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
    },
    kden: {
        width: '45%',
        textAlign: 'left',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',



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
        alignItems: 'center',
        margin: 5,
        width: '100%',
        height: '60%'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },


    row: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },

    GridViewInsideTextItemStyle: {

        color: 'black',
        padding: 5,
        fontSize: 14,
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
        textAlign: 'center'
    },
    flatView:
    {
        height: '40%',
        width: '95%',
        margin: 10,
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
        width: '95%',
        margin: 10,
        textAlignVertical: 'top',
        borderWidth: 2,
        borderColor: '#808080',
        height: '35%'
    },
    submit: {
        justifyContent: "center", alignItems: "center",
        marginBottom: isiPhone() ? "12%" : "20%",
        width: '60%',
        height: '10%',
        borderRadius: 10,
        borderColor: '#808080',
        borderWidth: 2
    },

    btnView: {
        justifyContent: 'center',
        width: '45%',
        alignItems: 'center',
        height: '40%',
        borderRadius: 20,
        borderColor: '#808080',
        borderWidth: 2,
        margin: 10
    },

    bottambtnView: {
        width: '100%',
        height: '20%',
        bottom: 70,
        position: 'absolute',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    desTextStyle:
    {
        textAlign: 'center',
        fontSize: 14,
        padding: 5,
        width: '100%'
    },
    datetetxstyle:
    {
        textAlign: 'center',
        fontSize: 14,
        padding: 5,
        width: '100%'
    },
    submitAnotherText:
    {
        textAlign: 'center',
        fontSize: 14,
        padding: 5
    },
    backToMapText:
    {
        textAlign: 'center',
        fontSize: 14,
        padding: 5
    },
})
export default style;