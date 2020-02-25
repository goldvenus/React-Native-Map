import EndPoint from '../../utils/EndPoint';

export const loginUser = (requestBody, callBack) => {
    // alert(JSON.stringify(requestBody))
    fetch(EndPoint.LOGIN, 
        {
        method: 'POST',
        headers: 
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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

















