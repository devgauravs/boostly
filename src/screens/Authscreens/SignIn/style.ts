import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 50, 
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
    marginBottom: 20,
    color: '#01060aff',
    fontSize: 10,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  signUpText: {
    color: '#01060aff',
    fontSize: 12,
    fontWeight: '500',
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
    color: '#8260fdff',
    fontSize: 13,
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
    justifyContent: 'space-evenly', 
    marginTop: 20,
    marginBottom: 20, 
    width: '100%', 
  },
  icon: {
    width: 60, 
    height: 60, 
    resizeMode: 'contain', 
  },
});

export default styles;
