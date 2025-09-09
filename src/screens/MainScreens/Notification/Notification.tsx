import {
  View,
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../utils/color';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../../utils/scale';
import {
  closeIcon,
  facebook,
  instagram,
  postImage,
  youtube,
} from '../../../assets/images';
import { Fonts } from '../../../utils/Fonts';
import Button from '../../../components/Button';
import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '../../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { shareToFacebook } from '../../../utils/SocialShare';


interface Post {
  _id: string;
  title: string;
  image: any;
  url:string
}
const Notification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fbToken = useSelector((state: RootState) => state.auth.token);

  const getPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}${ENDPOINTS?.getMedia}`
      );
      setPost(res?.data?.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPost();
  }, []);


  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.box}>
      <View style={styles.innerBox}>
        <Image
          source={{ uri: item?.url }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.postText}>New collection now available!</Text>

        <Button
          title="Approve"
          style={styles.button}
          onPress={() => {
            setSelectedPost(item?._id);
            setModalVisible(true);
          }}
        />
        <Button
          title="Reject"
          textColor={Colors.red}
          style={styles.rejectButton}
        />
      </View>
    </View>
  );


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.purple} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>New Posts</Text>

      <View style={{ flex: 1, marginBottom: verticalScale(70) }}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={closeIcon}
                style={{
                  height: verticalScale(20),
                  width: horizontalScale(20),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Share on</Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => selectedPost && shareToFacebook(selectedPost, fbToken)}
              >
                <Image source={facebook} style={styles.socialIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => console.log('Instagram')}
              >
                <Image source={instagram} style={styles.socialIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => console.log('YouTube', )}
              >
                <Image source={youtube} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  headerText: {
    fontSize: fontScale(40),
    fontFamily: Fonts.Medium,
    marginBottom: verticalScale(10),
  },
  box: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(20),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: verticalScale(15),
  },
  innerBox: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: verticalScale(200),
  },
  postText: {
    fontSize: fontScale(18),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
    marginTop: verticalScale(2),
    textAlign: 'center',
  },
  button: {
    height: verticalScale(35),
    backgroundColor: Colors.primaryGreen,
    width: horizontalScale(250),
    borderRadius: 2,
    marginTop: verticalScale(10),
  },
  rejectButton: {
    height: verticalScale(35),
    borderColor: Colors.red,
    borderWidth: 1,
    width: horizontalScale(250),
    borderRadius: 2,
    marginTop: verticalScale(10),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: horizontalScale(20),
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: horizontalScale(15),
    top: verticalScale(10),
  },
  modalTitle: {
    fontSize: fontScale(20),
    fontFamily: Fonts.SemiBold,
    marginBottom: verticalScale(15),
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: verticalScale(15),
  },
  socialButton: {
    padding: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    height: verticalScale(50),
    width: horizontalScale(50),
    resizeMode: 'contain',
  },
});
