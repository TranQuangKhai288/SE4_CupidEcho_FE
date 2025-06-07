import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import TinderSwiper from "./TinderSwiper";
import DatingCard from "./DatingCard";
import { getUserRecommends } from "../apis/UserAPI";
import * as MatchingAPI from "../apis/MatchingAPI";

type CardData = {
  _id: string;
  name: string;
  zodiac: string;
  age: number;
  image: string;
  distance?: string;
};

const SwipeCard = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserRecommends = async () => {
    setIsLoading(true);
    try {
      const response = await getUserRecommends();
      const data = response?.data.recommended || [];

      const formattedData: CardData[] = data.map((user: any) => ({
        _id: user._id,
        name: user.name,
        age: user.age,
        zodiac: user.zodiac,
        image: user.avatar,
        distance: user.distance + " km",
      }));

      setCards(formattedData);
    } catch (error) {
      console.error("Failed to load user recommends", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRecommends();
  }, []);

  const handleSwipe = async (direction: string, card: CardData) => {
    if (direction === "right") {
      try {
        // await MatchingAPI.createRelationship({
        //   receiverId: card._id,
        // });
        console.log("Liked:", card.name);
      } catch (err) {
        console.log("Like error:", err);
      }
    } else if (direction === "left") {
      try {
        // await MatchingAPI.createRelationship({
        //   receiverId: card._id,
        //   status: "ignored",
        // });
        console.log("Disliked:", card.name);
      } catch (err) {
        console.log("Dislike error:", err);
      }
    }

    // Bỏ card vừa quẹt
    setCards((prev) => prev.slice(1));
  };

  const renderCard = () => {
    const currentCard = cards[0];
    if (!currentCard) return null;

    return (
      // <TinderCard
      //   key={currentCard._id}
      //   onSwipe={(dir) => handleSwipe(dir, currentCard)}
      //   preventSwipe={["up", "down"]}
      // >
      //   <DatingCard
      //     name={currentCard.name}
      //     age={currentCard.age}
      //     zodiac={currentCard.zodiac}
      //     imageUrl={currentCard.image}
      //     distance={currentCard.distance}
      //     onRefresh={() => console.log("Refresh")}
      //     onStar={() => console.log("Star")}
      //   />
      // </TinderCard>
      <TinderSwiper
        data={cards}
        onSwipeLeft={(item) => console.log("Swipe Left:", item.name)}
        onSwipeRight={(item) => console.log("Swipe Right:", item.name)}
      />
    );
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      {isLoading ? (
        <ActivityIndicator size="large" color="#888" />
      ) : cards.length === 0 ? (
        <View className="items-center justify-center h-96 w-72 bg-gray-100 rounded-xl">
          <Text>No more users. Fetching more...</Text>
        </View>
      ) : (
        <View className="absolute">{renderCard()}</View>
      )}
    </View>
  );
};

export default SwipeCard;
