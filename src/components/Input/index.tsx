import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import styles from './style';

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
      <View style={styles.inputWrapper}>
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
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
