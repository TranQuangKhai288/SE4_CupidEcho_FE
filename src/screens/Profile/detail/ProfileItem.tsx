import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface ProfileItemProps {
    icon: JSX.Element;
    text: string;
    isLogout?: boolean;
    onPress?: () => void;
  }

  const ProfileItem: React.FC<ProfileItemProps> = ({ icon, text, isLogout, onPress }) => {
    return (
      <TouchableOpacity className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200"
      onPress={onPress}>
        <View className="flex-row items-center gap-4">
          {icon}
          <Text className={`text-lg ${isLogout ? "text-red-500" : "text-black"}`}>{text}</Text>
        </View>
        <ChevronRight size={24} color="gray" />
      </TouchableOpacity>
    );
  }
export default ProfileItem;