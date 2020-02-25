import React, { Component } from 'react';
import { StyleSheet, Text, View, BackHandler, Image, ViewPropTypes, TouchableOpacity, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Fonts from '../../assets/Fonts';
import { getAllSubscriptionPlans, purchaseuserSubscription } from './Action';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';
import Loader from '../../components/Loader';

export default class PaymentView extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            loading: false,
            allPlansData: [],
            selectedIndex: '',
            selectedId: '',
            isSelected: false,
            showSkip: false
        }
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

    // To get all subscription Plans
    getAllSubscriptionPlans = () => {
        this.setState({ loading: true })
        getAllSubscriptionPlans({ display: 'all' }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    this.setState({ allPlansData: response.data.allPlans })
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
        )
    }

    // To purchase User Subscription
    purchaseUserSubscription = () => {
        this.setState({ loading: true })
        if (this.state.isSelected) {
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => purchaseuserSubscription({ token: value, subscriptionId: this.state.selectedId }, (response, error) => {
                console.log("res", response);
                if (response != null) {
                    this.setState({ loading: false });
                    if (response.status === 1) {
                        this.props.navigation.replace('map')
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
        else {
            alert("Please Select Your Plan First")
        }
    }

    handleBackButtonClick() {
        this.setState({ currIndex: this.state.currIndex - 1 })
        if (this.state.currIndex < 0) {
            this.props.navigation.goBack();
            return false;
        }
        else {
            return true;
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentDidMount() {
        AsyncStorage.getItem(AsyncStorageKyes.subscriptionPlanStatus).then((value) => {
            if (value === 1) {
                this.setState({ showSkip: true })
            }
            else {
                this.setState({ showSkip: false })
            }
        })
        this.getAllSubscriptionPlans()
    }

    CheckIfSelected(data, index) {
        this.setState({ selectedIndex: index, selectedId: data.subscriptionId, isSelected: true })
    }

    renderView(item, index) {
        return (
            <View style={style.cardView}>
                <View style={{ width: '70%', margin: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={style.paymentViewTextStyle}>
                        {item.name}
                    </Text>
                    <Text style={style.paymentViewTextStyle2}>
                        {item.price}
                    </Text>
                </View>
                <CheckBox
                    containerStyle={{ backgroundColor: 'transparent', borderColor: 'black', margin: 2, width: '25%', justifyContent: 'center', alignItems: 'center' }}
                    size={40}
                    checked={this.state.selectedIndex === index ? true : false}
                    onPress={() => this.CheckIfSelected(item, index)}
                />
            </View>
        )
    }

    render() {
        const { loading } = this.state;
        return (
            <View style={style.View}>
                {
                    loading ? <Loader /> : null
                }
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={style.headerText}>JUMPSEAT</Text>
                    <Text style={{ fontSize: 18, fontWeight: '400', padding: 10, fontFamily: Fonts.APP_BOLD_FONT, }}>Let's get started...</Text>
                    <Text style={{ padding: 10, fontWeight: 'bold', textAlign: 'center', fontSize: 20, fontFamily: Fonts.APP_BOLD_FONT, }}>Select your membership below :</Text>
                </View>
                <View style={style.monthPaymentView}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.allPlansData}
                        renderItem={({ item, index }) => this.renderView(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity style={style.buttonStyle} onPress={() => this.purchaseUserSubscription()}>
                    <Text style={style.buttonTextStyle}>Let's Go</Text>
                </TouchableOpacity>
                {this.state.showSkip ?
                    <TouchableOpacity style={style.buttonStyle} onPress={() => this.props.navigation.replace('map')
                    }>
                        <Text style={style.buttonTextStyle}>Skip</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    buttonTextStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    buttonStyle:
    {
        width: '60%',
        height: '9%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        fontFamily: Fonts.APP_BOLD_FONT,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 28,
        elevation: 5,
    },
    headerText: {
        marginTop: "20%",
        marginBottom: 5,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3a6897',
        fontFamily: Fonts.APP_BOLD_FONT,
    },
    cardView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '95%',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 30,
        elevation: 5,
    },

    paymentView: {
        marginLeft: '5%',
        marginTop: 10,
        backgroundColor: 'white',
        width: '90%',
        height: '80%',
        margin: 5,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },
    View: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    monthPaymentView: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%',
        marginTop: '7%'
    },
    paymentViewTextStyle: {
        textAlign: 'left',
        fontSize: 17,
        fontFamily: Fonts.APP_BOLD_FONT,
        backgroundColor: 'white',
        color: 'black',
        padding: 5,
        fontWeight: 'bold',
        width: '80%',
        marginLeft: 5
    },
    paymentViewTextStyle2: {
        textAlign: 'left',
        fontSize: 17,
        fontFamily: Fonts.APP_BOLD_FONT,
        backgroundColor: 'white',
        color: 'black',
        padding: 5,
        width: '80%',
        marginLeft: 5
    },
});