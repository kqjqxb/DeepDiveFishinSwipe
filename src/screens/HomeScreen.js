import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DeepDiveAboutScreen from './DeepDiveAboutScreen';

import LinearGradient from 'react-native-linear-gradient';
import DeepDiveSettingsScreen from './DeepDiveSettingsScreen';
import DeepDiveShopScreen from './DeepDiveShopScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeepDiveGameScreen from './DeepDiveGameScreen';
import DeepDiveScoresScreen from './DeepDiveScoresScreen';

const deepBackgrounds = [
  {
    id: 1,
    deepBg: require('../assets/images/deepBgs/bg1.png'),
  },
  {
    id: 2,
    deepBg: require('../assets/images/deepBgs/bg2.png'),
  },
  {
    id: 3,
    deepBg: require('../assets/images/deepBgs/bg3.png'),
  },
  {
    id: 4,
    deepBg: require('../assets/images/deepBgs/bg4.png'),
  },
]

const fishSkins = [
  {
    id: 1,
    fishSkin: require('../assets/images/fishSkins/fishSkin1.png'),
  },
  {
    id: 2,
    fishSkin: require('../assets/images/fishSkins/fishSkin2.png'),
  },
]

const fontPixelifySansRegular = 'PixelifySans-Regular';
const fontPlay = 'Play-Regular';

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedDeepDiveScreen, setSelectedDeepDiveScreen] = useState('Home');

  const styles = createDeepDiveStyles(dimensions);

  const [selectedDeepBackground, setSelectedDeepBackground] = useState(deepBackgrounds[0].deepBg);
  const [userFishesAmount, setUserFishesAmount] = useState(0);
  const [selectedFishesSkin, setSelectedFishSkin] = useState(1);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const storedDeepBackground = await AsyncStorage.getItem('selectedDeepBackground');
        if (storedDeepBackground !== null) {
          setSelectedDeepBackground(JSON.parse(storedDeepBackground));
        } else {
          setSelectedDeepBackground(deepBackgrounds[0].deepBg);
          await AsyncStorage.setItem('selectedDeepBackground', JSON.stringify(deepBackgrounds[0].deepBg));
        }

        const storedUserFishesAmount = await AsyncStorage.getItem('userFishesAmount');
        if (storedUserFishesAmount !== null) {
          setUserFishesAmount(JSON.parse(storedUserFishesAmount));
        } else {
          setUserFishesAmount(0);
          await AsyncStorage.setItem('userFishesAmount', JSON.stringify(0));
        }

        const storedSelectedFishesSkin = await AsyncStorage.getItem('selectedFishesSkin');
        if (storedSelectedFishesSkin !== null) {
          setSelectedFishSkin(JSON.parse(storedSelectedFishesSkin));
        } else {
          setSelectedFishSkin(1);
          await AsyncStorage.setItem('selectedFishesSkin', JSON.stringify(1));
        }
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    };
    loadHomeData();
  }, [setSelectedDeepDiveScreen]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{
        backgroundColor: '#160002',
        width: '100%',
        height: dimensions.height,
        flex: 1,
      }}>
        <Image
          source={selectedDeepBackground}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
          resizeMode='cover'
        />
        <View style={{
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: 'rgba(3, 63, 159, 0.45)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }} />
        {selectedDeepDiveScreen === 'Home' ? (
          <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
          }}>
            <View style={{
              width: dimensions.width * 0.94,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: dimensions.height * 0.01,
            }}>
              <TouchableOpacity
                style={styles.gradientButtonsStyles}

                onPress={() => {
                  setSelectedDeepDiveScreen('AboutDeepDive');
                }}
              >
                <LinearGradient
                  style={[styles.deepOrangeGradient, {
                  }]}
                  colors={['#EA173B', '#FFC100']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                />
                <Image
                  source={require('../assets/icons/infoIcon.png')}
                  style={{
                    width: dimensions.width * 0.065,
                    height: dimensions.width * 0.065,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <View
                style={{
                  width: dimensions.width * 0.55,
                  height: dimensions.width * 0.17,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#003186',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontFamily: fontPlay,
                    fontSize: dimensions.width * 0.06,
                    color: '#fff',
                    marginRight: dimensions.width * 0.025,
                  }}>
                  {userFishesAmount ? userFishesAmount : 0}
                </Text>
                <Image
                  source={require('../assets/images/fishImage.png')}
                  style={{
                    width: dimensions.width * 0.07,
                    height: dimensions.width * 0.07,
                  }}
                  resizeMode='contain'
                />
              </View>

              <TouchableOpacity
                style={styles.gradientButtonsStyles}

                onPress={() => {
                  setSelectedDeepDiveScreen('DeepDiveSettings');
                }}
              >
                <LinearGradient
                  style={[styles.deepOrangeGradient, {
                  }]}
                  colors={['#EA173B', '#FFC100']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                />
                <Image
                  source={require('../assets/icons/settingIcon.png')}
                  style={{
                    width: dimensions.width * 0.06,
                    height: dimensions.width * 0.06,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>

            <Image
              source={require('../assets/images/deepImageText.png')}
              style={{
                width: dimensions.width * 0.8,
                height: dimensions.height * 0.15,
                marginTop: dimensions.height * 0.05,
              }}
              resizeMode='contain'
            />

            <TouchableOpacity style={[styles.gradientButtonsStyles, { marginTop: dimensions.height * 0.07 }]}
              onPress={() => {
                setSelectedDeepDiveScreen('DeepDiveGame');
              }}
            >
              <LinearGradient
                style={[styles.deepOrangeGradient, {
                }]}
                colors={['#EA173B', '#FFC100']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <Image
                source={require('../assets/images/deepStartImage.png')}
                style={{
                  width: dimensions.width * 0.065,
                  height: dimensions.width * 0.065,
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>

            <View style={{
              alignSelf: 'center',
              marginTop: dimensions.height * 0.1,
            }}>
              {['Score', 'Shop'].map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDeepDiveScreen(item);
                  }}
                  key={item}
                  style={[styles.gradientButtonsStyles, {
                    width: dimensions.width * 0.85,
                    height: dimensions.width * 0.14,
                    marginTop: dimensions.height * 0.015,
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
                      marginRight: dimensions.width * 0.025,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
        ) : selectedDeepDiveScreen === 'AboutDeepDive' ? (
          <DeepDiveAboutScreen setSelectedDeepDiveScreen={setSelectedDeepDiveScreen} />
        ) : selectedDeepDiveScreen === 'DeepDiveSettings' ? (
          <DeepDiveSettingsScreen setSelectedDeepDiveScreen={setSelectedDeepDiveScreen} selectedDeepDiveScreen={selectedDeepDiveScreen} />
        ) : selectedDeepDiveScreen === 'Shop' ? (
          <DeepDiveShopScreen setSelectedDeepDiveScreen={setSelectedDeepDiveScreen} selectedDeepBackground={selectedDeepBackground} setSelectedDeepBackground={setSelectedDeepBackground} deepBackgrounds={deepBackgrounds} fishSkins={fishSkins} setSelectedFishSkin={setSelectedFishSkin} userFishesAmount={userFishesAmount} setUserFishesAmount={setUserFishesAmount}/>
        ) : selectedDeepDiveScreen === 'DeepDiveGame' ? (
          <DeepDiveGameScreen setSelectedDeepDiveScreen={setSelectedDeepDiveScreen} selectedDeepBackground={selectedDeepBackground} setSelectedDeepBackground={setSelectedDeepBackground} deepBackgrounds={deepBackgrounds} fishSkins={fishSkins} setSelectedFishSkin={setSelectedFishSkin} userFishesAmount={userFishesAmount} setUserFishesAmount={setUserFishesAmount}/>
        ) : selectedDeepDiveScreen === 'Score' ? (
          <DeepDiveScoresScreen setSelectedDeepDiveScreen={setSelectedDeepDiveScreen} userFishesAmount={userFishesAmount} setUserFishesAmount={setUserFishesAmount}/>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
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

export default HomeScreen;
