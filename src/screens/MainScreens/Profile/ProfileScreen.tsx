import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './style';

// Placeholder for user's data (this could come from an API or Redux state)
const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('Nexa');
  const [email, setEmail] = useState('nexa@example.com');
  const [phone, setPhone] = useState('+1 555-4352');

  const handleSave = () => {
    // Handle the logic for saving the data
    console.log('Data saved:', { name, email, phone });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../../assets/images/Profile.png')} // Your profile image
          style={styles.profileImage}
        />
      </View>

      {/* Profile Fields */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.sectionTitle}>Your Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.sectionTitle}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
