import React, { useState } from "react";
import { Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import tw from "../../../lib/tailwind";
import Text from "../../../components/Text";
import View from "../../../components/View";
import Button from "../../../components/Button";
import { MIcon } from "../../../components/Icons";
import { FlatGrid } from "react-native-super-grid";
import { useAddPhotos } from "../../../lib/services/galleries";

export default function CreatePost({ navigation }) {
  const [selectedAssets, setSelectedAssets] = useState([]);

  const { addPhotos } = useAddPhotos();

  const router = useRouter();

  // select post images
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //   setSelectedMedia([
      //     ...selectedMedia,
      //     { type: result.type, uri: result.uri },
      //   ]);
      setSelectedAssets([...selectedAssets, ...result.assets]);
      console.log(result.assets);
    }
  };

  function removeMedia(index) {
    const newMedia = selectedAssets.filter(
      (asset, i) => asset.assetId !== index
    );
    setSelectedAssets(newMedia);
    console.log(newMedia);
  }

  // when post is submitted
  async function onSubmit() {
    const formData = new FormData();

    selectedAssets.forEach((photo, index) => {
      formData.append(`photos[${index}]`, {
        uri: photo.uri,
        type: photo.type + "/jpg",
        name: `photo_${new Date().getTime()}${index}.jpg`,
      });
    });
    // console.log(token);
    console.log(formData);
    addPhotos(formData, {
      onSuccess: ({ data }) => {
        alert(data.message);
        setSelectedAssets([]);
        router.push("home/gallery/");
      },
      onError: (err) => console.log({ err }),
    });
  }

  return (
    <>
      {/* === post header === */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={tw`bg-primary-100 px-5 py-2 rounded-full`}
              onPress={onSubmit}
            >
              <Text style="text-primary font-bold">Add Now</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={"flex-1 p-2"}>
        <View style={" px-12 py-1"}>
          <Button
            onPress={pickImages}
            style={"px-4 py-3 bg-teal-500 rounded-md"}
            innerStyle={"text-indigo-50"}
          >
            Choose photos
          </Button>
        </View>

        {selectedAssets.length > 0 && (
          <View style="py-3 pb-10">
            <FlatGrid
              data={selectedAssets}
              renderItem={({ item }) => (
                <View style="w-[150px] h-[180px] relative mr-5 rounded-lg overflow-hidden">
                  <Image source={{ uri: item.uri }} style={tw`w-full h-full`} />
                  <Pressable
                    style={tw`p-1 bg-black/50 rounded-full absolute top-1 right-1`}
                    onPress={() => removeMedia(item.assetId)}
                  >
                    <MIcon name="close" size={20} style={tw`text-white`} />
                  </Pressable>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </>
  );
}
