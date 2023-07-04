import { TouchableOpacity, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { FlatGrid } from "react-native-super-grid";
import { Stack, useRouter } from "expo-router";
import tw from "../../../lib/tailwind";
import { useGAlleries } from "../../../lib/services/galleries";
import { BASE_URL } from "../../../lib/config";
import View from "../../../components/View";
import Text from "../../../components/Text";
import Gallery from "react-native-image-gallery";
import { Modal } from "native-base";

export default function gallery() {
  const { data, isLoading, error, isError } = useGAlleries();
  const router = useRouter();
  const [viewImage, setViewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return (
      <Text>
        Sorry an error occured: {error.message} -{" "}
        {error?.response?.data.message}
      </Text>
    );
  }
  return (
    <View style={"flex-1"}>
      <Modal
        isOpen={viewImage}
        onClose={() => setViewImage(false)}
        style={tw`mt-8`}
      >
        <View style={"bg-black pb-14"}>
          <ViewImage images={data?.galleries} initialImage={selectedImage} />
          <Modal.CloseButton />
        </View>
      </Modal>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={tw`bg-primary-100 px-3 py-2 rounded-full`}
              onPress={() => router.push("home/gallery/create")}
            >
              <Text style="text-primary font-bold">Add Style</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style="py-3 pb-10">
        <FlatGrid
          data={data?.galleries}
          // keyExtractor={()}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setViewImage(true);
                setSelectedImage(index);
              }}
            >
              <View style="w-[160px] h-[200px]  rounded-lg overflow-hidden">
                <Image
                  source={{ uri: `${BASE_URL}/gallery/${item.photo}` }}
                  style={tw`w-full h-full`}
                />
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

export function ViewImage({ images, initialImage }) {
  return (
    <Gallery
      initialPage={initialImage}
      images={images}
      flatListProps={{ windowSize: 2 }}
      imageComponent={({ image }) => {
        return (
          <View style="  rounded-lg overflow-hidden">
            <Image
              source={{ uri: `${BASE_URL}/gallery/${image.photo}` }}
              style={tw`w-full h-full`}
              resizeMode={"contain"}
            />
          </View>
        );
      }}
    />
  );
}
