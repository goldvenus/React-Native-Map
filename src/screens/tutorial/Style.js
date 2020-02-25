import { StyleSheet, Platform, StatusBar } from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;



const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },

    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    wrapper: {

        flex: 1,
        justifyContent: 'center',

    },

})

export default style;