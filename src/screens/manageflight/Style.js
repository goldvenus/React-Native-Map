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
    card: {
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
    },
    editFlight: {
        width: '90%',
        textAlign: 'center',
        fontSize: 22,
        padding: 5,
        fontWeight: 'bold',
        margin: 10
    },
    locationrow: {
        width: '90%',
        marginBottom: "10%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    depature: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
    },
    locationView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        margin: 5
    },
    autocompleteContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        flexDirection: 'row',
        left: 0,
        right: 0,
    },
    inputContainerStyle: {
        borderRadius: 4,
        borderColor: '#cccccc',
        borderWidth: 1,
        marginBottom: 18,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 12,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
    },
    locationtext: {
        fontWeight: "bold",
        width: '30%'
    },
    radiobtn: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 5,
        top: 5
    },
    textstyle: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        width: '100%'
    },
    drodowntext: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,

    },
    dropItemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: 'yellow',
        borderColor: '#bbb',
        borderWidth: 1,
        zIndex: 5,
        flex: 1
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#808080',
        borderWidth: 2,
        width: '100%',
    },
    depaturetime: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        width: '100%',
        marginTop: 5
    },
    btnView: {
        justifyContent: 'center',
        width: '45%',
        alignItems: 'center',
        height: '40%',
        borderRadius: 20,
        borderColor: '#808080',
        borderWidth: 2, margin: 5
    },
    bottambtnView: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    location: {
        width: '40%',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        marginLeft: 10
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
        justifyContent: 'center',
        marginTop: '15%',
        alignItems: 'center',
        margin: 5,
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
    searchedOuterView:
    {
        height: '40%',
        width: '90%',
        margin: 5,
    },
    searchedInnerView:
    {
        height: '40%',
        flexDirection: 'row'
    },
    addOuterView:
    {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
    },
    addAlternateTextStyle:
    {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 2
    },

    addToSelectText:
    {
        fontSize: 12,
        padding: 2
    },

    flatlistOuterView:
    {
        width: '50%'
    },
    dateOuterView:
    {
        height: '30%',
        flexDirection: 'row',
    },
    dateText:
    {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 2
    },
    datePickerOuterView:
    {
        width: '50%',
        marginTop: 20
    },
    depaText:
    {
        fontWeight: 'bold',
        fontSize: 13
    },
    editManageText:
    {
        textAlign: 'center',
        fontSize: 14,
        padding: 5
    },
})
export default style;