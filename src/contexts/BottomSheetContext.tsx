import React, {
  createContext,
  useState,
  useContext,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import { View } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

interface BottomSheetContextProps {
  openBottomSheet: (
    content: ReactNode,
    snapPoints?: (string | number)[]
  ) => void;
  closeBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps>({
  openBottomSheet: () => {},
  closeBottomSheet: () => {},
});

export const useBottomSheet = () => useContext(BottomSheetContext);

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<ReactNode>(null);
  const [snapPoints, setSnapPoints] = useState<(string | number)[]>(["80%"]);
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const isMountedRef = useRef(false);
  const pendingActionRef = useRef<{
    action: "open" | "close";
    content?: ReactNode;
    snapPoints?: (string | number)[];
  } | null>(null);

  // Xử lý mở BottomSheet sau khi component đã mounted
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    // Xử lý pending action nếu có
    if (pendingActionRef.current) {
      const { action, content, snapPoints } = pendingActionRef.current;

      if (action === "open" && content && snapPoints) {
        // Mở BottomSheet với nội dung và snapPoints mới
        setTimeout(() => {
          bottomSheetRef.current?.snapToIndex(0);
        }, 50);
      }

      pendingActionRef.current = null;
    }
  }, [content, snapPoints]);

  const openBottomSheet = (
    newContent: ReactNode,
    newSnapPoints: (string | number)[] = ["80%"]
  ) => {
    // Đóng sheet hiện tại nếu đang mở
    if (isOpen) {
      bottomSheetRef.current?.close();

      // Chờ animation đóng hoàn tất trước khi mở lại
      setTimeout(() => {
        setContent(newContent);
        setSnapPoints(newSnapPoints);
        setIsOpen(true);

        // Đánh dấu rằng cần mở sheet sau khi snapPoints được cập nhật
        pendingActionRef.current = {
          action: "open",
          content: newContent,
          snapPoints: newSnapPoints,
        };
      }, 200);
    } else {
      // Nếu sheet đang đóng, cập nhật state trước
      setContent(newContent);
      setSnapPoints(newSnapPoints);
      setIsOpen(true);

      // Đánh dấu rằng cần mở sheet sau khi snapPoints được cập nhật
      pendingActionRef.current = {
        action: "open",
        content: newContent,
        snapPoints: newSnapPoints,
      };
    }
  };

  const closeBottomSheet = () => {
    // if (isOpen) {
    // console.log();
    bottomSheetRef.current?.close();
    setIsOpen(false);
    // }
  };

  // Xử lý khi BottomSheet đóng
  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      setIsOpen(false);
    }
  };

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      <View style={{ flex: 1 }}>
        {children}

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              pressBehavior="close"
            />
          )}
        >
          <BottomSheetView
            // style={{ flex: 1, padding: 20 }}
            className="flex-1 px-6 py-4"
          >
            {content}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </BottomSheetContext.Provider>
  );
};
