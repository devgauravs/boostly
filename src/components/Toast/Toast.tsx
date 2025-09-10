import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { fontScale, horizontalScale, verticalScale } from '../../utils/scale';
import Colors from '../../utils/color';
import { Fonts } from '../../utils/Fonts';



export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={{ paddingHorizontal: horizontalScale(15) }}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={{ paddingHorizontal: horizontalScale(15) }}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  custom: ({ text1, text2 }) => (
    <View style={styles.customToast}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: '#4BB543',
    borderRadius: 8,
    paddingVertical: verticalScale(10),
  },
  errorToast: {
    borderLeftColor: '#FF3333',
    borderRadius: 8,
    paddingVertical: verticalScale(10),
  },
  customToast: {
    backgroundColor: Colors.primaryBlue,
    padding: horizontalScale(15),
    borderRadius: 8,
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(12),
  },
  text1: {
    fontSize: fontScale(14),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
  },
  text2: {
    fontSize: fontScale(12),
    fontFamily: Fonts.Medium,
    color: Colors.primaryBlack,
  },
});
