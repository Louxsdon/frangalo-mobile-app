import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useAddCustomer() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData) => {
      console.log({ formData });
      return axios.post(`/customers`, formData, {
        headers: { Accept: "application/json" },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customers"]);
      },
      // onError: () => Alert.alert("Error!", "Error adding customer, try again."),
    }
  );

  return { addCustomer: mutate };
}

export function useCustomers() {
  const fetcher = async () => {
    const { data } = await axios.get(`/customers`);
    return data;
  };

  return useQuery(["customers"], fetcher);
}

export function useCustomer(id) {
  const fetcher = async () => {
    const { data } = await axios.get(`/customers/${id}/`);
    return data;
  };

  return useQuery(["customers", id], fetcher);
}

export function useCustomerUpdate(id) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData) => {
      console.log({ formData });
      return axios.put(`/customers/${id}`, formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["customers"]);
        queryClient.invalidateQueries(["customers", id]);
      },
    }
  );

  return { updateCustomer: mutate };
}
