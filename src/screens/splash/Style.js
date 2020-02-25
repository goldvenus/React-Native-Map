import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import Fonts from '../../assets/Fonts';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;



const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  logoStyle: {



  },
  welcometextstyle: {
    fontFamily: Fonts.APP_BOLD_FONT,
    fontSize: 20,
    marginTop: '60%',
    textAlign: 'center'
  },
})

export default style;