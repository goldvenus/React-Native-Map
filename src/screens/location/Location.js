import React from "react";
import { View, PermissionsAndroid, Alert, ImageBackground, Platform } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import images from "../../assets/images";
import SplashScreen from "react-native-splash-screen";

export default class Location extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: true,
        }
    }
    componentDidMount() {
        SplashScreen.hide();

    }

    // request location permission
    async requestlocationpermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({ dialogVisible: false, })
                this.props.navigation.replace('map')
            }
            else {
                this.setState({ dialogVisible: false })
                Alert.alert("Location Permission Not Granted");
                this.movetoTutorial();
            }
        } catch (err) {
            this.setState({ dialogVisible: false })
            Alert.alert(err)
        }
    }

    movetoTutorial = () => {
        this.setState({ dialogVisible: false })
        this.props.navigation.replace('map')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ImageBackground style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }} resizeMode='stretch' source={images.mapbackground} >
                    <ConfirmDialog
                        title="App Permissions"
                        message="JumpSeat only uses loaction to detect when a flight is made , and we never use this location for anything but prompting for reports post-flight. Also we have not included any 3rd party trackers in this app"
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({ dialogVisible: true })}
                        positiveButton={{
                            title: "Continue",
                            onPress: () => { Platform.OS === 'android' ? this.requestlocationpermission() : this.movetoTutorial(); }
                        }}
                        negativeButton={{
                            title: "Not Now",
                            onPress: () => { Platform.OS === 'android' ? this.movetoTutorial() : this.movetoTutorial(); }
                        }}
                    >
                    </ConfirmDialog>
                </ImageBackground>
            </View>
        );
    }
}

