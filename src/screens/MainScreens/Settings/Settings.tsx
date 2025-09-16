import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import {
  arrowdown,
  contact_us,
  deleteIcon,
  logout,
  person,
  privacy,
  RewardIcon,
  terms,
} from '../../../assets/images';
import Container from '../../../components/Container';
import GradientText from '../../../components/GradientText/GradientText';
import { RouteStack } from '../../../navigation/types';
import { clearToken, deleteAccount } from '../../../redux/AuthSlice';
import { AppDispatch } from '../../../redux/store';
import Colors from '../../../utils/color';
import { Fonts } from '../../../utils/Fonts';
import Storage, { StorageKeys } from '../../../utils/storage';

interface RenderSettingsParams {
  id: number;
  title: string;
  image: ImageSourcePropType | undefined;
}

const SettingsData = [
  { id: 1, title: 'Profile', image: person },
  // { id: 2, title: 'Contact Us', image: contact_us },
  { id: 2, title: 'Rewards History', image: RewardIcon },
  { id: 3, title: 'Terms & Conditions', image: terms },
  { id: 4, title: 'Privacy Policy', image: privacy },
  { id: 5, title: 'Delete Account', image: deleteIcon },
  { id: 6, title: 'Log Out', image: logout },
];

const Settings = () => {
  const navigation = useNavigation<RouteStack>();
  const dispatch = useDispatch<AppDispatch>();

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{'Settings'}</Text>
      </View>
    );
  };

  const handleItemPress = (id: number) => {
    switch (id) {
      case 1:
        navigation.navigate('ProfileScreen');
        break;
      case 2:
        navigation.navigate('RewardHistory');
        break;
      case 3:
        Linking.canOpenURL('https://boostlyclub.com/terms').then(() => {
          Linking.openURL('https://boostlyclub.com/terms');
        });
        break;
      case 4:
        Linking.canOpenURL('https://boostlyclub.com/privacy').then(() => {
          Linking.openURL('https://boostlyclub.com/privacy');
        });
        break;
      case 5:
        confirmDeleteAccount();
        break;
      case 6:
        confirmLogout();
        break;

      default:
        break;
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to delete account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: handleDeleteAccount,
        },
      ],
      { cancelable: true },
    );
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteAccount());
      LoginManager.logOut();
      Storage.clearAll();
      dispatch(clearToken());
    } catch (err: any) {
      Alert.alert('Logout failed', err?.message || String(err));
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
  const performLogout = async () => {
    try {
      try {
        LoginManager.logOut();
      } catch (e) {
        /* ignore */
      }
      await Storage.removeItem(StorageKeys.USER_TOKEN);
      await Storage.removeItem(StorageKeys.USER);
      dispatch(clearToken());
    } catch (err: any) {
      Alert.alert('Logout failed', err?.message || String(err));
    }
  };

  const RenderSettingItems = useCallback(
    ({ item }: { item: RenderSettingsParams }) => {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleItemPress(item.id)}
        >
          <View style={styles.titleContainer}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={styles.itemImage}
            />
            <Text style={styles.itemText}>{item.title}</Text>
          </View>

          <View style={styles.arrowContainer}>
            <Image
              source={arrowdown}
              resizeMode="contain"
              style={styles.rightArrow}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <Container style={styles.container}>
      <>
        <Header />

        <FlatList
          data={SettingsData}
          renderItem={RenderSettingItems}
          contentContainerStyle={styles.contentContainer}
        />
      </>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  contentContainer: { paddingVertical: 20 },
  headerText: {
    fontSize: 24,
    fontFamily: Fonts.SemiBold,
  },
  itemText: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    marginTop: 2,
  },
  itemContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
    borderColor: Colors.gray2,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  itemImage: { height: 20, width: 20, tintColor: 'black' },
  rightArrow: {
    height: 15,
    width: 15,
    tintColor: 'black',
    transform: [{ rotate: '90deg' }],
  },
  arrowContainer: { paddingHorizontal: 10 },
  footerContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
  },
  headerContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
