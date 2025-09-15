import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Fonts } from '../../utils/Fonts';
import { fontScale } from '../../utils/scale';
import { congrats } from '../../assets/images';
import Colors from '../../utils/color';

interface CongratulationModalProps {
  visible: boolean;
  points?: number; // new prop for points earned
  onClose: () => void;
}

const CongratulationModal: React.FC<CongratulationModalProps> = ({
  visible,
  points = 0,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={congrats}
            style={styles.image}
          />
          <Text style={styles.title}>🎉 Congratulations!</Text>
          <Text style={styles.message}>
            You just earned {points} points for approving this post. Your updated balance has been added.
          </Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
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
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    fontSize: fontScale(15),
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#039503',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.background,
    fontFamily: Fonts.SemiBold,
    fontSize: fontScale(15),
  },
});

export default CongratulationModal;
