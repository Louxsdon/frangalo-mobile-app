import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import View from "../../../../components/View";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import Loader from "../../../../components/Loader";
import { useFormik } from "formik";
import {
  useInventory,
  useInventoryUpdate,
} from "../../../../lib/services/inventories";

export default function Update() {
  const router = useRouter();

  const { inventory } = useLocalSearchParams();

  const { data, isLoading, error, isError } = useInventory(inventory);
  const { updateInventory } = useInventoryUpdate(inventory);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      setIsSubmitting(true);
      updateInventory(values, {
        onSuccess: (res) => {
          setIsSubmitting(false);
          alert(res.data?.message);
          router.push("/home/inventories");
        },
        onError: (err) => {
          setIsSubmitting(false);
          const errors = err.response?.data?.errors;
          alert(JSON.stringify(errors));
          form.setErrors(errors);
        },
      });
    },
  });

  useEffect(() => {
    form.setValues(data);
  }, [data]);

  if (isLoading) {
    return (
      <View style={"flex-1 justify-center items-center"}>
        <Text>Loading...</Text>
      </View>
    );
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
    <View style={"relative flex-1 bg-white"}>
      <Loader isOpen={isSubmitting} text={"Updating..."} />
      <View style={"bg-white p-4"}>
        <Input
          onChangeText={form.handleChange("name")}
          value={form.values?.name}
          placeholder="Inventory Name"
          style={"mb-4"}
        />
        <Input
          onChangeText={form.handleChange("quantity")}
          value={form.values?.quantity?.toString()}
          placeholder="Quantity"
          keyboardType={"numeric"}
          style={"mb-4"}
        />

        <Button
          onPress={form.submitForm}
          rounded
          style="bg-[#790e4c] mt-8 border-2 rounded-md border-[#b30269]"
          innerStyle="px-5 p-2 text-[#ffceeb] text-xl font-semibold"
        >
          Update Inventory
        </Button>
      </View>
    </View>
  );
}
