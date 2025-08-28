import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import { LOGO } from '../../../assets/images';

const SignUp = () => {
  const navigation = useNavigation<RouteStack>();
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Email validation
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
              Already have an account? <Text style={styles.dot}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    borderRadius: 5, // Rounded input fields for better UI
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
    color: '#8260fdff',
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
    marginBottom: 30, // Increased space between logo and form
  },
  existingUserText: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 20,
    color: '#01060aff',
  },
});

export default SignUp;
