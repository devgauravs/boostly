import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Fonts } from '../../utils/Fonts';
import { fontScale, verticalScale } from '../../utils/scale';
import { congrats, right } from '../../assets/images';
import Colors from '../../utils/color';
import Button from '../Button';

interface CongratulationModalProps {
  visible: boolean;
  points?: number; // Points earned
  onClose: () => void;
  pendingPoints?:number;
  totalPoints?:number
}

const CongratulationModal: React.FC<CongratulationModalProps> = ({
  visible,
  points = 0,
  onClose,
  pendingPoints=0,
  totalPoints=0
}) => {

  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.congrats}>Congratulations!</Text>

          <Text style={styles.subtitle}>You just earned</Text>
          <Text style={styles.points}>{points} points</Text>
          <Text style={styles.subtitle}>for approving this post</Text>

          <Image source={right} style={styles.image} />

          {/* <Text style={styles.totalPoints}>{totalPoints} points</Text> */}
          <Text style={styles.subtitle}>{pendingPoints} points pending</Text>

          <Button title="Done" onPress={onClose} style={styles.button} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  congrats: {
    fontSize: fontScale(25),
    fontFamily: Fonts.Bold,
    color: Colors.primaryBlack,
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: fontScale(18),
    fontFamily: Fonts.Medium,
    color: Colors.primaryBlack,
    marginBottom: verticalScale(5),
  },
  points: {
    fontSize: fontScale(25),
    fontFamily: Fonts.Bold,
    color: Colors.primaryBlack,
    marginBottom: verticalScale(10),
  },
  totalPoints: {
    fontSize: fontScale(20),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
    marginBottom: verticalScale(5),
  },
  image: {
    height: 90,
    width: 90,
    resizeMode: 'contain',
    marginVertical: verticalScale(10),
  },
  button: {
    width: '80%',
    marginTop: verticalScale(20),
  },
});

export default CongratulationModal;
