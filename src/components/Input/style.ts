import { StyleSheet } from 'react-native';
import { fontScale, verticalScale } from '../../utils/scale';
import Colors from '../../utils/color';
import { Fonts } from '../../utils/Fonts';

export default StyleSheet.create({
  container: {
    marginBottom: verticalScale(10),
  },
  label: {
    fontSize: fontScale(16),
    marginBottom: verticalScale(1),
    color: Colors.primaryBlack,
    fontFamily: Fonts.Medium,
  },
  gradientBorder: {
    borderRadius: 2,
    padding: 1, // This creates the border width
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.darkblue

  },
  input: {
    flex: 1,
    height: verticalScale(40),
    fontSize: 14,
    color: '#03070eff',


  },
  toggle: {
    color: '#007AFF',
    fontSize: 14,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});
