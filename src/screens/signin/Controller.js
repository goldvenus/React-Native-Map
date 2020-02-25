export function checkIfEmpty(value) {
    if (value.length === 0) {
        return true
    }
    else {
        return false;
    }
}

export function checkTextLength(value, lengthh) {
    if (value.length < lengthh) {
        return true
    }
    else
        return false;
}

export function checkEmailValid(value) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(value) === true) {
        return false
    }
    else {
        return true
    }
}

export function checkCreditCardInput(value) {
    let formattedText = value.split("-").join("");
    if (formattedText.length > 0) {
        formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join("-");
    }
    return formattedText;

}

export function isInputNumber(value) {
    if (!isNaN(value)) {
        return true
    } else {
        return false
    }
}




