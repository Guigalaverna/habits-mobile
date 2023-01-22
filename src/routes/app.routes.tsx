import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Habit} from "../screens/Habit";
import {Home} from "../screens/Home";
import {New} from "../screens/New";

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="habits" component={Home} />
      <Screen name="new-habit" component={New} />
      <Screen name="habit-details" component={Habit} />
    </Navigator>
  );
}
