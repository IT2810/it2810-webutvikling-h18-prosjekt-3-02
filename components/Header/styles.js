import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

const styles = EStyleSheet.create({
    container:{
        position : 'absolute',
        left : 0,
        right: 0,
        top: 0,
        '@media ios':{
            paddingTop: 20,
        },
        '@media android':{
            paddingTop: StatusBar.currentHeight,
        },
    },
    button: {
        alignSelf: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    icon: {
        width: 20,
    },

});

export default styles;