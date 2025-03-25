// src/screens/Auth/MapsScreen.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

const MapsScreen: React.FC = ({}) => {
  const handleHome = () => {
    console.log('Login');
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Click" onPress={handleHome} />
    </View>
  );
};

export default MapsScreen;
