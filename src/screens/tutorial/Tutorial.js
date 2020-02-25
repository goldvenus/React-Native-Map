import React, { Component } from 'react';
import { View, ImageBackground, StatusBar, Dimensions } from 'react-native';
import style from './Style';
import Swiper from 'react-native-swiper';
import Tutorial1 from '../../components/Tutorial1';

import SplashScreen from 'react-native-splash-screen';
import images from '../../assets/images';
import Tutorial2 from '../../components/Tutorial2';
import Tutorial3 from '../../components/Tutorial3';
import Tutorial4 from '../../components/Tutorial4';
import Tutorial5 from '../../components/Tutorial5';
import Tutorial6 from '../../components/Tutorial6';
import Tutorial7 from '../../components/Tutorial7';

export default class Tutorial extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            currIndex: 0,
            startswiper: false,
            images: [
                images.tut1,
                images.tut2,
                images.tut3,
                images.tut4,
                images.tut5,
                images.tut6,
                images.tut7,
            ]
        };
    }

    screenChange = index => {
        this.setState({ currIndex: index });
    };

    componentWillMount() {
        this.setState({ startswiper: true });
    }

    componentDidMount() {
        SplashScreen.hide();

    }

    _renderSwiper() {
        return (<Swiper
            containerStyle={style.wrapper}
            loop={false}
            key={this.state.currIndex}
            index={this.state.currIndex}
            onIndexChanged={this.screenChange}
            dot={<View style={{ backgroundColor: 'transparent', width: 0, height: 0, borderRadius: 0, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
            dotColor='transparent'
            activeDotColor='transparent'
            removeClippedSubviews={false}
            scrollEnabled={true}>
            <Tutorial1
                onPressNext={() => this.setState({ currIndex: 1 })}
                onPressSkip={() => this.props.navigation.replace('map')} />
            <Tutorial2
                onPressNext={() => this.setState({ currIndex: 2 })}
                onPressSkip={() => this.props.navigation.replace('map')} />
            <Tutorial3
                onPressNext={() => this.setState({ currIndex: 3 })}
                onPressSkip={() => this.props.navigation.replace('map')} />
            <Tutorial4
                onPressNext={() => this.setState({ currIndex: 4 })}
                onPressSkip={() => this.props.navigation.replace('map')} />
            <Tutorial5
                onPressNext={() => this.setState({ currIndex: 5 })}
                onPressSkip={() => this.props.navigation.replace('map')} />
            <Tutorial7
                onPressNext={() => this.props.navigation.replace('map')} />
        </Swiper>);
    }

    render() {
        return (
            <View style={style.container}>
                {
                    this.state.startswiper === true ?
                        this._renderSwiper()
                        : null
                }
            </View>
        );
    }
}