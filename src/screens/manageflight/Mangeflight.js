import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, TextInput, TouchableHighlight, TouchableWithoutFeedback, ImageBackground, FlatList } from 'react-native';
import images from '../../assets/images';
import CustomHeaderComponent from '../../components/CustomHeader/CustomHeaderComponent';
import style from './Style';
import { getAirportsFilterSearchList, getNearByAirports, addPlannedFlight, viewEditPlannedFlights, editPlannedFlights } from '../map/Action';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/Loader';
import Autocomplete from 'react-native-autocomplete-input'
import { ScrollView } from 'react-native-gesture-handler';
import CustomDateTimePicker from '../../components/CustomDateTimePicker';
import MapView from 'react-native-maps';

export default class Mangeflight extends Component {
    static navigationOptions = {
        header: null,
    };
    getCurrentDate() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        that.setState({
            currentDate:
                year + '-' + month + '-' + date, currentTime: hours + ':' + min
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            picker: false,
            date: '',
            time: '',
            currentDate: '',
            currentTime: '',
            ArrivalData: [],
            destinationData: [],
            loading: false,
            startSearching: false,
            nearByAirports: [],
            arrivalLat: '',
            arrivalLong: '',
            desLat: '',
            desLong: '',
            query1: '',
            query2: '',
            arrivalSelected: false,
            destSelected: false,
            findArrival: false,
            findDestination: false,
            isSelected: false,
            alternativeAirportIds: null,
            value: null,
            selectedOption: 'veg',
            arrivalId: '',
            departureId: '',
            editData: [],
            edit: '',
            add: '',
            editId: '',
            splitedArray: [],
            airpotSplitArray: []
        };
    }

    getEditData() {
        if (this.state.edit === 1) {
            this.viewEditData(this.state.editId)
        }
    }

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    componentDidMount() {
        AsyncStorage.getItem('CURRENTLAT').then((value) =>
            this.setState({ latitude: value }, () =>
                AsyncStorage.getItem('CURRENTLONG').then((value) =>
                    this.setState({ longitude: value })).done()))
        this.setState({ editData: [], splitedArray: [], nearByAirports: [] })
        let edit = this.props.navigation.getParam('edit')
        let add = this.props.navigation.getParam('add')
        let id = this.props.navigation.getParam('id')
        this.setState({ edit: edit, add: add, editId: id }, () => this.getEditData())
        this.getCurrentDate()
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    // To add Flight 
    addPlannedFlightdata = () => {
        this.setState({ loading: true, ArrivalData: [], destinationData: [] });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => addPlannedFlight({ departureAirportId: this.state.departureId, arrivalAirportId: this.state.arrivalId, departureDate: this.state.date, departureTime: this.state.time, token: value, alternativeAirportIds: this.state.alternativeAirportIds }, (response, error) => {
            console.log("res", response);
            if (error) {
                alert('Unable to fetch Airports, Please try again after sometime')
            }
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    this.props.navigation.replace('nextFlight', { status: response.status })
                }
                else {
                    alert(JSON.stringify(error.message))
                    this.setState({ loading: false, errormsg: error.message });
                }
            }
            else {
                this.setState({ loading: false });
                alert('Unable to fetch Airports');
            }
        }
        ))
    }

    // To Fetch nearer airports 
    fetchNearByAirports = (lat, long) => {
        this.setState({ nearByAirports: [] })
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getNearByAirports({ arrivalLatitude: lat, arrivalLongitude: long, token: value }, (response, error) => {
            console.log("res", response);
            if (error) {
                alert(error.message)
            }
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    var responseJson = response.data.map(item => {
                        item.isSelect = false;
                        item.selectedClass = 0;
                        return item;
                    })
                    this.setState({ nearByAirports: responseJson });
                    console.log("arrival data12345 " + JSON.stringify(this.state.nearByAirports))
                }
                else { this.setState({ loading: false, errormsg: response.message }) }
            }
            else {
                this.setState({ loading: false });
                alert('Unable to fetch Airports');
            }
        }
        ))
    }

    // To get searched airport List For Arrival
    getDatafromAPI1 = (text) => {
        this.setState({ query1: text, arrivalSelected: true, splitedArray: [], edit: 2 })
        var Value = text.length.toString();
        if (Value > 2) {
            this.setState({ loading: true, ArrivalData: [], destinationData: [] });
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportsFilterSearchList({ search: text, token: value }, (response, error) => {
                console.log("res", response);
                if (error) {
                    alert('Unable to fetch Airports, Please try again after sometime')
                }
                if (response != null) {
                    this.setState({ loading: false });
                    if (response.status === 1) {
                        this.setState({ ArrivalData: [...this.state.ArrivalData, ...response.data], errormsg: "", });
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
        else { }
    }

    // to view edited Data
    viewEditData = (id) => {
        this.setState({ loading: true, splitedArray: [], editData: [] })
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => viewEditPlannedFlights({ token: value, plannedId: id }, (response, error) => {
            console.log("res", response);
            if (error) {
                alert('Unable to fetch Airports, Please try again after sometime')
            }
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    console.log("edit response  " + JSON.stringify(response))
                    this.setState({ editData: response.data }, () => this.getSplitedArray())
                }
                else {
                    alert(JSON.stringify(response.message))
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

    // To edit data
    editData = () => {
        this.setState({ loading: true })
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) =>
            editPlannedFlights({
                plannedId: this.state.editId,
                departureAirportId: (this.state.departureId === "") ? this.state.editData.departureAirportId : this.state.departureId,
                arrivalAirportId: (this.state.arrivalId === "") ? this.state.editData.arrivalAirportId : this.state.arrivalId,
                departureDate: (this.state.date === '') ? this.state.editData.departureDate : this.state.date,
                departureTime: (this.state.time === '') ? this.state.editData.departureTime : this.state.time,
                token: value,
                alternativeAirportIds: (this.state.alternativeAirportIds === '') ? this.state.alternativeAirportIds : this.state.editData.alternativeAirportIds
            },
                (response, error) => {
                    console.log("res", response);
                    if (error) {
                        alert('Unable to fetch Airports, Please try again after sometime')
                    }
                    if (response != null) {
                        this.setState({ loading: false });
                        if (response.status === 1) {
                            console.log("edit response  " + JSON.stringify(response))
                            this.props.navigation.replace('newFlight', { departureDate: (this.state.date === '') ? this.state.editData.departureDate : this.state.date, departureTime: (this.state.time === '') ? this.state.editData.departureTime : this.state.time })
                        }
                        else {
                            this.setState({ loading: false });
                        }
                    }
                    else {
                        this.setState({ loading: false });
                        alert('', 'Unable to fetch Airports');
                    }
                }
            )
        )
    }

    // To get searched airport List For Departure
    getDatafromAPI2 = (text) => {
        this.setState({ query2: text, destSelected: true, splitedArray: [], edit: 2 })
        var Value = text.length.toString();
        if (Value > 2) {
            this.setState({ loading: true, ArrivalData: [], destinationData: [] });
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportsFilterSearchList({ search: text, token: value }, (response, error) => {
                console.log("res", response);
                if (error) {
                    alert('Unable to fetch Airports, Please try again after sometime')
                }
                if (response != null) {
                    this.setState({ loading: false });
                    if (response.status === 1) {
                        this.setState({ destinationData: [...this.state.destinationData, ...response.data], errormsg: "", });
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
        else { }
    }

    // To get All near Airports
    getAllNearArrivals() {
        if (((this.state.findArrival) && (this.state.findDestination))) {
            this.setState({ edit: 2 }, () => this.fetchNearByAirports(this.state.arrivalLat, this.state.arrivalLong))
            return true
        }
        else if ((this.state.edit === 2) && (this.state.add === 0)) {
            this.setState({ edit: 2 }, () => this.fetchNearByAirports(this.state.editData.arrivalLatitude, this.state.editData.arrivalLongitude))
        }
        else {
            return false
        }
    }

    getSplitedArray() {
        var airportsToSplit = this.state.editData.airportCityCode
        var data1 = airportsToSplit.split(',')
        var airportCodesToSplit = this.state.editData.airportCode
        var data2 = airportCodesToSplit.split(' - ')
        var mydata = []
        for (i = 0; i <= (data1.length - 1); i++) {
            var getData = { airportCode: data1[i], isSelect: false }
            mydata.push(getData);
        }
        this.setState({ splitedArray: mydata, airpotSplitArray: data2 })
    }

    gotoNext() {
        if (this.state.editData.length === 0) {
            if ((this.state.date === "") || (this.state.time === "")) {
                alert("All fields Are required to fill ")
            }
            else { this.addPlannedFlightdata() }
        }
        else {
            this.editData()
        }
    }

    selectArrival(text) {
        this.setState({ edit: 2, loading: false, query1: text.airportCode, arrivalId: text.airportId, ArrivalData: [], arrivalSelected: false, startSearching: false, findArrival: true, arrivalLat: text.latitude, arrivalLong: text.longitude }, () => {
            this.getAllNearArrivals()
        })
    }


    selectDestination(text) {
        this.setState({ edit: 2, loading: false, query2: text.airportCode, departureId: text.airportId, destinationData: [], destSelected: false, startSearching: false, findDestination: true, desLat: text.latitude, desLong: text.longitude }, () => {
            this.getAllNearArrivals()
        });
    }


    checkIfSelected = (data, index) => {
        data.isSelect = !data.isSelect;
        data.selectedClass = data.isSelect ? 1 : 0;
        const Index = this.state.nearByAirports.findIndex(
            item => data.airportId === item.airportId
        );
        this.state.nearByAirports[Index] = data;
        this.setState({ nearByAirports: this.state.nearByAirports })
        this.setState({ isSelected: true, value: index })
        if (this.state.alternativeAirportIds === null) {
            this.setState({ alternativeAirportIds: data.airportId })
        }
        else {
            var oldString = this.state.alternativeAirportIds
            this.setState({ alternativeAirportIds: oldString + ',' + data.airportId })
        }
    }

    moveToEventDetailScreen = (item) => {
        this.setState({ startSearching: false })
        alert(JSON.stringify(item))
            ;
    }


    renderView(item, index) {
        return (
            <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'grey', width: '100%', marginTop: 5, }}>
                <Text style={{ padding: 5 }}>{this.state.edit === 1 ? item.airportCode : item.airportCode ? item.airportCode : null}</Text>
                {((this.state.findArrival) && (this.state.findDestination) || (this.state.edit === 2) || (this.state.edit === 1)) ?
                    <TouchableOpacity style={style.radiobtn} onPress={() => this.checkIfSelected(item, index)}>
                        <Image resizeMode="contain" source={(item.isSelect) ? images.check : images.uncheck}>
                        </Image>
                    </TouchableOpacity>
                    : <Text style={{ fontSize: 12, color: 'red', alignSelf: 'center' }}>No Airport Found</Text>
                }
            </View>
        )
    }
    render() {
        const { query1, query2, loading } = this.state;
        return (
            <View style={style.container}>
                <CustomHeaderComponent _goBack={() => this._goBack()} {...this.props} title="" showBackIcon />
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
                <View style={style.card} onPress={() => this.setState({ startSearching: false })}>
                    {loading && <Loader />}
                    <Text style={style.editFlight}>
                        {this.state.edit === 1 ? 'Edit Flight' : 'New Flight'}
                    </Text>
                    <Image
                        resizeMode='contain'
                        source={images.flighticon}>
                    </Image>
                    <View style={style.locationrow}>
                        <View style={style.locationView}>
                            <View style={style.autocompleteContainer}>
                                <Text style={style.locationtext}>AD: </Text>
                                <Autocomplete
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    data={this.state.ArrivalData}
                                    inputContainerStyle={{ width: '100%' }}
                                    defaultValue={query1}
                                    listContainerStyle={{ height: "20%", width: "100%", }}
                                    onChangeText={(text) => this.getDatafromAPI1(text)}
                                    placeholder={this.state.editData.length === 0 ? "Search Arr." : this.state.airpotSplitArray[0]}
                                    renderItem={({ item }) => (
                                        <ScrollView scrollEnabled={true} style={{ flex: 1 }}>
                                            <TouchableOpacity style={{ margin: 2, borderBottomColor: 'grey', borderBottomWidth: 2, }} onPress={() => this.selectArrival(item)}>
                                                <Text style={style.itemText}>
                                                    {item.airport}
                                                </Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    )
                                    }
                                />
                            </View>
                        </View>
                        <View style={style.locationView}>
                            <View style={style.autocompleteContainer}>
                                <Text style={style.locationtext}>AA: </Text>
                                <Autocomplete
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    listContainerStyle={{ height: "17%", width: "100%", }}
                                    inputContainerStyle={{ width: '100%' }}
                                    data={this.state.destinationData}
                                    defaultValue={query2}
                                    onChangeText={(text) => this.getDatafromAPI2(text)}
                                    placeholder={this.state.editData.length === 0 ? "Search Dest." : this.state.airpotSplitArray[1]}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={{ width: '100%', borderBottomColor: 'grey', borderBottomWidth: 2, }} onPress={() => this.selectDestination(item)}>
                                            <Text style={style.itemText}>
                                                {item.airport}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                    {this.state.startSearching ? null :
                        <View style={style.searchedOuterView}>
                            <View style={style.searchedInnerView}>
                                <View style={style.addOuterView}>
                                    <Text style={style.addAlternateTextStyle}>
                                        Add an Alternate ?
                                        </Text>
                                    <Text style={style.addToSelectText}>
                                        (select to add airport to your report)
                                        </Text>
                                </View>
                                <View style={style.flatlistOuterView}>
                                    <FlatList
                                        extraData={this.state}
                                        data={this.state.edit === 1 ? this.state.splitedArray : this.state.nearByAirports.length === 0 ? '29' : this.state.nearByAirports}
                                        ItemSeparatorComponent={this.FlatListItemSeparator}
                                        renderItem={({ item, index }) => this.renderView(item, index)}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </View>
                            <View style={style.dateOuterView}>
                                <View style={style.depature}>
                                    <Text style={style.dateText}>Depature Date: </Text>
                                </View>
                                <View style={style.datePickerOuterView}>
                                    <CustomDateTimePicker
                                        onDateChange={date => {
                                            this.setState({ date: date })
                                        }}
                                        date={this.state.date}
                                        mode="date"
                                        format="YYYY-MM-DD"
                                        placeholder={this.state.edit === 1 ? this.state.editData.departureDate : "Select date"}
                                        minDate={this.state.currentDate}
                                    />
                                </View>
                            </View>
                            <View style={{ height: '20%', flexDirection: 'row' }}>
                                <View style={style.depature}>
                                    <Text style={style.depaText}>Depature Time (UTC):</Text>
                                </View>
                                <View style={{ width: '50%', marginTop: 5 }}>
                                    <CustomDateTimePicker
                                        onDateChange={time => {
                                            this.setState({ time: time })
                                        }}
                                        date={this.state.time}
                                        mode="time"
                                        format="HH:mm"
                                        placeholder={this.state.edit === 1 ? this.state.editData.departureTime : "Select Time"}
                                    />
                                </View>
                            </View>
                        </View>}
                    {this.state.startSearching ? null :
                        <View style={style.bottambtnView}>
                            <TouchableOpacity onPress={() => this.gotoNext()} style={style.btnView}>
                                <Text style={style.editManageText}>{this.state.editData === 1 ? 'Save Changes' : 'Submit'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('feedflowtab')} style={style.btnView}>
                                <Text style={style.editManageText}>Manage Flights</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }
}