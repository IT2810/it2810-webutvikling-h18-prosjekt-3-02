import {createStackNavigator} from 'react-navigation';
import HomeScreen from "../screens/HomeScreen";
import NoteScreen from "../screens/NoteScreen";

const Nav = createStackNavigator({
  Home: { screen: HomeScreen },
  NewNote: { screen: NoteScreen }
});

export default Nav;