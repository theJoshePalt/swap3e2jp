import { View, Text, Animated, PanResponder, Dimensions } from "react-native";
import { useRef } from "react";
import { Feather } from "@expo/vector-icons";
import "@/global.css";
const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;//// esto da la sensibilidad de movimiento

export default function IndexScreen() {
  const position = useRef(new Animated.ValueXY()).current;// valor animado que va cambiando con la posicion del deo

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-15deg", "0deg", "15deg"],
    extrapolate: "clamp",
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: width + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => resetPosition());
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => resetPosition());
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  return (
    <View className="flex-1 bg-[#75004A] items-center justify-center">
      
      {/* CARD */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [...position.getTranslateTransform(), { rotate }],
        }}
        className="w-[85%] h-[60%] bg-[#000000] rounded-3xl items-center justify-center shadow-lg"
      >
        {/* LIKE */}
        <Animated.View
          style={{ opacity: likeOpacity }}
          className="absolute top-6 left-6"
        >
          <Feather name="check" size={48} color="#ffffff" />
        </Animated.View>

        {/* NOPE */}
        <Animated.View
          style={{ opacity: nopeOpacity }}
          className="absolute top-6 right-6"
        >
          <Feather name="x" size={48} color="#FF00A1" />
        </Animated.View>

        <Text className="text-[#FFB8E5] text-3xl font-bold text-center ">
          SWIPE
        </Text>
        <Text className="text-[#FF00A1] text-center">
          A LA IZQUIERDA PARA NO
        </Text>
        <Text className="text-[#FFffff] text-center">
          A LA DERECHA PARA SI
        </Text>
      </Animated.View>
    </View>
  );
}
