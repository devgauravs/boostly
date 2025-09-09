import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
     width: 250,
    height: 150,
    alignSelf: 'center',
    marginTop: -70,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    borderRadius: 8,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#3d80f5ff',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  verifyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
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
    fontSize: 14,
    color: '#5634eeff',
  },
  dot: {
    fontSize: 18,
    color: '#777',
  },
});

export default styles;
