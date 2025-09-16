import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
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
import {
  arrowdown,
  arrowup,
  medal,
  medal2,
  medal3,
  user,
} from '../../../assets/images';
import { Fonts } from '../../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchLeaderBoard } from '../../../redux/RewardsSlice/RewardsSlice';
import CustomLoader from '../../../components/CustomLoader';





const TAB_BAR_HEIGHT = verticalScale(35);

const Leaderboard = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, leaderboard } = useSelector(
    (state: RootState) => state.rewards,
  );
  console.log('leaderBoard', leaderboard);
  const [activeTab, setActiveTab] = useState<'7days' | '30days' | 'alltime'>(
    '7days',
  );

  useEffect(() => {
    setUserPoints(300);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (activeTab) {
        dispatch(fetchLeaderBoard(activeTab));
      }
    }, [dispatch, activeTab]),
  );
  const getProgress = (level: { min: number; max: number }) => {
    if (userPoints < level.min) return 0;
    if (userPoints >= level.max) return 1;
    return (userPoints - level.min) / (level.max - level.min);
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
      <BackButton title="Leader Board" />
      <View style={styles.tabRow}>
        {['7days', '30days', 'alltime'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tabWrapper}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === '7days'
                ? '7 Days'
                : tab === '30days'
                ? '30 Days'
                : 'All Time'}
            </Text>
            <View
              style={[styles.line, activeTab === tab && styles.activeLine]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(20) }}
      >
        <View style={styles.rank}>
  {/* Left box → 2nd rank */}
  {leaderboard[1] && (
    <View style={[styles.rankbox, { height: verticalScale(100), width: '30%' }]}>
      <View style={{ alignItems: 'center' }}>
        <Image source={user} style={styles.rankicon} />
        <Image source={medal2} style={styles.medalIcon} />
      </View>
      <Text style={styles.rankName}>{leaderboard[1]?.first_name}</Text>
    </View>
  )}

  {/* Middle box → 1st rank */}
  {leaderboard[0] && (
    <View style={[styles.rankbox, { height: verticalScale(125), width: '35%' }]}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={user}
          style={[styles.rankicon, { height: verticalScale(40), width: horizontalScale(40) }]}
        />
        <Image
          source={medal}
          style={[styles.medalIcon, { top: verticalScale(20), height: verticalScale(28), width: horizontalScale(28) }]}
        />
      </View>
      <Text style={[styles.rankName, { fontSize: fontScale(13) }]}>
        {leaderboard[0]?.first_name}
      </Text>
    </View>
  )}

  {/* Right box → 3rd rank */}
  {leaderboard[2] && (
    <View style={[styles.rankbox, { height: verticalScale(100), width: '30%' }]}>
      <View style={{ alignItems: 'center' }}>
        <Image source={user} style={styles.rankicon} />
        <Image source={medal3} style={styles.medalIcon} />
      </View>
      <Text style={styles.rankName}>{leaderboard[2]?.first_name}</Text>
    </View>
  )}
</View>




        
        {/* <View
          style={{
            marginTop: verticalScale(10),
            marginBottom: verticalScale(80),
          }}
        >
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
        </View> */}
      </ScrollView>

      {/* Fixed bottom tracking points */}
      <LinearGradient
        colors={['#163A97', '#4364F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.bottomSection,
          {
            bottom: insets.bottom + TAB_BAR_HEIGHT,
          },
        ]}
      >
        <View style={styles.leaderboardHeader}>
          <Text style={styles.headerText}>Rank</Text>
          <Text style={styles.headerText}>Profile</Text>
          <Text style={styles.headerText}>Profile Name</Text>
          <Text style={styles.headerText}>Points</Text>
        </View>

        <FlatList
          data={leaderboard}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <View style={styles.leaderboardRow}>
              <View style={styles.parentsrow}>
                <Text style={styles.rowText}>
                  {index + 1} {/* Display index + name */}
                </Text>
              </View>
              <View style={styles.parentsrow}>
                {/* Optional: User image */}
                {/* <Image source={user} style={{ height: 20, width: 20 }} /> */}
              </View>
              <View style={[styles.parentsrow, { width: horizontalScale(80) }]}>
                <Text style={styles.rowText}>{item?.first_name}</Text>{' '}
                {/* if you have last_name */}
              </View>
              <View style={styles.parentsrow}>
                <Text style={styles.rowText}>{item?.verifiedPoints}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: verticalScale(5) }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Leaderboard;

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
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingBottom: verticalScale(15),
    height: verticalScale(350),
  },

  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
  },
  headerText: {
    color: Colors.background,
    fontSize: fontScale(15),
    fontFamily: Fonts.SemiBold,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
  },
  rowText: {
    color: Colors.background,
    fontSize: fontScale(13),
    fontFamily: Fonts.SemiBold,
  },
  parentsrow: {
    height: horizontalScale(30),
    width: verticalScale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },
  rankbox: {
    height: verticalScale(110),
    width: '30%',
    backgroundColor: Colors.skylight,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Android shadow
    elevation: 6,
  },

  rankicon: {
    tintColor: Colors.darkblue,
    height: verticalScale(30),
    width: horizontalScale(30),
    resizeMode: 'contain',
  },
  rankName: {
    fontSize: fontScale(10),
    color: Colors.primaryBlack,
    fontFamily: Fonts.SemiBold,
    marginTop: verticalScale(10),
  },
  medalIcon: {
    height: verticalScale(20),
    width: horizontalScale(20),
    position: 'absolute',
    top: verticalScale(15),
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  tabWrapper: {
    flex: 1,
    alignItems: 'center',
  },

  tabText: {
    fontSize: fontScale(14),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
    paddingVertical: verticalScale(8),
  },

  activeTabText: {
    color: Colors.darkblue,
  },

  line: {
    height: verticalScale(2),
    width: '100%',
    backgroundColor: 'transparent',
  },

  activeLine: {
    backgroundColor: Colors.darkblue,
  },
});
