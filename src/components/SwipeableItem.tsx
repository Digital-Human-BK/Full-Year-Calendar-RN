import React, { useRef, ReactNode } from 'react';
import { View, PanResponder } from 'react-native';

const SwipeableItem = ({
  onSwipeLeft,
  onSwipeRight,
  children,
}: {
  onSwipeLeft: any;
  onSwipeRight: any;
  children: ReactNode;
}) => {
  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Set a threshold for how far the user needs to swipe
        return Math.abs(gestureState.dx) > 30;
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Check if the user swiped left or right
        if (gestureState.dx < 0) {
          onSwipeLeft();
        } else {
          onSwipeRight();
        }
      },
    }),
  ).current;

  return <View {...panResponderRef.panHandlers}>{children}</View>;
};

export default SwipeableItem;
