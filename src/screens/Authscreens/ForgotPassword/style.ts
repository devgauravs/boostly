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
    borderWidth: 1,
    borderColor: 'rgba(88, 52, 250, 1)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    borderRadius: 10,
  },
  backToSignIn: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 20,
    color: '#01060aff',
  },
  dot: {
    color: '#8260fdff',
  },
  logo: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    marginTop: -70,
    marginBottom: 30, // Increased space between logo and form
  },

 footer: {
    position: 'absolute',
    bottom: -190,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
  },
  footerText: {
    color: '#8260fdff',
    fontSize: 13,


}});

export default styles;
