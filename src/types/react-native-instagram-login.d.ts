declare module 'react-native-instagram-login' {
  import * as React from 'react';
  import { ViewStyle } from 'react-native';

  export interface InstagramLoginProps {
    ref?: React.Ref<any>;
    appId: string;
    appSecret: string;
    redirectUrl: string;
    scopes?: string[];
    onLoginSuccess?: (token: string) => void;
    onLoginFailure?: (data: any) => void;
    style?: ViewStyle;
  }

  export default class InstagramLogin extends React.Component<InstagramLoginProps> {
    show(): void;
    close(): void;
  }
}
