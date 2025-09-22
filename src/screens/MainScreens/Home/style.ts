import { StyleSheet } from 'react-native';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/scale';
import { Fonts } from '../../../utils/Fonts';
import Colors from '../../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: verticalScale(50),
  },
  starContainer: {
    alignItems: 'center',
  },
  starImage: {
    width: verticalScale(169),
    height: verticalScale(169),
    resizeMode: 'contain',
  },
  title: {
    fontFamily: Fonts.SemiBold,
    fontSize: fontScale(27),
    textAlign: 'center',
    marginBottom: verticalScale(5),
    color: Colors.primaryBlack,
  },
  points: {
    fontFamily: Fonts.Bold,
    fontSize: fontScale(32),
    color: Colors.lightyellow,
    textAlign: 'center',
    marginBottom: verticalScale(30),
  },
  rewardSection: {
    marginTop: 20,
  },
  rewardTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: fontScale(18),
    marginBottom: verticalScale(10),
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: horizontalScale(25),
    height: verticalScale(25),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
  },
  rewardText: {
    fontFamily: Fonts.SemiBold,
    flex: 1,
    fontSize: fontScale(15),
    color: Colors.primaryBlack,
  },
  pointsBtn: {
    borderColor: Colors.darkblue,
    borderWidth: 2,
    borderRadius: 4,
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(8),
    minWidth: horizontalScale(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsBtnText: {
    fontFamily: Fonts.SemiBold,
    color: Colors.darkblue,
    fontSize: fontScale(12),
    marginTop: 2,
  },
});

export default styles;
