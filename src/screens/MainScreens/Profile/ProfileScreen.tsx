import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileIcon } from '../../../assets/images';
import BackButton from '../../../components/BackButton';
import Input from '../../../components/Input';
import { clearToken } from '../../../redux/AuthSlice';
import Colors from '../../../utils/color';
import Storage, { StorageKeys } from '../../../utils/storage';
import { RootState } from '../../../redux/store';
import styles from './style';
import CountryPicker from '../../../components/CountryPicker';
import Button from '../../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Get user data from Redux
  const { user } = useSelector((state: RootState) => state.auth);
  console.log('userrr====>', user);

  useEffect(() => {
    // Console the user data from Redux
    console.log('User data from Redux:', user);
    // Update local state with Redux user data if available
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPhone(
        user.phoneNumber ? `${user.countryCode} ${user.phoneNumber}` : '',
      );
    }
  }, [user]);

  const handleSave = () => {
    console.log('Saved Data:', {
      firstName,
      lastName,
      email,
      phone,
      image,
      countryCode,
    });
  };

  const performLogout = async () => {
    setLoading(true);
    try {
      try {
        LoginManager.logOut();
      } catch (e) {
        /* ignore */
      }
      await Storage.removeItem(StorageKeys.USER_TOKEN);
      dispatch(clearToken());
    } catch (err: any) {
      Alert.alert('Logout failed', err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };
  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log out', style: 'destructive', onPress: performLogout },
      ],
      { cancelable: true },
    );
  };
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
      },
      response => {
        if (!response.didCancel && !response.errorCode) {
          const uri = response.assets?.[0]?.uri;
          if (uri) {
            setImage(uri);
          }
        }
      },
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E44FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <BackButton title="Profile" />

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={image ? { uri: image } : ProfileIcon}
                style={styles.profileImage}
              />
              <View style={styles.editIcon}>
                <Image
                  source={require('../../../assets/icons/edit.png')}
                  style={styles.editIconImage}
                />
              </View>
            </TouchableOpacity>

            <Text style={styles.profileName}>{`${firstName} ${lastName}`}</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="First Name"
              keyboardType="default"
              maxLength={15}
              placeholder="Enter First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Input
              label="Last Name"
              keyboardType="default"
              maxLength={15}
              placeholder="Enter Last Name"
              value={lastName}
              onChangeText={setLastName}
            />

            <Input
              label="Email"
              maxLength={15}
              placeholder="@gmail.com"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              suffix={<CountryPicker onSelectCountry={setCountryCode} />}
              label="Phone Number"
              placeholder="Enter phone numner"
              maxLength={15}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Save Button */}
          <Button title="Save" onPress={handleSave} />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={confirmLogout}
            disabled={loading}
          >
            <Text style={styles.saveText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
