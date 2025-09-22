import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../utils/color';
import styles from './style';
import { eye_hidden, eye_visible } from '../../assets/images';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureText?: boolean;
  wrapperStyle?: object;
  suffix?: React.ReactNode;
  borderRadius?:number
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  borderRadius,
  secureText = false,
  wrapperStyle, // use this
  suffix,
  secureTextEntry, // Extract this from rest props
  ...rest
  
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // Determine if secure text functionality should be enabled
  const isSecureTextEnabled = secureText === true || secureTextEntry === true;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

        <View style={[styles.inputWrapper,{borderRadius}]}>
          {suffix}

          <TextInput
            style={[styles.input, wrapperStyle]}
            placeholderTextColor={Colors.lightGrey}
            secureTextEntry={isSecureTextEnabled ? !isPasswordVisible : false}
            {...rest}
          />
          {isSecureTextEnabled && (
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              <Image
                source={isPasswordVisible ? eye_visible : eye_hidden}
                resizeMode="contain"
                style={{ height: 17, width: 17 }}
              />
            </TouchableOpacity>
          )}
        </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
