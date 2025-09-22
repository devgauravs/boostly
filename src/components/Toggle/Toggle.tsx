import ToggleSwitch from 'toggle-switch-react-native';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { fontScale, horizontalScale, verticalScale } from '../../utils/scale';
import { Fonts } from '../../utils/Fonts';
import Colors from '../../utils/color';

interface ToggleProps {
  value: boolean;                  // controlled value
  onToggle: (value: boolean) => void;
}

const Toggle = ({ value, onToggle }: ToggleProps) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = (value: boolean) => {
    setIsOn(value);
    onToggle(value); // call ApproveAll logic
  };

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Auto Approvel</Text>
      <View style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}>
    <ToggleSwitch
        isOn={value}             // 👈 comes only from parent
        onColor="green"
        offColor="grey"
        size="medium"
        onToggle={onToggle}      // 👈 don’t flip internally
      />
      </View>
    </View>
  );
};

export default Toggle;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 10,
    marginVertical: verticalScale(10),
  },
  footerText: {
    fontSize: fontScale(22),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
  },
});
