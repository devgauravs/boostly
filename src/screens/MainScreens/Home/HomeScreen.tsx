import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
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

interface RewardItem {
  id: string;
  platform: string;
  icon: any;
  points: number;
}

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const { points, isLoading, totalPoints } = useSelector(
    (state: RootState) => state.rewards,
  );

  console.log('points', points);
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

    if (user?._id) {
      dispatch(fetchTotalPoints(user._id));
    }
  }, [dispatch, user?._id])
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
      <View style={styles.starContainer}>
        <Image source={StarImage} style={styles.starImage} />
      </View>

      {/* Title */}
      <Text style={styles.title}>You have Earned Points</Text>
      <Text style={styles.points}>
        {totalPoints
          ? `${totalPoints?.totalPoints ?? "You have no"} Points`
          : 'You have no points'}
      </Text>

      {/* Reward Section */}
      <View style={styles.rewardSection}>
        <Text style={styles.rewardTitle}>Reward Value</Text>

        {points.map(item => (
          <View key={item._id} style={styles.rewardRow}>
            <Image source={getIcon(item.title)} style={styles.icon} />
            <Text style={styles.rewardText}>{item?.title}</Text>
            <TouchableOpacity style={styles.pointsBtn}>
              <Text style={styles.pointsBtnText}>+{item?.price} Pts</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
