import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../../screens/Authscreens/SignUp/Signup';
import SignIn from '../../screens/Authscreens/SignIn/Signin';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
