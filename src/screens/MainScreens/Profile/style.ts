import { Dimensions, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../utils/scale';
import Colors from '../../../utils/color';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: Dimensions.get('screen').height * 0.09,
  },

  topHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#08090aff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },

  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
    marginTop: verticalScale(5),
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#2E44FF',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: Colors.gray2,
    width: horizontalScale(26),
    height: verticalScale(22),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIconImage: {
    width: horizontalScale(12),
    height: verticalScale(12),
    tintColor: Colors.primaryBlack,
    resizeMode: 'contain',
  },

  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    height: 45,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 12,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  saveButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#6070ffff',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  saveText: {
    color: '#2357c7ff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },

  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  logout: {
    borderColor: Colors.primaryBlack,
    borderWidth: 1,
    width: horizontalScale(50),
    alignItems: 'center',
    padding: 2,
    borderRadius: 2,
  },
});

export default styles;
