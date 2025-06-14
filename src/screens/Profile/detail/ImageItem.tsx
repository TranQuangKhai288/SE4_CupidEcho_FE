import { Image, TouchableOpacity, View } from "react-native";
import { PencilLine } from "lucide-react-native";

type Props = {
  url: string;
  handleSelectMedia: () => void;
};

const ImageItem = ({ url, handleSelectMedia }: Props) => (
  <View className="w-36 h-48 overflow-hidden rounded-3xl mr-3 border-[3px] border-gray-300">
    <Image source={{ uri: url }} className="w-full h-full" />
    <TouchableOpacity 
      className="absolute bottom-2 right-2 bg-white/70 p-2 rounded-full"
      onPress={handleSelectMedia}
    >
      <PencilLine size={24} color="#000" />
    </TouchableOpacity>
  </View>
);

export default ImageItem;