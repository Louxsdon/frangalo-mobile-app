import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useAddPhotos() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData) => {
      console.log({ formData });
      return axios.post(`/galleries`, formData, {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["galleries"]);
      },
      // onError: () => Alert.alert("Error!", "Error adding Order, try again."),
    }
  );

  return { addPhotos: mutate };
}

export function useGAlleries() {
  const fetcher = async () => {
    const { data } = await axios.get(`/galleries`);
    return data;
  };

  return useQuery(["galleries"], fetcher);
}

export function useOrder(orderID) {
  const fetcher = async () => {
    const { data } = await axios.get(`/orders/${orderID}/`);
    return data;
  };

  return useQuery(["orders", orderID], fetcher);
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (orderID) => {
      console.log({ orderID });
      return axios.delete(`/orders`, orderID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
      },
    }
  );

  return { deleteOrder: mutate };
}

export function useOrderUpdate(orderID) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData) => {
      console.log({ formData });
      return axios.put(`/orders/${orderID}`, formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        queryClient.invalidateQueries(["orders", orderID]);
      },
    }
  );

  return { updateOrder: mutate };
}
