import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './style';
import { LoginManager } from 'react-native-fbsdk-next';
import Storage, { StorageKeys } from '../../../utils/storage';
import { clearToken } from '../../../redux/AuthSlice';
import { useDispatch } from 'react-redux';
import { ProfileIcon } from '../../../assets/images';
import BackButton from '../../../components/BackButton';
import Input from '../../../components/Input';
import Colors from '../../../utils/color';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('Nexa');
  const [email, setEmail] = useState('nexa@example.com');
  const [phone, setPhone] = useState('+1 555-4352');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSave = () => {
    console.log('Saved Data:', { name, email, phone, image });
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
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton title="Profile" />

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

        <Text style={styles.profileName}>{name}</Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          label="Name"
          keyboardType="phone-pad"
          maxLength={15}
          placeholder="Nexa"
          wrapperStyle={{ borderColor: Colors.gray }}
        />

        <Input
          label="Email"

          maxLength={15}
          placeholder="@gmail.com"
          wrapperStyle={{ borderColor: Colors.gray }}
        />

        <Input
          label="Phone Number"
        placeholder="+1"
          maxLength={15}
          wrapperStyle={{ borderColor: Colors.gray }}
        />

        <TouchableOpacity
          onPress={confirmLogout}
          disabled={loading}
          style={styles.logout}
        >
          {loading ? <ActivityIndicator /> : <Text>Log Out</Text>}
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
