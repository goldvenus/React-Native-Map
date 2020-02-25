import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, } from 'react-native';
import CustomHeaderComponent from '../../components/CustomHeader/CustomHeaderComponent';
import style from './Style';
import { getAirportsFilterSearchList } from '../map/Action';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import MapView from 'react-native-maps';
import Autocomplete from 'react-native-autocomplete-input'

export default class ReportEventSearch extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
        this.state = {
            serverData: [],
            loading: false,
            errormsg: '',
            latitude: 0,
            longitude: 0,
            query1: '',
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('CURRENTLAT').then((value) =>
            this.setState({ latitude: value, query1: '', serverData: [] }, () =>
                AsyncStorage.getItem('CURRENTLONG').then((value) =>
                    this.setState({ longitude: value })).done()
            )
        )
    }

    moveToEventDetailScreen = (item) => {
        this.props.navigation.replace('reportevent', { airportDetail: item });
    }

    // to get list of searched content
    getDatafromAPI = (text) => {
        this.setState({ query1: text })
        var Value = text.length.toString();
        if (Value > 2) {
            this.setState({ loading: false, serverData: [] });
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportsFilterSearchList({ search: text, token: value }, (response, error) => {
                console.log("res", response);
                if (error) {
                    alert('Unable to fetch Airports, Please try again after sometime')
                }
                if (response != null) {
                    this.setState({ loading: false });
                    if (response.status === 1) {
                        this.setState({ serverData: [...this.state.serverData, ...response.data], errormsg: "" });
                    }
                    else {
                        this.setState({ loading: false, errormsg: response.message });
                    }
                }
                else {
                    this.setState({ loading: false });
                    alert('', 'Unable to fetch Airports');
                }
            }
            ))
        }
        else {
            this.setState({ serverData: [] })
        }
    }

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }
    _goBack1 = () => {
        const { navigation } = this.props;
        this.props.navigation.replace('map')
    }

    render() {
        const { loading } = this.state;
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
                <View style={style.cardView}>
                    <CustomHeaderComponent _goBack={() => this._goBack1()} {...this.props} title="" showBackIcon />
                    {loading && <Loader />}
                    <Text style={style.wheretext}> Where? </Text>
                    <Text style={style.wheretext}> Location:</Text>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        data={this.state.serverData}
                        containerStyle={style.autoCompleteContainer}
                        defaultValue={this.state.query1}
                        listStyle={style.autoCompleteList}
                        onChangeText={(text) => this.getDatafromAPI(text)}
                        placeholder="Search Airport/AirSpace"
                        renderItem={({ item }) => (
                            <ScrollView scrollEnabled={true} style={{}}>
                                <TouchableOpacity style={style.listViewStyle} onPress={() => this.moveToEventDetailScreen(item)}>
                                    <Text style={style.itemText}>
                                        {item.airport + ' (' + item.airportCode + ')'}
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )
                        }
                    />
                    <View style={style.errorView}>
                        <Text style={style.errortext}>{this.state.errormsg}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
