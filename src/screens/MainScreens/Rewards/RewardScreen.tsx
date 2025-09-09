import React, { useEffect, useState } from 'react';
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
  const [points, setPoints] = useState<number>(800);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    // Sample data, can be replaced with API response later
    setTasks([
      {
        id: '1',
        title: 'Facebook post',
        points: 50,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
      {
        id: '2',
        title: 'Facebook post',
        points: 50,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
      {
        id: '3',
        title: 'Facebook post',
        points: 50,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
    ]);

    setRewards([
      {
        id: '1',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
      {
        id: '2',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
      {
        id: '3',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
      {
        id: '4',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
      {
        id: '5',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
      {
        id: '6',
        title: '$ 10 Amazon Gift Card',
        points: 250,
        image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
      },
    ]);
  }, []);

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskHeader}>Quick Win</Text>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.taskTitle}>{item.title}</Text>

          <View style={styles.pointBox}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.taskPoints}>{item.points}</Text>
          </View>

          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startText}>Start</Text>
          </TouchableOpacity>
        </View>

        <Image source={{ uri: item.image }} style={styles.taskImage} />
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
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rewardPoints}>{item.points}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/*  Header */}
      <Text style={styles.header}>My Reward</Text>

      {/*  Points Section */}
      <View style={styles.pointsContainer}>
        <Image source={InstagramIcon} style={styles.giftIcon} />
        <Text style={styles.pointsText}>{points} Points</Text>
        <Text style={styles.arrow}>→</Text>
      </View>

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
          <Text style={styles.sectionTitle}>Exclusive</Text>
          <Text style={styles.sectionSubtitle}>Turn points into Rewards</Text>
        </View>
        <FlatList
          data={rewards}
          renderItem={renderReward}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingBottom: 30,
          }}
          scrollEnabled={false}
        />
      </LinearGradient>
    </ScrollView>
  );
};

export default RewardScreen;
