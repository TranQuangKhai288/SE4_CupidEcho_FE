// src/screens/Auth/MatchScreen.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

const MatchScreen: React.FC = ({}) => {
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

export default MatchScreen;
