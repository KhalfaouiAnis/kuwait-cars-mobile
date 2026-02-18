import { useCallback, useRef, useState } from "react";
import { Dimensions, View } from "react-native";

export const useDropdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<View>(null);

  const open = useCallback(() => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const screenHeight = Dimensions.get("window").height;
      const dropdownHeight = 250;

      const showUpward = pageY + height + dropdownHeight > screenHeight;

      setCoords({
        top: showUpward ? pageY - dropdownHeight - 8 : pageY + height + 8,
        left: pageX,
        width: width,
      });
      setIsVisible(true);
    });
  }, []);

  const close = useCallback(() => setIsVisible(false), []);

  return {
    triggerRef,
    isVisible,
    coords,
    open,
    close,
    toggle: () => (isVisible ? close() : open()),
  };
};
