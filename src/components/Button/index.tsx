// src/components/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fontScale, horizontalScale, verticalScale } from '../../utils/scale';
import { Fonts } from '../../utils/Fonts';
import Colors from '../../utils/color';

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button = ({
  title,
  onPress,
  backgroundColor = Colors.background,
  textColor = '#fff',
  style,
  textStyle,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[style, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={['#163A97', '#4364F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 49,
  },
  buttonText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.SemiBold,
    color: Colors.background,
  },
  disabled: {
    opacity: 0.6,
  },
});
