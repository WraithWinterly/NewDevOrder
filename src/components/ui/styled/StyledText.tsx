import React, {ReactNode, useEffect} from 'react';
import {Text, StyleSheet, View, StyleProp, TextStyle} from 'react-native';
import {Colors} from 'src/styles/styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

interface StyledTextProps {
  children: ReactNode;
  type?: 'normal' | 'header';
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  truncate?: boolean;
  suspense?: boolean;
  trigger?: any;
  height?: number;
  shimmerWidth?: number;
}

export default function StyledText({
  children,
  type = 'normal',
  style,
  onPress,
  suspense = false,
  truncate = false,
  trigger,
  shimmerWidth = 60,
}: StyledTextProps) {
  // Styles for StyledText
  let newStyle: StyleProp<TextStyle> = {};
  const actualShimmerWidth = shimmerWidth / 2;
  switch (type) {
    case 'normal':
      newStyle = {
        fontSize: 16,
        color: Colors.Text,
      };
      break;
    case 'header':
      newStyle = {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.White,
      };
      break;
  }

  // Logic for SuspenseText
  const textWidth = shimmerWidth;
  const translateX = useSharedValue(-actualShimmerWidth);

  //@ts-expect-error
  const shimmerHeight = (!!style?.fontSize && style?.fontSize) || 16;

  const styles = StyleSheet.create({
    shimmer: {
      position: 'absolute',
      top: 0,
      width: actualShimmerWidth,
      height: shimmerHeight ?? '100%',
      backgroundColor: Colors.Gray[400],
    },
  });

  useEffect(() => {
    if (!suspense) return;
    translateX.value = withRepeat(
      withSequence(
        withTiming(textWidth + actualShimmerWidth - 34, {duration: 1200}),
        withTiming(-actualShimmerWidth, {duration: 0}),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  if (trigger == null && suspense) {
    return (
      <View
        style={[
          style,
          {
            overflow: 'hidden',
            borderRadius: 12,
            backgroundColor: Colors.Gray[500],
            width: textWidth,
            height: shimmerHeight,
            justifyContent: 'center',
            marginVertical: 3,
            // marginTop: 6,
          },
        ]}>
        <Animated.View style={[styles.shimmer, animatedStyles]}>
          <LinearGradient
            colors={[Colors.Gray[500], Colors.Gray[400], Colors.Gray[500]]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{flex: 1}}
          />
        </Animated.View>
      </View>
    );
  }

  return truncate ? (
    <Text
      style={[newStyle, style]}
      numberOfLines={1}
      ellipsizeMode="tail"
      onPress={onPress}>
      {children}
    </Text>
  ) : (
    <Text style={[newStyle, style]} onPress={onPress}>
      {children}
    </Text>
  );
}
