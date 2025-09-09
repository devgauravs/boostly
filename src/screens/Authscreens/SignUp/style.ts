
import { StyleSheet } from 'react-native';

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
});
