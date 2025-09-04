import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style';

import InstagramIcon from '../../../assets/icons/instagram.png';
import FacebookIcon from '../../../assets/icons/facebook.png';
import YoutubeIcon from '../../../assets/icons/youtube.png';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <Text style={styles.star}>⭐️</Text>
      </View>

      <Text style={styles.title}>You have Earned Points</Text>
      <Text style={styles.points}>800 Points</Text>

      <View style={styles.rewardSection}>
        <Text style={styles.rewardTitle}>Reward Value</Text>

        <View style={styles.rewardRow}>
          <Image source={FacebookIcon} style={styles.icon} />
          <Text style={styles.rewardText}>Facebook</Text>
          <TouchableOpacity style={styles.pointsBtn}>
            <Text style={styles.pointsBtnText}>+50 Pts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rewardRow}>
          <Image source={InstagramIcon} style={styles.icon} />
          <Text style={styles.rewardText}>Instagram</Text>
          <TouchableOpacity style={styles.pointsBtn}>
            <Text style={styles.pointsBtnText}>+50 Pts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rewardRow}>
          <Image source={YoutubeIcon} style={styles.icon} />
          <Text style={styles.rewardText}>YouTube</Text>
          <TouchableOpacity style={styles.pointsBtn}>
            <Text style={styles.pointsBtnText}>+50 Pts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
