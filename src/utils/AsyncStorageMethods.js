import AsyncStorage from '@react-native-community/async-storage';

const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error)
    }
}

const _retrieveData = (key) => {
    try {
        return AsyncStorage.getItem(key);
    } catch (error) {
        // Error retrieving data
        console.log('retrieve Async storage', error)
    }
}

const _multiRemove = (keys) => AsyncStorage.multiRemove(keys)



export {
    _storeData,
    _multiRemove,
    _retrieveData,
}