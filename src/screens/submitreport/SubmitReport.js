import React from "react";
import { Image, View, Text,TouchableOpacity,} from 'react-native'
import style from "./Style";
import CustomHeaderComponent from "../../components/CustomHeader/CustomHeaderComponent";
import { isiPhone } from "../../utils/utils";
import EndPoint from "../../utils/EndPoint";
import MapView from 'react-native-maps';
import AsyncStorage from "@react-native-community/async-storage";

export default class ReportEventDetail extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: "",
            selectedItemName: '',
            selectedItemImage: '',
            latitude: 0,
            longitude: 0,
        }
    }

    _goBack = () => {
        const { navigation } = this.props;
        navigation.replace('map')
    }

    componentDidMount() {
        AsyncStorage.getItem('CURRENTLAT').then((value) =>
            this.setState({ latitude: value }, () =>
                AsyncStorage.getItem('CURRENTLONG').then((value) =>
                    this.setState({ longitude: value, }))
            )
        )
        var value = this.props.navigation.state.params.selectedData
        value.map((item, key) => {
            this.setState({ selectedItemId: item.id, selectedItemImage: item.image, selectedItemName: item.name })
        }
        )
    }

    renderView(item) {
        return (
            <View style={{ flex: 1, margin: 10, }}>
                <Image
                    resizeMode='contain'
                    style={{ height: '10%' }}
                    source={{ uri: EndPoint.IMAGESURl + item.image }}>
                </Image>
                <View style={{ width: '100%', height: Platform.OS === 'ios' ? '40%' : '20%' }}>
                    <Text style={style.GridViewInsideTextItemStyle}>{item.name} </Text>
                </View>
            </View>
        );
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={style.container}>
                <MapView
                    scrollEnabled={false}
                    onPress={() => this._goBack()}
                    zoomEnabled={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    showScale={true}
                    showsIndoors={true}
                    ref="map" style={style.map}
                    showsUserLocation={true}
                />
                <View style={style.card}>
                    <CustomHeaderComponent _goBack={()=>this._goBack()}  {...this.props} title="" showBackIcon />
                    <View style={style.GridViewBlockStyle} >
                        <Text style={{ textAlign: 'center', fontSize: 20, padding: isiPhone() ? 0 : 5 }}>Report Received!</Text>
                    <View style={style.locationrow}>
                        <Text style={style.location}>Location :</Text>
                        <Text style={style.kden}>{this.props.navigation.state.params.locationName}</Text>
                    </View>
                        <View style={style.flatView}>
                            <View style={{ flex: 1,  height: Platform.OS === 'ios' ? '25%' : '18%', width: '50%', alignSelf: 'center',}}>
                                <Image
                                    resizeMode='contain'
                                    style={{ height: '70%', margin: 3 }}
                                    source={{ uri: EndPoint.IMAGESURl + this.state.selectedItemImage }}>
                                </Image>
                                <View style={{ width: '100%', height: '20%' }}>
                                    <Text style={style.GridViewInsideTextItemStyle}>{this.state.selectedItemName} </Text>
                                </View>
                            </View>
                                <Text style={style.desTextStyle}>{this.props.navigation.state.params.description}</Text>
                                <Text style={style.datetetxstyle}>{this.props.navigation.state.params.date ? 'End Date - '+this.props.navigation.state.params.date : ''}</Text>
                        </View>
                    </View>
                    <View style={style.bottambtnView}>
                        <TouchableOpacity onPress={() => this.props.navigation.replace('reporteventsearch')} style={style.btnView}>
                            <Text style={style.submitAnotherText}>Submit Another</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.replace('map')} style={style.btnView}>
                            <Text style={style.backToMapText}>Back To Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
