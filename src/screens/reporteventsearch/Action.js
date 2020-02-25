import EndPoint from "../../utils/EndPoint";

export const getAirportsFilterSearchList = (requestBody, callBack, ) => {

    fetch(EndPoint.GETAIRPORTBYSEARCH, {
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


