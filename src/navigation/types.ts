import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainStackProps={
    SignUp:undefined;
    SignIn:undefined ;
    ForgotPassword: undefined;
    OtpVerification : undefined ;
    EmailVerification : undefined ;
    ResetPassword: undefined;
}

export type RouteStack=NativeStackNavigationProp<MainStackProps>