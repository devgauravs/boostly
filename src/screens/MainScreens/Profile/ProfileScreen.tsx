import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileIcon } from '../../../assets/images';
import BackButton from '../../../components/BackButton';
import Input from '../../../components/Input';
import {
  getProfile,
  updateProfile,
  updateProfileImage,
} from '../../../redux/AuthSlice';
import Colors from '../../../utils/color';
import { AppDispatch, RootState } from '../../../redux/store';
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

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null,
  );

  // Get user data from Redux
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getProfile(user._id));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setPhone((user.phoneNumber && `${user.phoneNumber}`) || '');
      setCountryCode((user.countryCode && `${user.countryCode}`) || '+1');
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;
    dispatch(
      updateProfile({
        userId: user._id,
        userData: {
          first_name: firstName,
          last_name: lastName,
          email,
          phoneNumber: phone,
          countryCode,
          picture: profilePictureUrl,
        },
      }),
    );
  };

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: false, quality: 1 },
      response => {
        if (!response.didCancel && !response.errorCode) {
          const uri = response.assets?.[0]?.uri;
          if (uri) {
            setImage(uri); // show local preview

            dispatch(updateProfileImage({ image: uri }))
              .unwrap()
              .then((data: { url?: string }) => {
                if (data?.url) {
                  console.log('data?.url', data?.url);
                  setProfilePictureUrl(data.url);
                }
              })
              .catch(err => console.log('Upload error:', err));
          }
        }
      },
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E44FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
        translucent={false}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <BackButton title="Profile" />
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={
                  image
                    ? { uri: image } 
                    : user?.picture && user.picture.length > 0
                    ? { uri: user.picture } 
                    : ProfileIcon 
                }
                style={styles.profileImage}
              />

              <View style={styles.editIcon}>
                <Image
                  source={require('../../../assets/icons/edit.png')}
                  style={styles.editIconImage}
                />
              </View>
            </TouchableOpacity>

            <Text
              style={styles.profileName}
            >{`${user?.first_name} ${user?.last_name}`}</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="First Name"
              keyboardType="default"
              placeholder="Enter First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Input
              label="Last Name"
              keyboardType="default"
              placeholder="Enter Last Name"
              value={lastName}
              onChangeText={setLastName}
            />

            <Input
              label="Email"
              placeholder="Enter Email Address"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              suffix={
                <CountryPicker
                  onSelectCountry={setCountryCode}
                  value={countryCode}
                />
              }
              label="Phone Number"
              placeholder="Enter Phone Number"
              maxLength={15}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Save Button */}
          <Button
            title="Save"
            onPress={handleSave}
            loading={isLoading}
            disabled={isLoading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
