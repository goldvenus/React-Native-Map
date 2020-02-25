import React, { Component } from "react";
import { Image, View, Text, FlatList, TouchableOpacity } from 'react-native'
import style from "./Style";
import CustomHeaderComponent from "../../components/CustomHeader/CustomHeaderComponent";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageKyes from "../../utils/AsyncStorageKyes";
import { getAirportsEvents } from "./Action";
import EndPoint from "../../utils/EndPoint";
import Loader from '../../components/Loader';
import MapView from 'react-native-maps';

export default class Reportevent extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            serverData: [],
            errormsg: '',
            loading: false,
            selectedIndex: -1,
            selectedData: [],
            isSelected: false,
            checkselected: '',
            latitude: 0,
            longitude: 0,
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('CURRENTLAT').then((value) =>
            this.setState({ latitude: value }, () => this.getDatafromAPI())
        ).done();
    }

    goTonext(itemNumber) {
        if (itemNumber.length > 0) {
            this.props.navigation.replace('reporteventdetail', { getSelectedData: itemNumber, locationname: this.props.navigation.state.params.airportDetail.airportCode, airportId: this.props.navigation.state.params.airportDetail.airportId })
        }
        else {
            alert("Please Select Atleast 1 Event.")
        }
    }

    // Tpo get all Airport Events
    getDatafromAPI = () => {
        AsyncStorage.getItem('CURRENTLONG').then((value) =>
            this.setState({ longitude: value }))
        this.setState({ loading: true });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportsEvents({ token: value }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    responseJson = response.data.eventCategories.map(item => {
                        item.isSelect = false;
                        item.selectedClass = style.GridViewBlockStyle;
                        return item;
                    });
                    this.setState({ loading: false, serverData: responseJson });
                }
                else {
                    alert("error " + JSON.stringify(response.message))
                    this.setState({ loading: false });
                }
            }
            else {
                this.setState({ loading: false });
                alert('Unable to fetch Airports');
            }
        }
        ))
    };

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    selectItem = (data) => {
        data.item.isSelect = !data.item.isSelect;
        data.item.selectedClass = data.item.isSelect ? style.selectedGridViewBlockStyle : style.GridViewBlockStyle;
        const index = this.state.serverData.findIndex(item => data.item.id === item.id);
        this.state.serverData[index] = data.item;
        this.setState({ serverData: this.state.serverData }, () => this.goTonext(this.state.serverData.filter(item => item.isSelect)));
    };

    renderView(data) {
        return (
            <TouchableOpacity underlayColor='grey' onPress={() => this.selectItem(data)}
                style={style.GridViewBlockStyle}>
                <Image
                    resizeMode='contain'
                    style={{ width: 80, height: 80 }}
                    source={{ uri: EndPoint.IMAGESURl + data.item.image }}
                />
                <Text style={style.GridViewInsideTextItemStyle}> {data.item.name} </Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state;
        const itemNumber = this.state.serverData.filter(item => item.isSelect);
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
                {loading && <Loader />}
                <View style={style.cardView}>
                    <CustomHeaderComponent _goBack={() => this._goBack()} {...this.props} title="" showBackIcon />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={style.location}>Location :</Text>
                        <Text style={style.kden}>{navigation.state.params.airportDetail.airportCode}</Text>
                    </View>
                    <Text style={style.typeevent}>What Type Of Event ?</Text>
                    {this.state.serverData.length > 0 ?
                        <View style={{ alignSelf: 'center', flex: 1, margin: 10, height: "65%", width: '90%', }}>
                            <FlatList
                                data={this.state.serverData}
                                extraData={this.state}
                                keyExtractor={data => data.id.toString()}
                                renderItem={(data) => this.renderView(data)}
                                numColumns={3} />
                        </View>
                        :
                        <View style={style.errorView}>
                            <Text style={style.errortext}>No Events</Text>
                        </View>}
                </View>
            </View>
        );
    }
}