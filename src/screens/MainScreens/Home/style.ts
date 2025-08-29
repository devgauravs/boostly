import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  starContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  star: {
    fontSize: 72,
    color: '#f7b733',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  points: {
    fontWeight: '700',
    fontSize: 20,
    color: '#f7b733',
    textAlign: 'center',
    marginBottom: 36,
  },
  rewardSection: {
    paddingHorizontal: 12,
  },
  rewardTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 20,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rewardText: {
    flex: 1,
    fontSize: 14,
  },
  pointsBtn: {
    backgroundColor: '#e6f2ff',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  pointsBtnText: {
    color: '#3388ff',
    fontWeight: '600',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 'auto',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#444',
  },
  active: {
    color: '#3388ff',
    fontWeight: '700',
  },
});

export default styles;
