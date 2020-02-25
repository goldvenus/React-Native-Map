import EndPoint from "../../utils/EndPoint";


export const userdetail = (requestBody, callBack, ) => {


    fetch(EndPoint.USERDETAIL, {
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


export const updateProfile = (requestBody, callBack, ) => {
    fetch(EndPoint.EDITPROFILE, {
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
