import React, { Component } from 'react';
import { Image, View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import images from "../../assets/images";
import style from "./Style";
import CustomHeaderComponent from "../../components/CustomHeader/CustomHeaderComponent";

export default class Newflight extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            time: ''
        };
    }
    componentDidMount() {
        let date = this.props.navigation.getParam('departureDate')
        let time = this.props.navigation.getParam('departureTime')
        this.setState({ date: date, time: time })
    }

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    render() {
        return (
            <View style={style.container}>
                <ImageBackground style={style.canvas} resizeMode='stretch' source={images.mapbackground} >
                    <CustomHeaderComponent _goBack={() => this._goBack()} {...this.props} title="" showBackIcon />
                    <View style={style.cardShape}>
                        <Text style={style.report}>Flight Saved!</Text>
                        <Image style={{ marginTop: '10%' }}
                            resizeMode='contain'
                            source={images.flighticon}>
                        </Image>
                        <View>
                            <View style={style.DepartureDateView}>
                                <Text style={style.DepartureDateText}>Departure Date </Text>
                                <Text style={style.dateTimeText}>{this.state.date}</Text>
                            </View>
                            <View style={style.DepartureDateView}>
                                <Text style={style.DepartureDateText}>Departure Time </Text>
                                <Text style={style.dateTimeText}>{this.state.time}</Text>
                            </View>
                        </View>
                        <Text numberOfLines={3} style={style.reportInvition}>
                            We'll send  you an updated  report  of all events 3HRs prior to your flight time.
                      </Text>
                        <View style={style.bottomView}>
                            <TouchableOpacity onPress={() => this.props.navigation.replace('manageFlight')} style={style.bottamBtn}>
                                <Text style={style.bottamtext}>
                                    New Flight
                        </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.replace('nextFlight')} style={style.bottamBtn}>
                                <Text style={style.bottamtext}>
                                    Manage Flights
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
