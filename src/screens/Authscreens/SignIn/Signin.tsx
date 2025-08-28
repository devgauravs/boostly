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
import InstagramIcon from '../../../assets/icons/instagram.png';
import FacebookIcon from '../../../assets/icons/facebook.png';
import YoutubeIcon from '../../../assets/icons/youtube.png';

const SignIn = () => {
  const navigation = useNavigation<RouteStack>();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!phone) {
      Alert.alert('Please enter your phone number');
      return;
    }
    if (!password) {
      Alert.alert('Please enter your password');
      return;
    }

    Alert.alert(
      'Success',
      `Phone: ${phone}\nPassword: ${'*'.repeat(password.length)}`,
    );
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Sign In</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={15}
              placeholder="000-000"
              placeholderTextColor="#999"
            />
          </View>

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

          <TouchableOpacity
            onPress={() => Alert.alert('Forget password is pressed')}
          >
            <Text style={styles.forgotPassword}>Forget Password?</Text>
          </TouchableOpacity>

          <Button title="Sign In" onPress={handleSignIn} />

          <View style={styles.iconContainer}>
            <Image source={InstagramIcon} style={styles.icon} />
            <Image source={FacebookIcon} style={styles.icon} />
            <Image source={YoutubeIcon} style={styles.icon} />
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Terms & Conditions <Text style={styles.dot}>•</Text> Privacy
              Policy
            </Text>
          </View>
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
    marginBottom: 50, // Reduced the bottom margin to move logo up
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
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#01060aff',
    fontSize: 10,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  signUpText: {
    color: '#01060aff',
    fontSize: 12,
    fontWeight: '500',
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
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginTop: -70, // Reduced top margin to keep the logo in place
    marginBottom: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Evenly space out the icons
    marginTop: 20,
    marginBottom: 20, // Maintain spacing between icons and other content
    width: '100%', // You can adjust the width if necessary
    alignSelf: 'center',
  },

  icon: {
    width: 60, // Increased size of icons (from 40 to 60)
    height: 60, // Increased size of icons (from 40 to 60)
    resizeMode: 'contain', // Ensure the aspect ratio of the icons is maintained
  },
});

export default SignIn;
