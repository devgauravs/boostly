import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Button from '../../../components/Button';
import styles from './style'; // Correct path to style.ts

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Please enter your email ID');
      return;
    }

    Alert.alert('Success', `A password reset link has been sent to ${email}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Forgot Password</Text>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email ID</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your Email id "
            placeholderTextColor="#999"
          />
        </View>

        {/* Submit Button */}
        <Button title="Submit" onPress={handleForgotPassword} />

        {/* Back to Sign In */}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.backToSignIn}>
            Back to <Text style={styles.dot}>Sign In</Text>
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Terms & Conditions <Text style={styles.dot}>•</Text> Privacy
              Policy
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
