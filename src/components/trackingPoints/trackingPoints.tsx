import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '../../utils/color';
import { Fonts } from '../../utils/Fonts';
import { fontScale, horizontalScale, verticalScale } from '../../utils/scale';
import { star } from '../../assets/images';

type TrackingPointsProps = {
  title: string;
  pointsRange: string;
  progress: number;
};

const TrackingPoints: React.FC<TrackingPointsProps> = ({ title, pointsRange, progress }) => {
  const normalizedProgress = Math.max(0, Math.min(progress, 100)) / 100;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={star} style={styles.icon} />
          <Text style={styles.points}>{pointsRange}</Text>
        </View>
      </View>

      <Progress.Bar
        progress={normalizedProgress}
        width={null}
        height={8}
        color={Colors.primaryBlue}
        unfilledColor="#ccc"
        borderWidth={0}
        borderRadius={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.blue1,
    borderRadius: 2,
    padding: 12,
    marginVertical: verticalScale(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.30,
    shadowRadius: 3,
    elevation: 7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: fontScale(12),
    fontFamily: Fonts.Bold,
    color: Colors.primaryBlack,
  },
  points: {
    fontSize: fontScale(12),
    fontFamily: Fonts.Bold,
    color: Colors.primaryBlack,
    marginLeft: horizontalScale(8),
  },
  icon: {
    height: verticalScale(14),
    width: horizontalScale(14),
  },
});

export default TrackingPoints;
