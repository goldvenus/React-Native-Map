import React, { Component } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import LoginTextInput from '../../components/LoginTextInput';
import images from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import style from './Style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import strings from '../../localization/strings';
import Loader from '../../components/Loader';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[style.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class ForgotUser extends Component {
    static navigationOptions = {
        header: null, 
    }  
  constructor(props) {
    super(props);
    this.state = {
        userInfo: false,
            userName: "",
            loading: false
    };
  }

  componentDidMount() {
     alert(this.props.navigation.getParam('userPress'))
    }

  render() {
    const { loading } = this.state;
    return (
        <View>
        {loading && <Loader />}
        <MyStatusBar backgroundColor="grey" barStyle="light-content" />
        {this.renderForgotUserView()}
    </View>
    );
  }

  renderForgotUserView() {
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
                    <Text style={style.signintextstyle}>Forgot Username</Text>
                    {this.state.userInfo ? <Text style={style.error}>{strings.fieldRequire}</Text>
                        : <Text style={style.error}>{strings.emptyview}</Text>
                    }
                    <LoginTextInput
                        placeholder='Username...'
                        keyboardType={"email-address"}
                        onChangeText={(text) => this.setState({ userName: text })}
                        placeholderTextColor='#d3d3d3' />
                    <View style={style.nextbtn}>
                        <CustomButton onPress={() => this.props.navigation.navigate('login')}
                            buttonText='Next' height="8%" width="50%" />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
}