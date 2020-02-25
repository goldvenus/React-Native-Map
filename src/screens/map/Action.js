import EndPoint from "../../utils/EndPoint";

export const getAirportsList = (requestBody, callBack, ) => {
    //  alert("requestBody " +JSON.stringify(requestBody))
    fetch(EndPoint.GETAIRPORTS, {
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
         // callBack(null, error);
        });
}

export const viewPlannedFlights = (requestBody, callBack, ) => {
    fetch(EndPoint.VIEWPLANNEDFLIGHTS, {
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


export const addPlannedFlight = (requestBody, callBack, ) => {
    fetch(EndPoint.ADDPLANNEDFLIGHT, {
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
    // alert("here 123243 "+ JSON.stringify(requestBody))
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

export const getNearByAirports = (requestBody, callBack, ) => {
    console.log("here  123 " + JSON.stringify(requestBody))
    fetch(EndPoint.GETNEARBYAIRPORTS, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then((responseJson) => {
            console.log("here  123 " + JSON.stringify(responseJson))
            callBack(responseJson, null);
        })
        .catch((error) => {
            console.log(error.message)
            callBack(null, error);
        });
}


export const toDeletePlannedFlight = (requestBody, callBack, ) => {
    fetch(EndPoint.DELETEPLANNEDFLIGHTS, {
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


export const viewEditPlannedFlights = (requestBody, callBack, ) => {
    fetch(EndPoint.VIEWEDITPLANNEDFLIGHTS, {
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

export const getAirportReports = (requestBody, callBack, ) => {
 
    fetch(EndPoint.GETAIRPORTREPORTS, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then((responseJson) => {
            //  alert("show " +JSON.stringify(responseJson) +" token "+JSON.stringify(requestBody)) 
            callBack(responseJson, null);
        })
        .catch((error) => {
            // alert(error.message)
            callBack(null, error);
        });
}


export const editPlannedFlights = (requestBody, callBack, ) => {
    // alert("mine" +JSON.stringify(requestBody))
    fetch(EndPoint.EDITPLANNEDFLIGHTS, {
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

export const likeDislikeFlag = (requestBody, callBack, ) => {
    console.log("here " + JSON.stringify(requestBody))
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

