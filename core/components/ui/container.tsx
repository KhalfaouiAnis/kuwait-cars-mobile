import { PropsWithChildren, ReactNode } from "react";
import { ScrollView } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

const Container = ({
  children,
  backgroundColor,
  header,
  scrollable,
}: PropsWithChildren<{
  backgroundColor?: string;
  header?: ReactNode;
  scrollable?: boolean;
}>) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1"
      style={{ marginBottom: bottom, backgroundColor }}
    >
      {scrollable ? (
        <>
          {header && header}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingBottom: 100 }}
          >
            {children}
          </ScrollView>
        </>
      ) : (
        <>
          {header && header}
          {children}
        </>
      )}
    </SafeAreaView>
  );
};

export default Container;
