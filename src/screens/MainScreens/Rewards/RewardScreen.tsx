import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Colors from '../../../utils/color';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/scale';
import { Fonts } from '../../../utils/Fonts';
import Button from '../../../components/Button';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { fetchRewards } from '../../../redux/RewardsSlice/RewardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import CustomLoader from '../../../components/CustomLoader';

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{'Rewards'}</Text>
  </View>
);

const RewardScreen = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const { rewards, isLoading, totalPoints,pointTracking } = useSelector(
    (state: RootState) => state.rewards,
  );

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const redeemHandler = () => {
    if (selected.length === 0) {
      Alert.alert('Please select a voucher to redeem.');
      return;
    }
    Alert.alert(`Redeemed vouchers: ${selected.join(', ')}`);
  };

  const renderVoucher = ({ item }: { item: any }) => {
    const isSelected = selected.includes(item._id);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.rewardCard, isSelected && styles.rewardCardSelected]}
        onPress={() => toggleSelect(item._id)}
      >
        {/* Checkbox */}
        <CheckBox
          value={isSelected}
          onValueChange={() => toggleSelect(item._id)}
          tintColors={{ true: Colors.primaryBlack, false: Colors.primaryBlack }}
        />

        {/* Voucher Info */}
        <Image
          source={item.image}
          style={styles.rewardImage}
          resizeMode="contain"
        />
        <Text style={styles.rewardText}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Points Section */}
      <View style={styles.pointsContainer}>
        {/* <Text style={styles.totalPoints}>800</Text> */}

        {totalPoints?.totalPoints ? (
          <Text style={styles.totalPoints}>{totalPoints.totalPoints}</Text>
        ) : (
          <Text style={styles.noPoints}>You have no points</Text>
        )}

        <Text style={styles.pointsLabel}>Points</Text>
        <Text style={styles.pendingPoints}>{pointTracking?.totalPending} Points Pending</Text>
      </View>

      {/* FlatList for Vouchers */}
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: verticalScale(20),
          }}
        >
          <CustomLoader visible={true} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={rewards}
          keyExtractor={item => item._id}
          renderItem={renderVoucher}
          style={{ marginTop: verticalScale(20) }}
        />
      )}

      {/* Redeem Button */}
      <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <Button
          title="Redeem"
          style={{ width: '100%' }}
          onPress={redeemHandler}
        />
      </View>
    </SafeAreaView>
  );
};

export default RewardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: horizontalScale(20),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: fontScale(24),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
  },
  pointsContainer: {
    alignItems: 'center',
  },
  totalPoints: {
    fontSize: fontScale(40),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
  },
  pointsLabel: {
    fontSize: fontScale(20),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
  },
  pendingPoints: {
    fontSize: fontScale(18),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
    marginTop: verticalScale(4),
  },
  rewardCard: {
    backgroundColor: Colors.lightgray,
    height: verticalScale(60),
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    marginBottom: verticalScale(12),
  },
  rewardCardSelected: {},
  rewardImage: {
    height: verticalScale(40),
    width: horizontalScale(40),
    marginHorizontal: horizontalScale(10),
  },
  rewardText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
  },
  buttonContainer: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(40),
  },
  noPoints:{
    fontSize:fontScale(20),
    fontFamily:Fonts.Regular,
    color:Colors.primaryBlack
  }
});
