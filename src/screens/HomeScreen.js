import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallEnSettingsScreen from './CallEnSettingsScreen';
import CallEmSportsFactsScreen from './CallEmSportsFactsScreen';

import CallEnTrainingsScreen from './CallEnTrainingsScreen';

import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeftIcon, PlusCircleIcon } from 'react-native-heroicons/outline';

const fontInterRegular = 'Inter-Regular';
const fontOrbitronRegular = 'Orbitron-Regular';
const fontOrbitronExtraBold = 'Orbitron-ExtraBold';
const fontPixelifySansRegular = 'PixelifySans-Regular';

const fontPlay = 'Play-Regular';

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedCallEnScreenToSport, setSelectedCallEnScreenToSport] = useState('Home');

  const styles = createDeepDiveStyles(dimensions);
  const [isCreatingWorkoutNow, setIsCreatingWorkoutNow] = useState(false);
  const [isSelectCategoryWasVisible, setIsSelectCategoryWasVisible] = useState(false);
  const [selectedWorkoutCategory, setSelectedWorkoutCategory] = useState(null);

  const [nameWorkout, setNameWorkout] = useState('');
  const [repeatingWorkout, setRepeatingWorkout] = useState('');
  const [executionTime, setExecutionTime] = useState('');
  const [selectedRestTime, setSelectedRestTime] = useState('');
  const [ownedWorkouts, setOwnedWorkouts] = useState([]);

  const [name, setName] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');

        if (savedName !== null) {
          setName(savedName);
        }
      } catch (error) {
        console.error('Error loading name data', error);
      }
    };
    loadData();
  }, [selectedCallEnScreenToSport]);

  const saveNewWorkout = async () => {
    try {
      const exOwnedWorkouts = await AsyncStorage.getItem('ownedWorkouts');
      const ownedWorkouts = exOwnedWorkouts ? JSON.parse(exOwnedWorkouts) : [];
      const newWorkoutIdentify = ownedWorkouts.length > 0 ? Math.max(...ownedWorkouts.map(newWorkout => newWorkout.id)) + 1 : 1;

      const newWorkout = {
        id: newWorkoutIdentify,
        title: nameWorkout,
        repeatingWorkout,
        executionTime,
        restTime: selectedRestTime,
        workoutCategory: selectedWorkoutCategory,
      };

      ownedWorkouts.unshift(newWorkout);
      await AsyncStorage.setItem('ownedWorkouts', JSON.stringify(ownedWorkouts));
      setOwnedWorkouts(ownedWorkouts);

      setNameWorkout('');
      setRepeatingWorkout('');
      setExecutionTime('');
      setSelectedRestTime('');
      setSelectedWorkoutCategory(null);
      setIsSelectCategoryWasVisible(false);
      setIsCreatingWorkoutNow(false);

      setSelectedCallEnScreenToSport('Trainings');
    } catch (error) {
      console.error('Error saving newWorkout:', error);
    }
  };

  useEffect(() => {
    const loadOwnedWorkouts = async () => {
      try {
        const exOwnedWorkouts = await AsyncStorage.getItem('ownedWorkouts');
        if (exOwnedWorkouts) {
          setOwnedWorkouts(JSON.parse(exOwnedWorkouts));
        }
      } catch (error) {
        console.error('Error loading ownedWorkouts:', error);
      }
    };

    loadOwnedWorkouts();
  }, [selectedCallEnScreenToSport]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{
        backgroundColor: '#160002',
        width: '100%',
        height: dimensions.height,
        flex: 1,
      }}>
        <Image
          source={require('../assets/images/homeBg.png')}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
          resizeMode='cover'
        />
        {selectedCallEnScreenToSport === 'Home' ? (
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
                  setIsSelectCategoryWasVisible(true);
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
                  10
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
                  setIsSelectCategoryWasVisible(true);
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

            <TouchableOpacity style={[styles.gradientButtonsStyles, {marginTop: dimensions.height * 0.07}]}
              onPress={() => {

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
                    setSelectedCallEnScreenToSport(item);
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
        ) : selectedCallEnScreenToSport === 'CallEnSettings' ? (
          <CallEnSettingsScreen setSelectedCallEnScreenToSport={setSelectedCallEnScreenToSport} />
        ) : selectedCallEnScreenToSport === 'SportsFacts' ? (
          <CallEmSportsFactsScreen setSelectedCallEnScreenToSport={setSelectedCallEnScreenToSport} />
        ) : selectedCallEnScreenToSport === 'Trainings' ? (
          <CallEnTrainingsScreen setSelectedCallEnScreenToSport={setSelectedCallEnScreenToSport} setOwnedWorkouts={setOwnedWorkouts} ownedWorkouts={ownedWorkouts} />
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
