import React from "react";
import { Image, View, Text, TouchableOpacity, TextInput, Keyboard, Platform } from 'react-native'
import images from "../../assets/images";
import style from "./Style";
import CustomHeaderComponent from "../../components/CustomHeader/CustomHeaderComponent";
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';
import EndPoint from "../../utils/EndPoint";
import { submitReport } from "./Action";
import AsyncStorageKyes from "../../utils/AsyncStorageKyes";
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "../../components/Loader";
import MapView from 'react-native-maps';

export default class ReportEventDetail extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            DateText: 'DD-MMM-YYYY',
            DateHolder: null,
            isSelected: false,
            dateSelected: false,
            serverresponse: "",
            description: "",
            errormsg: "",
            selectedItemId: "",
            selectedItemName: '',
            selectedItemImage: '',
            latitude: 0,
            longitude: 0,
        }
    }

    _goBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    async componentDidMount() {
        AsyncStorage.getItem('CURRENTLAT').then((value) =>
            this.setState({ latitude: value }, () =>
                AsyncStorage.getItem('CURRENTLONG').then((value) =>
                    this.setState({ longitude: value, }))
            )
        )
        var value = this.props.navigation.state.params.getSelectedData;
        value.map((item, key) => {
            if (this.state.selectedItemId === "") {
                this.setState({ selectedItemId: item.id, selectedItemName: item.name, selectedItemImage: item.image })
            }
            else {
                this.setState({ selectedItemId: this.state.selectedItemId + "," + item.id })
            }
        })
    }

    // open datepicker dialog
    DatePickerMainFunctionCall = () => {
        let DateHolder = this.state.DateHolder;
        if (!DateHolder || DateHolder == null) {
            DateHolder = new Date();
            this.setState({
                DateHolder: DateHolder
            });
        }
        //To open the dialog
        this.refs.DatePickerDialog.open({
            date: DateHolder,
        });

    }

    // state set after selection
    onDatePickedFunction = (date) => {
        this.setState({
            dobDate: date,
            DateText: moment(date).format('DD-MMM-YYYY'), dateSelected: true, isSelected: false
        });
    }

    checkIfSelected = () => {
        if (this.state.dateSelected) {
            this.setState({ dateSelected: false, DateText: 'DD-MMM-YYYY', isSelected: true })
        }
        else if (this.state.isSelected) {
            this.setState({ isSelected: false })
        }
        else {
            this.setState({ isSelected: true })
        }
    }

    // To report the event
    submitReportEvent(id) {
        const { description, DateText, isSelected, dateSelected } = this.state;
        if (description == '') {
            this.setState({ errormsg: "Please enter some sentense" })
        }
        else if (!isSelected && !dateSelected) {
            this.setState({ errormsg: "Please select atleast one option how long will this last" })
        }
        else if (isSelected || dateSelected) {
            this.setState({ loading: true });
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => submitReport({ airportId: id, categoryId: this.state.selectedItemId, token: value, description: description, reportDateTime: this.state.isSelected ? "" : DateText }, (response, error) => {
                console.log("res", response);
                if (error) {
                    alert('Unable to fetch Airports events, Please try again after sometime')
                }
                if (response != null) {
                    this.setState({ loading: false });
                    if (response.status === 1) {
                        this.setState({ serverresponse: response })
                        this.props.navigation.replace('submitReport', {
                            selectedData: this.props.navigation.getParam('getSelectedData'), description
                                : this.state.description, date: this.state.isSelected ? "" : DateText, locationName: this.props.navigation.getParam('locationname')
                        })
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
    }

    renderView(item) {
        return (
            <View style={{ flex: 1, margin: 10, }}>
                <Image
                    resizeMode='contain'
                    style={{ height: 80 }}
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
        const { loading } = this.state;
        let getData = navigation.getParam('getSelectedData')
        let imguri = { uri: EndPoint.IMAGESURl + getData[0].eventCategoryImage }
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
                    <CustomHeaderComponent _goBack={() => this._goBack()} {...this.props} title="" showBackIcon />
                    {loading && <Loader />}
                    <View style={style.locationrow}>
                        <Text style={style.location}>Location :</Text>
                        <Text style={style.kden}>{navigation.getParam('locationname')}</Text>
                    </View>
                    <View style={{ width: '100%', height: Platform.OS === 'ios' ? '4%' : '2%', margin: 5, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'red', alignItems: 'center' }}>{this.state.errormsg}</Text>
                    </View>
                    <View style={{ flex: 1, height: Platform.OS === 'ios' ? '20%' : '15%', width: '50%', alignSelf: 'center', }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: '60%', margin: 3 }}
                            source={{ uri: EndPoint.IMAGESURl + this.state.selectedItemImage }}>
                        </Image>
                        <View style={{ width: '100%', height: '20%', }}>
                            <Text style={style.GridViewInsideTextItemStyle}>{this.state.selectedItemName} </Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', marginTop: '2%', alignItems: 'center', }}>
                        <TextInput
                            selectionColor='black'
                            placeholder="Tell us more here-- A few sentences will do, or pop in a link.Be Specific!"
                            underlineColorAndroid={'transparent'}
                            keyboardType="default"
                            returnKeyType="done"
                            onChangeText={(text) => this.setState({ description: text })}
                            blurOnSubmit={true}
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                            style={style.gratitudeTextInput}
                            multiline={true} />
                        <Text style={style.howLong}>How long will this last ?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity
                                disabled={false}
                                onPress={this.DatePickerMainFunctionCall.bind(this)}
                                style={style.date}>
                                <Text style={{ textAlign: 'center' }} >{this.state.DateText}</Text>
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', margin: 5 }}>or</Text>
                            <TouchableOpacity onPress={() => this.checkIfSelected()} style={{ width: 15, height: 15, margin: 5 }}>
                                <Image resizeMode='contain' source={this.state.isSelected ? images.check : images.uncheck}>
                                </Image>
                            </TouchableOpacity>
                            <Text style={{ width: '35%', margin: 5, textAlign: 'left' }}>Unknown/NA</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.submitReportEvent(navigation.getParam('airportId'))} style={style.submit}>
                        <Text style={style.submitreporttxt}>Submit report</Text>
                    </TouchableOpacity>
                </View>
                <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
            </View>
        );
    }
}