// src/screens/Auth/SignUp.tsx

import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteStack } from '../../../navigation/types';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './style';
import AuthScreenWrapper from '../AuthScreenWrapper';
import CountryPicker from '../../../components/CountryPicker';
import * as yup from 'yup';
import {
  signUpValidationSchema,
  validateAtLeastOneContact,
  validateEmail,
  validatePhone,
} from './validation';
import { RegisterData } from '../../../services/AuthService/types';
import { verticalScale } from '../../../utils/scale';

const SignUp = () => {
  const navigation = useNavigation<RouteStack>();
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedTab, setSelectedTab] = useState<'email' | 'phone'>('email');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const currentEmail = selectedTab === 'email' ? inputValue : emailValue;
      const currentPhone = selectedTab === 'phone' ? inputValue : phoneValue;

      const contactValidationError = validateAtLeastOneContact(
        currentEmail,
        currentPhone,
      );
      if (contactValidationError) {
        setErrors({ inputValue: contactValidationError });
        return;
      }

      const emailError = validateEmail(currentEmail);
      const phoneError = validatePhone(currentPhone);

      if (emailError || phoneError) {
        setErrors({
          inputValue:
            selectedTab === 'email' ? emailError || '' : phoneError || '',
        });
        return;
      }

      const formData = {
        inputValue,
        firstName,
        lastName,
        password,
        selectedTab,
        ...(selectedTab === 'phone' && { countryCode }),
        ...(currentEmail && { email: currentEmail }),
        ...(currentPhone && { phone: currentPhone }),
      };

      await signUpValidationSchema.validate(formData, { abortEarly: false });

      const contactInfo =
        currentEmail && currentPhone
          ? `email: ${currentEmail} and phone: +${countryCode}${currentPhone}`
          : currentEmail
          ? `email: ${currentEmail}`
          : `phone: +${countryCode}${currentPhone}`;

      handleRegister(formData);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        validationError.inner.forEach(error => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = (formData: any) => {
    const registrationPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      ...(formData.email &&
        selectedTab == 'email' && { email: formData.email }),
      ...(formData.phone &&
        selectedTab == 'phone' && {
          phoneNumber: formData.phone,
          ...(selectedTab == 'phone' && { countryCode: formData.countryCode }),
        }),
    };

    console.log('Final Registration Payload:', registrationPayload);
    // Here you would call your registration API
    // authService.register(registrationPayload);
  };
  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  return (
    <AuthScreenWrapper>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'email' && styles.activeTab]}
          onPress={() => {
            if (selectedTab === 'phone') {
              setPhoneValue(inputValue);
            }
            setSelectedTab('email');
            setInputValue(emailValue);
            clearFieldError('inputValue');
          }}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'email' && styles.activeTabText,
            ]}
          >
            Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'phone' && styles.activeTab]}
          onPress={() => {
            if (selectedTab === 'email') {
              setEmailValue(inputValue);
            }
            setSelectedTab('phone');
            setInputValue(phoneValue);
            clearFieldError('inputValue');
          }}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'phone' && styles.activeTabText,
            ]}
          >
            Phone
          </Text>
        </TouchableOpacity>
      </View>
      <Input
        suffix={
          selectedTab === 'phone' ? (
            <CountryPicker
              onSelectCountry={dialCode => {
                setCountryCode(dialCode);
              }}
            />
          ) : undefined
        }
        label={selectedTab === 'phone' ? 'Phone Number' : 'Email Address'}
        keyboardType={selectedTab === 'phone' ? 'phone-pad' : 'email-address'}
        value={inputValue}
        onChangeText={text => {
          setInputValue(text);
          if (selectedTab === 'email') {
            setEmailValue(text);
          } else {
            setPhoneValue(text);
          }
          clearFieldError('inputValue');
        }}
        maxLength={selectedTab === 'phone' ? 15 : undefined}
        placeholder={
          selectedTab === 'phone' ? '000-000-0000' : 'Enter your email'
        }
        error={errors.inputValue}
      />
      <Input
        label="First Name"
        value={firstName}
        onChangeText={text => {
          setFirstName(text);
          clearFieldError('firstName');
        }}
        placeholder="Enter First Name"
        error={errors.firstName}
      />
      <Input
        label="Last Name"
        value={lastName}
        onChangeText={text => {
          setLastName(text);
          clearFieldError('lastName');
        }}
        placeholder="Enter Last Name"
        error={errors.lastName}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          clearFieldError('password');
        }}
        secureTextEntry
        placeholder="Enter your password"
        error={errors.password}
      />

      <Button
        title={isSubmitting ? 'Signing up...' : 'Signup'}
        onPress={handleSignUp}
        disabled={isSubmitting}
        style={{marginTop:verticalScale(20)}}
      />
    </AuthScreenWrapper>
  );
};

export default SignUp;
