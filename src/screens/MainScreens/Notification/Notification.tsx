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
import { postToPage, setAutoApproval } from '../../../utils/SocialShare';
import { useFocusEffect } from '@react-navigation/native';
import CustomLoader from '../../../components/CustomLoader';
import {
  facebookLogin,
  instagramLogin,
  youtubeLogin,
} from '../../../utils/AuthHelper';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import CongratulationModal from '../../../components/CongratulationModal/CongratulationModal';
import Toggle from '../../../components/Toggle/Toggle';
import { getProfile } from '../../../redux/AuthSlice';
import Video from 'react-native-video';

interface Post {
  _id: string;
  title: string;
  image: any;
  url: string;
}

const Notification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPost] = useState<Post[]>([]);
  console.log('posts======>', posts);
  console.log();
  const [loading, setLoading] = useState(false);
  const [ModalSocialLogin, setModalSocialLogin] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<
    'facebook' | 'instagram' | 'youtube' | null
  >(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [approveAllPost, setApproveAllPost] = useState(false);
  const [pointsEarned, setPointsEarned] = useState<number>(0);
  const [autoApproval, setAutoApprovalState] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { user, instagramuser, facebookuser, youtubeuser, socialName } =
    useSelector((state: RootState) => state.auth);
  console.log('instagramuser===>', instagramuser);
  console.log('facebookuser==>', facebookuser);
  console.log('yuotubeuser==>', youtubeuser);
  const { userId } = useSelector((state: RootState) => state.auth);
  const { pointTracking } = useSelector((state: RootState) => state.rewards);

  useEffect(() => {
    if (user) {
      dispatch(getProfile(user._id));
      setAutoApprovalState(user?.autoApproval || false);
    }
  }, [dispatch, user?._id]);

  const getPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${ENDPOINTS?.getMedia}`);
      setPost(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPost();
    }, [userId]),
  );

  const handleToggleConfirm = (nextValue: boolean) => {
    Alert.alert(
      'Confirm Action',
      nextValue
        ? 'Are you sure you want to enable Auto-Approval?'
        : 'Are you sure you want to disable Auto-Approval?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setAutoApprovalState(prev => prev);
          },
        },
        {
          text: 'Yes',
          onPress: async () => {
            setAutoApprovalState(nextValue);
            try {
              await setAutoApproval(user?._id, nextValue);
              dispatch(getProfile(user._id));
            } catch (err) {
              console.log('AutoApproval API error:', err);
            }
          },
        },
      ],
    );
  };

  const ApproveAll = () => {
    if (!posts || posts.length === 0) return;
    setApproveAllPost(true);
    setConfirmModalVisible(true);
  };

  const handleFacebookLogin = async () => {
    await facebookLogin(dispatch, user?._id);
    setModalSocialLogin(false);
  };

  const handleInstagramLogin = async () => {
    // You can add Instagram login logic here
    await instagramLogin(dispatch, user?._id);
    setModalSocialLogin(false);
    Alert.alert('Instagram login successful, tap again to approve post.');
  };
  const handleYouTubeLogin = async () => {
    await youtubeLogin(dispatch, user?._id);
    setModalSocialLogin(false);
  };

  const handleApprove = (item: Post) => {
    setSelectedPost(item);
    setModalVisible(true); // Always show the share modal
  };

  const renderPost = ({ item }: { item: Post }) => {
    const isVideo = item?.url?.endsWith('.mp4');

    return (
      <View style={styles.box}>
        <View style={styles.innerBox}>
          {isVideo ? (
            <Video
              source={{ uri: item.url }}
              style={styles.video}
              resizeMode="contain"
              controls={false}
            />
          ) : (
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          <Button
            title="Approve"
            style={styles.button}
            onPress={() => handleApprove(item)}
          />
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={async () => {
              setLoading(true);
              await postToPage(item, userId, 'reject');
              setLoading(false);
              getPost();
            }}
          >
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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

      <View style={styles.content}>
        <FlatList
          data={posts || []}
          renderItem={renderPost}
          keyExtractor={item => item?._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: fontScale(20), color: Colors.gray }}>
                No data found
              </Text>
            </View>
          )}
        />

        {/* Footer */}
        <View
          style={[
            styles.footer,
            {
              marginBottom:
                posts && posts.length > 0
                  ? verticalScale(80)
                  : verticalScale(100),
            },
          ]}
        >
          {posts && posts.length > 0 && (
            <Button
              title="Approve all"
              style={styles.footButton}
              onPress={ApproveAll}
              textColor={Colors.primaryBlack}
            />
          )}
          <Toggle value={autoApproval} onToggle={handleToggleConfirm} />
        </View>
      </View>

      {/* Share Modal */}
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
              {/* FACEBOOK */}
              <TouchableOpacity
                style={styles.socialButton}
                onPress={async () => {
                  if (facebookuser) {
                    setModalVisible(false);
                    setConfirmModalVisible(true);
                  } else {
                    setCurrentPlatform('facebook');
                    setModalVisible(false);
                    setModalSocialLogin(true);
                  }
                }}
              >
                <Image source={facebook} style={styles.socialIcon} />
                {!facebookuser && (
                  <Text style={{ fontSize: fontScale(12), color: Colors.gray }}>
                    Login required
                  </Text>
                )}
              </TouchableOpacity>

              {/* INSTAGRAM */}
              <TouchableOpacity
                style={styles.socialButton}
                onPress={async () => {
                  if (instagramuser) {
                    setModalVisible(false);
                    setConfirmModalVisible(true);
                  } else {
                    setCurrentPlatform('instagram');
                    setModalVisible(false);
                    setModalSocialLogin(true);
                  }
                }}
              >
                <Image source={instagram} style={styles.socialIcon} />
                {!instagramuser && (
                  <Text style={{ fontSize: fontScale(12), color: Colors.gray }}>
                    Login required
                  </Text>
                )}
              </TouchableOpacity>

              {/* YOUTUBE */}
              <TouchableOpacity
                style={styles.socialButton}
                onPress={async () => {
                  if (youtubeuser) {
                    setModalVisible(false);
                    setConfirmModalVisible(true);
                  } else {
                    setCurrentPlatform('youtube');
                    setModalVisible(false);
                    setModalSocialLogin(true);
                  }
                }}
              >
                <Image source={youtube} style={styles.socialIcon} />
                {!youtubeuser && (
                  <Text style={{ fontSize: fontScale(12), color: Colors.gray }}>
                    Login required
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Social Login Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={ModalSocialLogin}
        onRequestClose={() => setModalSocialLogin(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalSocialLogin(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.SocialLoginmodalBox}>
                <View style={styles.socialLoginContainer}>
                  {currentPlatform === 'facebook' && (
                    <TouchableOpacity
                      style={styles.socialflex}
                      onPress={handleFacebookLogin}
                    >
                      <Image source={facebook} style={styles.socialLoginIcon} />
                      <Text style={styles.loginText}>Login With Facebook</Text>
                    </TouchableOpacity>
                  )}
                  {currentPlatform === 'instagram' && (
                    <TouchableOpacity
                      style={styles.socialflex}
                      onPress={handleInstagramLogin}
                    >
                      <Image
                        source={instagram}
                        style={styles.socialLoginIcon}
                      />
                      <Text style={styles.loginText}>Login With Instagram</Text>
                    </TouchableOpacity>
                  )}
                  {currentPlatform === 'youtube' && (
                    <TouchableOpacity
                      style={styles.socialflex}
                      onPress={handleYouTubeLogin}
                    >
                      <Image source={youtube} style={styles.socialLoginIcon} />
                      <Text style={styles.loginText}>Login With YouTube</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Confirm Modal */}
      <ConfirmationModal
        visible={confirmModalVisible}
        title="Confirm Approval"
        message={
          approveAllPost
            ? `Are you sure you want to approve all posts?`
            : `Are you sure you want to approve this post?`
        }
        confirmText={approveAllPost ? 'Yes, Approve All' : 'Yes, Approve'}
        cancelText="Cancel"
        onConfirm={async () => {
          setConfirmModalVisible(false);
          setLoading(true);
          try {
            let response;

            // Determine the actual social user ID
            const activeUserId =
              currentPlatform === 'instagram'
                ? instagramuser?._id
                : currentPlatform === 'facebook'
                ? facebookuser?._id
                : currentPlatform === 'youtube'
                ? youtubeuser?._id
                : userId; // fallback to main userId

            if (approveAllPost) {
              response = await axios.post(
                `${BASE_URL}${ENDPOINTS.allApprove}`,
                {
                  userId: activeUserId,
                },
              );
              setPointsEarned(response?.point ?? 0);
            } else if (selectedPost) {
              response = await postToPage(selectedPost, activeUserId, 'accept');
              console.log("resposneof aprve===>",response)
              setPointsEarned(response?.point ?? 0);
            }

            setCongratsVisible(true);
            getPost();
          } catch (error) {
            console.error('API Error:', error);
          } finally {
            setLoading(false);
          }
        }}
        onCancel={() => setConfirmModalVisible(false)}
      />

      {/* Congratulation Modal */}
      <CongratulationModal
        points={pointsEarned}
        visible={congratsVisible}
        pendingPoints={pointTracking?.totalPending || 0}
        onClose={() => setCongratsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Notification;

// Styles remain unchanged
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerText: {
    fontSize: fontScale(40),
    fontFamily: Fonts.Medium,
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  box: {
    width: '90%',
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(20),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: verticalScale(15),
    alignSelf: 'center',
    marginTop: verticalScale(2),
  },
  innerBox: { alignItems: 'center' },
  image: { width: '100%', height: verticalScale(150), resizeMode: 'contain' },
  video: {
    width: '100%',
    height: verticalScale(150),
    backgroundColor: 'black',
  },
  button: { width: horizontalScale(250), marginTop: verticalScale(20) },
  rejectButton: {
    height: verticalScale(40),
    borderColor: Colors.red,
    borderWidth: 1,
    width: horizontalScale(250),
    borderRadius: 20,
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
  SocialLoginmodalBox: {
    width: '85%',
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  socialLoginContainer: {
    paddingHorizontal: horizontalScale(40),
    paddingVertical: verticalScale(10),
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
  footButton: {
    width: horizontalScale(250),
    alignSelf: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  footer: {
    width: '90%',
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(20),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: verticalScale(100),
    alignSelf: 'center',
  },
  content: { flex: 1, justifyContent: 'space-between' },
});
