import {AsyncStorage} from 'react-native'

export default {
    async setItem(key, value) {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify((value)));
        } catch (error) {
            console.error('Storage-setITem: ' + error.message);
        }
    },
    async getItem(key) {
        return await AsyncStorage.getItem(key)
            .then((result) => {
                if (result) {
                    try {
                        result = JSON.parse(result);
                    } catch (error) {
                        console.error('Storage-getITem: ' + error.message)
                    }
                }
                return result
            });
    },
    async removeItem(key) {
        return await AsyncStorage.removeItem(key);
    }
}