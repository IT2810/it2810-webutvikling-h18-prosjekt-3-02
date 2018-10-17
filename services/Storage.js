import {AsyncStorage} from 'react-native'



export const setItem = (key, value) =>{
    try {
       AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
         console.error('AsyncStorage#setItem error: ' + error.message);
    }
};

export const getItem = async(key)=> {
    return await AsyncStorage.getItem(key)
        .then((result) => {
            if (result) {
                try {
                    result = JSON.parse(result);
                } catch (e) {
                     console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
                }
            }
            return result;
        });
};

export const  removeItem = async(key)=> {
    return await AsyncStorage.removeItem(key);
};