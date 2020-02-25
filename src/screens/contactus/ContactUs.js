import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, TextInput, TouchableOpacity, Text } from 'react-native';
import images from '../../assets/images';
import CustomHeaderComponent from '../../components/CustomHeader/CustomHeaderComponent';
import style from './Style';

export default class ContactUs extends Component {
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
        return (
            <View style={{ flex: 1, backgroundColor: '#0D2543' }}>
                <CustomHeaderComponent _goBack={()=>this._goBack()} {...this.props} title="Contact Us" showBackIcon />
                <ImageBackground style={style.container} source={images.contactusbg}>
                    <View style={style.viewStyle}>
                        <TextInput placeholder="Email" returnKeyType={"next"} onSubmitEditing={() => { this.secondTextInput.focus(); }} style={style.inputStyle}>
                        </TextInput>
                        <TextInput blurOnSubmit={true} placeholder="Message" ref={(input) => { this.secondTextInput = input; }} style={style.inputStyle} multiline={true} returnKeyType={"done"} >
                        </TextInput>
                    </View>
                    <TouchableOpacity style={style.submitBtnStyle}>
                        <Text style={style.textStyle}>Submit</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}