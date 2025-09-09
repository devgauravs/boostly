import { StyleSheet } from "react-native";
import { fontScale, horizontalScale, verticalScale } from "../../../utils/scale";
import { Fonts } from "../../../utils/Fonts";
import Colors from "../../../utils/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingBottom: 80, 
  },
  header: {
    textAlign: "center",
    fontSize: fontScale(16),
    marginVertical: 15,
    fontFamily: Fonts.Bold,
    color:Colors.primaryBlack
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.darkblue,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: horizontalScale(15),
    backgroundColor: Colors.background,
  },
  giftIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  pointsText: {
    flex: 1,
    marginLeft: horizontalScale(10),
    fontSize: fontScale(16),
    color: Colors.darkblue,
    fontFamily: Fonts.Bold,
  },
  arrow: {
    fontSize: 22,
    color: "#2E44FF",
  },

  gradientContainer: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },

  sectionHeader: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    marginTop: verticalScale(10),
  },
  sectionTitle: {
    fontSize: fontScale(17),
    color: Colors.background,
    fontFamily: Fonts.Bold,
  },
  sectionSubtitle: {
    fontSize: fontScale(16),
    color: Colors.background,
    textAlign: "center",
    fontFamily: Fonts.Bold,
  },
  taskCard: {
    width: horizontalScale(200),
    backgroundColor: Colors.background,
    borderRadius: 5,
    padding: 10,
    marginRight: horizontalScale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    
    
  },
  taskHeader: {
    fontSize: fontScale(10),
    color: Colors.primaryBlack,
    alignSelf: "flex-start",
    fontFamily: Fonts.SemiBold,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",  
  },
  taskTitle: {
    fontSize: fontScale(15),
    color: Colors.darkblue,
    fontFamily: Fonts.SemiBold,
  },
  pointBox: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent:"center"
  },
  taskPoints: {
    fontSize: fontScale(15),
    color: Colors.darkblue,
    fontFamily: Fonts.Bold,
  },
  startButton: {
    marginTop: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 4,
    alignSelf: "flex-start",
    borderWidth:1,
    borderColor:Colors.darkblue,
    paddingVertical:verticalScale(2)
  },
  startText: {
    color: Colors.darkblue,
    fontSize: fontScale(12),
    fontFamily: Fonts.SemiBold,
    borderRadius:4
  },
  taskImage: {
    width: horizontalScale(90),
    height: verticalScale(90),

  },

  rewardCard: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 16,
    alignItems: "center",
    width: "32%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    transform: [{ translateY: -6 }],
    paddingTop:verticalScale(50),
    marginTop:verticalScale(20)
  },
  rewardImage: {
    width: horizontalScale(100),
    height: verticalScale(100),
    resizeMode: "contain",
    position:"absolute",
    top:-50,
    
  },
  rewardTitle: {
    marginVertical: verticalScale(5),
    fontSize: fontScale(15),
    textAlign: "center",
    color: Colors.darkblue,
    fontFamily: Fonts.SemiBold,
  },
  rewardFooter: {
    marginTop: verticalScale(8),
    alignItems: "center",
    borderWidth:1,
    borderColor:Colors.darkblue,
    paddingHorizontal:verticalScale(8),
    paddingVertical:verticalScale(1),
    borderRadius:4
  },
  rewardPoints: {
    fontSize: fontScale(15),
    color: Colors.darkblue,
    fontFamily: Fonts.SemiBold,
    marginLeft:horizontalScale(2)
  },
});

export default styles;
