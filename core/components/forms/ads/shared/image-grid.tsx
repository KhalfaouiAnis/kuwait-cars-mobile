import React, { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemSize = (width - 30) / numColumns;

interface Props {
  images: any[]
}

const ImageGrid = ({ images }: Props) => {
  const [data, setData] = useState(images);

  const renderItem = (element: any) => {
    return (
      <ScaleDecorator>
        <View style={styles.item} key={element.item.key}>
          <Pressable onLongPress={element.drag} style={[
            { flex: 1 },
            element.isActive && { opacity: 0.5, backgroundColor: 'lightgray' },
          ]}>
            <Image source={{ uri: element.item.uri }} style={styles.image} />
            {/* {data[0].key === item.key && (
            <View style={styles.mainBadge}>
            </View>
          )} */}
          </Pressable>
        </View>
      </ScaleDecorator>
    );
  };

  const handleDragRelease = (newOrder: any) => {
    setData(newOrder);
    console.log("New main picture URI:", newOrder[0].uri);
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      numColumns={numColumns}
      // contentContainerStyle={styles.grid}
      activationDistance={10}
    />
  )

  // return (
  //   <DraggableGrid
  //     numColumns={numColumns}
  //     renderItem={renderItem}
  //     data={data}
  //     onDragRelease={handleDragRelease}
  //     style={styles.grid}
  //   />
  // );
};

const styles = StyleSheet.create({
  grid: {
    // padding: 5,
    width: itemSize, // Explicitly define width
    height: itemSize, // Explicitly define height
    padding: 4,
  },
  item: {
    width: itemSize,
    height: itemSize,
    padding: 4,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
  mainBadge: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ImageGrid;

// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity } from "react-native";
// import DraggableFlatList, {
//   RenderItemParams,
//   ShadowDecorator
// } from "react-native-draggable-flatlist";

// const NUM_ITEMS = 10;

// function getColor(i: number) {
//   const multiplier = 255 / (NUM_ITEMS - 1);
//   const colorVal = i * multiplier;
//   return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
// }

// type Item = {
//   key: string;
//   label: string;
//   height: number;
//   width: number;
//   backgroundColor: string;
// };

// const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
//   const backgroundColor = getColor(index);
//   return {
//     key: `item-${index}`,
//     label: String(index) + "",
//     height: 100,
//     width: 60 + Math.random() * 40,
//     backgroundColor,
//   };
// });

// export default function ImageGrid() {
//   const [data, setData] = useState(initialData);

//   const renderItem = ({ item, drag }: RenderItemParams<Item>) => {
//     return (
//       <ShadowDecorator>
//         <TouchableOpacity
//           onLongPress={drag}
//           style={[
//             styles.rowItem,
//             { backgroundColor: item.backgroundColor },
//           ]}
//         >
//           <Text style={styles.text}>{item.label}</Text>
//         </TouchableOpacity>
//       </ShadowDecorator>
//     );
//   };

//   return (
//     <DraggableFlatList
//       data={data}
//       onDragEnd={({ data }) => setData(data)}
//       keyExtractor={(item) => item.key}
//       renderItem={renderItem}
//       contentContainerStyle={styles.listContainer}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   listContainer: {
//     gap: 4,
//   },
//   rowItem: {
//     height: 100,
//     width: 100,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 4
//   },
//   text: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });