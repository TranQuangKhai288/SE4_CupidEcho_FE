import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface MenuItemProps {
    icon: JSX.Element;
    text: string;
    isLogout?: boolean;
  }

  const MenuItem: React.FC<MenuItemProps> = ({ icon, text, isLogout }) => {
    return (
      <TouchableOpacity className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center gap-4">
          {icon}
          <Text className={`text-lg ${isLogout ? "text-red-500" : "text-black"}`}>{text}</Text>
        </View>
        <ChevronRight size={24} color="gray" />
      </TouchableOpacity>
    );
  }
export default MenuItem;