import React, { Component } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import LoginTextInput from '../../components/LoginTextInput';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import style from './Style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import strings from '../../localization/strings';
import { checkIfEmpty } from './Controller';
import Loader from '../../components/Loader';
import { forgotPassword } from './Action';
import { AsyncStorage } from 'react-native';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';


const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[style.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class Forgot extends Component {

    // hide header
    static navigationOptions = {
        header: null,


    };
    constructor(props) {
        super(props);
        this.state = {
            userInfo: false,
            userName: "",
            loading: false,
            token:"",
        };
    }

 

    render() {
        const { loading } = this.state;

        return (
            <View>
                {loading && <Loader />}
                <MyStatusBar backgroundColor="grey" barStyle="light-content" />
                {this.renderForgotView()}
            </View>
        );
    }


    renderForgotView() {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ backgroundColor: 'white' }}>
                    <Image source={images.splashlogo} resizeMode="contain" style={style.logostyle}></Image >
                    <View style={style.textView}>

                        <Text style={style.welcometextstyle}>JumpSeat</Text>

                    </View>


                    <View style={style.signin}>
                        <Text style={style.signintextstyle}>Forgot password</Text>

                        {this.state.userInfo ? <Text style={style.error}>{strings.fieldRequire}</Text>
                            : <Text style={style.error}>{strings.emptyview}</Text>
                        }

                        <LoginTextInput
                            placeholder='Email Address...'
                            keyboardType={"email-address"}
                            onChangeText={(text) => this.setState({ userName: text })}
                            placeholderTextColor='#d3d3d3' />

                        <View style={style.nextbtn}>
                          
                        <CustomButton onPress={() => this.checkForgotInputs()} buttonText='Next' height="8%" width="50%" />


                        </View>

                    </View>

                </View>

            </KeyboardAwareScrollView>
        )
    }



    // Forgot password Api
    checkForgotInputs() {
        const { userName } = this.state;

        if (checkIfEmpty(this.state.userName)) {
            this.setState({ userInfo: true });
        }
        else {
            this.setState({ userInfo: false });
            this.setState({ loading: true });

            var forgotcomponent = { email: userName, resetSectionType: "2" };

            forgotPassword(forgotcomponent, (response, error) => {
                console.log("res", response);
                if (error) {
                    alert('Unable to forgot,Please try again after sometime')

                }
                this.setState({ loading: false });
                if (response != null) {
                    if (response.status === 1) {
                        console.log("mytoken", response.data.userToken)
                        this.setState({token:response.data.userToken})
                        AsyncStorage.setItem(AsyncStorageKyes.USER_VALYE, response.data.userToken)
                        this.forgotAlert(response);
                    }
                    else {
                        alert(response.message);
                    }

                }
                else {
                    this.setState({ loading: false });
                    Alert('', 'Unable to forgot, Please try after sometime');

                }
            }
            )
        }
    }


    // show alert after Api  sucess response
    forgotAlert(response) {
        Alert.alert(
            "Alert",
            "Mail send sucessfully",
            [{ text: "OK", onPress: () => this.movetoLogin() }],
            { cancelable: false }
        );
    }


    movetoLogin = () => {
        this.props.navigation.replace('ConfirmForgot',{token:this.state.token})
    }
}