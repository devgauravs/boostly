import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { fontScale, horizontalScale, verticalScale } from '../utils/scale';
import { Fonts } from '../utils/Fonts';
import Colors from '../utils/color';
import { leftArrow } from '../assets/images';
import { useNavigation } from '@react-navigation/native';

type BackButtonProps = {
  title: string;
};

const BackButton: React.FC<BackButtonProps> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: verticalScale(10),
        backgroundColor: 'white',
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          left: 15,
          bottom: 0,
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={leftArrow}
          style={{ height: verticalScale(20), width: horizontalScale(25) }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View />
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  headerText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
  },
});
