import {
  View,
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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
import { AppDispatch, RootState } from '../../../redux/store';
import { postToPage } from '../../../utils/SocialShare';
import { useFocusEffect } from '@react-navigation/native';
import CustomLoader from '../../../components/CustomLoader';
import { facebookLogin } from '../../../utils/AuthHelper';


interface Post {
  _id: string;
  title: string;
  image: any;
  url: string;
}
const Notification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [ModalSocialLogin, setModalSocialLogin] = useState(false);
  const fbToken = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch<AppDispatch>();
const { user } = useSelector((state: RootState) => state.auth);
console.log("facebookenToken",fbToken)
  const getPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${ENDPOINTS?.getMedia}${userId}`);
      setPost(res?.data?.data);
      return res?.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPost();
      // handleFetchPages();
    }, []),
  );

  const handleFacebookLogin = () => {
         facebookLogin(dispatch, user?._id);
      setModalSocialLogin(false)
    };
  const handleApprove = async (item: Post) => {
    setSelectedPost(item);
    if(user?.withSoical===true){
      setModalVisible(true);
    }else{
      setModalSocialLogin(true);
    }

  };

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
          gradientColors={['#039503', '#039503']}
          style={styles.button}
          onPress={() => handleApprove(item)}
        />
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={async () => {
            setLoading(true); // show loader

            await postToPage(item, userId, 'reject');
            setLoading(false); // hide loader
            getPost();
          }}
        >
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  <CustomLoader visible={loading} />;

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
          data={[...posts].reverse()}
          renderItem={renderPost}
          keyExtractor={item => item?._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: 'gray' }}>No data found</Text>
            </View>
          )}
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
                onPress={async () => {
                  setLoading(true);
                  await postToPage(selectedPost, userId, 'accept');
                  setLoading(false);
                  setModalVisible(false);
                  getPost();
                }}
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
                onPress={() => console.log('YouTube')}
              >
                <Image source={youtube} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
  animationType="slide"
  transparent
  visible={ModalSocialLogin}
  onRequestClose={() => setModalSocialLogin(false)}
>
  <TouchableWithoutFeedback onPress={() => setModalSocialLogin(false)}>
    <View style={styles.modalOverlay}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.SocialLoginmodalBox}>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity 
              style={styles.socialflex} 
              onPress={handleFacebookLogin}
            >
              <Image source={facebook} style={styles.socialLoginIcon} />
              <Text style={styles.loginText}>Login With Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
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
    marginTop: verticalScale(20),
    justifyContent: 'center',
  },
  rejectText: {
    textAlign: 'center',
    color: Colors.red,
    fontFamily: Fonts.Bold,
    fontSize: fontScale(16),
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
  socialLoginContainer: {
    // marginBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(40),
    paddingVertical: verticalScale(10),
  },
  SocialLoginmodalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  socialLoginIcon: {
    height: verticalScale(25),
    width: horizontalScale(25),
    resizeMode: 'contain',
    marginRight: horizontalScale(10),
  },
  socialflex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
  },
  loginText: {
    color: Colors.darkblue,
    fontSize: fontScale(18),
    fontFamily: Fonts.SemiBold,
  },
});
