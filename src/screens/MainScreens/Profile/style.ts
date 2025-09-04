import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  // Profile Image Styles
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',  // Keeping it for the profile image positioning
  },
  profileImage: {
    width: 120,            // Size of the profile image
    height: 120,
    borderRadius: 60,      // Circular shape
    borderWidth: 3,
    borderColor: '#2E44FF', // Border color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  formContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2E44FF',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
