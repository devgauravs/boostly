import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import { LOGO } from '../../../assets/images';
import { styles } from './style';
import Container from '../../../components/Container';
const SignUp = () => {
  const navigation = useNavigation<RouteStack>();
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!email) {
      Alert.alert('Please enter your email ID');
      return;
    }
    if (!password) {
      Alert.alert('Please enter your password');
      return;
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }

    Alert.alert(
      'Success',
      `Email: ${email}\nPassword: ${'*'.repeat(password.length)}`,
    );
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Sign Up</Text>

        {/* Email ID */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email ID</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            maxLength={50}
            placeholder="example@example.com"
            placeholderTextColor="#999"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Type here..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Sign Up Button */}
        <Button title="Sign Up" onPress={handleSignUp} />

        {/* Footer (Terms & Conditions) */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <Text style={styles.dot}>Terms & Conditions</Text> and
            <Text style={styles.dot}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Existing User? */}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.existingUserText}>
            Already have an account?
            <Text style={styles.dot}> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
