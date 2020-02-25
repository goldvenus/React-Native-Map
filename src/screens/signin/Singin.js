import React, { Component } from 'react';
import { View, BackHandler, Platform, Keyboard, PermissionsAndroid, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import style from './Style';
import Swiper from 'react-native-swiper';
import firebase from 'react-native-firebase';
import CustomDetailView from '../../components/CustomDetailView';
import CustomEmailView from '../../components/CustomEmailView';
import CustomPaymentView from '../../components/CustomPaymentView';
import { checkIfEmpty, checkTextLength, checkEmailValid, checkCreditCardInput, isInputNumber } from './Controller';
import { signUp, checkPhoneno, getAllSubscriptionPlans, purchaseuserSubscription, termsAndCondition } from './Action';
import AsyncStorageKyes from '../../utils/AsyncStorageKyes';
import AsyncStorage from '@react-native-community/async-storage';
import Stripe from 'react-native-stripe-api';
import strings from '../../localization/strings';
import CustomSucessView from '../../components/CustomSucessView';
import RNFetchBlob from 'rn-fetch-blob';

const apiKey = 'pk_test_otfssjlKQBeczfwfzmqVCSEZ00coqmCSCk';
const client = new Stripe(apiKey);

class SignIn extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            currIndex: 0,
            emailid: "",
            phone: "",
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            emailvalids: false,
            phonenovalid: false,
            internet: false,
            creditCard: "",
            expiryMonth: "",
            expiryYear: "",
            cvv: "",
            zipCode: "",
            connection_Status: "",
            paymentValid: false,
            userInfoValid: false,
            loading: false,
            error: null,
            connection_Status: "",
            isChecked: false,
            showTerms: false,
            errorMessage: "",
            selectedIndex: '',
            selectedId: '',
            annualSelected: false,
            monthSelected: false,
            freeTrail: false,
            monthPlansData: [],
            annualPlansData: [],
            viewDiscountStatus: "",
            referralCode: '',
            showButton: true,
            showButtonForDetail: true,
            showButtonForPay: true,
            showButtonForSignin: true,
            htmlContent: '',
            successView: false,
            downloadLink: "",
            discountPrice: "",
            monthyear: "",
            planType: "",
            fcmtoken: "",
        }
    }

    uncheck() {
        this.setState({ showTerms: false })
    }

    skipTerms() {
        this.setState({ isChecked: false }, () => this.props.navigation.replace('loginsignup'))
    }

    _keyboardDidHide() {
        Keyboard.dismiss()
    }

    checkTermsandCondition() {
        this.setState({ loading: true, showTerms: true }, () => {
            termsAndCondition((response, error) => {
                console.log("res", response);
                if (response != null) {
                    this.setState({ loading: false });
                    if (response.status === 1) {
                        this.setState({ htmlContent: response.data.termsConditions })
                    }
                    else {
                        alert("error " + JSON.stringify(response.message))
                        this.setState({ loading: false });
                    }
                }
                else {
                    this.setState({ loading: false });
                    alert('Something went wrong');
                }
            }
            )
        })
    }

    async componentDidMount() {
        this.getToken(); //To get Token
        this.getAllSubscriptionPlans(); //to get all subscription Plans
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected == true) { this.setState({ connection_Status: true }) }
            else { this.setState({ connection_Status: false }) }
        });
    }

    goToNext() {
        this.props.navigation.replace('login', { signedUp: true })
    }

    render() {
        const { loading } = this.state;
        return (
            this.state.successView ?
                <CustomSucessView onPressNext={() => this.goToNext()} />
                :
                <Swiper
                    key={this.state.currIndex}
                    index={this.state.currIndex}
                    style={style.wrapper}
                    scrollEnabled={false}
                    dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                    dotColor={"#d3d3d3"}
                    activeDotColor={"#0091ff"}>
                    <CustomEmailView
                        emailValue={this.state.emailid}
                        phoneValue={this.state.phone}
                        referralCodeValue={this.state.referralCode}
                        errorMessage={this.state.errorMessage}
                        onChangeText={(text) => this.checkInputs(text, this.state.phone, this.state.referralCode)}
                        emailvalid={this.state.emailvalids}
                        disabled={this.state.showButtonForDetail}
                        onPressBack={() => this.props.navigation.replace("loginsignup")}
                        onPressNext={() => this.validationEmail()}
                        onChangeTextOfPhone={(text) => this.checkInputs(this.state.emailid, text, this.state.referralCode)}
                        onChangeReferralCode={(text) => this.checkInputs(this.state.emailid, this.state.phone, text)}
                        borderColor={this.state.showButtonForDetail ? 'transparent' : 'black'}
                    />
                    <CustomDetailView
                        disabled={this.state.showButtonForPay}
                        borderColor={this.state.showButtonForPay ? 'transparent' : 'black'}
                        firstNameValue={this.state.firstname}
                        lastNameValue={this.state.lastname}
                        userNameValue={this.state.username}
                        passwordValue={this.state.password}
                        userDetailValid={this.state.userInfoValid}
                        onChangeText={(text) => this.validPhoneNumber(text)}
                        onChangeFirstName={(text) => this.checkUserDetailsinputs(text, this.state.lastname, this.state.username, this.state.password)}
                        onChangeLastName={(text) => this.checkUserDetailsinputs(this.state.firstname, text, this.state.username, this.state.password)}
                        onChangeUserName={(text) => this.checkUserDetailsinputs(this.state.firstname, this.state.lastname, text, this.state.password)}
                        onChangePasswrd={(text) => this.checkUserDetailsinputs(this.state.firstname, this.state.lastname, this.state.username, text)}
                        onPressNext={() => this.checkUserInfo()}
                        onSubmit={() => this._keyboardDidHide()}
                        onPressBack={() => this.setState({ currIndex: 0 })}
                    />
                    <CustomPaymentView
                        htmlData={this.state.htmlContent}
                        disabled={this.state.showButtonForSignin}
                        borderColor={this.state.showButtonForSignin ? 'transparent' : 'black'}
                        isChecked={this.state.isChecked}
                        uncheck={() => this.uncheck()}
                        showTerms={this.state.showTerms}
                        skipTerms={() => this.skipTerms()}
                        checkPress={() => this.checkTermsandCondition()}
                        paymentValid={this.state.paymentValid}
                        loading={loading}
                        onSubmit={() => this._keyboardDidHide()}
                        internet={this.state.internet}
                        validCardNumber={(text) => this.cardNumberValids(text)}
                        onChangemonthyear={(text) => this.handleChangeMonthYear(text)}
                        onChangeTextMonth={(text) => this.checkPaymentInputs(this.state.zipCode, this.state.cvv)}
                        onChangeTextYear={(text) => this.checkPaymentInputs(this.state.zipCode, this.state.cvv)}
                        onChangeTextZip={(text) => this.checkPaymentInputs(text, this.state.cvv)}
                        onChangeTextCvv={(text) => this.checkPaymentInputs(this.state.zipCode, text)}
                        checkTheTerms={() => this.setState({ isChecked: !this.state.isChecked })}
                        onPress={() => this.checkPayementInputs()}
                        creditCardValue={this.state.creditCard}
                        onPressBack={() => this.setState({ currIndex: 1 })}
                        monthValue={this.state.expiryMonth}
                        monthyearValue={this.state.monthyear}
                        yearValue={this.state.expiryYear}
                        cvvValue={this.state.cvv}
                        zipValue={this.state.zipCode}
                        monthSelected={this.state.monthSelected}
                        annualSelected={this.state.annualSelected}
                        freeSelected={this.state.freeTrail}
                        CheckIffreeSelected={() => this.checkFreeTrail()}
                        CheckIfMonthSelected={() => this.CheckIfMonthSelected(this.state.monthPlansData.subscriptionId)}
                        CheckIfAnnualSelected={() => this.CheckIfAnnualSelected(this.state.annualPlansData.subscriptionId)}
                        monthPlan={this.state.monthPlansData}
                        annualPlan={this.state.annualPlansData}
                    />
                </Swiper>
        );
    }

    // To check all payment inputs are valid or not
    checkPaymentInputs(zipCode, cvv) {
        this.setState({ cvv: cvv, zipCode: zipCode })
        if ((checkIfEmpty(this.state.creditCard) === false) && (checkIfEmpty(this.state.cvv) === false) && (checkIfEmpty(this.state.zipCode) === false)) {
            this.setState({ showButtonForSignin: false })
        }
        else {
            this.setState({ showButtonForSignin: true })
        }
    }

    // To check inputs are valid or not
    checkInputs(email, phone, code) {
        this.setState({
            phone: phone, emailid: email, referralCode: code
        });
        if ((checkIfEmpty(this.state.emailid) === false) && (checkIfEmpty(this.state.phone) === false)) {
            this.setState({ showButtonForDetail: false })
        }
        else {
            this.setState({ showButtonForDetail: true })
        }
    }

    // To check inputs are valid or not
    checkUserDetailsinputs(firstName, lastName, userName, password) {
        this.setState({ firstname: firstName, lastname: lastName, username: userName, password: password })
        if ((checkIfEmpty(this.state.firstname) === false) && (checkIfEmpty(this.state.lastname) === false) && (checkIfEmpty(this.state.username) === false) && (checkIfEmpty(this.state.password) === false)) {
            this.setState({ showButtonForPay: false })
        }
        else {
            this.setState({ showButtonForPay: true })
        }
    }

    // To validate the email
    validationEmail() {
        this.setState({ errorMessage: "", })
        if (checkIfEmpty(this.state.emailid)) {
            this.setState({ emailvalids: false });
            this.setState({ errorMessage: "Please Enter Your Email Address !" })
        }
        else if (checkEmailValid(this.state.emailid)) {
            this.setState({ emailvalids: false });
            this.setState({ errorMessage: "Please Enter Valid Email Address !" })
        }
        else {
            this.setState({ emailvalids: true }, () => this.validPhoneNumber());
        }
    }

    // To validate the phone number
    validPhoneNumber() {
        const { phone } = this.state;
        this.setState({ errorMessage: "", emailvalids: false })
        if (checkIfEmpty(this.state.phone)) {
            this.setState({ phonenovalid: false });
            this.setState({ errorMessage: "Please Enter Your Phone Number !" })
        }
        else if (checkTextLength(this.state.phone, 10)) {
            this.setState({ phonenovalid: false });
            this.setState({ errorMessage: "Please Enter Valid Phone Number !" })
        }
        else {
            this.setState({ loading: true });
            var phon = { phone: phone };
            checkPhoneno(phon, (response, error) => {
                console.log("res", response);
                if (error) {
                    alert('Unable to check, Please try again after sometime')
                }
                this.setState({ loading: false });
                if (response != null) {
                    if (response.status === 1) {
                        if (this.state.referralCode === '') {
                            this.setState({ currIndex: 1, showButton: true })
                            this.setState({ phonenovalid: true });
                        }
                        else {
                            this.setState({ emailvalids: false })
                            if (checkTextLength(this.state.referralCode, 6)) {
                                this.setState({ phonenovalid: false });
                                this.setState({ errorMessage: "Please Enter Valid Code !" })
                            }
                            else {
                                this.setState({ currIndex: 1, phonenovalid: true, }, () => AsyncStorage.setItem(AsyncStorageKyes.refferalCode, this.state.referralCode)
                                )
                            }
                        }
                    }
                    else {
                        this.setState({ loading: false });
                        this.setState({ errorMessage: response.message })
                    }
                }
                else {
                    this.setState({ loading: false });
                    Alert('', 'Unable to check, Please try after sometime');
                }
            }
            )
        }
    }

    // To get all subscription Plans 
    getAllSubscriptionPlans = () => {
        getAllSubscriptionPlans({ display: 'all' }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    this.setState({ monthPlansData: response.data.allPlans[0], annualPlansData: response.data.allPlans[1] });
                }
                else {
                    alert("error " + JSON.stringify(response.message))
                    this.setState({ loading: false });
                }
            }
            else {
                this.setState({ loading: false });
                alert('Something went wrong');
            }
        }
        )
    }
// To download the purchased Plans Document
    actualDownload = (link) => {
        const { fs } = RNFetchBlob;
        let downloads = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `JumpseatInvoice.pdf`,
                path: downloads + '/' + 'Jumpseat' + '.pdf',
            },
        })
            .fetch('GET', link, {})
            .then((res) => {
                console.log('The file saved to ', res.path());
            })
            .catch((e) => {
                console.log(e)
            });
    }

    // To check permission
    async checkPermission(link) {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage Permission",
                        message: "App needs access to memory to download the file "
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.actualDownload(link);
                } else {
                    Alert.alert(
                        "Permission Denied!",
                        "You need to give storage permission to download the file"
                    );
                }
            } catch (err) {
                console.warn(err);
            }
        }
        else {
            this.actualDownload(link);
        }
    }

    // To get Token
    async getToken() {
        let fcmToken = await firebase.messaging().getToken();
        this.setState({ fcmtoken: fcmToken }, () => {
            AsyncStorage.setItem(AsyncStorageKyes.FCM_TOKEN, fcmToken).then(() => {
                strings.FCM_TOKEN = this.state.token;
            })
        })
        console.log("fcm token register" + fcmToken)
    }

    // To check user informations 
    checkUserInfo() {
        if (checkIfEmpty(this.state.firstname)) {
            this.setState({ userInfoValid: true });
        }
        else if (checkIfEmpty(this.state.lastname)) {
            this.setState({ userInfoValid: true });
        }
        else if (checkIfEmpty(this.state.username)) {
            this.setState({ userInfoValid: true });
        }
        else if (checkIfEmpty(this.state.password)) {
            this.setState({ userInfoValid: true });
        }
        else {
            this.setState({ userInfoValid: false });
            this.setState({ currIndex: 3, });
        }
    }

    CheckIfMonthSelected(id) {
        if (((this.state.monthSelected === false) && (this.state.annualSelected === true)) || ((this.state.monthSelected === false)) || (this.state.freeTrail === true)) {
            this.setState({ monthSelected: true, annualSelected: false, freeTrail: false, selectedId: id })
        }
        else if (this.state.monthSelected) {
            this.setState({ monthSelected: false, annualSelected: false, selectedId: '' })
        }
    }
    
    CheckIfAnnualSelected(id) {
        if (((this.state.annualSelected === false) && (this.state.monthSelected === true)) || ((this.state.annualSelected === false)) || (this.state.freeTrail === true)) {
            this.setState({ annualSelected: true, monthSelected: false, freeTrail: false, selectedId: id })
        }
        else if (this.state.annualSelected) {
            this.setState({ annualSelected: false, monthSelected: false, selectedId: '' })
        }
    }

    checkFreeTrail() {
        if (this.state.freeTrail) {
            this.setState({ freeTrail: false })
        }
        else {
            this.setState({ freeTrail: true, annualSelected: false, monthSelected: false })
        }
    }

    purchaseUserSubscription = (token) => {
        this.setState({ loading: true })
        purchaseuserSubscription({ token: token, subscriptionId: this.state.selectedId }, (response, error) => {
            console.log("res", response);
            if (response != null) {
                this.setState({ loading: false });
                if (response.status === 1) {
                    this.setState({ successView: true, downloadLink: response.data.invoiceDownloadLink }, () => {
                        this.checkPermission(this.state.downloadLink)
                    })
                }
                else {
                    alert("error " + JSON.stringify(response.message))
                    this.setState({ loading: false });
                }
            }
            else {
                alert("Somethinbg went Wrong!")
                this.setState({ loading: false });
            }
        }
        )
    }

    async checkPayementInputs() {
        var cardNumberToSplit = this.state.creditCard
        var data = cardNumberToSplit.split('-');
        var creditCardNumber = data[0] + data[1] + data[2] + data[3]
        var dataa = this.state.monthyear
        var monthYearValues = dataa.split('/');
        const { emailid, phone, referralCode, firstname, lastname, username, password, fcmtoken, creditCard, cvv, expiryMonth, expiryYear, zipCode, connection_Status, isChecked, monthSelected, annualSelected, freeTrail, token } = this.state;
        if (checkIfEmpty(this.state.creditCard)) {
            this.setState({ paymentValid: true });
        }
        else if (checkIfEmpty(this.state.monthyear)) {
            this.setState({ paymentValid: true });
        }
        else if (checkIfEmpty(this.state.zipCode)) {
            this.setState({ paymentValid: true });
        }
        else if (checkIfEmpty(this.state.cvv)) {
            this.setState({ paymentValid: true });
        }
        else if (!isChecked) {
            this.setState({ paymentValid: true });
        }
        else if ((annualSelected) && (monthSelected)) {
            this.setState({ planType: '2' });
        }
        else if ((!annualSelected) && (!monthSelected) && (!freeTrail)) {
            this.setState({ paymentValid: true });
        }
        else {
            const token = await client.createToken({
                number: creditCardNumber,
                exp_month: monthYearValues[0],
                exp_year: monthYearValues[1],
                cvc: cvv,
            });
            this.setState({ paymentValid: false });
            this.setState({ loading: true });
            AsyncStorage.setItem(AsyncStorageKyes.User_name, firstname);
            var signupcomponent = {
                email: emailid, phone: phone,
                firstName: firstname, lastName: lastname, userName: username,
                password: password, cardLastFourNumber: data[3], cardToken: token.id,
                deviceToken: Platform.OS === 'ios' ? fcmtoken : fcmtoken, friendRefferalCode: referralCode, zipCode: zipCode
            };
            if (token.id !== undefined) {
                signUp(signupcomponent, (response, error) => {
                    console.log("res", response);
                    if (error) {
                        alert('Unable to register, Please try again after sometime')
                    }
                    this.setState({ loading: false });
                    if (response != null) {
                        this.setState({ showButtonForSignin: false })
                        if (response.status === 1) {
                            AsyncStorage.setItem('islogin', 'true').then(() => {
                                if (this.state.freeTrail === true) {
                                    this.setState({ successView: true })
                                }
                                else {
                                    this.purchaseUserSubscription(response.data.userToken)
                                }
                            })
                        }
                        else {
                            this.setState({ loading: false });
                            alert(response.message);
                        }
                    }
                    else {
                        this.setState({ loading: false });
                        Alert('', 'Unable to register, Please try after sometime');
                    }
                })
            } else {
                this.setState({ loading: false });
                alert("Error : " + token.error.message);
            }
        }
    }

    cardNumberValids = (text) => {
        this.setState({ creditCard: text })
        this.setState({ creditCard: checkCreditCardInput(text) });
    };

    handleChangeMonthYear = (text) => {
        let textTemp = text;
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
            textTemp = '';
        }
        if (textTemp.length === 2) {
            if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
                textTemp = textTemp[0]
            }
            else if (this.state.monthyear.length === 1) {
                textTemp += '/';
            }
            else {
                textTemp = textTemp[0]
            }
        }
        this.setState({ monthyear: textTemp })
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

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
}
//make this component available to the app
export default SignIn;