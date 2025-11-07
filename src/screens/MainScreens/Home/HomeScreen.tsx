import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './style';

import StarImage from '../../../assets/images/star.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  fetchPoints,
  fetchTotalPoints,
} from '../../../redux/RewardsSlice/RewardsSlice';
import { facebook, instagram, youtube } from '../../../assets/images';
import CustomLoader from '../../../components/CustomLoader';
import { useFocusEffect } from '@react-navigation/native';
import {
  facebookLogin,
  instagramLogin,
  youtubeLogin,
} from '../../../utils/AuthHelper';

interface RewardItem {
  id: string;
  platform: string;
  icon: any;
  points: number;
}

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, instagramuser, facebookuser, youtubeuser, userId } =
    useSelector((state: RootState) => state.auth);

  const [refreshing, setRefreshing] = useState(false);
  const { points, isLoading, totalPoints } = useSelector(
    (state: RootState) => state.rewards,
  );

  const handleSubmit = async (item: string) => {
    if (item === 'Facebook Post') {
      if (facebookuser) {
        Alert.alert('Already logged in with Facebook');
      } else {
        await facebookLogin(dispatch, user?._id);
      }
      return;
    }
    if (item === 'Instagram Post') {
      if (instagramuser) {
        Alert.alert('Already logged in with Instagram');
      } else {
        await facebookLogin(dispatch, user?._id);
      }
      return;
    }
    if (item === 'YouTube Post') {
      if (youtubeuser) {
        Alert.alert('Already logged in with Youtube');
      } else {
        await youtubeLogin(dispatch, user?._id);
      }
      return;
    }
  };

  // Using these to hide youtube, use points instead when you have youtube
  const tempPoint = points.filter(
    item => !item.title.toLowerCase().includes('youtube'),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (user?._id) {
      await dispatch(fetchPoints());
      await dispatch(fetchTotalPoints(user._id));
    }
    setRefreshing(false);
  }, [dispatch, user?._id]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchPoints());

      if (user) {
        dispatch(fetchTotalPoints(user._id));
      }
    }, [dispatch, user?._id]),
  );

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('facebook')) return facebook;
    if (title.toLowerCase().includes('instagram')) return instagram;
    if (title.toLowerCase().includes('youtube')) return youtube;
    return facebook; // default
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CustomLoader visible={isLoading} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* ⭐ Header Star Icon */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.starContainer}>
          <Image source={StarImage} style={styles.starImage} />
        </View>

        {/* Title */}
        <Text style={styles.title}>You have Earned Points</Text>
        <Text style={styles.points}>
          {totalPoints
            ? `${totalPoints?.totalPoints ?? 'You have no'} Points`
            : 'You have no points'}
        </Text>

        {/* Reward Section */}
        <View style={styles.rewardSection}>
          <Text style={styles.rewardTitle}>Reward Value</Text>

          {points.map(item => (
            <View key={item._id} style={styles.rewardRow}>
              <TouchableOpacity
                style={styles.socialRow}
                onPress={() => handleSubmit(item?.title)}
              >
                <Image source={getIcon(item.title)} style={styles.icon} />
                <Text style={styles.rewardText}>
                  {item?.title?.replace(' Post', '')}
                </Text>
              </TouchableOpacity>
              <View style={styles.pointsBtn}>
                <Text style={styles.pointsBtnText}>+{item?.price} Pts</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
