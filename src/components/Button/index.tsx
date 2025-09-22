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
import { Fonts } from '../../utils/Fonts';
import Colors from '../../utils/color';
import { fontScale, verticalScale } from '../../utils/scale';

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  title,
  onPress,
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
      style={[styles.button, style, disabled && styles.disabled]}
    >
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.background} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(45),
    backgroundColor:"#2A4C8E"
  },
  buttonText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.SemiBold,
  },
  disabled: {
    opacity: 0.6,
  },
});
