import { createStackNavigator ,createAppContainer} from 'react-navigation';
import Home from './Home';
import AddNote from './AddNote';
import ViewNotes from './ViewNotes';
// const AppNavigator = createStackNavigator({
//     Home: { screen: Home },
//     AddNote: { screen: AddNote},
// });
const AppNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    AddNote: {
        screen: AddNote
    },
    ViewNotes: {
        screen: ViewNotes
    }
});

const AppNav = createAppContainer(AppNavigator)
export default AppNav;
