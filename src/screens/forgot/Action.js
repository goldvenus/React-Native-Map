import EndPoint from "../../utils/EndPoint";


export const forgotPassword = (requestBody, callBack) => {
    console.log("myparams",requestBody)
    fetch(EndPoint.FORGOT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then((responseJson) => {

            callBack(responseJson, null);
        })
        .catch((error) => {
            callBack(null, error);
        });
}




export const resendCode = (requestBody, callBack) => {

    fetch(EndPoint.RESENDOTP, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then((responseJson) => {

            callBack(responseJson, null);
        })
        .catch((error) => {
            callBack(null, error);
        });
}


export const resetUserPassword = (requestBody, callBack) => {
    fetch(EndPoint.RESETUSERPASSWORD, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then((responseJson) => {

             callBack(responseJson, null);
        })
        .catch((error) => {
              callBack(null, error);
        });
}