import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../../utils/color';
import { fontScale, horizontalScale, verticalScale } from '../../../utils/scale';
import { Fonts } from '../../../utils/Fonts';
import Button from '../../../components/Button';
import CheckBox from '@react-native-community/checkbox';

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{'Rewards'}</Text>
  </View>
);

// Dummy vouchers list
const vouchers = [
  { id: '1', title: '$50 Amazon Gift Card', image: require('../../../assets/images/amazon.jpg') },
  { id: '2', title: '$20 Flipkart Voucher', image: require('../../../assets/images/amazon.jpg') },
  { id: '3', title: '$30 Paytm Wallet', image: require('../../../assets/images/amazon.jpg') },
  { id: '4', title: '$10 Starbucks Coupon', image: require('../../../assets/images/amazon.jpg') },
  { id: '5', title: '$40 Uber Voucher', image: require('../../../assets/images/amazon.jpg') },
  { id: '6', title: '$25 Myntra Gift Card', image: require('../../../assets/images/amazon.jpg') },
  { id: '7', title: '$15 Swiggy Coupon', image: require('../../../assets/images/amazon.jpg') },
  { id: '8', title: '$60 Zomato Voucher', image: require('../../../assets/images/amazon.jpg') },
];

const RewardScreen = () => {
  const [selected, setSelected] = useState<string[]>([]);
const insets = useSafeAreaInsets();
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
    const isSelected = selected.includes(item.id);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.rewardCard, isSelected && styles.rewardCardSelected]}
        onPress={() => toggleSelect(item.id)}
      >
        {/* Checkbox */}
        <CheckBox
          value={isSelected}
          onValueChange={() => toggleSelect(item.id)}
          tintColors={{ true: Colors.primaryBlack, false: Colors.primaryBlack }}
        />

        {/* Voucher Info */}
        <Image source={item.image} style={styles.rewardImage} resizeMode="contain" />
        <Text style={styles.rewardText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Points Section */}
      <View style={styles.pointsContainer}>
        <Text style={styles.totalPoints}>800</Text>
        <Text style={styles.pointsLabel}>Points</Text>
        <Text style={styles.pendingPoints}>50 Points Pending</Text>
      </View>

      {/* FlatList for Vouchers */}
      <FlatList
      showsVerticalScrollIndicator={false}
        data={vouchers}
        keyExtractor={item => item.id}
        renderItem={renderVoucher}
        style={{ marginTop: verticalScale(20) }}
      />

      {/* Redeem Button */}
<View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <Button title="Redeem" style={{ width: '100%' }} onPress={redeemHandler} />
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
  rewardCardSelected: {
 
  },
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
});
