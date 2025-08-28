import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: 'rgba(42, 91, 228, 1)',
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
    color: '#314ce6c9', 
    fontSize: 13,
  },
  dot: {
    marginHorizontal: 6,
    color: '#999',
  },
  logo: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    marginTop: -70,
    marginBottom: 30,
  },
  existingUserText: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 20,
    color: '#01060aff',
  },

  signUpButton: {
    borderWidth: 1,
    borderColor: 'rgba(88, 52, 250, 1)',
    backgroundColor: 'transparent',
    borderRadius: 50,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: 'rgba(88, 52, 250, 1)', 
    fontSize: 16,
    fontWeight: '600',
  },
});
