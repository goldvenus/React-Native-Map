import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Keyboard, } from 'react-native'
import { StackActions, NavigationActions, } from 'react-navigation';
import images from '../assets/images';
import AsyncStorageKyes from '../utils/AsyncStorageKyes';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';
import CardDetailComponent from './CardDetailCustomComponent/CardDetailComponent';
import UserDetailComponent from './UserDetailcustomComponent/UserDetailComponent';
import { userdetail, updateProfile } from '../screens/userdetail/Action';
import { userCarddetail, addCardDetail, deleteCardDetail, submitContactUs, viewInviteCode, logoutUser } from './CardDetailCustomComponent/Action';
import ContactDetailComponent from './ContactDetailComponent';
import InivteDetailComponent from './InviteDetailComponent';
import Stripe from 'react-native-stripe-api';
import { _storeData } from '../utils/AsyncStorageMethods';
// import { checkIfEmpty ,} from '../screens/signin/Controller';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { checkIfEmpty, checkTextLength } from '../screens/signin/Controller'



//pk_test_trbfp03PUYwStkTVeUAsPyqo00dyoZj7ho
// const subscribeAmount = 100;
const apiKey = 'pk_test_otfssjlKQBeczfwfzmqVCSEZ00coqmCSCk';
const client = new Stripe(apiKey);

class MenuItem extends Component {
    render() {
        return (<TouchableOpacity
            onPress={() => { this.checkLogValue() }}>
            <View style={styles.screenStyle}>
                <Image source={this.props.image} />
                <Text
                    style={{
                        fontSize: 15,
                        marginLeft: 20,
                        color: 'grey',
                    }}>
                    {this.props.text}
                </Text>
            </View>
        </TouchableOpacity>
        )
    }

    // check menu item postion
    checkLogValue(props) {
        if (this.props.logval == '1') {
            this.props.moveToLogin();
        }
        else if (this.props.logval == '2') {
            this.props.inviteCode();
        }
        else if (this.props.logval == '0') {
            this.props.navigateTo();
        }
        else if (this.props.logval == '3') {
            this.props.changeTheState();
        }
    }
}

export default class DrawerContent extends Component {
    constructor(props) {
        super(props)
        this.navigateToScreen = this.navigateToScreen.bind(this)
        this.state = {
            screen: '',
            name: '',
            showUserDetail: false,
            showCardDetail: false,
            showContactDetail: false,
            showInviteDetail: false,
            loading: false,
            userdetails: {},
            firstName: "",
            lastName: "",
            userName: "",
            phone: "",
            email: "",
            creditCardNo: "",
            contactusMsg: "",
            month: "",
            cvv: "",
            year: "",
            zipcode: "",
            isError: false,
            errorMessage: "",
            clicktoAdd: false,
            referralValue: '',
            showReferralValue: true,
            messege: true,
            refercode: '',
            emailcontact: '',
        }
    }

    // Get UserResult from API
    getUserDetails = () => {
        this.setState({ loading: true });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) =>
            userdetail({ token: value }, (response, error) => {
                console.log("res", response);
                if (error) {
                    this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
                }
                this.setState({ loading: false });
                if (response != null) {
                    if (response.status === 1) {
                        this.setState({ firstName: response.data.userDetails[0].firstName, userName: response.data.userDetails[0].userName, email: response.data.userDetails[0].email, phone: response.data.userDetails[0].phone })
                    }
                    else {
                        this.setState({ isError: true, errorMessage: response.message })
                    }
                }
                else {
                    this.setState({ loading: false });
                    this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
                }
            }))
    }

    //update User profile
    updateUserProfile() {
        this.setState({ loading: true });
        const { firstName, lastName, userName, phone } = this.state;
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => updateProfile({ firstName: firstName, lastName: lastName, userName: userName, phone: phone, token: value }, (response, error) => {
            console.log("res", response);
            if (error) {
                this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
            }
            if (response != null) {
                if (response.status === 1) {
                    this.setState({ loading: false, isError: false });
                }
                else {
                    this.setState({ isError: true, errorMessage: response.message })
                }
            }
            else {
                this.setState({ loading: false });
                this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
            }
        }))
    }

    // Get CardResult from API
    getCardDetails = () => {
        this.setState({ loading: true });
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) =>
            userCarddetail({ token: value }, (response, error) => {
                // alert("mine := "+JSON.stringify(response))
                if (error) {
                    this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
                }
                this.setState({ loading: false });
                if (response != null) {
                    // alert(JSON.stringify(response))
                    if (response.status === 1) {
                        // alert("mine := "+JSON.stringify(response.data))
                        this.setState({ creditCardNo: response.data.lastFourNumber, month: response.data.expMonth, year: response.data.expYear, zipcode: response.data.zipCode })
                    }
                    else {
                        // this.setState({isError:true,errorMessage:response.message})
                    }
                }
                else {
                    this.setState({ loading: false });
                    this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
                }
            }
            ))
    }

    //To Delete Card
    deleteCard() {
        this.setState({ loading: false, isError: false, clicktoAdd: true, cvv: '' });
        // this.setState({ loading: true });
        // AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => deleteCardDetail({ token: value }, (response, error) => {
        //     console.log("res", response);
        //     if (error) {
        //         this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
        //     }
        //     if (response != null) {
        //         if (response.status === 1) {
        //             this.setState({ loading: false, isError: false, creditCardNo: "", clicktoAdd: true, month: '', year: "", zipcode: '' });
        //             _storeData(AsyncStorageKyes.userHaveCardStatus, "0")
        //         }
        //         else {
        //             this.setState({ isError: true, errorMessage: error.message })
        //             // alert("error" + error.message)
        //         }
        //     }
        //     else {
        //         this.setState({ loading: false });
        //         this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
        //     }
        // })
        // )
    }

    async addCardDetails() {
        const { creditCardNo, month, year, cvv, zipcode } = this.state;
        this.setState({ loading: true, isError: false });
        if ((checkIfEmpty(creditCardNo)) || (checkIfEmpty(month)) || (checkIfEmpty(year)) || (checkIfEmpty(zipcode))) {
            this.setState({ isError: true, errorMessage: "All fields Required to fill", loading: false })
        }
        else if (checkIfEmpty(cvv)) {
            this.setState({ isError: true, errorMessage: "Please Enter Cvv", loading: false })
        }
        else if (checkTextLength(creditCardNo, 16)) {
            this.setState({ isError: true, errorMessage: "Please the Card Number Again", loading: false })
        }
        else {
            this.setState({ isError: false, loading: true })
            var cardNumberToSplit = creditCardNo
            var data = cardNumberToSplit.split('-');
            var creditCardNumber = data[0] + data[1] + data[2] + data[3]
            const token = await client.createToken({
                number: creditCardNumber,
                exp_month: month,
                exp_year: year,
                cvc: cvv,
            });
            if (token.id !== undefined) {
                AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => addCardDetail({ token: value, cardToken: token.id, lastfourCardNumber: data[3], zipCode: zipcode }, (response, error) => {
                    if (error) {
                        this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
                    }
                    if (response != null) {
                        console.log("res", response);
                        if (response.status === 1) {
                            this.setState({ loading: false, isError: false, clicktoAdd: false });
                            _storeData(AsyncStorageKyes.userHaveCardStatus, "1")
                        }
                        else {
                            this.setState({ isError: true, errorMessage: response.message })
                        }
                    }
                    else {
                        this.setState({ loading: false });
                        this.setState({ isError: true, errorMessage: 'Unable to fetch user detail, Please try again after sometime' })
                    }
                }))
            }
            else {
                this.setState({ loading: false });
                this.setState({ isError: true, errorMessage: token.error.message })
            }
        }
    }

    submitContact() {
        const { contactusMsg } = this.state;
        this.setState({ loading: true, isError: false });
        if (checkIfEmpty(contactusMsg)) {
            this.setState({ isError: true, errorMessage: "please fill message", loading: false })
        }
        else {
            this.setState({ isError: false, loading: true })
            AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => submitContactUs({ token: value, message: contactusMsg }, (response, error) => {
                if (error) {
                    this.setState({ isError: true, errorMessage: 'Something went wrong, Please try again after sometime' })
                }
                if (response != null) {
                    if (response.status === 1) {
                        this.setState({ loading: false, isError: false, contactusMsg: "" }, () => {
                            if (this.state.showContactDetail) {
                                this.setState({ showContactDetail: false })
                            }
                            this.props.navigation.closeDrawer()
                        });
                        alert("Mail Send Sucessfully")
                        // _storeData(AsyncStorageKyes.userHaveCardStatus, "1")           
                    }
                    else {
                        this.setState({ isError: true, errorMessage: response.message })
                    }
                }
                else {
                    this.setState({ loading: false });
                    this.setState({ isError: true, errorMessage: 'Something went wrong, Please try again after sometime' })
                }
            }
            ))
        }
    }

    getInviteCode() {
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => viewInviteCode({ token: value }, (response, error) => {
            if (error) {
                this.setState({ isError: true, errorMessage: 'Something went wrong, Please try again after sometime' })
            }
            if (response != null) {
                if (response.status === 1) {
                    this.setState({ refercode: response.data, loading: false, isError: false }, () => {
                    });
                }
                else {
                    alert(JSON.stringify(response))
                    this.setState({ isError: true, errorMessage: response.message })
                }
            }
            else {
                this.setState({ loading: false });
                this.setState({ isError: true, errorMessage: 'Something went wrong, Please try again after sometime' })
            }
        }
        ))
    }

    logoutUser() {
        AsyncStorage.getItem(AsyncStorageKyes.USER_TOKEN).then((value) => logoutUser({ token: value }, (response, error) => {
            if (error) {
                this.setState({ isError: true, errorMessage: 'Something went wrong, Please try again after sometime' })
            }
            if (response != null) {
                if (response.status === 1) {
                    this.logoutData();
                }
                else {
                    alert(JSON.stringify(response))
                    this.setState({ isError: true, errorMessage: response.message })
                }
            }
            else {
                this.setState({ loading: false });
                this.setState({ isError: true, errorMessage: 'Something went wrong, Please try again after sometime' })
            }
        }
        ))
    }

    // Logout alert 
    moveToLogin = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout ?',
            [
                { text: 'Yes', onPress: () => this.logoutUser() },
                { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        );
    }

    // Logout app here
    logoutData = () => {
        AsyncStorage.setItem('islogin', 'false')
        let keys = [AsyncStorageKyes.USER_TOKEN];
        AsyncStorage.multiRemove(keys, err => {
            const navigateAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "loginsignup" })],
            });
            this.props.navigation.dispatch(navigateAction);
        });
    };


    handleCrossButton = () => {
        if (this.state.showUserDetail) {
            this.setState({ showUserDetail: false })
        }
        else if (this.state.clicktoAdd && this.state.showCardDetail) {
            this.setState({ clicktoAdd: false,isError:false })
        }
        else if (this.state.showCardDetail && this.state.clicktoAdd === false) {
            this.setState({ showCardDetail: false,isError:false })
        }
        else if (this.state.showContactDetail) {
            this.setState({ showContactDetail: false })
        }
        else if (this.state.showInviteDetail) {
            this.setState({ showInviteDetail: false })
        }
        else {
            this.props.navigation.closeDrawer()
        }
    }

    // method to navigate next screen
    navigateToScreen = (route) => (() => {
        this.props.navigation.closeDrawer();
        var RandomNumber = Math.floor(Math.random() * 100) + 1;
        const navigateAction = NavigationActions.navigate({
            routeName: route, params: {
                user: RandomNumber
            }
        });
        this.props.navigation.dispatch(navigateAction);
    })

    //method To Change User Deatil State
    UserStateChange = () => {
        this.getUserDetails();
        this.setState({ showUserDetail: true })
    }

    //method To Change Card Deatil State
    CardStateChange = () => {
        AsyncStorage.getItem(AsyncStorageKyes.userHaveCardStatus).then((value) => {
            if (value === "0") {
                this.setState({ clicktoAdd: true, isError: false })
            }
            else { this.setState({ clicktoAdd: false }) }
        })
        this.setState({ showCardDetail: true })
        this.getCardDetails();
    }

    ContactStateChange = () => {
        this.setState({ showContactDetail: true })
    }

    //method To Change Invite Detail State
    InviteStateChange = () => {
        this.getInviteCode()
        this.setState({ showInviteDetail: true })
    }

    // invite code   
    inviteCode = () => {
        const shareOptions = {
            title: 'Share via',
            message: "You've been referred to JumpSeat! Use referral code:  " + this.state.refercode.userReffCode,
            url: " during sign up for a free month!",
        };
        Share.open(shareOptions)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }

    componentWillMount() {
        var value = AsyncStorage.getItem(AsyncStorageKyes.User_name);
        value.then((e) => {
            this.setState({ name: e })
        })
    }

    componentDidMount() {
        AsyncStorage.getItem(AsyncStorageKyes.EMAIL).then((value) => {
            this.setState({ emailcontact: value })   })
    }

    handleKeyDown(e) {
        if (e.nativeEvent.key == "Enter") {
            dismissKeyboard();
        }
    }

    cardNumberValids = (text) => {
        this.setState({ creditCardNo: text })
        this.setState({ creditCardNo: this.checkCreditCardInput(text) });
    };

    dismiss() {
        dismissKeyboard();
    }

    onTextChange(text) {
        var cleaned = ('' + text).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : ''),
                number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
            this.setState({
                phone: number
            });
            return;
        }
        this.setState({ phone: text });
    }

    onChangeMonthValidation(text) {
        this.setState({ month: text })
        if (Number(text) > 12) {
            this.setState({ month: '' })
        } else { }
    }

    onChangeYearValidation(text) {
        this.setState({ year: text })
        var getCurrentYear = new Date().getFullYear();
        var year = getCurrentYear.toString();
        var year1 = year.replace("20", "");
        var Value = text.length.toString();
        if (Value > 1) {
            if (Number(text) < Number(year1)) {
                this.setState({ year: '' })
            }
            else {}
        }
        else { }
    }

    checkCreditCardInput = (value) => {
        let formattedText = value.split("-").join("");
        if (formattedText.length > 0) {
            formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join("-");
        }
        return formattedText;
    }

    render() {
        const { loading } = this.state;
        return (
            <View style={styles.container} onPress={() => Keyboard.dismiss()}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => this.handleCrossButton()} >
                        <Image
                            resizeMode='contain' source={images.splashlogo}
                            style={{ flex: 1, width: 80, height: 80, marginTop: 20 }} />
                        {<Text style=
                            {styles.sideMenuProfileText}>Hello, {this.state.name}</Text>}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.handleCrossButton()} style={{ position: 'absolute', right: 20, top: 30, padding: 10 }}>
                    <Image
                        source={images.cross2}
                        resizeMode={'contain'}>
                    </Image>
                </TouchableOpacity>
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        marginTop: 10,
                        backgroundColor: '#d3d3d3'}}
                />
                {(this.state.showUserDetail) ?
                    <UserDetailComponent
                        firstname={this.state.firstName}
                        lastname={this.state.lastName}
                        username={this.state.userName}
                        email={this.state.email}
                        loading={loading}
                        phone={this.state.phone}
                        dismiss={() => this.dismiss()}
                        onChangeFirstname={(text) => this.setState({ firstName: text })}
                        onChangeUsername={(text) => this.setState({ userName: text })}
                        onChangeEmail={(text) => this.setState({ email: text })}
                        onChangePhone={(text) => this.onTextChange(text)}
                        handleCrossButton={() => this.handleCrossButton()}
                        updateProfile={() => this.updateUserProfile()}
                        isError={this.state.isError}
                        errorMessage={this.state.errorMessage}/>
                    : this.state.showCardDetail ?
                        <CardDetailComponent
                            handleCrossButton={() => this.handleCrossButton()}
                            creditCardNo={this.state.creditCardNo}
                            textInputDisableStatus={this.state.clicktoAdd}
                            month={this.state.month}
                            loading={loading}
                            year={this.state.year}
                            cvv={this.state.cvv}
                            dismiss={() => this.dismiss()}

                            zipcode={this.state.zipcode}
                            onChangezipcode={(text) => this.setState({ zipcode: text })}
                            onChangecvv={(text) => this.setState({ cvv: text })}
                            onChangeCardno={(text) => this.cardNumberValids(text)}
                            onChangeyear={(text) => this.onChangeYearValidation(text)}
                            onChangemonth={(text) => this.onChangeMonthValidation(text)}
                            updateCard={() => this.updateCardDetails()}
                            deleteCard={() => this.deleteCard()}
                            isError={this.state.isError}
                            errorMessage={this.state.errorMessage}
                            clicktoAdd={this.state.clicktoAdd}
                            addCard={() => this.addCardDetails()}/> 
                            :
                        this.state.showContactDetail ?
                            <ContactDetailComponent
                                loading={loading}
                                textInputDisableStatus={false}
                                callContact={() => this.submitContact()}
                                contactmessege={this.state.contactusMsg}
                                isError={this.state.isError}
                                emailcontact={this.state.emailcontact}
                                dismiss={() => this.dismiss()}
                                drawerClose={() => this.handleCrossButton()}
                                errorMessage={this.state.errorMessage}
                                onChangecontactmessege={(text) => this.setState({ contactusMsg: text })}
                                messegestatus={this.state.messege}
                                handleCrossButton={() => this.handleCrossButton()}
                            /> : this.state.showInviteDetail ?
                                <InivteDetailComponent
                                    loading={loading}
                                    handleCrossButton={() => this.handleCrossButton()}
                                    inviteCode={() => this.inviteCode()}
                                    textInputDisableStatus={this.state.showReferralValue}
                                    value={this.state.refercode}
                                /> :
                                <ScrollView contentContainerStyle={{ flexWrap: 'wrap' }}>
                                    <View style={styles.containeritems}>
                                        <MenuItem changeTheState={() => this.UserStateChange()} logval='3' text={"User Details"} image={images.user} />
                                        <MenuItem changeTheState={() => this.CardStateChange()} logval='3' text={"Payment"} image={images.payment} />
                                        <MenuItem changeTheState={() => this.ContactStateChange()} logval='3' text={"Contact us"} image={images.contactus} />
                                        <MenuItem changeTheState={() => this.InviteStateChange()} logval='3' text={"Invite Code"} image={images.invite} />
                                        <MenuItem moveToLogin={() => this.moveToLogin()} logval='1' text={"Logout/Switch Accounts"} image={images.logout} />
                                    </View>
                                </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 40,
        borderBottomEndRadius: 40,
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'white'
    },
    containeritems: {
        flex: 1,
        margin: 20,
        width: '100%',
    },
    headerContainer: {
        height: 100,
        marginTop: 10,
        marginLeft: 40,
        alignItems: 'flex-start'
    },
    screenStyle: {
        height: 30,
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    menuItemImageStlye: {
        height: 25,
        width: 25,
        marginLeft: 30,
        marginRight: 20
    },
    menuItemTextStyle: {
        fontSize: 15,
        fontWeight: '400',
        width: '70%'
    },
    sideMenuProfileText:
    {
        fontSize: 16,
        marginTop: 5,
        color: '#d3d3d3',
        textAlign: 'left',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    side: {
        fontSize: 16,
        marginTop: 2,
        marginLeft: 25,
        color: '#000000',
        textAlign: 'left',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
});