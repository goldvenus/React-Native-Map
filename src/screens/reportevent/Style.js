import { StyleSheet } from 'react-native';
import Fonts from '../../assets/Fonts';



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height:'100%',width:'100%'
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
        margin: 5,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8, shadowRadius: 2,
        elevation: 5,
       

        
    },
    location: {
        width: '50%',
        textAlign: 'right',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
      
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
        textAlign: 'left',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
       
    },

    typeevent: {
        width: '90%',
        textAlign: 'center',
        fontSize: 18,
        padding: 5,
        fontWeight: 'bold',
        margin: 10
    },

    errorView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40%',
    },

    GridViewBlockStyle: {
        justifyContent: 'center',
       width:'30%',
        alignItems: 'center',
        margin: 5,

    },
    selectedGridViewBlockStyle: {
        backgroundColor: '#d3d3d3',

        justifyContent: 'center',
    
        alignItems: 'center',
        height: '95%',
        margin: 5,
        width:'95%'
    },

    viewCategory: {
        width: '100%',
        height: 40,
       
    },


    GridViewInsideTextItemStyle: {
      
        flexWrap: 'wrap',
        color: 'black',
        padding: 2,
        fontSize: 11,
        justifyContent: 'center',
        textAlign: 'center'

    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },




    errortext: {
        alignSelf: 'center',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    }

})

export default style;
