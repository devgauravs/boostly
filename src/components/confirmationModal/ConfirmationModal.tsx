import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontScale, horizontalScale, verticalScale } from '../../utils/scale';
import { Fonts } from '../../utils/Fonts';
import Colors from '../../utils/color';


interface ConfirmationModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: fontScale(20),
    fontFamily: Fonts.SemiBold,
    marginBottom: verticalScale(10),
  },
  modalMessage: {
    fontSize: fontScale(16),
    color: Colors.gray,
    textAlign: 'center',
    marginVertical: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 8,
    paddingVertical: verticalScale(10),
    marginRight: horizontalScale(5),
    alignItems: 'center',
  },
  cancelText: {
    color: Colors.red,
    fontFamily:Fonts.Bold,
    fontSize:fontScale(13)
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#039503',
    borderRadius: 8,
    paddingVertical: verticalScale(10),
    marginLeft: horizontalScale(5),
    alignItems: 'center',
  },
  confirmText: {
    color: Colors.background,
    fontFamily:Fonts.Bold,
    fontSize:fontScale(13)
  },
});
