import EndPoint from '../../utils/EndPoint';

export const  getGlobalEventsFeed = (requestBody, callBack, ) => {
    console.log("token : "+ JSON.stringify(requestBody))
    fetch(EndPoint.EVENTSFEED, {
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

export const  getFavouriteEventsFeed = (requestBody, callBack, ) => {
    console.log("token : "+ JSON.stringify(requestBody))
    fetch(EndPoint.EVENTSFEED, {
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

export const  viewUserFavouriteAirports = (requestBody, callBack, ) => {
    fetch(EndPoint.VIEWUSERFAVOURITEAIRPORTS, {
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

export const  likeDislikeFlag = (requestBody, callBack, ) => {
    console.log("here " +JSON.stringify(requestBody))  
    fetch(EndPoint.LIKEDISLIKEFLAG, {
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

export const viewFavouriteUserAirports = (requestBody, callBack, ) => {
     fetch(EndPoint.VIEWUSERFAVOURITEAIRPORTS, {
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

export const addFavouriteAirports = (requestBody, callBack, ) => {
    // alert("error " + JSON.stringify(requestBody))
    fetch(EndPoint.ADDDELETEUSERFAVOURITEAIRPORT, {
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
