//import liraries
import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import images from '../../assets/images';
import AsyncStorage from '@react-native-community/async-storage';
import Style from '../splash/Style';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';
import SplashScreen from 'react-native-splash-screen';

// create a component
class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN);
      if (value !== null) {
        // Move to home screen
        SplashScreen.hide();
      this.props.navigation.replace('map')
      }
      else {
        // Move to login screen
        SplashScreen.hide();
        this.props.navigation.replace('loginsignup')
      }
    }
    catch (error) {
      // Move to login screen
      SplashScreen.hide();
      this.props.navigation.replace('loginsignup')
    }
  };

  render() {
    return (
      <View style={Style.container}>
        <Image resizeMode='contain' source={images.launch}></Image>
      </View>
    );
  }
}

export default Splash;