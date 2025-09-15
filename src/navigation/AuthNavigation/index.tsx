import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../../screens/Authscreens/SignUp/Signup';
import SignIn from '../../screens/Authscreens/SignIn/Signin';
import ForgotPassword from '../../screens/Authscreens/ForgotPassword/ForgotPassword';
import OtpVerification from '../../screens/Authscreens/OtpVerification/OtpVerification';
import { RouteNames } from '../routeNames';
import EmailVerification from '../../screens/Authscreens/EmailVerification/EmailVerification';
import ResetPassword from '../../screens/Authscreens/ResetPassword/ResetPassword';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RouteNames.SignIn}
    >
      <Stack.Screen name={RouteNames.SignUp} component={Signup} />
      <Stack.Screen name={RouteNames.SignIn} component={SignIn} />
      <Stack.Screen
        name={RouteNames.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={RouteNames.OtpVerification}
        component={OtpVerification}
      />
      <Stack.Screen
        name={RouteNames.EmailVerification}
        component={EmailVerification}
      />
      <Stack.Screen name={RouteNames.ResetPassword} component={ResetPassword} />
    </Stack.Navigator>
  );
}
