import EndPoint from "../../utils/EndPoint";


export const submitReport = (requestBody, callBack, ) => {

    fetch(EndPoint.SUBMITEVENTREPORT, {
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


