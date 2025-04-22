import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
  } from "react-native";

// Define navigation param list
type RootStackParamList = {
    PersonalInfo: undefined;
    DiscoverySetting: undefined;
    PrivacyPermissions: undefined;
    Notifications: undefined;
    Security: undefined;
    DataStorage: undefined;
    Feedback: undefined;
    Language: undefined;
    AboutHume: undefined;
  };
  


interface SettingItemProps {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    screen: keyof RootStackParamList;
    extra?: string;
    iconColor: string;
    onPress: () => void;
  }

// Component SettingItem tách riêng
const SettingItem: React.FC<SettingItemProps> = ({
    title,
    icon: Icon,
    extra,
    iconColor,
    onPress,
  }) => {
    return (
      <TouchableOpacity
        className="flex-row items-center py-4 px-4 border-b border-gray-200"
        onPress={onPress}
      >
        {/* Icon Container */}
        <View className="w-10 h-10 rounded-full bg-gray-200 justify-center items-center mr-4">
          <Icon color={iconColor} size={24} />
        </View>
  
        {/* Title and Extra Text */}
        <View className="flex-1">
          <Text className="text-base font-medium text-black">{title}</Text>
          {extra && <Text className="text-sm text-gray-500">{extra}</Text>}
        </View>
  
        {/* Right Arrow */}
        <View className="w-6 h-6 justify-center items-center">
          <Text className="text-black text-xl">{">"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  export default SettingItem;
  