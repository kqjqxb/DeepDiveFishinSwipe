import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';

const CallEnLoadToSporttAppScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1500);
  }, []);

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      zIndex: 1,
    }}>
      <Image
        source={require('../assets/images/loaderImage.png')}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default CallEnLoadToSporttAppScreen;
