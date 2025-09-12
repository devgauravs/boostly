import React, { useEffect, useState, version } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import InstagramIcon from '../../../assets/icons/gifticon.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gift, rightArrow, star } from '../../../assets/images';
import { horizontalScale, verticalScale } from '../../../utils/scale';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getReward } from '../../../utils/apiCalls';
import BackButton from '../../../components/BackButton';
interface Task {
  id: string;
  title: string;
  points: number;
  image: string;
}

interface Reward {
  id: string;
  title: string;
  points: number;
  image: string;
}

const RewardScreen: React.FC = () => {
  const navigation=useNavigation();
  const [points, setPoints] = useState<number>(800);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const [data, setData] = useState<{ totalPoints: number; rewards: RewardItem[] }>({
    totalPoints: 0,
    rewards: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Sample data, can be replaced with API response later
    setTasks([
      {
        id: '1',
        title: 'Facebook post',
        points: 50,
        image: gift,
      },
      {
        id: '2',
        title: 'Facebook post',
        points: 50,
        image: gift,
      },
      {
        id: '3',
        title: 'Facebook post',
        points: 50,
        image: gift,
      },
    ]);

    setRewards([
      {
        id: '1',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: gift,
      },
      {
        id: '2',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: gift,
      },
      {
        id: '3',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: gift,
      },
      {
        id: '4',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: gift,
      },
      {
        id: '5',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: gift,
      },
      {
        id: '6',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: gift,
      },
    ]);
  }, []);


  useEffect(() => {
    if (token) fetchRewardData();
  }, [token]);

  const fetchRewardData = async () => {
    setLoading(true);
    try {
      const res = await getReward(token!); 
      console.log("fetchReward==>",res)
      setData({
        totalPoints: res.totalPoints || 0,
        rewards: res?.data || [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskHeader}>Quick Win</Text>

      <View style={styles.row}>
        <View style={{}}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <View style={styles.pointBox}>
            <Image
              source={star}
              style={{
                height: verticalScale(30),
                width: horizontalScale(30),
                resizeMode: 'contain',
              }}
            />
            <Text style={styles.taskPoints}>{item.points}</Text>
          </View>
          <TouchableOpacity style={styles.startButton} >
            <Text style={styles.startText}>Start</Text>
          </TouchableOpacity>
        </View>

        <Image source={gift} style={styles.taskImage} />
      </View>
    </View>
  );

  const renderReward = ({ item }: { item: Reward }) => (
    <View style={styles.rewardCard}>
      <Image source={InstagramIcon} style={styles.rewardImage} />{' '}
      {/* Use InstagramIcon here */}
      <Text style={styles.rewardTitle}>{item.title}</Text>
      <View style={styles.rewardFooter}>
        <View style={styles.pointBox}>
          <Image source={star} style={{ height: 25, width: 25 }} />
          <Text style={styles.rewardPoints}>{item.points}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/*  Header */}
      <SafeAreaView>
     <View style={{paddingHorizontal:horizontalScale(0)}}>
     <BackButton title='My Reward'/>
     </View>

        {/*  Points Section */}
        <TouchableOpacity style={styles.pointsContainer} onPress={()=>{navigation.navigate("RewardHistory")}}>
          <Image source={InstagramIcon} style={styles.giftIcon} />
          <Text style={styles.pointsText}>{points} Points</Text>
          <Image
            source={rightArrow}
            style={{ height: 30, width: 30, resizeMode: 'contain' }}
          />
        </TouchableOpacity>

        <LinearGradient
          colors={['#163A97', '#4c68e2ff']}
          style={styles.gradientContainer}
        >
          {/* Tasks Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Complete Task to Win</Text>
          </View>
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />

          {/*  Rewards Section */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>
              Exclusive
            </Text>
            <Text style={styles.sectionSubtitle}>Turn points into Rewards</Text>
          </View>
          <View style={{ marginBottom: verticalScale(30) }}>
            <FlatList
              data={rewards}
              renderItem={renderReward}
              keyExtractor={item => item.id}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingBottom: verticalScale(10),
              }}
              scrollEnabled={false}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RewardScreen;
