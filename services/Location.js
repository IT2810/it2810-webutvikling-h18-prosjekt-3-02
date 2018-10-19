import { Constants, Location, Permissions } from 'expo';
import * as GeoFencing from "react-native-geo-fencing";
//import home from '../constants/Polygon'
const glos = [
    [63.413432, 10.396839],
    [63.420896, 10.396839],
    [63.420896, 10.410743],
    [63.413432, 10.410743],
];

export default class Loc {

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        let point = await {
            lat: location['coords']['latitude'],
            lng: location['coords']['longitude']
        };
        return (point['lat'] > glos[0][0] && point['lat'] < glos[1][0]) && (point['lng'] > glos[1][1] && point['lng'] < glos[3][1]);
    };

}