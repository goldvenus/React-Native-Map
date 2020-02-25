import React from "react";
import { Image, View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, FlatList, ScrollView } from 'react-native'
import images from "../../assets/images";
import SearchableDropdown from 'react-native-searchable-dropdown';
import Loader from "../../components/Loader";
import { getAirportsFilterSearchList, addFavouriteAirports, viewFavouriteUserAirports } from "./Action";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageKyes from "../../utils/AsyncStorageKyes";
import Autocomplete from 'react-native-autocomplete-input'
import CustomHeaderComponent from "../../components/CustomHeader/CustomHeaderComponent";
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import { validate } from "@babel/types";

export default class FavouriteView extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
        this.state = {
            serverData: [],
            loading: false,
            errormsg: '',
            query: '',
            selectedData: [],
            airportIds: '',
            page: 0,
            latitude: 0,
            longitude: 0,
            changeheight: 10,
            showSearchView: false

        };
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
    // animateToMap() {
    //     Geolocation.getCurrentPosition(() => {
    //         let tempCoords = {
    //             latitude: Number(this.state.latitude),
    //             longitude: Number(this.state.longitude),
    //         }
    //         this.refs.map.animateToCoordinate(tempCoords, 800);
    //     }
    //     )
    // }

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    GetIds(data) {
        let tempData = [];
        data.map((item, index) => {
            tempData.push(item.airportId)
            if (index == data.length - 1) {
                this.setState({
                    airportIds: tempData.join(",")
                })
            }
        })
    }

    renderView(item) {
        return (
            <TouchableOpacity style={{ margin: 5, flexDirection: 'row', }} onPress={() => this.deleteFavouriteAirports(item.item,0)}>
                <View style={{ width: 25, height: 25, margin: 5, justifyContent: 'center', alignItems: 'center' }} >
                    <Image resizeMode='contain' source={item.item.isSelect ? images.starOn : images.starOff}>
                    </Image>
                </View>
                <View style={{ width: '80%', height: 27, margin: 5, justifyContent: 'center', alignItems: 'center' ,}}>
                    <Text style={{ textAlign: 'left', fontSize: 12, width: '100%' ,}}>
                        {item.item.airport +'('+item.item.airportCode+')'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    goToNext = () => {
        this.props.navigation.navigate('feedflowtab', { fromFavouriteScreen: '1' })
    }

    getFavouriteEventsFeed = () => {
        AsyncStorage.getItem('CURRENTLONG').then((value) =>
            this.setState({ longitude: value }))
        this.setState({ loading: true });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => viewFavouriteUserAirports({ token: value, pageNumber: 1 }, (response, error) => {
            console.log("res" + value);
            if (response != null) {
                if (response.status === 1) {
                    if (response.data === null) {
                        this.setState({ loading: false })
                    }
                    else {
                        responseJson = response.data.favAirports.map(item => {
                            item.isSelect = true
                            return item;
                        });
                        var data = responseJson[0]
                        this.setState({ selectedData: responseJson, loading: false }, () => this.GetIds(responseJson))
                    }
                }
                else {
                    this.setState({ loading: false, });
                }
            }
            else {
                this.setState({ loading: false });
            }
        }
        ))
    }

    getDatafromAPI = (text) => {
        this.setState({ query: text, changeheight: 20, })
        var Value = text.length.toString();
        if (Value > 2) {
            this.setState({ loading: false, changeheight: 120 });
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => getAirportsFilterSearchList({ search: text, token: value }, (response, error) => {
                console.log("res", response);
                if (error) {
                    this.setState({ loading: false });
                    alert('Unable to fetch Airports, Please try again after sometime')
                }
                if (response != null) {
                    this.setState({ loading: false ,showSearchView: true });
                    if (response.status === 1) {
                        
                        this.setState({ serverData: response.data, errormsg: "", });
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
            this.setState({showSearchView:false})
        }
    }



    componentDidMount() {

        AsyncStorage.getItem('CURRENTLAT').then((value) =>
            this.setState({ latitude: value }, () => this.getFavouriteEventsFeed())
        ).done();



    }

    deleteFavouriteAirports = (item,id) => {
        this.setState({ loading: true });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => addFavouriteAirports({ token: value, airportId: '', favAirportId: item.favouriteId ? item.favouriteId: item.favAirportId , addDeleteStatus: '2' }, (response, error) => {

            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                        if(id === 0){
                            this.getFavouriteEventsFeed()

                        }
                        else if( id ===1){
                            this.getDatafromAPI(this.state.query)
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




    addFavouriteAirports = (item,id) => {

        this.setState({ loading: true });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => addFavouriteAirports({ token: value, airportId: item.airportId, favAirportId: '', addDeleteStatus: '1' }, (response, error) => {

            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                     if( id === 1){
                    this.getDatafromAPI(this.state.query)
                    }
                 else{ this.getFavouriteEventsFeed()
                    
                    }
              

           
                    // this.state.selectedData.push(item)
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

    selectData(data, index) {
        if(data.favAirportStatus === '0'){
            this.addFavouriteAirports(data,1)
        }
        else{
            this.deleteFavouriteAirports(data,1)
        }
    }

    searchListView(item, index) {
        return (
            <View style={{ margin:2,width: '100%',backgroundColor:'white' }}>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%' }} onPress={() => this.selectData(item, index)}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, width: '10%', }} >
                        <Image resizeMode='contain' source={item.favAirportStatus === '1' ? images.starOn :  item.isSelect ? images.starOn : images.starOff}>
                        </Image>
                    </View>
                    <Text style={{ fontSize: 14, textAlign: 'left', padding: 5, width: '90%', }}>
                        {item.airport + ' (' + item.airportCode + ')'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    //To hide the Card View

    hideView(){
        this.setState({ query: '', serverData: [], changeheight: 20,showSearchView:false },()=> this.getFavouriteEventsFeed())
    
    }
    
    render() {
        const { loading, query } = this.state;
        return (
            <View style={style.container}>
                <CustomHeaderComponent  _goBack={()=>this._goBack()} {...this.props} title="" showBackIcon />
                {/* {this.state.longitude > 0 ? this.animateToMap() : null} */}
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
                {/* {this.state.loading && <Loader />} */}
                <TouchableOpacity style={style.card} activeOpacity={2} onPress={() => this.hideView()}>
                    <Text style={style.managetext}>Manage Favourites</Text>
                    {/* <View style={style.locationView}>  */}
                    {/* <TouchableOpacity style={style.autocompleteContainer} activeOpacity={2} onPress={() => this.setState({ query: '', serverData: [], changeheight: 20 })}> */}
                    <View style={style.tabelView}>
                        <TextInput
                            onChangeText={(text) => this.getDatafromAPI(text)}
                            value={query}
                            placeholder="Search Airport ...."
                            style={{
                                textAlign: 'left',
                                padding: 2,
                                backgroundColor: 'transparent',
                                width: '80%',
                                margin: 3,
                            }}
                        />
                        {this.state.showSearchView ?
                            <View style={{
                                alignSelf: 'center',
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                borderTopWidth: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '90%',
                                borderColor: 'white',
                                borderWidth: 2,
                                margin: 10,
                                alignItems: 'center',
                                height: 300,
                            }}>
                                <FlatList
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                        overflow: 'hidden',
                                        backgroundColor: 'transparent',
                                    }}
                                    data={this.state.serverData}
                                    renderItem={({ item }) => this.searchListView(item)
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            : null}
                    </View>




                    <View style={style.currentfav}>

                        {this.state.selectedData.length > 0 ?

                            <FlatList
                                data={this.state.selectedData}
                                extraData={this.state}
                                // keyExtractor={data => data.airportId.toString()}
                                renderItem={(data) => this.renderView(data)}
                            /> :
                            <View style={style.errorView}>
                                <Text style={style.errortext}>No Favourites</Text>
                            </View>

                        }






                    </View>



                    <View style={style.eventsfeedMainview}>
                        <TouchableOpacity style={style.eventesfeedSubview} onPress={() => this.props.navigation.replace("map")}>
                            <Text style={{ textAlign: 'center', fontSize: 14, padding: 5, }}>
                            Back To Map
                    </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.eventesfeedSubview} onPress={() => this.goToNext()}>
                            <Text style={{ textAlign: 'center', fontSize: 14, padding: 5, }}>
                                Go To Feed
                    </Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>

            </View>

        )

    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    drodowntext: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,

        backgroundColor: '#FAF7F6',
    },


    dropItemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF7F6',
        borderColor: '#bbb',
        borderWidth: 1,
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    card: {

        margin: 5,
        backgroundColor: 'white',
        width: '90%',
        height: '85%',
        margin: 5,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8, shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },
    locationView: {

        width: '90%',
        margin: 5,

        position: 'absolute',
        zIndex: 1
    },
    // locationView: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '90%',
    //     margin:5,
    //    backgroundColor:'red',
    //     position:'absolute',
    //     zIndex:1
    // },
    autocompleteContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        flexDirection: 'row',
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'red',
        marginTop: '20%'


    },
    manageView: {
        backgroundColor: 'transparent',
        width: '95%',
        height: '32%',
        margin: 5,
    },

    managetext: {
        width: '90%',
        textAlign: 'center',
        fontSize: 22,
        padding: 5,
        fontWeight: 'bold',
        margin: 10
    },

    favouritetext: {
        width: '90%',
        textAlign: 'left',
        fontSize: 16,
        padding: 5,
        margin: 10,
    },

    tabelView: {
        top: '13%',
        alignSelf: 'center',

        backgroundColor: 'white',
        borderTopWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderColor: 'white',
        borderWidth: 2,
        margin: 10,
        borderRadius: 10,
        // borderWidth:1,
        // borderColor:'grey',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,

    },
    search: {
        textAlign: 'left',
        padding: 2,
        backgroundColor: 'transparent',
        width: '80%',
        margin: 3,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'transparent'
    },

    tabelmainview: {
        backgroundColor: '#D3D3D3',
        flexDirection: 'row',
        width: '90%',
        height: '80%',
        borderWidth: 2,
        borderColor: '#A9A9A9',
        marginTop: 10
    },
    tabelsubView: {
        backgroundColor: 'transparent',
        width: '30%',
        borderRightWidth: 2,
        borderColor: '#A9A9A9'
    },
    tabletext: {
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#A9A9A9',
        marginTop: 0
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    currentfav: {
        backgroundColor: 'transparent',
        height: '75%',
        width: '95%',
        margin: 10,
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icadmainview: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: '#A9A9A9',
        marginBottom: 4
    },
    icadsubview: {
        backgroundColor: 'transparent', width: '30%',
    },
    icadstext: {
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: 16
    },

    eventsfeedMainview: {
        width: '100%',
        height: '10%',
        bottom: 0,
        position: 'absolute',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection:'row'
    },
    eventesfeedSubview: {
        justifyContent: 'center',
        width: '45%',
        alignItems: 'center',
        height: '80%',
        borderRadius: 20,
        borderColor: '#808080',
        borderWidth: 2,
        margin: 5
    }


});

