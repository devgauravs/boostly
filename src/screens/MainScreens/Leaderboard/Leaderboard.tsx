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

interface Leader {
  id: string;
  name: string;
  points: number;
  rank: number;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [activeTab, setActiveTab] = useState('30 Days');

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
    <LinearGradient colors={['#3C79F5', '#004AAD']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leader Board</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['7 Days', '30 Days', 'All Time'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable Top Chart */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.topChart}
      >
        <View style={styles.chartCard}>
          <Text style={styles.chartText}>Extra View</Text>
        </View>
        <View style={styles.chartCard}>
          <Text style={styles.chartText}>Pixel Named</Text>
        </View>
        <View style={styles.chartCard}>
          <Text style={styles.chartText}>Extra View</Text>
        </View>
      </ScrollView>

      {/* Tiers */}
      <View style={styles.tiers}>
        <Text style={styles.tierText}>🥉 Bronze: 70 - 200 points</Text>
        <Text style={styles.tierText}>🥈 Silver: 201 - 500 points</Text>
        <Text style={styles.tierText}>🥇 Gold: 501 - 1000 points</Text>
        <Text style={styles.tierText}>💎 Platinum: 1000+ points</Text>
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={leaders}
        keyExtractor={item => item.id}
        renderItem={renderLeader}
        contentContainerStyle={styles.list}
      />
    </LinearGradient>
  );
}
