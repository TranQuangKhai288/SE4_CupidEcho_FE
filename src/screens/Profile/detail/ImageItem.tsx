import { Image, TouchableOpacity, View } from "react-native";
import { PencilLine } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
type Props = {
  url: string;
};

const handleSelectMedia = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    quality: 1,
  });
};

const uploadToCloudinary = async (
  uri: string,
  type: "image" | "video"
): Promise<string | null> => {
  const data = new FormData();

  const file = {
    uri,
    type: type === "image" ? "image/jpeg" : "video/mp4",
    name: `post_${Date.now()}.${type === "image" ? "jpg" : "mp4"}`,
  };

  data.append("file", file as any);
  data.append("upload_preset", "eBook_project");
  data.append("cloud_name", "ddzqupaez");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/ddzqupaez/${type}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
};



const ImageItem = ({ url }: Props) => (
  <View className="w-36 h-48 overflow-hidden rounded-3xl mr-3 border-[3px] border-gray-300">
    <Image source={{ uri: url }} className="w-full h-full" />
    <TouchableOpacity className="absolute bottom-2 right-2 bg-white/70 p-2 rounded-full">
      <PencilLine size={24} color="#000" onPress={() => {
        handleSelectMedia()
      }} />
      
    </TouchableOpacity>
  </View>
);

export default ImageItem;
