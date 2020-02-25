import React, { Component } from "react";
import {
  TouchableOpacity, Text, View, Image
} from "react-native";
import styles from './style';
import images from "../../assets/images";

export default class CustomHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const {
      title,
      showback,
      _goBack,
      showBackIcon,
      backButtonClick,
    } = this.props;
    return (
      <View style={[styles.header, { justifyContent: showBackIcon ? 'space-between' : showback ? 'space-between' : 'center' }]}>
        {showBackIcon
          && (
            <TouchableOpacity
              style={styles.backIconContainer}
              onPress={() =>  {_goBack()}}
            >
              <Image resizeMode='contain' source={images.back}></Image>
            </TouchableOpacity>
          )
        }
        {showback
        &&(
          <TouchableOpacity
          style={styles.backIconContainer}
          onPress={() =>  this.props.navigation.navigate('map') }
        >
          <Image resizeMode='contain' source={images.back}></Image>
        </TouchableOpacity>
        )



        }
        <View style={styles.titleContainer}>
          <Text
            style={styles.titleTextStyle}
          >
            {title}
          </Text>
        </View>

      </View>
    );
  }
}
