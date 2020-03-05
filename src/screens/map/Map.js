import React, { Component } from 'react';
import { Platform, PermissionsAndroid, ToastAndroid, View, TextInput, Image, TouchableOpacity, ScrollView, Text, TouchableHighlight, FlatList, Dimensions, Keyboard } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import images from '../../assets/images';
import style from './Style';
import { _retrieveData } from '../../utils/AsyncStorageMethods';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';
import { getAirportsList, getAirportsFilterSearchList, addFavouriteAirports, viewFavouriteUserAirports, getAirportReports, likeDislikeFlag } from './Action';
import AsyncStorage from '@react-native-community/async-storage';
import EndPoint from '../../utils/EndPoint';
import Loader from '../../components/Loader';


const LATITUDE_DELTA = 0.10;
const LONGITUDE_DELTA = 0.10;

export default class Map extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
            locationName: '',
            text: '',
            showSearchView: false,
            loading: false,
            showCalloutView: false,
            showOpacity: true,
            markers: [],
            airportResponse: [],
            airportReportData: [],
            searchcontent: [],
            favouriteAirportData: [],
            filteredData: [],
            selectedAirport: '',
            selectedAirportCode: '',
            selectedId: '',
            selected: false,
            marginBottom: 1,
            reportsData: [],
            gotoCurrentLoc: 25.0,
            longitudeDelta: 0.0,
            latitudeDelta: 0.0,
            airportname: "",
            zoomLevel: '',
            smallAirport: [], mediumAirports: [], largeAirports: [],loadAirports:true

        }
    }

    FlatListItemSeparator = () => {
        return (
            <View style={style.seperatorStyle} />
        );
    }

    componentDidMount() {
        this.getLocation();
        this.gotoCurrentLocation();

    }

    // Method for Like dislike Flags
    likeDislikeFlag = (data, userAction) => {
        this.setState({ loading: false });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => likeDislikeFlag({ token: value, eventId: data.eventReportId, userAction: userAction, }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                if (response.status === 1) {
                    this.setState({ page: 0, }, () => this.getAirportReports(data, 1))
                }
                else {
                    this.setState({ loading: false });
                    alert("Error " + error.message)
                }
            }
            else {
                this.setState({ loading: false });
                alert('Please Try again later');
            }
        }
        ))
    }

    //To delete the Favourite Airport
    deleteFavouriteAirports = (id) => {
        if (id === "") { }
        else {
            this.setState({ loading: true, });
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => addFavouriteAirports({ token: value, airportId: '', favAirportId: id, addDeleteStatus: '2' }, (response, error) => {
                console.log("res", response);
                if (response != null) {
                    this.setState({ loading: false });
                    if (response.status === 1) {
                        this.setState({ showSearchView: false, }, () => this.getAirportSearchResult(this.state.text))
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
            }))
        }
    }

    //To set Favourite
    addFavouriteAirports = (item) => {
        this.setState({ loading: true });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => addFavouriteAirports({ token: value, airportId: item.airportId, favAirportId: '', addDeleteStatus: '1' }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    this.setState({ showSearchView: false, }, () => this.getAirportSearchResult(this.state.text))
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
    }

    // filterData

    filterData = (data) => {
        if(data){
        var markersss = [];
        for (var i = 0; i < data.length; i++) {
            var lat = data[i];
            this.setState({ airportResponse: lat })
            var getCordinates = {
                title: lat.airport,
                description: lat.city,
                id: lat.id,
                airportCode: lat.airportCode,
                havingReportsStatus: lat.havingReportsStatus,
                coordinate: {
                    latitude: Number(lat.latitude),
                    longitude: Number(lat.longitude),
                }
            }
            markersss.push(getCordinates);
        }
        this.setState({ markers: markersss,loadAirports:false }
            // ,()=>alert(JSON.stringify(this.state.markers))
            );
        }
    }
    // get Airport data
    getAirportResult(type) {
        this.setState({ loading: true, });
        const { latitude, longitude } = this.state;
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportsList({ latitude: latitude, longitude: longitude, token: value, zoomType: type }, (response, error) => {
            if (response != null) {
              console.log(JSON.stringify(response))
                if (response.status === 1) {
                    this.setState({loading:false,smallAirport:response.data.smallAirport,mediumAirports:response.data.mediumAirports,
                    largeAirports:response.data.largeAirports}
                    ,()=>
                    this.filterData(response.data.smallAirport)
                    
                    )
                    // this.setState({
                    //     loading: false, smallAirport: response.data.smallAirport,
                    //     mediumAirports: response.data.response.data.mediumAirports,
                    //     largeAirports: response.data.largeAirports
                    // }
                    // ,()=>
                    // console.log("bdjsdfjchb "+ JSON.stringify(response.data.smallAirport)))
                    //this.state.zoomLevel === 4 ? 
                    //     response.data.smallAirport : this.state.zoomLevel === 3 ? response.data.mediumAirports 
                    //     :response.data.largeAirports },()=>
                    //     this.filterData(this.state.airportReportData)
                    //     );

                    // var markers = [];
                    // for (var i = 0; i < response.data.airports.length; i++) {
                    //     var lat = response.data.airports[i];
                    //     this.setState({ airportResponse: lat })
                    //     var getCordinates = {
                    //         title: lat.airport,
                    //         description: lat.city,
                    //         id: lat.id,
                    //         airportCode: lat.airportCode,
                    //         havingReportsStatus: lat.havingReportsStatus,
                    //         coordinate: {
                    //             latitude: Number(lat.latitude),
                    //             longitude: Number(lat.longitude),
                    //         }
                    //     }
                    //     markers.push(getCordinates);
                    // }
                    // this.setState({ markers: markers });
                }
                else {
                }
            }
            else {
                this.setState({ loading: false });
                Alert('Unable to fetch detail, Please try after sometime');
            }
        }))
    }

    // Method to get Nearest Airports
    getAirportResultAround(type, latitudearound, longitudearound) {
        this.setState({ loading: true });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportsList({ latitude: latitudearound, longitude: longitudearound, token: value, zoomType: type }, (response, error) => {
            console.log("resp", response);
            if (response != null) {
                if (response.status === 1) {
                    this.setState({ loading: false, airportReportData: response.data.airports });
                    var markers = [];
                    for (var i = 0; i < response.data.airports.length; i++) {
                        var lat = response.data.airports[i];
                        this.setState({ airportResponse: lat })
                        var getCordinates = {
                            title: lat.airport,
                            description: lat.city,
                            id: lat.id,
                            airportCode: lat.airportCode,
                            havingReportsStatus: lat.havingReportsStatus,
                            coordinate: {
                                latitude: Number(lat.latitude),
                                longitude: Number(lat.longitude),
                            }
                        }
                        markers.push(getCordinates);
                    }
                    this.setState({ markers: markers });
                }
                else { }
            }
            else {
                this.setState({ loading: false });
                Alert('Unable to fetch detail, Please try after sometime');
            }
        }))
    }

    // Method to check search content
    checkText = () => {
        text = this.state.text
        var Value = text.length.toString();
        if (Value < 2) {
            this.setState({ searchcontent: [], showSearchView: false })
        }
    }

    // get Airport Searches data
    getAirportSearchResult(text) {
        this.setState({ text: text, showSearchView: false })
        var Value = text.length.toString();
        if (Value > 2) {
            this.setState({ loading: false });
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportsFilterSearchList({ search: text, token: value }, (response, error) => {
                console.log("res", response);
                if (error) {
                    alert('Unable to fetch Airports, Please try again after sometime')
                }
                if (response != null) {
                    if (response.status === 1) {
                        this.setState({ showSearchView: true, searchcontent: response.data, })
                    }
                    else {
                    }
                }
                else {
                    this.setState({ loading: false });
                    Alert('', 'Unable to fetch user detail, Please try after sometime');
                }
            }))
        }
        else if (this.state.text === '') {
            this.setState({ showSearchView: false, searchcontent: [], })
        }
        else {
            this.setState({ showSearchView: false, searchcontent: [] })
        }
    }

    //get Airports reports
    getAirportReports(data, status) {
        this.setState({ reportsData: [] });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportReports({ token: value, pageNumber: 1, airportId: this.state.selected ? this.state.selectedId : data.id }, (response, error) => {
            console.log("res", response);
            if (error) {
                alert('Unable to fetch Airports, Please try again after sometime')
            }
            if (response != null) {
                if (response.status === 1) {
                    if (status === 0) {
                        if (response.data != null) {
                            for (var i = 0; i < response.data.airportReports.length; i++) {
                                var item = response.data.airportReports[i];
                                const moment = require('moment');
                                const timestamp1 = item.addedOnTimeStamp;
                                var formatted = moment.unix(timestamp1).format("DD MMM YYYY");
                                var item2 = i > 0 ? response.data.airportReports[i - 1] : null;
                                const timestamp2 = i > 0 ? item2.addedOnTimeStamp : null;
                                var formatted2 = i > 0 ? moment.unix(timestamp2).format("DD MMM YYYY") : null;
                                var check = i > 0 && formatted === formatted2 ? true : false
                                var getData = {
                                    data: item,
                                    sameDate: check,
                                }
                                this.state.reportsData.push(getData)
                            }
                            this.setState({
                                airportname: data.airport, selectedAirport: data.title, selectedAirportCode: data.airportCode, selectedId: data.id,
                                favouriteAirportData: this.state.reportsData, showCalloutView: !this.state.showCalloutView, selected: false
                            }, () => { })
                        }
                        else {
                            this.setState({ selectedId: data.id, selectedAirport: data.title, selectedAirportCode: data.airportCode, selected: false, favouriteAirportData: null, showCalloutView: true })
                        }
                    }
                    else {
                        if (response.data != null) {
                            for (var i = 0; i < response.data.airportReports.length; i++) {
                                var item = response.data.airportReports[i];
                                const moment = require('moment');
                                const timestamp1 = item.addedOnTimeStamp;
                                var formatted = moment.unix(timestamp1).format("DD MMM YYYY");
                                var item2 = i > 0 ? response.data.airportReports[i - 1] : null;
                                const timestamp2 = i > 0 ? item2.addedOnTimeStamp : null;
                                var formatted2 = i > 0 ? moment.unix(timestamp2).format("DD MMM YYYY") : null;
                                var check = i > 0 && formatted === formatted2 ? true : false
                                var getData = {
                                    data: item,
                                    sameDate: check
                                }
                                this.state.reportsData.push(getData)
                            }
                            this.setState({ selected: false, favouriteAirportData: this.state.reportsData, showCalloutView: this.state.showCalloutView })
                        }
                        else {
                            this.setState({ selectedAirport: data.title, selectedAirportCode: data.airportCode, selected: false, favouriteAirportData: null, showCalloutView: true })
                        }
                    }
                    if (this.state.favouriteAirportData === null) {
                        this.setState({ showOpacity: false })
                    }
                }
                else { }
            }
            else {
                this.setState({ loading: false });
                Alert('Unable to fetch user detail, Please try after sometime');
            }
        }))
    }

    // Method to Move to Current Location
    moveTocurrentLocation() {
        Geolocation.getCurrentPosition(position => {
            const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };
            this.refs.map.animateToRegion(region, 2000);
        });
    }

    // get focus on Current Location
    gotoCurrentLocation() {
        Geolocation.getCurrentPosition(
            ({ coords }) => {
                if (this.map) {
                    this.map.animateToRegion({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    })
                }
                else { }
            },
            (error) => alert('Error: Are location services on?'),
            { enableHighAccuracy: true }
        )
    }

    // Method to check search Data
    checkSearchedData = (searchItem) => {
        this.setState({ filteredData: [], showSearchView: false })
        let filteredData = this.state.airportReportData.filter(function (item) {
            if (item.airport.includes(searchItem.airport)) {
                return item.airport.includes(searchItem.airport)
            }
            else if (item.airportCode.includes(searchItem.airportCode)) {
                return item.airportCode.includes(searchItem.airportCode)
            }
            else {
                return false;
            }
        });
        this.setState({ filteredData: filteredData }, () => this.checkIflocationExist(searchItem)
        );
    }

    // get Places name from place picker
    getLocationName(lat, long) {
        Geocoder.init("AIzaSyC2dcrBQ2OP_E0IvVr9db7PoDvI66maHf0", { language: "en" });
        Geocoder.from(lat, long)
            .then(json => {
                var addressComponent = json.results[0].formatted_address;
                this.setState({ locationName: addressComponent })
            })
            .catch(error =>
                console.log("error : " + error)
            );
    }

    // Method to get New City 
    getNewCityData(searchText) {
        let tempCoords = {
            latitude: Number(searchText.latitude),
            longitude: Number(searchText.longitude),
            latitudeDelta: 1,
            longitudeDelta: 1
        }
        this.refs.map.animateToCoordinate(tempCoords, 1000);
        this.setState({ latitude: searchText.latitude, longitude: searchText.longitude, searchcontent: [], showSearchView: false }, () => this.getAirportResult(1))
    }

    // Method to check if loaction Exist
    checkIflocationExist(item) {
        var searchText = this.state.text
        if (searchText.length > 1) {
            if (this.state.filteredData.length === 0) {
                this.getNewCityData(item)
            }
            else {
                var markers = [];
                for (var i = 0; i < this.state.filteredData.length; i++) {
                    var lat = this.state.filteredData[i];
                    var getCordinates = {
                        title: lat.airport,
                        description: lat.city,
                        id: lat.id,
                        airportCode: lat.airportCode,
                        havingReportsStatus: lat.havingReportsStatus,
                        coordinate:
                        {
                            latitude: Number(lat.latitude),
                            longitude: Number(lat.longitude),
                        }
                    }
                    markers.push(getCordinates);
                }
                this.setState({ markers: markers, searchcontent: [], });
            }
        }
        else {
            this.getLocation()
        }
    }

    search = (item) => {
        this.checkSearchedData(item)
        this.setState({ selectedId: item.airportId, selectedAirport: item.airport, selectedAirportCode: item.airportCode, selected: false, favouriteAirportData: null, showCalloutView: true })
    };

    openSearchModal() {
    }

    // enable location popup 
    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }
        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (hasPermission) return true;
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        }
        else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }
        return false;
    }

    // Method to get Current location Coordinates
    getLocation = async () => {
        this.setState({ searchcontent: [] })
        const hasLocationPermission = await this.hasLocationPermission();
        if (!hasLocationPermission) return;
        this.setState({ loading: true }, () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    let tempCoords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                    this.getLocationName(position.coords.latitude, position.coords.longitude)
                    this.refs.map.animateToCoordinate(tempCoords, 3000);
                    AsyncStorage.setItem('CURRENTLAT', JSON.stringify(position.coords.latitude))
                    AsyncStorage.setItem('CURRENTLONG', JSON.stringify(position.coords.longitude))
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    }, () => this.getAirportResult(1));
                },
                (error) => this.setState({ error: error.message }),
            );
        })
    }

    moveToEventDetailScreen = () => {
        const item = { airportCode: this.state.selectedAirportCode, airportId: this.state.selectedId }
        this.setState({ showCalloutView: true }, () => this.props.navigation.navigate('reportevent', { airportDetail: item }))
    }

    liked(data) {
        this.setState({ selected: true }, () => this.likeDislikeFlag(data, 1))
    }
    unLiked(data) {
        this.setState({ selected: true }, () => this.likeDislikeFlag(data, 2))
    }
    flaged(data) {
        this.setState({ selected: true }, () => this.likeDislikeFlag(data, 3))
    }

    // Search list View
    renderViewForList(item, index) {
        return (
            <View style={{ margin: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => alert("hey " + JSON.stringify(item))}>
                <TouchableOpacity style={{ width: '10%', height: 25, margin: 8, justifyContent: 'center', alignItems: 'center', left: 0, position: 'absolute' }} onPress={() => item.favAirportStatus === '1' ? this.deleteFavouriteAirports(item.favAirportId) : this.addFavouriteAirports(item)}>
                    <Image style={{ padding: 5 }} resizeMode='contain' source={item.favAirportStatus === '1' ? images.starOn : images.starOff}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={style.itemView} onPress={() => this.search(item)}>
                    <Text style={style.itemText}>
                        {item.airport + ' (' + item.airportCode + ')'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    // List Of Airports
    renderView(item, index) {
        const moment = require('moment');
        const timestamp = item.data.addedOnTimeStamp;
        var formatted = moment.unix(timestamp).format("DD MMM YYYY");
        return (
            <View>
                {index === 0 ?
                    <Text style={{ padding: 5, marginLeft: 10, fontSize: 14, fontWeight: 'bold', color: '#3a6897' }}>Report Date {formatted}</Text>
                    :
                    item.sameDate === false ? <Text style={{ padding: 5, marginLeft: 10, fontSize: 14, fontWeight: 'bold', color: '#3a6897' }}>Report Date {formatted}</Text>
                        : null}
                <View style={style.renderflatView}>
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <Text style={style.listtext}> {item.data.airport + " - " + item.data.airportCode + " : " + item.data.eventCategoryName} </Text>
                        <Image resizeMode='contain' source={{ uri: EndPoint.IMAGESURl + item.data.eventCategoryImage }} style={{ position: 'absolute', height: 30, width: 30, margin: 2, right: 0 }} />
                    </View>
                    <Text style={style.listtextnew}> {item.data.description} </Text>
                    <Text style={style.listtextnew1}>{item.data.reportDateTime ? 'Ends - ' + item.data.reportDateTime : ''}</Text>
                    <View style={style.arrowimgview}>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.liked(item.data)}>
                            <Image resizeMode='contain' source={item.data.userAction === '1' ? images.likeOn : images.likeOff} style={{ margin: 2 }} />
                            <Text>{item.data.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.unLiked(item.data)}>
                            <Image resizeMode='contain' source={item.data.userAction === '2' ? images.unlikeOn : images.unlikeOff} style={{ margin: 2 }} />
                            <Text>{item.data.dislikes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.flaged(item.data)}>
                            <Image resizeMode='contain' source={item.data.userAction === '3' ? images.flagOn : images.flagOff} style={{ margin: 2 }} />
                            <Text>{item.data.flags}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    gotToMyLocation() {
        console.log('gotToMyLocation is called')
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log("curent location: ", coords)
                console.log(this.map);
                if (this.map) {
                    console.log("curent location: ", coords)
                    this.map.animateToRegion({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    })
                }
            },
            (error) => alert('Error: Are location services on?'),
            { enableHighAccuracy: true }
        )
    }

    // Get Airport Markers on Zoom Level
    getRegion(region) {
        if ((region.latitudeDelta <= 140.000) && (region.latitudeDelta >= 90.000)) {
            this.getAirportResult();
        }
        else if ((region.latitudeDelta <= 90.000) && (region.latitudeDelta >= 45.000)) {
            this.getAirportResult();
        }
        else if (region.latitudeDelta <= 45.000) {
            this.getAirportResult();
        }
    }

    checkshowCallout() {
        Keyboard.dismiss()
        if (this.state.showCalloutView) {
            this.setState({ showCalloutView: false, showOpacity: true, searchcontent: [], text: '', showSearchView: false, })
        } {
            this.setState({ showCalloutView: false, showOpacity: true, searchcontent: [], text: '', showSearchView: false, })
        }
    }

    detectZoomLevel(region) {
        let zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
        this.setState({ zoomLevel: zoom })
        if (zoom === 2) {
            this.filterData(this.state.largeAirports)
        }
        else if (zoom === 3) {
           this.filterData(this.state.mediumAirports)
        }
        else if (zoom === 4) {
          this.filterData(this.state.smallAirport)
        }

    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <MapView
                    onMapReady={() => this.setState({ marginBottom: 0 })}
                    onPress={() => this.checkshowCallout()}
                    zoomEnabled={true}
                    refs='maps'
                    ref={map => (this.map = map)}
                    clustering={true}
                    showsCompass={true}
                    scrollEnabled={true}
                    showScale={true}
                    showsIndoors={true}
                    moveOnMarkerPress={true}
                    ref="map"
                    style={[style.mapOuterStyle, { bottom: this.state.marginBottom, opacity: this.state.showOpacity ? null : 0.5 }]}
                    onRegionChangeComplete={(region) =>
                        this.detectZoomLevel(region)
                        // this.setState({latitude:region.latitude,longitude:region.longitude},()=>{
                        // setTimeout(()=>{this.getRegion(region)},500)})
                    }
                    initialRegion={{
                        latitude: Number(this.state.latitude),
                        longitude: Number(this.state.longitude),
                        latitudeDelta: 25.0,
                        longitudeDelta: 25.0
                    }}>
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinate ? marker.coordinate : { latitude: 0, longitude: 0, }}
                            image={marker.havingReportsStatus === '1' ? images.markeron : images.markeroff}
                            width={48}
                            height={48}
                            onPress={() => this.getAirportReports(marker, 0)}>
                        </MapView.Marker>
                    ))
                    }
                </MapView>
                {this.state.showCalloutView ?
                    <View style={style.calloutOuterView}>
                        {this.state.favouriteAirportData != null ?
                            <View style={style.calloutInnerView}>
                                <Text style={style.locationName}>
                                    {this.state.selectedAirport + " (" + this.state.selectedAirportCode + ")"}
                                </Text>
                                <FlatList
                                    contentContainerStyle={style.flatlistContainerView}
                                    data={this.state.favouriteAirportData}
                                    ItemSeparatorComponent={this.FlatListItemSeparator}
                                    renderItem={({ item }) => this.renderView(item)}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            :
                            <View style={style.renderflatView2}>
                                <Text style={style.eventFeedTextStyle}>Event Feed</Text>
                                <Text style={style.selectedAirportTextStyle}>{this.state.selectedAirport}</Text>
                                <Text style={style.selectedAirCodeStyle}>{this.state.selectedAirportCode}</Text>
                                <View style={style.noEventsOuterView}>
                                    <Text style={style.noEventTextStyle}>No Events Have Been Reported</Text>
                                </View>
                            </View>
                        }
                        <TouchableOpacity onPress={() => this.moveToEventDetailScreen()} style={style.reportEventButton}>
                            <Text style={style.reportEventtextStyle}> Report Event</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
            {this.state.loadAirports ? <Loader /> : null }
            <View style={style.tabelView}>
                    <View style={style.tableinnerView}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Image
                                style={{ left: 15, padding: 5 }}
                                resizeMode='contain'
                                source={images.user_icon}>
                            </Image>
                        </TouchableOpacity>
                        <View style={style.searchView}></View>
                        <TextInput
                            onChange={() => this.checkText()}
                            onChangeText={(text) => this.getAirportSearchResult(text)}
                            value={this.state.text}
                            placeholder="Search Jumpseat...."
                            style={style.search}
                        >
                        </TextInput>
                        <TouchableOpacity
                            onPress={() => this.openSearchModal()}
                            style={{ width: '10%' }}>
                            <Image
                                resizeMode='contain'
                                source={images.search}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    {this.state.showSearchView
                        ? <View style={style.showSearchOuterView}>
                            <FlatList
                                contentContainerStyle={style.flatlistContainerView}
                                data={this.state.searchcontent}
                                renderItem={({ item }) => this.renderViewForList(item)}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        : null}
                </View>
                <TouchableOpacity style={style.curentLocContainer} onPress={() => this.moveTocurrentLocation()}>
                    <Image style={{ width: 35, height: 38 }} source={images.currentloc}></Image>
                </TouchableOpacity>
                <View style={style.bottamView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('reporteventsearch')} style={style.eventsfeedsub}>
                        <Text style={style.reportEventtextStyle}>Report Event</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('feedflowtab', { fromFavouriteScreen: '0' })} style={{ width: '10%', position: 'absolute', right: 20 }}>
                        <Image
                            resizeMode='contain'
                            source={images.menu_icon}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}