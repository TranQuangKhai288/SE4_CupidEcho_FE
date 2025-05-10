import { Image, TouchableOpacity, View } from "react-native";
import { PencilLine } from "lucide-react-native";

type Props = {
  url: string;
};

const ImageItem = ({ url }: Props) => (
  <View className="w-36 h-48 overflow-hidden rounded-3xl mr-3">
    <Image source={{ uri: url }} className="w-full h-full rounded-3xl" />
    <TouchableOpacity className="absolute bottom-2 right-2 bg-white/70 p-2 rounded-full">
      <PencilLine size={24} color="#000" />
    </TouchableOpacity>
  </View>
);

export default ImageItem;
