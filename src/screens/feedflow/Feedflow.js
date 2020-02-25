
import React from "react";
import { Image, View, Text, TouchableOpacity, TextInput, ImageBackground, Keyboard } from 'react-native'
import images from "../../assets/images";
import CustomHeaderComponent from "../../components/CustomHeader/CustomHeaderComponent";
import style from "./Style";


export default class Feedflow extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        inputRef = React.createRef();

        this.state = {
            isSelected: 'false'
        }
    }

    checkIfSelected() {
        this.setState({ isSelected: !this.state.isSelected })

    }
    
    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
      }
    

    render() {
        return (
            <View style={style.container}>
                <CustomHeaderComponent _goBack={()=>this._goBack()} {...this.props} title="" showBackIcon />
                <ImageBackground style={style.canvas} resizeMode='stretch' source={images.mapbackground} >
                    <View style={style.card}>
                        <View style={style.manageView}>
                            <Text style={style.managetext}>Manage Favourites</Text>
                            <Text style={style.favouritetext}>Add Favourite :</Text>
                            <View style={style.tabelView}>
                                <TextInput
                                    ref={this.inputRef}
                                    placeholder="Search to add favourites....." style={style.search}></TextInput>
                                <TouchableOpacity onPress={() => alert('dfd')} style={{ width: '10%' }}><Image
                                    resizeMode='contain'
                                    source={images.search}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={style.tabelmainview}>
                            <View style={style.tabelsubView}>
                                <Text style={style.tabletext}>ICAO </Text>
                            </View>
                            <View style={{ backgroundColor: "transparent", width: '70%' }}>
                                <Text style={style.tabletext}>
                                    Airport/Airspace Name
                           </Text>
                            </View>
                        </View>


                        <View style={style.currentfav}>
                            <Text style={{ fontSize: 18,padding: 4}}>Current Favourites :</Text>
                            <View style={style.icadmainview}>
                                <View style={style.icadsubview}>
                                    <Text style={style.icadstext}> </Text>
                                </View>
                                <View style={{ backgroundColor: "transparent", width: '70%' }}>
                                    <Text style={style.icadstext}>Airport/Airspace Name</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={{ width: 20, height: 20, marginLeft: 10, margin: 4 }}
                                onPress={() => this.checkIfSelected()}>
                                <Image resizeMode='contain' source={this.state.isSelected ? images.uncheck : images.check}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={style.eventsfeedMainview}>
                            <TouchableOpacity style={style.eventesfeedSubview}>
                                <Text style={{ textAlign: 'center',fontSize: 14,padding: 5}}>Events Feed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}