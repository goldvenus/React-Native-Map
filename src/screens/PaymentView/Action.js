import EndPoint from "../../utils/EndPoint";


export const getAllSubscriptionPlans = (requestBody, callBack, ) => {
   
    fetch(EndPoint.GETALLSUBSCRIPTIONPLANS, {
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

export const purchaseuserSubscription = (requestBody, callBack, ) => {
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


