import React, { FC, ReactNode } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Logo } from '../../../assets/images';
import Container from '../../../components/Container';
import Colors from '../../../utils/color';
import { Fonts } from '../../../utils/Fonts';
import { fontScale, verticalScale } from '../../../utils/scale';

interface AuthScreenWrapperProps {
  children: ReactNode;
  heading?: string;
}

const AuthScreenWrapper: FC<AuthScreenWrapperProps> = ({
  children,
  heading,
}) => {
  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          {heading && <Text style={styles.title}>{heading}</Text>}
          {children}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Terms & Conditions & Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default AuthScreenWrapper;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 6,
    marginTop: verticalScale(18),
  },
  footerText: {
    color: Colors.purple,
    fontSize: 12,
    fontFamily: Fonts.Regular,
  },
  title: {
    fontSize: fontScale(32),
    fontFamily: Fonts.SemiBold,
    marginBottom: verticalScale(20),
    textAlign: 'left',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 20,
  },
});
