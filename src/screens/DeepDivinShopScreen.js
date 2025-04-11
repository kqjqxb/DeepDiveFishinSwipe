import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const fontInterRegular = 'Inter-Regular';
const fontOrbitronExtraBold = 'Orbitron-ExtraBold';

const fontPixelifySansRegular = 'PixelifySans-Regular';
const fontPlay = 'Play-Regular';

const DeepDivinShopScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [currentCallEnSlideToSportIndex, setCurrentCallEnSlideToSportIndex] = useState(0);
  const callEnSlidesToSportRef = useRef(null);
  const callEnScrollToSportX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const styles = createDeepDiveStyles(dimensions);

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };
    const dimensionListener = Dimensions.addEventListener('change', onChange);
    return () => {
      dimensionListener.remove();
    };
  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentCallEnSlideToSportIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToTheNextCallEnSportSlide = () => {
    if (currentCallEnSlideToSportIndex < callEnOnboardingToSportData.length - 1) {
      callEnSlidesToSportRef.current.scrollToIndex({ index: currentCallEnSlideToSportIndex + 1 });
    } else {
      navigation.replace('TermsScreen');
    }
  };

  const callEnRenderItem = ({ item }) => (
    <View style={{
      alignItems: 'center',

      justifyContent: 'space-between',

      flex: 1,

      width: dimensions.width,
    }}>
      <View style={{
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: dimensions.width,
      }}>
        <Image
          source={item.callEnImage}
          style={{
            borderBottomLeftRadius: dimensions.width * 0.05,
            width: dimensions.width,
            borderBottomRightRadius: dimensions.width * 0.05,
            alignSelf: 'center',
            height: dimensions.height * 0.6,
          }}
          resizeMode="stretch"
        />
        <Text
          style={{
            paddingHorizontal: dimensions.width * 0.05,
            textAlign: 'left',
            color: 'white',
            fontSize: dimensions.width * 0.06,
            maxWidth: dimensions.width * 0.89,
            alignSelf: 'flex-start',
            fontFamily: fontOrbitronExtraBold,
            marginTop: dimensions.height * 0.02,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: '#fff',
            marginTop: dimensions.height * 0.015,
            fontWeight: 400,
            textAlign: 'left',
            paddingHorizontal: dimensions.width * 0.05,
            fontFamily: fontInterRegular,
            alignSelf: 'flex-start',
            fontSize: dimensions.width * 0.035,
            maxWidth: dimensions.width * 0.8,
          }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        backgroundColor: '#160002',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      {/* <LinearGradient
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        colors={['#EB510A', '#D80715']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={{ display: 'flex' }}>
        <FlatList
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={callEnRenderItem}
          data={callEnOnboardingToSportData}
          viewabilityConfig={viewConfig}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: callEnScrollToSportX } } }], {
            useNativeDriver: false,
          })}
          ref={callEnSlidesToSportRef}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
        />
      </View> */}
      <Image
        source={require('../assets/images/onboardingDeepDiveImage.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          width: dimensions.width,
          height: dimensions.height,
        }}
      />
      <View style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: 'rgba(3, 63, 159, 0.4)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }} />
      <View style={{
        marginTop: dimensions.height * 0.45,
      }}>
        <Image
          source={require('../assets/images/welkomeTextImage.png')}
          style={{
            zIndex: 0,
            width: dimensions.width * 0.8,
            height: dimensions.height * 0.15,
            alignSelf: 'center',
          }}
          resizeMode='contain'
        />
        <Text
          style={{
            textAlign: 'left',
            fontWeight: 700,
            fontFamily: fontPixelifySansRegular,
            fontSize: dimensions.width * 0.06,
            color: '#fff',
            marginRight: dimensions.width * 0.025,
            alignSelf: 'flex-start',
            paddingHorizontal: dimensions.width * 0.05,
          }}>
          Ready to test your reflexes beneath the waves?Out here, it’s just you, the fish... and the swipe.
        </Text>

      </View>

      <TouchableOpacity
        onPress={() => {
          setSelectedDeepDiveScreen(item);
        }}
        style={[styles.gradientButtonsStyles, {
          width: dimensions.width * 0.85,
          height: dimensions.width * 0.14,
          marginBottom: dimensions.height * 0.015,
        }]}
      >
        <LinearGradient
          style={[styles.deepOrangeGradient, {
          }]}
          colors={['#EA173B', '#FFC100']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontFamily: fontPixelifySansRegular,
            fontSize: dimensions.width * 0.06,
            color: '#fff',
          }}>
          Next
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const createDeepDiveStyles = (dimensions) => StyleSheet.create({
  deepOrangeGradient: {
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
    zIndex: 0,
    shadowOpacity: 0.4,
    shadowColor: 'black',
    shadowRadius: dimensions.width * 0.03,
    elevation: 7,
    bottom: 0,
    shadowOffset: {
      width: dimensions.width * 0.002,
      height: dimensions.height * 0.01
    },
  },
  gradientButtonsStyles: {
    width: dimensions.width * 0.17,
    height: dimensions.width * 0.17,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }
});

export default DeepDivinShopScreen;
