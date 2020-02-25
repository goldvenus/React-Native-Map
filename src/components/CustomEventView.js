import React, { Component } from 'react';
import { View, Text, TouchableOpacity,StyleSheet,Image } from 'react-native';
import EndPoint from "../utils/EndPoint";


export default class CustomEventView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
    }

    render() {
        

        return (
            <TouchableOpacity underlayColor='red' onPress={() => this.props.onCurrentIndexChange(this.props.currentIndex)}  
                style={this.props.selectedIndex != this.props.currentIndex ? style.GridViewBlockStyle : style.selectedGridViewBlockStyle}>
                <Image
                    resizeMode='contain'
                    style={{ width: '100%', height: '60%' }}
                    source={this.props.source}
                />
                <View style={style.viewCategory}>
                    <Text style={style.GridViewInsideTextItemStyle}> {this.props.itemName} </Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const style=StyleSheet.create({
    GridViewBlockStyle: {
       
 
         justifyContent: 'center',
         flex: 1,
         alignItems: 'center',
         height: 120,
         margin: 5,
        
 
     },
     selectedGridViewBlockStyle: {
       backgroundColor:'red',
 
         justifyContent: 'center',
         flex: 1,
         alignItems: 'center',
         height: 120,
         margin: 5,
 
     },
     viewCategory: {
        width: '100%',
        height: '20%'
    },


    GridViewInsideTextItemStyle: {

        color: 'black',
        padding: 5,
        fontSize: 12,
        justifyContent: 'center',
        textAlign: 'center'

    },

 
})