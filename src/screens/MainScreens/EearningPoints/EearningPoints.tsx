import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import TrackingPoints from '../../../components/trackingPoints/trackingPoints';
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
import BackButton from '../../../components/BackButton';
import { Dropdown } from 'react-native-element-dropdown';
import { arrowdown, arrowup } from '../../../assets/images';
import { Fonts } from '../../../utils/Fonts';

const LEVELS = [
  { title: 'Bronze', min: 70, max: 200 },
  { title: 'Silver', min: 201, max: 500 },
  { title: 'Gold', min: 501, max: 1000 },
  { title: 'Platinum', min: 1001, max: Infinity },
];

const TAB_BAR_HEIGHT = verticalScale(50);

const EearningPoints = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setUserPoints(300);
  }, []);

  const getProgress = (level: { min: number; max: number }) => {
    if (userPoints < level.min) return 0;
    if (userPoints >= level.max) return 1;
    return (userPoints - level.min) / (level.max - level.min);
  };

  const dropdownData = [
    { label: 'Today points', value: 100 },
    { label: 'Weekly points', value: 800 },
    { label: 'Pending', value: 800 },
    { label: 'Verified points', value: 290 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <BackButton title="Earning & Points Tracking" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View
          style={{ paddingVertical: 20, backgroundColor: Colors.background }}
        >
          {/* 🔹 Dropdown */}
          <Dropdown
            style={styles.dropdown}
            data={dropdownData}
            labelField="label"
            valueField="value"
            placeholder="Wallet"
            value={selectedWallet}
            onChange={item => {null}} // do nothing when item clicked
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.dropdownContainer}
            renderRightIcon={isOpened => (
              <Image
                source={isOpened ? arrowup : arrowdown}
                style={{
                  width: horizontalScale(16),
                  height: verticalScale(16),
                  tintColor: Colors.primaryBlack,
                }}
              />
            )}
            renderItem={item => (
              <View style={styles.item}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemValue}>{item.value}</Text>
              </View>
            )}
          />
        </View>

        <View style={{}} />
      </ScrollView>



      {/* Fixed bottom tracking points */}
      <View
        style={[
          styles.bottomSection,
          {
            bottom: insets.bottom + TAB_BAR_HEIGHT,
          },
        ]}
      >
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:verticalScale(15)}}>
          <Text style={styles.itemLabel}>Points System</Text>
          <Text style={styles.itemLabel}>Levels</Text>
        </View>
        {LEVELS.map((level, idx) => (
          <TrackingPoints
            key={idx}
            title={level.title}
            pointsRange={`${level.min}${
              level.max === Infinity ? '+' : ` - ${level.max}`
            } points`}
            progress={getProgress(level) * 100}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default EearningPoints;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: horizontalScale(10),
  },
  content: {
    flex: 1,
  },
  bottomSection: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    backgroundColor: Colors.background,
  },
  dropdown: {
    height: verticalScale(45),
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: fontScale(18),
    color: Colors.primaryBlack,
    fontFamily: Fonts.Medium,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.primaryBlack,
  },
  dropdownContainer: {
    zIndex: 1000,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 0.5,
    borderWidth: 0.1,
  },
  itemLabel: {
    fontSize: fontScale(16),
    color: Colors.primaryBlack,
    fontFamily: Fonts.SemiBold,
  },
  itemValue: {
    fontSize: fontScale(16),
    color: Colors.primaryBlack,
    fontFamily: Fonts.SemiBold,
  },
});
