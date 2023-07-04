import React, { useState } from "react";
import View from "../../../components/View";
import { StatusBar } from "expo-status-bar";
import Input from "../../../components/Input";
import { useRouter } from "expo-router";
import Button from "../../../components/Button";
import { useFormik } from "formik";
import Loader from "../../../components/Loader";
import { useAddInventory } from "../../../lib/services/inventories";

export default function index() {
  const { addInventory } = useAddInventory();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const form = useFormik({
    initialValues: {
      name: "",
      quantity: "",
    },
    onSubmit: (values) => {
      setIsAdding(true);
      addInventory(values, {
        onSuccess: (res) => {
          setIsAdding(false);
          alert(res.data?.message);
          router.replace("/home/inventories");
        },
        onError: (err) => {
          setIsAdding(false);
          const errors = err.response?.data?.errors;
          alert(JSON.stringify(errors));
          form.setErrors(errors);
        },
      });
    },
  });
  return (
    <>
      <Loader isOpen={isAdding} text={"Adding Inventory"} />
      <View style={"relative flex-1 bg-white"}>
        <StatusBar style="light" backgroundColor="#790e4c" />
        <View style={"bg-white p-4"}>
          <Input
            onChangeText={form.handleChange("name")}
            value={form.values.name}
            placeholder="Inventory Name"
            style={"mb-4"}
          />
          <Input
            onChangeText={form.handleChange("quantity")}
            value={form.values.quantity}
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
            Add Inventory
          </Button>
        </View>
      </View>
    </>
  );
}
