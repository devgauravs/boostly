// src/screens/Auth/SignUp.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import { LOGO } from '../../../assets/images';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './style';
import { RouteNames } from '../../../navigation/routeNames';

const SignUp = () => {
  const navigation = useNavigation<RouteStack>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }

    Alert.alert('Success', `Signed up with ${email}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Signup</Text>

        <Input
          label="Email ID"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder=""
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Type here....."
        />

        <Button title="Signup" onPress={handleSignUp} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <Text style={styles.dot}>Terms & Conditions</Text>
            <Text style={styles.dot}> & Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
