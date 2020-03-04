import EndPoint from '../../utils/EndPoint';

export const signUp = (requestBody, callBack, ) => {
    fetch(EndPoint.SIGNUP, {
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


export const checkPhoneno = (requestBody, callBack, ) => {
    fetch(EndPoint.CHECKPHONENO, {
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

export const getAllSubscriptionPlans = (requestBody, callBack, ) => {
    fetch(EndPoint.GETALLSUBSCRIPTIONPLANS, {
        method: 'POST',
        headers: {
            Accept: 'application/json','Content-Type': 'application/json',
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

export const purchaseuserSubscription = (requestBody, callBack, ) => {
    //  alert(JSON.stringify(requestBody))
    fetch(EndPoint.PURCHASEUSERSUBSCRIPTION, {
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

export const termsAndCondition = (callBack) => {
    fetch(EndPoint.TEARMSCONDITIONS, 
        {
        method: 'POST',
        headers: 
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then((responseJson) => 
        {
            callBack(responseJson, null);
        })
        .catch((error) => 
        { 
            callBack(null, error);
        });
}
