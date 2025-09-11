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
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontScale(32),
    fontFamily: Fonts.SemiBold,
    marginBottom: verticalScale(20),
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
    marginBottom: verticalScale(22),
    color: Colors.primaryBlack,
    fontSize: fontScale(13),
    textDecorationLine: 'underline',
    fontFamily: Fonts.Regular,
  },
  signUpButton: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(5),
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
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(28),
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
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(20),
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: fontScale(14),
    fontFamily: Fonts.Medium,
    color: '#666',
  },
  activeTabText: {
    color: Colors.primaryBlack,
    fontFamily: Fonts.SemiBold,
  },
});

export default styles;
