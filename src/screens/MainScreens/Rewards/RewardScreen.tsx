import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { gift, giftMultiColor, rightArrow, star } from '../../../assets/images';
import BackButton from '../../../components/BackButton';
import Container from '../../../components/Container';
import GradientText from '../../../components/GradientText/GradientText';
import { fetchRewards } from '../../../redux/RewardsSlice/RewardsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { Reward } from '../../../services/RewardsService/types';
import { Fonts } from '../../../utils/Fonts';
import Colors from '../../../utils/color';
import { fontScale, horizontalScale } from '../../../utils/scale';

const RewardCard: FC<{ item: Reward }> = ({ item }) => {
  return (
    <View style={styles.rewardCard}>
      <Image source={gift} style={[styles.giftImage]} />
      <View style={{ marginTop: 35, alignItems: 'center' }}>
        <GradientText text={item.title} style={styles.rewardTitle} />
        <View style={styles.pointsBox}>
          <Image source={star} style={styles.pointsIcon} />
          <GradientText text={item.price} style={styles.pointsValue} />
        </View>
      </View>
    </View>
  );
};

const RewardScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [points, setPoints] = useState<number>(800);
  const { rewards } = useSelector((state: RootState) => state.rewards);

  useEffect(() => {
    dispatch(fetchRewards({}));
  }, []);

  const RenderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <BackButton title="My Rewards" />

        <TouchableOpacity
          style={styles.pointsContainer}
          onPress={() => navigation.navigate('EarningPoints' as never)}
        >
          <View style={styles.pointsRow}>
            <Image source={giftMultiColor} style={styles.giftMultiColorStyle} />
            <Text style={styles.pointsText}>{points} Points</Text>
          </View>
          <Image source={rightArrow} style={styles.rightArrowImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pointsContainer}
          onPress={() => navigation.navigate('RewardHistory' as never)}
        >
          <View style={styles.pointsRow}>
            <Text style={styles.pointsText}>Reward History</Text>
          </View>
          <Image source={rightArrow} style={styles.rightArrowImage} />
        </TouchableOpacity>
        {/* Task Section */}
        <LinearGradient
          colors={[Colors.darkblue, Colors.primaryBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientContainer}
        >
          <Text style={styles.completeTaskText}>Complete Task to Win</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollViewContainer}
          >
            {[1, 2, 3, 4].map(() => {
              return (
                <View style={styles.taskCard}>
                  <View
                    style={{
                      flex: 1,
                      padding: 8,
                    }}
                  >
                    <Text style={{ fontSize: 10, fontFamily: Fonts.SemiBold }}>
                      Quick Win
                    </Text>
                    <GradientText
                      text={'Facebook post'}
                      style={styles.facebookText}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -4,
                      }}
                    >
                      <Image
                        source={star}
                        style={{ height: 21, width: 21 }}
                        resizeMode="contain"
                      />
                      <GradientText text={'50'} style={styles.facebookText} />
                    </View>

                    <Pressable
                      style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        width: horizontalScale(60),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: Colors.darkblue,
                        marginTop: 6,
                      }}
                    >
                      <GradientText text={'Start'} style={styles.startText} />
                    </Pressable>
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Image
                      source={gift}
                      style={{
                        height: 88,
                        width: 88,
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Rewards Section */}
          <View style={styles.exclusiveCardsContainer}>
            <Text style={styles.exclusiveText1}>Exclusive</Text>
            <Text style={styles.exclusiveText2}>Turn points into Rewards</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <Container>
      <LinearGradient
        colors={[Colors.darkblue, Colors.primaryBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.mainGradient}
      >
        <FlatList
          ListHeaderComponent={RenderHeader}
          data={rewards || []}
          renderItem={({ item }) => <RewardCard item={item} />}
          keyExtractor={item => item._id}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </Container>
  );
};

export default RewardScreen;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
  },

  // --- Points Box ---
  pointsContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryWhite,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  giftMultiColorStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  pointsText: {
    fontSize: 18,
    fontFamily: Fonts.ExtraBold,
    color: Colors.darkblue,
  },
  rightArrowImage: {
    width: 20,
    height: 20,
  },

  // --- Gradient Container ---
  gradientContainer: {
    marginTop: 30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 20,
  },
  completeTaskText: {
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
    color: Colors.background,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
  },

  // --- Task Cards ---
  scrollViewContainer: {
    marginTop: 20,
    marginLeft: 15,
    paddingRight: 20,
  },
  taskCard: {
    backgroundColor: Colors.background,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 7,
    marginRight: 8,
  },
  cardLeftPortion: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeading: {
    fontSize: 11,
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
    marginBottom: 4,
  },
  semiHeading: {
    fontSize: 15,
    fontFamily: Fonts.Bold,
    color: Colors.primaryBlack,
    marginBottom: 6,
  },
  digits: {
    fontSize: 15,
    fontFamily: Fonts.Bold,
    color: Colors.primaryBlack,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardGiftImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  starCardImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 6,
  },
  cardBtn: {
    borderWidth: 1,
    borderRadius: 2,
    height: 30,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.blueBorder,
  },
  startText: {
    color: Colors.darkblue,
    fontSize: 13,
    fontFamily: Fonts.SemiBold,
    marginTop: 2,
  },
  facebookText: {
    color: Colors.blueBorder,
    fontSize: 15,
    fontFamily: Fonts.SemiBold,
    marginTop: 2,
  },
  exclusiveCardsContainer: {
    marginTop: 25,
  },
  exclusiveText1: {
    alignSelf: 'center',
    color: Colors.background,
    fontSize: 14,
    fontFamily: Fonts.Bold,
  },
  exclusiveText2: {
    alignSelf: 'center',
    marginBottom: 25,
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
    color: Colors.background,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    margin: 6,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    minWidth: 100, // ✅ ensures 3 fit nicely
    maxWidth: 115,
    marginBottom: 30,
  },
  giftImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
    position: 'absolute',
    top: -30,
    transform: [{ rotate: '350deg' }],
  },
  rewardTitle: {
    fontSize: 13,
    fontFamily: Fonts.SemiBold,
    color: Colors.darkblue,
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 20,
  },
  pointsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.blueBorder,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 1,
    backgroundColor: '#F8FAFF',
    width: horizontalScale(60),
  },
  pointsIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 4,
  },
  pointsValue: {
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
  },
  mainGradient: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 80,
    backgroundColor: 'transparent',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },

  rewardButtonText: {
    color: '#fff',
    fontSize: fontScale(16),
    fontFamily: Fonts.SemiBold,
  },
});
