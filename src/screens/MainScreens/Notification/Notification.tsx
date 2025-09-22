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
import { facebookLogin } from '../../../utils/AuthHelper';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import CongratulationModal from '../../../components/CongratulationModal/CongratulationModal';
import Toggle from '../../../components/Toggle/Toggle';
import { getProfile } from '../../../redux/AuthSlice';

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
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [approveAllPost, setApproveAllPost] = useState(false);
  const { pointTracking, isLoading, error, totalPoints } = useSelector(
    (state: RootState) => state.rewards,
  );
  console.log('pointTracking', pointTracking?.allTimeVerified);
  const [pointsEarned, setPointsEarned] = useState<number>(0);

  const [autoApproval, setAutoApprovalState] = useState(user?.autoApproval);
  useEffect(() => {
    if (user) {
      dispatch(getProfile(user._id));
    }
  }, [dispatch, user?._id]);
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
              const res = await setAutoApproval(user?._id, nextValue);
              dispatch(getProfile(user._id));
              console.log('AutoApproval response:', res);
            } catch (err) {
              console.log('AutoApproval API error:', err);
            }
          },
        },
      ],
    );
  };

  useFocusEffect(
    useCallback(() => {
      getPost();
    }, [userId]),
  );
  const ApproveAll = () => {
    if (posts.length === 0) return;
    setApproveAllPost(true);
    setConfirmModalVisible(true); // show confirmation modal
  };

  const handleFacebookLogin = () => {
    facebookLogin(dispatch, user?._id);
    setModalSocialLogin(false);
  };
  const handleApprove = async (item: Post) => {
    setApproveAllPost(false);
    setSelectedPost(item);
    if (user?.withSoical === true) {
      setModalVisible(true);
    } else {
      setModalSocialLogin(true);
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.box}>
      <View style={styles.innerBox}>
        <Image
          source={{ uri: item?.url }}
          style={styles.image}
          // resizeMode="contain"
        />
        {/* <Text style={styles.postText}>New collection now available!</Text> */}

        <Button
          title="Approve"
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

        {/* Footer always at bottom */}
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
                  setLoading(false);
                  setModalVisible(false);
                  setConfirmModalVisible(true);
                }}
              >
                <Image source={facebook} style={styles.socialIcon} />
              </TouchableOpacity>

              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
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

      {/* <ConfirmationModal
        visible={confirmModalVisible}
        title="Confirm Approval"
        message={'Are you sure you want to approve this post on Facebook?' }
        confirmText="Yes, Approve"
        cancelText="Cancel"
        onConfirm={async () => {
          setConfirmModalVisible(false);
          if (selectedPost) {
            setLoading(true);
            await postToPage(selectedPost, userId, 'accept');
            setLoading(false);
            setCongratsVisible(true);
            getPost();
          }
        }}
        onCancel={() => setConfirmModalVisible(false)}
      /> */}
      <ConfirmationModal
        visible={confirmModalVisible}
        title="Confirm Approval"
        message={
          approveAllPost
            ? 'Are you sure you want to approve all posts on Facebook?'
            : 'Are you sure you want to approve this post on Facebook?'
        }
        confirmText={approveAllPost ? 'Yes, Approve All' : 'Yes, Approve'}
        cancelText="Cancel"
        onConfirm={async () => {
          setConfirmModalVisible(false);
          setLoading(true);

          try {
            if (approveAllPost) {
              // Call your ApproveAll API here with userId
              await axios.post(`${BASE_URL}${ENDPOINTS.allApprove}`, {
                userId,
              });
            } else if (selectedPost) {
              // Single post approval
              await postToPage(selectedPost, userId, 'accept');
            }

            setCongratsVisible(true);
            getPost(); // refresh posts
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }}
        onCancel={() => setConfirmModalVisible(false)}
      />

      <CongratulationModal
        visible={congratsVisible}
        pendingPoints={pointTracking?.totalPending || 0}
        onClose={() => setCongratsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    // marginHorizontal: horizontalScale(15),
  },
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
  innerBox: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: verticalScale(150),
    resizeMode: 'contain',
  },
  postText: {
    fontSize: fontScale(18),
    fontFamily: Fonts.SemiBold,
    color: Colors.primaryBlack,
    marginTop: verticalScale(20),
    textAlign: 'center',
    width: '90%',
  },
  button: {
    width: horizontalScale(250),
    marginTop: verticalScale(20),
  },
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
  socialLoginContainer: {
    // marginBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(40),
    paddingVertical: verticalScale(10),
  },
  SocialLoginmodalBox: {
    width: '85%',
    backgroundColor: Colors.background,
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
