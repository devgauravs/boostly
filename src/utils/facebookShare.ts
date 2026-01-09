import { Alert } from 'react-native';
import { ShareDialog, ShareLinkContent } from 'react-native-fbsdk-next';



export const shareToFacebook = async (shareUrl: string): Promise<boolean> => {
  if (!shareUrl) {
    Alert.alert('Error', 'No URL to share');
    return false;
  }

  const shareLinkContent: ShareLinkContent = {
    contentType: 'link',
    contentUrl: shareUrl,
  };

  try {
    const canShow: boolean = await ShareDialog.canShow(shareLinkContent);

    if (!canShow) {
      Alert.alert('Error', 'Cannot open Facebook Share Dialog');
      return false;
    }

    const result = await ShareDialog.show(shareLinkContent);

    if (result.isCancelled) {
      console.log('❌ Facebook share cancelled');
      return false;
    }

    console.log('✅ Facebook share dialog completed');
    return true;

  } catch (error) {
    console.error('Facebook Share Error:', error);
    Alert.alert('Error', 'Failed to share on Facebook');
    return false;
  }
};
