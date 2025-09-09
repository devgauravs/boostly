import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { leftArrow } from '../../../assets/images';
import { horizontalScale, verticalScale } from '../../../utils/scale';
import BackButton from '../../../components/BackButton';
import Colors from '../../../utils/color';

interface Leader {
  id: string;
  name: string;
  points: number;
  rank: number;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [activeTab, setActiveTab] = useState('30 Days');
  const [selected, setSelected] = useState<'7days' | '30days' | 'alltime'>('7days');

  const tabs = [
    { key: '7days', label: '7 Days' },
    { key: '30days', label: '30 Days' },
    { key: 'alltime', label: 'All Time' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [
          { id: '1', name: 'Zyro', points: 19000, rank: 1 },
          { id: '2', name: 'Lumo', points: 18000, rank: 2 },
          { id: '3', name: 'Nexo', points: 17000, rank: 3 },
          { id: '4', name: 'Aero', points: 14000, rank: 4 },
          { id: '5', name: 'Kyra', points: 13000, rank: 5 },
          { id: '6', name: 'Vynx', points: 12000, rank: 6 },
          { id: '7', name: 'Taro', points: 11000, rank: 7 },
        ];
        setLeaders(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const renderLeader = ({ item }: { item: Leader }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{item.rank}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <BackButton />
        {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => setSelected(tab.key as any)}
          style={styles.tabButton}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              selected === tab.key && { color: Colors.primaryBlue, fontWeight: '700' },
            ]}
          >
            {tab.label}
          </Text>
          {selected === tab.key && <View style={styles.underline} />}
        </TouchableOpacity>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
}
