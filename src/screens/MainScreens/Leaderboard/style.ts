import { StyleSheet } from "react-native";
import { fontScale } from "../../../utils/scale";
import { Fonts } from "../../../utils/Fonts";
import Colors from "../../../utils/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  header: {
    marginTop: 40,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#fff2",
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    color: "#fff",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#004AAD",
  },
  topChart: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  chartCard: {
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    elevation: 3,
    
  },
  chartText: {
    fontWeight: "bold",
    color: "#004AAD",
  },
  tiers: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  tierText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    marginVertical: 2,
  },
  list: {
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rank: {
    fontWeight: "bold",
    color: "#004AAD",
  },
  name: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
  points: {
    fontWeight: "bold",
    color: "#3C79F5",
  },
});

export default styles;
