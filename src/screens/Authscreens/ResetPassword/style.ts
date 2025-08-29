import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c6c6c',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontSize: 16,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#4A90E2',
    fontSize: 16,
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  socialLoginText: {
    fontSize: 16,
    color: '#6c6c6c',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});

export default styles;
