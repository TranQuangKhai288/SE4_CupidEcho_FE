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
const FETCH_MORE_THRESHOLD = 5; // Số card còn lại để trigger fetch thêm
const FETCH_MORE_AT = 5; // Khi còn 15 card thì bắt đầu fetch thêm
const SwipeCard = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    hasNextPage: true,
  });
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchUserRecommends = async (append = false) => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    setIsLoading(true);
    try {
      const response = await getUserRecommends(
        pagination.page,
        pagination.limit
      );
      const data = response?.data.recommended || [];

      const formattedData: CardData[] = data.map((user: any) => ({
        _id: user._id,
        name: user.name,
        age: user.age,
        zodiac: user.zodiac,
        image: user.avatar,
        distance: user.distance + " km",
      }));

      setCards((prev) =>
        append ? [...prev, ...formattedData] : formattedData
      );

      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
        hasNextPage: response?.data.pagination.hasNextPage,
      }));
    } catch (error) {
      console.error("Failed to load user recommends", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchUserRecommends();
  }, []);
  useEffect(() => {
    // Nếu số lượng card còn lại <= FETCH_MORE_AT và còn page tiếp theo thì fetch thêm
    if (
      cards.length > 0 &&
      cards.length <= FETCH_MORE_AT &&
      pagination.hasNextPage &&
      !isFetchingMore
    ) {
      fetchUserRecommends(true);
    }
  }, [cards, pagination.hasNextPage]);

  const handleSwipe = async (direction: string, card: CardData) => {
    if (direction === "right") {
      try {
        await MatchingAPI.createRelationship({ receiverId: card._id });
        console.log("Liked:", card.name);
      } catch (err) {
        console.log("Like error:", err);
      }
    } else if (direction === "left") {
      try {
        await MatchingAPI.createRelationship({
          receiverId: card._id,
          status: "ignored",
        });
        console.log("Disliked:", card.name);
      } catch (err) {
        console.log("Dislike error:", err);
      }
    }
    setCards((prev) => {
      const newArr = prev.slice(1);
      return newArr;
    });
  };
  const renderCard = () => {
    const currentCard = cards[0];
    if (!currentCard) return null;

    return (
      <TinderSwiper
        data={cards}
        onSwipeLeft={(item) => handleSwipe("left", item)}
        onSwipeRight={(item) => handleSwipe("right", item)}
      />
    );
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      {isLoading && cards.length === 0 ? (
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
