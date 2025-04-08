import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-deck-swiper";
import ProfileCard from "./ProfileCard";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import DatingCard from "./DatingCard";

type CardData = {
  name: string;
  job: string;
  age: number;
  image: string;
  distance?: string;
};

const cards: CardData[] = [
  {
    name: "Kristin, 26",
    age: 24,
    job: "Officer",
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-19-1.jpg",
    distance: "2.9 km",
  },
  {
    name: "Esther, 24",
    age: 24,
    job: "Traveller",
    image: "https://i.pravatar.cc/300?img=34",
    distance: "2.9 km",
  },
  {
    name: "Esther, 24",
    age: 24,
    job: "Traveller",
    image: "https://i.pravatar.cc/300?img=30",
    distance: "2.9 km",
  },
  {
    name: "Esther, 24",
    age: 24,
    job: "Traveller",
    image: "https://i.pravatar.cc/300?img=31",
    distance: "2.9 km",
  },
];

const SwipeCard = () => {
  const swiperRef = useRef<Swiper<CardData>>(null);

  const swipeLeft = () => swiperRef.current?.swipeLeft();
  const swipeRight = () => swiperRef.current?.swipeRight();

  return (
    <View className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-center pb-12'>
        <Swiper
          ref={swiperRef}
          cards={cards}
          cardIndex={0}
          verticalSwipe={false}
          stackSize={5}
          renderCard={(card) => (
            <DatingCard
              name={card.name}
              age={card.age}
              profession={card.job}
              imageUrl={card.image}
              distance={card.distance}
              onLike={swipeRight}
              onDislike={swipeLeft}
              onRefresh={() => console.log("Refresh")}
              onStar={() => console.log("Star")}
            />
          )}
          backgroundColor='transparent'
          showSecondCard
          animateCardOpacity
          disableTopSwipe
          onSwipedLeft={(i) => console.log("❌ Disliked:", cards[i]?.name)}
          onSwipedRight={(i) => console.log("❤️ Liked:", cards[i]?.name)}
        />
      </View>
    </View>
  );
};

export default SwipeCard;
