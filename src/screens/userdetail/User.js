import React, { Component } from 'react';
import { View, ImageBackground, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import images from '../../assets/images';
import style from './Style';
import { userdetail } from './Action';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInputDisableStatus: false,
            focus: false,
            loading: false,
            userdetails: {},
        };
    }

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    _editAction = () => {
        this.setState({ textInputDisableStatus: true, focus: true })
        this.refs["myInput"].focus()
    }

    componentDidMount() {
        this.getUserDetails();
    }

    //  Get UserDetails from API
    getUserDetails() {
        this.setState({ loading: true });
        var detailcontent = { token: AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN) };
        userdetail(detailcontent, (response, error) => {
            console.log("res", response);
            if (error) {
                alert('Unable to fetch user detail, Please try again after sometime')
            }
            this.setState({ loading: false });
            if (response != null) {
                if (response.status === 1) {
                    this.setState({ userdetails: response.data })
                }
                else {
                    alert(response.message);
                }
            }
            else {
                this.setState({ loading: false });
                Alert('', 'Unable to fetch user detail, Please try after sometime');
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#0D2543' }}>
                <View style={style.header}>
                    <Text style={style.headerText}>User Details</Text>
                    <TouchableOpacity
                        style={style.headerRightImage}
                        onPress={() => this._editAction()}>
                        <Image source={images.edit} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.headerleftImage}
                        onPress={() => this._goBack()}>
                        <Image source={images.back} />
                    </TouchableOpacity>
                </View>
                <ImageBackground
                    style={style.container}
                    source={images.contactusbg}>
                    <View style={style.viewStyle}>
                        <TextInput blurOnSubmit={false} ref="myInput"
                            autoFocus={this.state.focus} editable={this.state.textInputDisableStatus} placeholder="First Name" returnKeyType={"next"} onSubmitEditing={() => { this.secondTextInput.focus(); }} style={style.inputStyle}>
                        </TextInput>
                        <TextInput editable={this.state.textInputDisableStatus} blurOnSubmit={true} placeholder="Last Name" ref={(input) => { this.secondTextInput = input; }} onSubmitEditing={() => { this.thirdTextInput.focus(); }} style={style.inputStyle} multiline={true} returnKeyType={"next"} >
                        </TextInput>
                        <TextInput editable={this.state.textInputDisableStatus} blurOnSubmit={true} placeholder="User Name" ref={(input) => { this.thirdTextInput = input; }} onSubmitEditing={() => { this.forthTextInput.focus(); }} style={style.inputStyle} multiline={true} returnKeyType={"next"} >
                        </TextInput>
                        <TextInput editable={this.state.textInputDisableStatus} blurOnSubmit={true} placeholder="Email Address" ref={(input) => { this.forthTextInput = input; }} style={style.inputStyle} onSubmitEditing={() => { this.fitthTextInput.focus(); }} multiline={true} returnKeyType={"next"} >
                        </TextInput>
                        <TextInput editable={this.state.textInputDisableStatus} blurOnSubmit={true} placeholder="Phone Number" ref={(input) => { this.fitthTextInput = input; }} style={style.inputStyle} multiline={true} returnKeyType={"done"} >
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