import React from 'react';
import {Dimensions,Platform} from 'react-native';


export function isiPhoneX () {
    if (Platform.OS=="ios" && Dimensions.get('window').height>=812) {
      return true
    }
    return false;
  };
  
  export function isiPhone () {
    if (Platform.OS=="ios") {
      return true
    }
    return false;
  };
  