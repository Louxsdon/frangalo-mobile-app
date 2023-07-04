import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAddInventory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData) => {
      console.log({ formData });
      return axios.post(`/inventories`, formData, {
        headers: { Accept: "application/json" },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventories"]);
      },
      // onError: () => Alert.alert("Error!", "Error adding Inventory, try again."),
    }
  );

  return { addInventory: mutate };
}

export function useInventories() {
  const fetcher = async () => {
    const { data } = await axios.get(`/inventories`);
    return data;
  };

  return useQuery(["inventories"], fetcher);
}

export function useInventory(id) {
  const fetcher = async () => {
    const { data } = await axios.get(`/inventories/${id}/`);
    return data;
  };

  return useQuery(["inventories", id], fetcher);
}

export function useDeleteInventory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (orderID) => {
      console.log({ orderID });
      return axios.delete(`/inventories/${orderID}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventories"]);
      },
    }
  );

  return { deleteInventory: mutate };
}

export function useInventoryUpdate(id) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData) => {
      console.log({ formData });
      return axios.put(`/inventories/${id}`, formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventories"]);
        queryClient.invalidateQueries(["inventories", id]);
      },
    }
  );

  return { updateInventory: mutate };
}
