import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './style';

import StarImage from '../../../assets/images/star.png';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RewardItem {
  id: string;
  platform: string;
  icon: any;
  points: number;
}

const HomeScreen = () => {
  const [data] = useState({
    totalPoints: 800,
    rewards: [
      {
        id: '1',
        platform: 'Facebook',
        icon: require('../../../assets/icons/facebook.png'),
        points: 50,
      },
      {
        id: '2',
        platform: 'Instagram',
        icon: require('../../../assets/icons/instagram.png'),
        points: 60,
      },
      {
        id: '3',
        platform: 'YouTube',
        icon: require('../../../assets/icons/youtube.png'),
        points: 100,
      },
    ],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* ⭐ Header Star Icon */}
      <View style={styles.starContainer}>
        <Image source={StarImage} style={styles.starImage} />
      </View>

      {/* Title */}
      <Text style={styles.title}>You have Earned Points</Text>
      <Text style={styles.points}>{data.totalPoints} Points</Text>

      {/* Reward Section */}
      <View style={styles.rewardSection}>
        <Text style={styles.rewardTitle}>Reward Value</Text>

        {data.rewards.map(item => (
          <View key={item.id} style={styles.rewardRow}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.rewardText}>{item.platform}</Text>
            <TouchableOpacity style={styles.pointsBtn}>
              <Text style={styles.pointsBtnText}>+{item.points} Pts</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
