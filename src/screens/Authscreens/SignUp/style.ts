import { StyleSheet } from 'react-native';
import { fontScale, verticalScale } from '../../../utils/scale';
import { Fonts } from '../../../utils/Fonts';
import Colors from '../../../utils/color';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 150, // Leave space for button & footer
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#333',
    marginBottom: 30,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 180, // Button is above footer
    left: 24,
    right: 24,
  },
  footer: {
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#8260fdff',
    textAlign: 'center',
  },
  dot: {
    marginHorizontal: 5,
    color: '#8f60fdff',
    fontSize: 16,
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
    paddingVertical: verticalScale(12),
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
