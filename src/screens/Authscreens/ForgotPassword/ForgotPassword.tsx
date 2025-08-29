import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import Button from '../../../components/Button';
import styles from './style';
import Input from '../../../components/Input';

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Please enter your email ID');
      return;
    }

    Alert.alert('Success', `A password reset link has been sent to ${email}`);
    navigation.navigate('EmailVerification');
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

        {/*  Custom Input for Email */}
        <Input
          label="Email ID"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your Email id"
        />

        {/*  Submit Button */}
        <Button title="Submit" onPress={handleForgotPassword} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Terms & Conditions <Text style={styles.dot}>•</Text> Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
