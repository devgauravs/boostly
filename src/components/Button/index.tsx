// src/components/Button.tsx
import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../utils/Fonts';
import Colors from '../../utils/color';
import { fontScale } from '../../utils/scale';

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  gradientColors?: string[];
  loading?: boolean;
}

const Button = ({
  title,
  onPress,
  gradientColors = ['#163A97', '#4364F7'],
  backgroundColor = Colors.background,
  textColor = '#fff',
  style,
  textStyle,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[style, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size={'small'} color={Colors.background} />
        ) : (
          <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
            {title}
          </Text>
        )}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
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
