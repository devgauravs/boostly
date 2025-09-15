
import { StyleSheet } from 'react-native';
import Colors from '../../../utils/color';
import { fontScale, verticalScale } from '../../../utils/scale';
import { Fonts } from '../../../utils/Fonts';
export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
  },

  ForgotLable: {
    fontSize: fontScale(26),
    fontFamily: Fonts.SemiBold,
    marginBottom: verticalScale(10),
    textAlign: 'left',
  }
});

