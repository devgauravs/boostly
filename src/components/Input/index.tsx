import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../utils/color';
import styles from './style';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureText?: boolean;
  wrapperStyle?: object;
  suffix?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  secureText = false,
  wrapperStyle, // use this
  suffix,
  ...rest


}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, wrapperStyle]}>
        <TextInput
          style={styles.input}
          secureTextEntry={secureText && !isPasswordVisible}
          {...rest}
        />
        {secureText && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.toggle}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <LinearGradient
        colors={['#163A97', '#2A4BC7', '#4364F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View style={styles.inputWrapper}>
          {suffix}
          <TextInput
            style={styles.input}
            // secureTextEntry={secureText && !isPasswordVisible}
            placeholderTextColor={Colors.lightGrey}
            {...rest}
          />
          {/* {secureText && (
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              <Text style={styles.toggle}>
                {isPasswordVisible ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          )} */}
        </View>
      </LinearGradient>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
