import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  fontScale,
} from '../../../utils/scale';
import Colors from '../../../utils/color';
import BackButton from '../../../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../../../utils/Fonts';
import { rank } from '../../../assets/images';

interface Leader {
  id: string;
  name: string;
  points: number;
  rank: number;
}

const sampleData: Record<string, Leader[]> = {
  '7days': [
    { id: '1', name: 'Echo Vibes', points: 120, rank: 1 },
    { id: '2', name: 'Pixel Nomad', points: 100, rank: 2 },
    { id: '3', name: 'Echo Vibes', points: 100, rank: 3 },
  ],
  '30days': [
    { id: '1', name: 'Echo Vibes', points: 300, rank: 1 },
    { id: '2', name: 'Pixel Nomad', points: 100, rank: 2 },
    { id: '3', name: 'Echo Vibes', points: 100, rank: 3 },
  ],
  alltime: [
    { id: '1', name: 'Echo Vibes', points: 100, rank: 1 },
    { id: '2', name: 'Pixel Nomad', points: 100, rank: 2 },
    { id: '3', name: 'Echo Vibes', points: 100, rank: 3 },
  ],
};

export default function Leaderboard() {
  const [selected, setSelected] = useState<'7days' | '30days' | 'alltime'>(
    '7days',
  );
  const [leaders, setLeaders] = useState<Leader[]>(sampleData['7days']);

  const tabs = [
    { key: '7days', label: '7 Days' },
    { key: '30days', label: '30 Days' },
    { key: 'alltime', label: 'All Time' },
  ];

  const handleTabSelect = (key: '7days' | '30days' | 'alltime') => {
    setSelected(key);
    setLeaders(sampleData[key]);
  };

  const renderLeader = ({ item }: { item: Leader }) => (
   
      <View style={styles.rankRow}>
        {/* Rank */}
        <View style={styles.rank}>
          <Image source={rank} style={styles.rankicon} />
          <Text style={styles.rankText}>{item.rank}</Text>
        </View>
  
        {/* Name */}
        <View style={styles.nameBox}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
  
        {/* Points */}
        <View style={styles.pointsBox}>
          <Text style={styles.pointsText}>{item.points} pts</Text>
        </View>
      </View>

  );
  

  return (
    <SafeAreaView style={styles.container}>
      <BackButton title='Leader Board' />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => handleTabSelect(tab.key as any)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                selected === tab.key && {
                  color: Colors.primaryBlue,
                  fontFamily: Fonts.SemiBold,
                },
              ]}
            >
              {tab.label}
            </Text>
            {selected === tab.key && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Leaderboard list */}
      <FlatList
        data={leaders}
        keyExtractor={item => item.id}
        renderItem={renderLeader}
        contentContainerStyle={{ paddingVertical: verticalScale(10) }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryBlack,
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: verticalScale(6),
    flex: 1,
  },
  tabText: {
    fontSize: fontScale(14),
    color: Colors.primaryBlack,
    fontFamily: Fonts.Medium,
  },
  underline: {
    height: 2,
    width: horizontalScale(40),
    backgroundColor: Colors.primaryBlue,
    borderRadius: 1,
    marginTop: verticalScale(1),
  },
  rankRow: {
    flexDirection: 'row',          // horizontal row
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  
  rank: {
    flexDirection: 'row',          // icon + rank number
    alignItems: 'center',
    width: '30%',                  // rank box 30% of row
  },
  
  
  rankicon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    resizeMode: 'contain',
    marginRight: horizontalScale(4),
  },
  
  rankText: {
    fontSize: fontScale(14),
    fontFamily: Fonts.SemiBold,
  },
  
  nameBox: {
    flex: 1,
    paddingLeft: horizontalScale(8),
  },
  
  nameText: {
    fontSize: fontScale(14),
    fontFamily: Fonts.Medium,
  },
  
  pointsBox: {
    width: '20%',
    alignItems: 'flex-end',
  },
  
  pointsText: {
    fontSize: fontScale(14),
    fontFamily: Fonts.Medium,
  },
  
});
