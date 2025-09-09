import { StyleSheet } from 'react-native';
import Colors from '../../../utils/color';
import { fontScale, verticalScale } from '../../../utils/scale';
import { Fonts } from '../../../utils/Fonts';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontScale(32),
    fontFamily: Fonts.SemiBold,
    marginBottom: verticalScale(43),
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 2,
    borderColor: 'rgba(90, 56, 240, 1)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: verticalScale(20),
    color: Colors.primaryBlack,
    fontSize: fontScale(13),
    textDecorationLine: 'underline',
    fontFamily: Fonts.Regular,
  },
  signUpButton: {
    alignSelf: 'flex-end',
    marginTop: 50,
  },
  signUpText: {
    color: Colors.primaryBlack,
    fontSize: fontScale(16),
    fontFamily: Fonts.SemiBold,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 6,
    marginTop: verticalScale(18),
  },
  footerText: {
    color: Colors.purple,
    fontSize: 12,
    fontFamily: Fonts.Regular,
  },
  dot: {
    marginHorizontal: 6,
    color: '#999',
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginTop: -70,
    marginBottom: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(38),
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 17,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  button: {
    borderRadius: 2,
    width: '100%',
    height: verticalScale(35),
  },
});

export default styles;
