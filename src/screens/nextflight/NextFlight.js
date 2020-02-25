import React from "react";
import { Image, View, Text, FlatList, Alert, TouchableOpacity } from 'react-native'
import images from "../../assets/images";
import style from "./Style";
import CustomHeaderComponent from "../../components/CustomHeader/CustomHeaderComponent";
import { viewPlannedFlights, toDeletePlannedFlight } from "../map/Action";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageKyes from "../../utils/AsyncStorageKyes";
import MapView from 'react-native-maps';

export default class NextFlight extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            plannedData: [],
            value: '',
            id: '',
            latitude: 0,
            longitude: 0,
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('CURRENTLAT').then((value) =>
            this.setState({ latitude: value }, () => this.viewPlannedFlightdata())
        ).done();
    }

    checkIfSelected(plannedId, id) {
        this.setState({ value: plannedId, id: id }, () => this.viewPlannedFlightdata())
    }

    viewPlannedFlightdata = () => {
        AsyncStorage.getItem('CURRENTLONG').then((value) =>
            this.setState({ longitude: value }))
        this.setState({ loading: true, plannedData: [] });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => viewPlannedFlights({ token: value }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    this.setState({ plannedData: response.data })
                }
                else {
                    alert("error " + JSON.stringify(response.message))
                    this.setState({ loading: false });
                }
            }
            else {
                this.setState({ loading: false });
                alert('', 'Unable to fetch Airports');
            }
        }
        ))
    }

    deletePlannedFlight = (id) => {
        this.setState({ loading: true, value: '' });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => toDeletePlannedFlight({ token: value, plannedId: id }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    Alert.alert(
                        'Alert',
                        "Successfully Deleted",
                        [
                            { text: 'OK', onPress: () => this.viewPlannedFlightdata() },
                        ],
                        { cancelable: false },
                    );
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

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    render() {
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
                <View style={style.cardShape}>
                    {this.state.loading && <Loader />}
                    <Text style={style.report}> Manage Flights</Text>
                    <Image style={{}}
                        resizeMode='contain'
                        source={images.flighticon}
                    >
                    </Image>
                    <View style={style.plannedDataOuterView}>
                        {this.state.plannedData === [] ?
                            <View >
                                <Text style={style.noPlanTextStyle}>No planned Flights </Text>
                            </View>
                            :
                            <View style={style.flightOuterView}>
                                <View style={style.flightInnerView}>
                                    <Text style={style.flightTextStyle}>Flight</Text>
                                    <Text style={style.dateTextStyle}>Date</Text>
                                </View>
                                <FlatList
                                    data={this.state.plannedData}
                                    renderItem={({ item, index }) =>
                                        <View style={style.listStyle}>
                                            <View style={style.listOuterView}>
                                                <View style={style.listInnerView}>
                                                    <TouchableOpacity style={style.radiobtn} onPress={() => this.checkIfSelected(index, item.plannedId)}>
                                                        <Image resizeMode="contain" source={this.state.value === index ? images.check : images.uncheck}>
                                                        </Image>
                                                    </TouchableOpacity>
                                                    <Text style={style.airportCodeTextStyle}> {item.airportCode} </Text>
                                                </View>
                                                <Text style={style.dateTextStyle}> {item.departureDate} </Text>
                                            </View>
                                        </View>
                                    } />
                            </View>
                        }
                    </View>
                    <View style={style.addbottomView}>
                        <TouchableOpacity onPress={() => this.props.navigation.replace('manageFlight', { "add": 1, "edit": 0 })} style={style.bottamBtn}>
                            <Text style={style.bottamtext}>
                                Add
                                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.bottomView}>
                        <TouchableOpacity onPress={() => this.state.id === "" ? alert("Please select flight to Edit") : this.props.navigation.replace('manageFlight', { "add": 0, "edit": 1, "id": this.state.id })} style={style.bottamBtn}>
                            <Text style={style.bottamtext}>
                                Edit
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.state.id === "" ? alert("Please select flight to Delete") : this.deletePlannedFlight(this.state.id)} style={style.bottamBtn}>
                            <Text style={style.bottamtext}>
                                Delete
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}  
