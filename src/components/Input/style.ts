import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
    fontFamily : "Poppins-Regular"
  },
  inputWrapper: {           
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(56, 130, 240, 1)',
    borderWidth: 1,
   
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,                
    height: 48,
    fontSize: 16,
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
