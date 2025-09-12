import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { Text, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


interface GradientTextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  colors?: string[];
}

const GradientText: React.FC<GradientTextProps> = ({ text, style, colors }) => {
  return (
    <MaskedView maskElement={<Text style={style}>{text}</Text>}>
      <LinearGradient
        colors={colors ?? ['#163A97', '#4364F7']} // default gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Invisible text just to occupy the same layout */}
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
