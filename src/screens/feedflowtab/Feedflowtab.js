import React from "react";
import { Image, View, Text, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground, Alert, } from 'react-native'
import images from "../../assets/images";
import CustomHeaderComponent from "../../components/CustomHeader/CustomHeaderComponent";
import style from "./Style";
import { getGlobalEventsFeed, getFavouriteEventsFeed, viewUserFavouriteAirports, likeDislikeFlag, addFavouriteAirports } from "./Action";
import Loader from "../../components/Loader";
import Colors from "../../assets/Colors";
import MapView from 'react-native-maps';
import AsyncStorageKyes from "../../utils/AsyncStorageKyes";
import AsyncStorage from "@react-native-community/async-storage";
import EndPoint from "../../utils/EndPoint";

export default class Feedflowtab extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            isGlobalSelected: true,
            isFavSelected: false,
            favView: false,
            globalFeedData: [],
            globalData: [],
            favouriteData: [],
            favouriteFeedData: [],
            like: false,
            unlike: false,
            flag: false,
            loading: false,
            page: 0,
            fetchingStatus: false,
            setOnLoad: false,
            latitude: 0,
            longitude: 0,
            sameDate: false
        }
    }

    checkbuttonSelected() {
        this.setState({ isSelected: !this.state.isSelected })
    }

    // Method to like 
    liked(item, comingFrom) {
        item.isLikeSelect = !item.isLikeSelect;
        const Index = this.state.globalFeedData.findIndex(
            item => item.airportId === item.airportId);
        this.state.globalFeedData[Index] = item;
        this.setState({ globalFeedData: this.state.globalFeedData })
        this.likeDislikeFlag(item.data.eventId ? item.data.eventId : item.data.eventReportId, 1, comingFrom)
    }

// Method to dislike 
    unliked(item, comingFrom) {
        item.isUnlikeSelect = !item.isUnlikeSelect;
        const Index = this.state.globalFeedData.findIndex(
            item => item.airportId === item.airportId
        );
        this.state.globalFeedData[Index] = item;
        this.setState({ globalFeedData: this.state.globalFeedData })
        this.likeDislikeFlag(item.data.eventId ? item.data.eventId : item.data.eventReportId, 2, comingFrom)
    }
  
    // Method to like flag
    flaged(item, comingFrom) {
        item.isFlagSelect = !item.isFlagSelect;
        const Index = this.state.globalFeedData.findIndex(
            item => item.airportId === item.airportId);
        this.state.globalFeedData[Index] = item;
        this.setState({ globalFeedData: this.state.globalFeedData });
        this.likeDislikeFlag(item.data.eventId ? item.data.eventId : item.data.eventReportId, 3, comingFrom)
    }

// To get user Favourite Airports
    viewUserFavouriteAirports = () => {
        this.setState({ fetchingStatus: true, loading: false });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => viewUserFavouriteAirports({ token: value, tabType: "2", pageNumber: 1 }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                if (response.status === 1) {
                    if (response.data === null) {
                        this.setState({ fetchingStatus: false, setOnLoad: false })}
                    else {
                        this.setState({ favouriteData: response.data.favAirports, setOnLoad: true, fetchingStatus: false })}
                }
                else {
                    this.setState({ fetchingStatus: false, setOnLoad: false })}
            }
            else {
                this.setState({ fetchingStatus: false })}
        }
        ))
    }

    // like dislike method
    likeDislikeFlag = (eventId, userAction, comingFrom) => {
        this.setState({ loading: false, globalData: [], favouriteData: [], });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => likeDislikeFlag({ token: value, eventId: eventId, userAction: userAction, }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                if (response.status === 1) 
                {
                    if (comingFrom === 'global') {
                        this.setState({ page: 0 }, () => this.getGlobalEventsFeed(0))
                    }
                    else if (comingFrom === 'fav') {
                        this.setState({ page: 0, }, () => this.getFavouriteEventsFeed(1))
                    }
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

// To get favourite events
    getFavouriteEventsFeed = (status) => {
        this.state.page = this.state.page + 1;
        this.setState({ fetchingStatus: true, loading: false,favouriteData:[] });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getFavouriteEventsFeed({ token: value, tabType: "2", pageNumber: this.state.page }, (response, error) => {
            if (response != null) {
                if (response.status === 1) {
                    if (response.data === null) {
                        this.setState({ fetchingStatus: false, setOnLoad: false, page: 0})
                    }
                    else {
                        for (var i = 0; i < response.data.favAirportReports.length; i++) {
                            var item = response.data.favAirportReports[i];
                            const moment = require('moment');
                            const timestamp1 = item.reportAddedOnTimeStamp;
                            var formatted = moment.unix(timestamp1).format("DD MMM YYYY");
                            var item2 = i > 0 ? response.data.favAirportReports[i - 1] : null;
                            const timestamp2 = i > 0 ? item2.reportAddedOnTimeStamp : null;
                            var formatted2 = i > 0 ? moment.unix(timestamp2).format("DD MMM YYYY") : null;
                            var check = i > 0 && formatted === formatted2 ? true : false
                            var getData = {
                                data: item,
                                sameDate: check,
                                isLikeSelect : item.userAction === '1' ? true : false,
                                isUnlikeSelect :  item.userAction === '2' ? true : false,
                                isFlagSelect :  item.userAction === '3' ? true : false
                            }
                            this.state.favouriteData.push(getData)
                        }
                        this.setState({ favouriteFeedData: this.state.favouriteData, setOnLoad: true, loading: false },()=>{
                        })
                    }
                }
                else {
                    this.setState({ fetchingStatus: false, setOnLoad: false, loading: false });
                }
            }
            else {
                this.setState({ fetchingStatus: false, loading: false });
                alert('Unable to fetch Airports');
            }
        }
        ))
    }

// To get global events feed
    getGlobalEventsFeed = (status) => {
        AsyncStorage.getItem('CURRENTLONG').then((value) =>
        this.setState({ longitude: value, }))
        this.state.page = this.state.page + 1;
        this.setState({ fetchingStatus: true, loading: false });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getGlobalEventsFeed({ token: value, tabType: "1", pageNumber: this.state.page }, (response, error) => {
            console.log("resjjjjjj", response);
            if (response != null) {
                if (response.status === 1) {
                    if (response.data === null) {
                        this.setState({ fetchingStatus: false, setOnLoad: false, page: 0, loading: false })
                    }
                    else {
                        for (var i = 0; i < response.data.globalReports.length; i++) {
                            var item = response.data.globalReports[i];
                            const moment = require('moment');
                            const timestamp1 = item.reportAddOnTimeStamp;
                            var formatted = moment.unix(timestamp1).format("DD MMM YYYY");
                            var item2 = i > 0 ? response.data.globalReports[i - 1] : null;
                            const timestamp2 = i > 0 ? item2.reportAddOnTimeStamp : null;
                            var formatted2 = i > 0 ? moment.unix(timestamp2).format("DD MMM YYYY") : null;
                            var check = i > 0 && formatted === formatted2 ? true : false
                            var getData = {
                                data: item,
                                sameDate: check,
                                isLikeSelect : item.userAction === '1' ? true : false,
                                isUnlikeSelect :  item.userAction === '2' ? true : false,
                                isFlagSelect :  item.userAction === '3' ? true : false
                            }
                            this.state.globalData.push(getData)
                        }
                        this.setState({ globalFeedData: this.state.globalData, setOnLoad: true, loading: false, }, () => console.log("kkk " + JSON.stringify(this.state.globalData)))
                    }
                }
                else {
                    this.setState({ fetchingStatus: false, setOnLoad: false, loading: false });
                }
            }
            else {
                this.setState({ fetchingStatus: false, loading: false });
                alert('Unable to fetch Airports');
            }
        }
        ))
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }

    checkIfGlobalSelected() {
        this.setState({ isGlobalSelected: true,isFavSelected:false, page: 0 }, () => this.getGlobalEventsFeed(0))
    }

    checkIfFavSelected() {
        this.setState({ isFavSelected: true, isGlobalSelected:false,page: 0 },()=>this.getFavouriteEventsFeed(0))
    }

    // To add airport in favourite list 
    addFavouriteAirports = (item) => {
        this.setState({ loading: true, page: 0 });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => addFavouriteAirports({ token: value, airportId: item.airportId, favAirportId: '', addDeleteStatus: '1' }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    this.setState({ globalFeedData: [], globalData: [] }, () => this.getGlobalEventsFeed(0))
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

    // To Delete the Favourite Airport
    deleteFavouriteAirports = (id, comingFrom) => {
        if (id === "") {
        }
        else {
            this.setState({ loading: true, });
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => addFavouriteAirports({ token: value, airportId: '', favAirportId: id, addDeleteStatus: '2' }, (response, error) => {
                console.log("res", response);
                if (response != null) {
                    this.setState({ loading: false });
                    if (response.status === 1) {
                        if (comingFrom === 'global') {
                            this.setState({ page: 0,globalData:[],globalFeedData:[] }, () => this.getGlobalEventsFeed(1))
                        }
                        else if (comingFrom === 'favourite') {
                            this.setState({ page: 0,favouriteData:[],favouriteFeedData:[] }, () => this.getFavouriteEventsFeed(1))
                        }
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
    }

    // Favourite Events view
    renderView(item, index) {
        const moment = require('moment');
        const timestamp = item.data.reportAddOnTimeStamp;
        var formatted = moment.unix(timestamp).format("DD MMM YYYY");
        return (
            <View>
                {index === 0 ?
                    <Text style={{ padding: 5, marginLeft: 10, fontSize: 14, fontWeight: 'bold', color: '#3a6897' }}>Report Date {formatted}</Text>
                    : item.sameDate === false ? <Text style={{ padding: 5, marginLeft: 10, fontSize: 14, fontWeight: 'bold', color: '#3a6897' }}>Report Date {formatted}</Text>
                    : null}
                <View style={style.renderflatView}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => item.data.favAirportStatus === '1' ? this.deleteFavouriteAirports(item.data.favAirportId, 'global') : this.addFavouriteAirports(item.data)}>
                            <Image resizeMode='contain' source={item.data.favAirportStatus === '1' ? images.starOn : images.starOff} ></Image>
                        </TouchableOpacity>
                        <Text style={style.listtext}> {item.data.airport + " - " +   item.data.airportCode + " : "+ item.data.name} </Text>
                        <Image resizeMode='contain' source={{ uri: EndPoint.IMAGESURl + item.data.categoryImage }}
                            style={{ position: 'absolute', height: 30, width: 30, margin: 2, right: 0 }} />
                    </View>
                    <Text style={style.listtextnew}> {item.data.comment} </Text>
                    <Text style={style.listtextnew1}>{item.data.reportDateTime ? 'Ends - ' + item.data.reportDateTime : ''}</Text>
                    <View style={style.arrowimgview}>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.liked(item, 'global',)}>
                            <Image resizeMode='contain' source={item.isLikeSelect ? images.likeOn :  images.likeOff} style={{ margin: 2 }} />
                            <Text>{item.data.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.unliked(item, 'global')}>
                            <Image resizeMode='contain' source={item.isUnlikeSelect ? images.unlikeOn : images.unlikeOff} style={{ margin: 2 }} />
                            <Text>{item.data.dislikes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.flaged(item, 'global')}>
                            <Image resizeMode='contain' source={item.isFlagSelect ? images.flagOn :  images.flagOff} style={{ margin: 2 }} />
                            <Text>{item.data.flags}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    // Global Events View
    renderView1(item, index) {
        const moment = require('moment');
        const timestamp = item.data.reportAddedOnTimeStamp;
        var formattedReportDate = moment.unix(timestamp).format("DD MMM YYYY");
        return (
            <View>
                {index === 0 ?
                    <Text style={{ padding: 5, marginLeft: 10, fontSize: 14, fontWeight: 'bold', color: '#3a6897' }}>Report Date {formattedReportDate}</Text>
                    : item.sameDate === false ?
                    <Text style={{ padding: 5, marginLeft: 10, fontSize: 14, fontWeight: 'bold', color: '#3a6897' }}>Report Date {formattedReportDate}</Text>
                    : null
                }
                <View style={style.renderflatView}>
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => this.deleteFavouriteAirports(item.data.favAirportId, 'favourite')}>
                            <Image resizeMode='contain' source={images.starOn} ></Image>
                        </TouchableOpacity>
                        <Text style={style.listtext}> {item.data.airport + " - " + item.data.airportCode + " : " + item.data.categoryName} </Text>
                        <Image resizeMode='contain' source={{ uri: EndPoint.IMAGESURl + item.data.categoryImage }} style={{ position: 'absolute', height: 30, width: 30, margin: 2, right: 0, }} />
                    </View>
                    <Text style={style.listtextnew}> {item.data.description} </Text>
                    <Text style={style.listtextnew1}>{item.data.reportDateTime ? 'Ends - ' + item.data.reportDateTime : ''}</Text>
                    <View style={style.arrowimgview}>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.liked(item, 'fav')}>
                            <Image resizeMode='contain' source={item.isLikeSelect ? images.likeOn : images.likeOff} style={{ margin: 2 }} />
                            <Text>{item.data.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.unliked(item, 'fav')}>
                            <Image resizeMode='contain' source={item.isUnlikeSelect ? images.unlikeOn : images.unlikeOff} style={{ margin: 2 }} />
                            <Text>{item.data.dislikes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.iconStyle} onPress={() => this.flaged(item, 'fav')}>
                            <Image resizeMode='contain' source={item.isFlagSelect ? images.flagOn : images.flagOff} style={{ margin: 2 }} />
                            <Text>{item.data.flags}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

// Bottom View to load more items 
    BottomView = () => {
        return (
            <View>
                {(this.state.fetchingStatus) ?
                <ActivityIndicator size="large" color={Colors.grey} style={{ marginLeft: 6 }} />
                : null }
            </View>
        )
    }
    
// Function to go back from purticular screen
    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    componentDidMount() {
        if (this.props.navigation.getParam('fromFavouriteScreen') === '1') {
            AsyncStorage.getItem('CURRENTLAT').then((value) =>
                this.setState({ latitude: value, isFavSelected: true, isGlobalSelected: false }, () => this.getFavouriteEventsFeed(0))
            ).done();
        }
        else if (this.props.navigation.getParam('fromFavouriteScreen') === '0') {
            AsyncStorage.getItem('CURRENTLAT').then((value) =>
                this.setState({ latitude: value }, () => this.getGlobalEventsFeed(0))
            ).done();
        }
    }

    render() {
        return (
            <View style={style.container}>
                <CustomHeaderComponent  _goBack={()=>this._goBack()} {...this.props} title="" showBackIcon />
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
                {this.state.isGlobalSelected ?
                    <View style={style.card}>
                        {this.state.loading && <Loader />}
                        <Text style={style.eventstext}>Global Feed</Text>
                        <View style={style.tabView}>
                            <TouchableOpacity style={[style.globalview, { backgroundColor: this.state.isGlobalSelected ? '#3E78FF' : 'white', borderColor: this.state.isGlobalSelected ? '#3E78FF' : 'black' }]} onPress={() => this.checkIfGlobalSelected()}>
                                <Text style={[style.globaltext, { color: this.state.isGlobalSelected ? 'white' : 'black' }]}>Global</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.favouriteview, { backgroundColor: this.state.isFavSelected ? '#3E78FF' : 'white', borderColor: this.state.isGlobalSelected ? 'black' : 'black' }]} onPress={() => this.checkIfFavSelected()}>
                                <Text style={[style.favtext, { color: this.state.isFavSelected ? 'white' : 'black' }]}>Favorites</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.flatview}>
                            <FlatList
                                extraData={this.state}
                                data={this.state.globalFeedData}
                                initialNumToRender={4}
                                maxToRenderPerBatch={1}
                                onEndReachedThreshold={0.5}
                                onEndReached={({ distanceFromEnd }) => {
                                    { this.state.fetchingStatus ? this.getGlobalEventsFeed(0) : null }
                                }}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                renderItem={({ item, index }) => this.renderView(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={this.BottomView}
                            />
                        </View>
                        <View style={style.manageMainView}>
                            <TouchableOpacity onPress={() => this._goBack()} style={style.managesubView}>
                                <Text style={style.managetext}> Back To Map</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={style.card}>
                        {this.state.loading && <Loader />}
                        <Text style={style.eventstext}> Favorites Feed</Text>
                        <View style={style.tabView}>
                            <TouchableOpacity style={[style.globalview, { backgroundColor: this.state.isGlobalSelected ? '#3E78FF' : 'white', borderColor: this.state.isGlobalSelected ? 'black' : 'black' }]} onPress={() => this.checkIfGlobalSelected()}>
                                <Text style={[style.globaltext, { color: this.state.isGlobalSelected ? 'white' : 'black' }]}>Global</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.favouriteview, { backgroundColor: this.state.isFavSelected ? '#3E78FF' : 'white', borderColor: this.state.isGlobalSelected ? 'black' : '#3E78FF' }]} onPress={() => this.checkIfFavSelected()}>
                                <Text style={[style.favtext, { color: this.state.isFavSelected ? 'white' : 'black' }]}>Favorites</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.flatFavview}>
                            {this.state.favouriteFeedData.length > 0 ?
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.favouriteFeedData}
                                    initialNumToRender={4}
                                    maxToRenderPerBatch={1}
                                    onEndReachedThreshold={0.5}
                                    onEndReached={({ distanceFromEnd }) => {
                                        { this.state.fetchingStatus ? this.getFavouriteEventsFeed(0) : null }
                                    }}
                                    ItemSeparatorComponent={this.FlatListItemSeparator}
                                    renderItem={({ item, index }) => this.renderView1(item, index)}
                                    keyExtractor={(item, index) => index.toString()}
                                    ListFooterComponent={this.BottomView}
                                />
                                :
                                <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: 'center', width: '100%' }}>No Favorite Reports Found</Text>
                            }
                        </View>
                        <View style={style.manageMainView}>
                        <TouchableOpacity onPress={() => this.props.navigation.replace("map")} style={style.managesubView}>
                                <Text style={style.managetext}>Back To Map</Text>
                            </TouchableOpacity>
                             <TouchableOpacity onPress={() => this.props.navigation.replace("favouriteview")} style={style.managesubView}>
                                <Text style={style.managetext}>Manage Favorites</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
            </View>
        );
    }
}