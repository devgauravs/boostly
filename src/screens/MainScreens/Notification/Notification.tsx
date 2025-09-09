import { View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../utils/color';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/scale';
import { postImage } from '../../../assets/images';
import { Fonts } from '../../../utils/Fonts';
import Button from '../../../components/Button';

const Notification = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:fontScale(40),fontFamily:Fonts.Medium,marginBottom:verticalScale(0)}}>New post</Text>
      <View style={styles.box}>
        <View style={styles.innerBox}>
          <Image source={postImage} style={styles.image} resizeMode="contain" />
          <Text style={styles.postText}>New collection now available!</Text>
          <Button title="Approve" style={styles.button} />
          <Button title="Reject" textColor={Colors.red} style={styles.rejectButton} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    marginBottom:verticalScale(70)
  },
  box: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(20),
    // Android shadow
    elevation: 5,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: verticalScale(350),
  },
  innerBox: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '90%',
    height: verticalScale(200),
  },
  postText: {
    fontSize: fontScale(18),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
    marginTop: verticalScale(2),
  },
  button: {
    height: verticalScale(35),
    backgroundColor: Colors.primaryGreen,
    width: horizontalScale(250),
    borderRadius: 2,
  },
  rejectButton: {
    height: verticalScale(35),
    borderColor: Colors.red,
    borderWidth:1,
    width: horizontalScale(250),
    borderRadius: 2,
    marginTop:verticalScale(10)
  },
});
