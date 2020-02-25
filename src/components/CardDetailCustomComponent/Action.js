import EndPoint from "../../utils/EndPoint";


export const userCarddetail = (requestBody, callBack, ) => {
    console.log("mine := " + JSON.stringify(requestBody))

    fetch(EndPoint.VIEWCARD, {
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


export const addCardDetail = (requestBody, callBack, ) => {
    //   alert("res : "+ JSON.stringify(requestBody))
    // var mydata=JSON.stringify(requestBody)
    // alert(mydata)
    fetch(EndPoint.ADDCARD, {
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


export const submitContactUs = (requestBody, callBack, ) => {
    console.log("res : " + JSON.stringify(requestBody))
    fetch(EndPoint.CONTACTUS, {
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

export const viewInviteCode = (requestBody, callBack) => {
    fetch(EndPoint.INVITECODE, {
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

export const logoutUser = (requestBody, callBack) => {
    fetch(EndPoint.LOGOUT, {
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


export const deleteCardDetail = (requestBody, callBack, ) => {
    console.log("for token :" + JSON.stringify(requestBody))
    fetch(EndPoint.DELETECARD, {
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