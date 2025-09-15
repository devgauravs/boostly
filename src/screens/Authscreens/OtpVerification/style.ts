import { StyleSheet } from 'react-native';
import Colors from '../../../utils/color';
import { fontScale, horizontalScale, verticalScale } from '../../../utils/scale';
import { Fonts } from '../../../utils/Fonts';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: fontScale(26),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
   
  },
  description: {
    fontSize: fontScale(14),
    color: Colors.primaryBlack,
    marginBottom: verticalScale(30),
    fontFamily: Fonts.SemiBold,

  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: horizontalScale(30),
    height: verticalScale(42),
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 8,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#3d80f5ff',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  verifyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
  },
  footerText: {
    fontSize: 14,
    color: '#5634eeff',
  },
  dot: {
    fontSize: 18,
    color: '#777',
  },
});

export default styles;
