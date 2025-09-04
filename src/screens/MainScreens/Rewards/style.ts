import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    textAlign: "center",
    fontSize: 20,  // Increased font size for header
    fontWeight: "bold",
    marginVertical: 15,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2E44FF",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    backgroundColor: "#fff",
  },
  giftIcon: {
    width: 40,  // Increased width for better visibility
    height: 40,  // Increased height for better visibility
    resizeMode: "contain",
  },
  pointsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,  // Adjusted font size for better visibility
    fontWeight: "bold",
    color: "#2E44FF",
  },
  arrow: {
    fontSize: 22,  // Increased font size for better visibility
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,  
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 18, 
    color: "#fff",
    textAlign: "center",
  },

  // ✅ Task Card
 taskCard: {
  backgroundColor: "#fff",
  borderRadius: 12,
  margin: 10,
  marginVertical: 20,
  paddingVertical: 14,
  paddingHorizontal: 16,
  alignItems: "center",
  width: 160, 
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,  // Slightly bigger shadow radius for subtle depth
  elevation: 4, 
  overflow: "visible",    
},

  taskImage: {
    width: 80,  // Increased task image size
    height: 60,  // Increased task image size
    resizeMode: "contain",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1877F2", 
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  
  pointBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
  taskPoints: {
    fontSize: 14, 
    fontWeight: "bold",
    color: "#2E44FF",
  },
  startButton: {
    marginTop: 8,
    backgroundColor: "#2E44FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  startText: {
    color: "#fff",
    fontWeight: "bold",
  
  },

  
  rewardCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,  
    marginVertical: 12,
    alignItems: "center",
    width: "32%",  
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  rewardImage: {
    width: 50,  // Increased reward image size
    height: 50,  // Increased reward image size
    resizeMode: "contain",
    marginTop: -35,
  },
  rewardTitle: {
    marginVertical: 10,
    fontSize: 16,  // Increased font size for reward title
    fontWeight: "bold",
    textAlign: "center",
    color: "#1935d6ff",
  },
  rewardFooter: {
    marginTop: 8,
    alignItems: "center",
  },
  star: {
    fontSize: 16,  // Increased font size for the star
    marginRight: 6,
  },
  rewardPoints: {
    fontSize: 16,  // Increased font size for reward points
    fontWeight: "bold",
    color: "#2E44FF",
  },

  taskHeader: {
  fontSize: 12,
  fontWeight: "600",
  color: "#000",
  alignSelf: "flex-start",
  marginBottom: 4,
},

});

export default styles;
