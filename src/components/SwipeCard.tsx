import React, { useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
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
  const swiperRef = useRef<Swiper<CardData>>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swipeKey, setSwipeKey] = useState(0); // Force re-render Swiper

  const swipeLeft = () => swiperRef.current?.swipeLeft();
  const swipeRight = () => swiperRef.current?.swipeRight();

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
      setSwipeKey((prev) => prev + 1); // Reset swiper
    } catch (error) {
      console.error("Failed to load user recommends", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRecommends();
  }, []);

  const renderCard = (card: CardData | undefined) => {
    if (!card) {
      return (
        <View className="items-center justify-center h-96 w-72 bg-gray-100 rounded-xl">
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <DatingCard
        name={card.name}
        age={card.age}
        zodiac={card.zodiac}
        imageUrl={card.image}
        distance={card.distance}
        onLike={swipeRight}
        onDislike={swipeLeft}
        onRefresh={() => console.log("Refresh")}
        onStar={() => console.log("Star")}
      />
    );
  };

  const handleSentRequest = async (data: CardData) => {
    try {
      const resSent = await MatchingAPI.sentRelationshipRequest({
        receiverId: data._id,
      });
      console.log(resSent, "resSent");
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handleDisliked = async (data: CardData) => {
    console.log(data, "card dislike");
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center pb-12">
        {isLoading ? (
          <ActivityIndicator size="large" color="#888" />
        ) : cards.length === 0 ? (
          <View className="items-center justify-center h-96 w-72 bg-gray-100 rounded-xl">
            <Text>No more users. Fetching more...</Text>
          </View>
        ) : (
          <Swiper
            key={swipeKey}
            ref={swiperRef}
            cards={cards}
            cardIndex={0}
            verticalSwipe={false}
            stackSize={5}
            renderCard={renderCard}
            backgroundColor="transparent"
            showSecondCard
            animateCardOpacity
            disableTopSwipe
            onSwipedLeft={(i) => handleDisliked(cards[i])}
            onSwipedRight={(i) => handleSentRequest(cards[i])}
            onSwipedAll={() => {
              console.log("✨ All cards swiped. Fetching more...");
              fetchUserRecommends();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SwipeCard;
