import { Constants, Location, Permissions } from 'expo';
import * as GeoFencing from "react-native-geo-fencing";
//import home from '../constants/Polygon'
const home = [
    [59.992214, 10.899887],
    [59.994523, 10.899887],
    [59.994523, 10.905118],
    [59.992214, 10.905118],
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
        return (point['lat'] > home[0][0] && point['lat'] < home[1][0]) && (point['lng'] > home[1][1] && point['lng'] < home[3][1]);
    };

}