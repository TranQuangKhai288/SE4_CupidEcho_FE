// src/screens/Auth/ChatScreen.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

const ChatScreen: React.FC = ({}) => {
  const handleHome = () => {
    console.log('Login');
  };

  return (
    <View>
      <Text>Chat Screen</Text>
      <Button title="Click" onPress={handleHome} />
    </View>
  );
};

export default ChatScreen;
