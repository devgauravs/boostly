// src/screens/Auth/SignUp.tsx

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from '../../../components/Button';
import CountryPicker from '../../../components/CountryPicker';
import Input from '../../../components/Input';
import { RouteStack } from '../../../navigation/types';
import { registerUser } from '../../../redux/AuthSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { verticalScale } from '../../../utils/scale';
import AuthScreenWrapper from '../AuthScreenWrapper';
import styles from './style';
import {
  signUpValidationSchema,
  validateAtLeastOneContact,
  validateEmail,
  validatePhone,
} from './validation';

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

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

  const clearFields = () => {
    setPassword('');
    setErrors({});
    setCountryCode('+1');
    setInputValue('');
    setEmailValue('');
    setPhoneValue('');
    setFirstName('');
    setLastName('');
  };

  const handleSignUp = async () => {
    try {
      setErrors({});

      const currentEmail = selectedTab === 'email' ? inputValue : emailValue;
      const currentPhone = selectedTab === 'phone' ? inputValue : phoneValue;

      const formData = {
        inputValue,
        firstName,
        lastName,
        password,
        selectedTab,
        ...(selectedTab === 'phone' && { countryCode }),
        ...(currentEmail && { email: currentEmail.toLowerCase() }),
        ...(currentPhone && { phone: currentPhone }),
      };

      // Initialize validation errors object
      const validationErrors: { [key: string]: string } = {};

      // First, validate using yup schema to catch all field errors
      try {
        await signUpValidationSchema.validate(formData, { abortEarly: false });
      } catch (yupError) {
        if (yupError instanceof yup.ValidationError) {
          yupError.inner.forEach(error => {
            if (error.path) {
              validationErrors[error.path] = error.message;
            }
          });
        }
      }

      // Then add custom validation for contact methods
      const contactValidationError = validateAtLeastOneContact(
        currentEmail,
        currentPhone,
        selectedTab,
      );
      if (contactValidationError) {
        validationErrors.inputValue = contactValidationError;
      } else {
        // Only check format if contact validation passed
        const emailError = validateEmail(currentEmail);
        const phoneError = validatePhone(currentPhone);

        if (selectedTab === 'email' && emailError) {
          validationErrors.inputValue = emailError;
        } else if (selectedTab === 'phone' && phoneError) {
          validationErrors.inputValue = phoneError;
        }
      }

      // If we have any validation errors, set them all and return
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // If all validations pass, proceed with registration
      handleRegister(formData);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred',
      });
    }
  };

  const handleRegister = (formData: any) => {
    const registrationPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password,
      ...(formData.email &&
        selectedTab == 'email' && { email: formData.email }),
      ...(formData.phone &&
        selectedTab == 'phone' && {
          phoneNumber: formData.phone,
          ...(selectedTab == 'phone' && { countryCode: formData.countryCode }),
        }),
      role: 'user',
    };

    dispatch(registerUser(registrationPayload));
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
    <AuthScreenWrapper heading={'Sign Up'}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, selectedTab === 'email' && styles.activeTab]}
          onPress={() => {
            if (selectedTab === 'phone') {
              setPhoneValue(inputValue);
            }
            setSelectedTab('email');
            clearFields();
            // setInputValue(emailValue);
            clearFieldError('inputValue');
          }}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'email' && styles.activeTabText,
            ]}
          >
            Email
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'phone' && styles.activeTab]}
          onPress={() => {
            if (selectedTab === 'email') {
              setEmailValue(inputValue);
            }
            setSelectedTab('phone');
            clearFields();
            // setInputValue(phoneValue);
            clearFieldError('inputValue');
          }}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'phone' && styles.activeTabText,
            ]}
          >
            Phone
          </Text>
        </Pressable>
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
        title={'Sign Up'}
        onPress={handleSignUp}
        disabled={isLoading}
        loading={isLoading}
        style={{ marginTop: verticalScale(20) }}
      />

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.goBack()}
        disabled={isLoading}
      >
        <Text style={styles.signUpText}>Sign in</Text>
      </TouchableOpacity>
    </AuthScreenWrapper>
  );
};

export default SignUp;
