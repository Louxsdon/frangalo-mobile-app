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

export function useCustomer(postID) {
  const fetcher = async () => {
    const { data } = await axios.get(`/posts/${postID}/`);
    return data.post;
  };

  const fetchPostReplies = async () => {
    const { data } = await axios.get(`/posts/${postID}/replies`);
    return data.replies;
  };

  const post = useQuery(["posts", postID], fetcher);
  const replies = useQuery(["posts", postID, "replies"], fetchPostReplies);

  return { post, replies };
}
