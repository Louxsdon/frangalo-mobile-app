import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import View from "../../../../components/View";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { HStack, Radio, StatusBar } from "native-base";
import Text from "../../../../components/Text";
import Loader from "../../../../components/Loader";
import {
  useAddCustomer,
  useCustomer,
  useCustomerUpdate,
} from "../../../../lib/services/customers";
import { useFormik } from "formik";

export default function Update() {
  const router = useRouter();

  const { customer } = useLocalSearchParams();

  const { data, isLoading, error, isError } = useCustomer(customer);
  const { updateCustomer } = useCustomerUpdate(customer);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      setIsSubmitting(true);
      // alert(JSON.stringify(values));
      updateCustomer(values, {
        onSuccess: (res) => {
          setIsSubmitting(false);
          alert("Customer updated successfully!");
          router.push("/home/customers");
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
          icon="person"
          value={form.values?.name}
          placeholder="Customer Name"
          style={"mb-4"}
        />
        <Input
          onChangeText={form.handleChange("phone")}
          icon="person"
          value={form.values?.phone}
          placeholder="Customer Phone"
          style={"mb-4"}
        />
        <Radio.Group
          name="gender"
          accessibilityLabel="favorite number"
          value={form.values?.gender}
          onChange={form.handleChange("gender")}
        >
          <Radio value="male" my={1}>
            Male
          </Radio>
          <Radio value="female" my={1}>
            Female
          </Radio>
        </Radio.Group>

        <Button
          onPress={form.submitForm}
          rounded
          style="bg-[#790e4c] mt-8 border-2 rounded-md border-[#b30269]"
          innerStyle="px-5 p-2 text-[#ffceeb] text-xl font-semibold"
        >
          Update Customer
        </Button>
      </View>
    </View>
  );
}
