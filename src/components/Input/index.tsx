import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { colors } from '../../config/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureText?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  secureText = false,
  ...rest
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <LinearGradient
        colors={['#163A97', '#2A4BC7', '#4364F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            // secureTextEntry={secureText && !isPasswordVisible}
            placeholderTextColor={colors.lightGrey}
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
