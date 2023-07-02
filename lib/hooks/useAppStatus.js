import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
// import { useFocusEffect } from "@react-navigation/native";
import { AppState, Platform } from "react-native";
import React, { useEffect } from "react";

import { focusManager } from "@tanstack/react-query";

export function useRefreshOnFocus(refetch) {
  const firstTimeRef = React.useRef(true);

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (firstTimeRef.current) {
  //       firstTimeRef.current = false;
  //       return;
  //     }

  //     // refetch();
  //   }, [refetch])
  // );
}

export function useAppState() {
  function onAppStateChange(status) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);
}
