// src/components/CustomLoader.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Colors from '../utils/color';
import { verticalScale, horizontalScale } from '../utils/scale';

interface LoaderProps {
  visible: boolean;
  text?: string;
}

const CustomLoader: React.FC<LoaderProps> = ({ visible, text = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={Colors.purple} />
      </View>
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loaderBox: {
    width: horizontalScale(150),
    height: verticalScale(120),
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
