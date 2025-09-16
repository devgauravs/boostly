import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/scale';
import Colors from '../../../utils/color';
import { Fonts } from '../../../utils/Fonts';
import GradientText from '../../../components/GradientText/GradientText';
import {
  facebook,
  gift,
  instagram,
  star,
  youtube,
} from '../../../assets/images';
import BackButton from '../../../components/BackButton';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchHistory } from '../../../redux/RewardsSlice/RewardsSlice';
import Toast from 'react-native-toast-message';

const RewardHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { history, isLoading, error } = useSelector(
    (state: RootState) => state.rewards,
  );

  const [rewards] = useState([
    { id: '1', title: '$10 Amazon Gift Card', date: '2025-09-01', points: 500 },
    { id: '2', title: '$20 Flipkart Coupon', date: '2025-08-20', points: 300 },
    { id: '3', title: '$30 Zomato Voucher', date: '2025-08-15', points: 200 },
    { id: '4', title: '$30 Zomato Voucher', date: '2025-08-15', points: 200 },
    { id: '5', title: '$30 Zomato Voucher', date: '2025-08-15', points: 200 },
    { id: '6', title: '$30 Zomato Voucher', date: '2025-08-15', points: 200 },
  ]);

  const challenges = [
    { id: '1', title: 'Post on Facebook', multiplier: '2x', icon: facebook },
    { id: '2', title: 'Post on Instagram', multiplier: '2x', icon: instagram },
    { id: '3', title: 'Post on YouTube', multiplier: '2x', icon: youtube },
  ];

  useFocusEffect(
    useCallback(() => {
      if (user?._id) {
        dispatch(fetchHistory(user._id));
      }
    }, [dispatch, user?._id]),
  );
  const renderReward = ({ item }: { item: any }) => (
    <View style={styles.rewardCard}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left side (gift + info) */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={gift}
            style={{ height: verticalScale(40), width: horizontalScale(40) }}
          />
          <View style={{ marginLeft: horizontalScale(10) }}>
            <GradientText text={item.title} style={styles.rewardTitle} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={star}
                style={{
                  height: verticalScale(20),
                  width: horizontalScale(20),
                  marginRight: horizontalScale(5),
                }}
              />
              <GradientText text={item?.price} />
            </View>
            <GradientText
              text={new Date(item.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          </View>
        </View>

        {/* Right side (Redeemed text) */}
        <GradientText text={'Reedemed'} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Reward History */}
      <BackButton title="Reward History" />
      <Text style={styles.sectionTitle}>Reward History</Text>
      <View style={{ height: verticalScale(230) }}>
        <FlatList
          data={history}
          renderItem={renderReward}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingBottom: 20,
            flex: 1,
            justifyContent: 'center',
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Colors.gray,
                    fontFamily: Fonts.SemiBold,
                  }}
                >
                  No History found
                </Text>
              </View>
            );
          }}
        />
      </View>

      <Text style={styles.sectionTitle}>Challenges</Text>
      <View style={styles.challengeContainer}>
        {challenges.map(c => (
          <TouchableOpacity key={c.id} style={styles.challengeCard}>
            <Image source={c.icon} style={styles.socialIcon} />
            <Image source={star} style={styles.starIcon} />
            <View style={{ height: verticalScale(20) }}>
              <Text style={styles.challengeText}>
                {c.multiplier} points for quick posts
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default RewardHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontFamily: Fonts.SemiBold,
    marginVertical: 10,
    color: Colors.primaryBlack,
  },
  rewardCard: {
    padding: 10,
    marginVertical: verticalScale(5),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.darkblue,
  },
  rewardTitle: {
    fontSize: fontScale(14),
    fontFamily: Fonts.SemiBold,
    color: '#333',
  },
  rewardPoints: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },

  challengeContainer: {},

  challengeCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', // vertically center
    padding: 30,
    marginHorizontal: horizontalScale(5),
    borderRadius: 10,
    backgroundColor: '#EAF4FF',
    elevation: 2,
    marginTop: verticalScale(10),
  },

  socialIcon: {
    height: verticalScale(25),
    width: horizontalScale(25),
    resizeMode: 'contain',
    marginRight: horizontalScale(8), // space between icons and text
  },

  starIcon: {
    height: verticalScale(16),
    width: horizontalScale(16),
    resizeMode: 'contain',
    marginRight: horizontalScale(8),
  },

  challengeText: {
    fontSize: fontScale(14),
    color: Colors.primaryBlack,
    fontFamily: Fonts.SemiBold,
  },
});
