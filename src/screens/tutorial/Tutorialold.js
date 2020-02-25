import React, { Component } from 'react';
import { View, ImageBackground, StatusBar, Dimensions } from 'react-native';
import style from './Style';
import Swiper from 'react-native-swiper';
import Tutorial1 from '../../components/Tutorial1';

import images from '../../assets/images';
import SplashScreen from 'react-native-splash-screen';



const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[style.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);


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
                images.tut1,
                images.tut1,
                images.tut1,
                images.tut1,
                images.tut1,
                images.tut1,
            ]
        };
    }


    screenChange = index => {
        this.setState({ currIndex: index });
    };



    componentWillMount() {
        setTimeout(() => { this.setState({ startswiper: true }) }, 50);
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
            // style={style.wrapper}
            scrollEnabled={true}>
            {this.state.images.map((image) => {
                return (<Tutorial1
                    images={this.state.images[this.state.currIndex]}
                    onPressNext={() => this.setState({ currIndex: parseInt(this.state.currIndex) + 1 })}
                    onPressSkip={() => this.props.navigation.replace('reportevent')}
                    onlastPressNext={() => this.props.navigation.replace('reportevent')}
                    currIndex={this.state.currIndex} />
                )
            })}




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
// import React, { Component } from 'react';
// import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
// import Colors from '../assets/Colors';
// import images from '../assets/images';
// import { sizeNormalization } from '../utils/sizeNormalization';

// const window = Dimensions.get('window');

// const MyStatusBar = ({ backgroundColor, ...props }) => (
//     <View style={[style.statusBar, { backgroundColor }]}>
//         <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//     </View>
// );

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

// const Tutorial1 = props => {


//     return (
//         <View style={style.container}>
//             <MyStatusBar backgroundColor="grey" barStyle="light-content" />

//             <ImageBackground style={style.canvas}
//                 resizeMode='stretch'
//                 resizeMethod='resize'

//                 source={props.images}>

//                 {props.currIndex < 6 ? <View style={style.bottomView} >


//                     <TouchableOpacity style={style.skiptouch}
//                         onPress={() => props.onPressSkip()}>

//                         <Text style={style.textStyle}>Skip</Text>

//                     </TouchableOpacity>

//                     <TouchableOpacity style={style.nexttouch} onPress={() => props.onPressNext()}>


//                         <Text style={style.textNext}>Next</Text>
//                     </TouchableOpacity>

//                 </View> : <View style={style.centernext}>


//                         <TouchableOpacity
//                             onPress={() => props.onlastPressNext()}>


//                             <Text style={style.textNextlast}>Next</Text>
//                         </TouchableOpacity>
//                     </View>
//                 }

















//             </ImageBackground>
//         </View>
//     );

// }


// export default Tutorial1;


// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//         backgroundColor: 'transparent'



//     },
//     canvas: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },

//     centernext: {
//         position: 'absolute',
//         top: 0, left: 0,
//         right: 0, bottom: 0,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },

//     skiptouch: {
//         position: 'absolute',
//         left: 0,
//         width: '30%',
//         height: 40
//     },

//     nexttouch: {
//         position: 'absolute',
//         right: 0,
//         width: '30%',
//         height: 40
//     },

//     statusBar: {
//         height: STATUSBAR_HEIGHT,
//     },

//     bottomView: {
//         flexDirection: 'row',
//         width: '100%',
//         height: 30,
//         position: 'absolute',
//         bottom: 0
//     },

//     textStyle: {
//         position: 'absolute',
//         left: 15,
//         bottom: 10,
//         padding: 5,
//         color: Colors.skip_color,
//         fontSize: sizeNormalization(20)
//     },

//     textNext: {
//         position: 'absolute',
//         right: 10,
//         bottom: 10,
//         padding: 5,
//         color: Colors.skip_color,
//         fontSize: sizeNormalization(20)
//     },
//     textNextlast: {
//         padding: 5,
//         marginTop: '50%',
//         color: Colors.skip_color,
//         fontSize: sizeNormalization(20)
//     }



// });

