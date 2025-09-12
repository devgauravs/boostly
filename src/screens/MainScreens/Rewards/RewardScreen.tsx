import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../../components/BackButton';
import Container from '../../../components/Container';
import { fetchRewards } from '../../../redux/RewardsSlice/RewardsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  giftCard,
  giftMultiColor,
  rightArrow,
  star,
} from '../../../assets/images';
import { Fonts } from '../../../utils/Fonts';
import Colors from '../../../utils/color';
import GradientText from '../../../components/GradientText/GradientText';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/scale';

const rewardsData = [
  { id: '1', title: '$10 Amazon Gift Card', points: 250, image: giftCard },
  { id: '2', title: '$20 Amazon Gift Card', points: 500, image: giftCard },
  { id: '3', title: '$25 Amazon Gift Card', points: 600, image: giftCard },
  { id: '4', title: '$50 Amazon Gift Card', points: 1200, image: giftCard },
  { id: '5', title: '$25 Amazon Gift Card', points: 600, image: giftCard },
  { id: '6', title: '$50 Amazon Gift Card', points: 1200, image: giftCard },
];

const taskData = [
  { id: '1', title: 'Facebook Post', points: 50, image: giftCard },
  { id: '2', title: 'Instagram Story', points: 75, image: giftCard },
  { id: '3', title: 'Share App with Friends', points: 100, image: giftCard },
  { id: '4', title: 'Daily Login Bonus', points: 25, image: giftCard },
];

interface Reward {
  id: string;
  title: string;
  points: number;
  image: string;
}

const RewardCard = ({ item }: { item: Reward }) => {
  return (
    <View style={styles.rewardCard}>
      <Image
        source={
          typeof item.image === 'string' ? { uri: item.image } : item.image
        }
        style={styles.giftImage}
      />
      <GradientText text={item.title} style={styles.rewardTitle} />
      <View style={styles.pointsBox}>
        <Image source={star} style={styles.pointsIcon} />
        <GradientText
          text={item.points.toString()}
          style={styles.pointsValue}
        />
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
            {taskData.map(item => (
              <View key={item.id} style={styles.taskCard}>
                <View style={styles.cardLeftPortion}>
                  <Text style={styles.cardHeading}>Quick Win</Text>

                  <GradientText text={item.title} style={styles.semiHeading} />

                  <View style={styles.row}>
                    <Image source={star} style={styles.starCardImage} />
                    <GradientText
                      text={item.points.toString()}
                      style={styles.semiHeading}
                    />
                  </View>
                  <TouchableOpacity style={styles.cardBtn}>
                    <GradientText text={'Start'} style={styles.startText} />
                  </TouchableOpacity>
                </View>
                <Image
                  source={
                    typeof item.image === 'string'
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.cardGiftImage}
                />
              </View>
            ))}
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
          data={rewardsData}
          renderItem={({ item }) => <RewardCard item={item} />}
          keyExtractor={item => item.id}
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
    marginLeft: 20,
    paddingRight: 20,
  },
  taskCard: {
    width: 220,
    backgroundColor: Colors.primaryWhite,
    borderRadius: 5,
    marginRight: 15,
    padding: 15,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
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
    color: Colors.blueBorder,
    fontSize: 13,
    fontFamily: Fonts.Bold,
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
    paddingHorizontal: 16,
    paddingVertical: 30,
    margin: 6,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    minWidth: 100, // ✅ ensures 3 fit nicely
    maxWidth: 120,
    marginBottom: 30,
  },
  giftImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
    position: 'absolute',
    top: -30,
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
    paddingVertical: 4,
    backgroundColor: '#F8FAFF',
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
