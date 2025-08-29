import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";

//! Get the token
const token = getUserFromStorage();

//! Add Transaction API
export const addTransactionAPI = async ({
  type,
  date,
  description,
  category,
  amount,
}) => {
  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      type,
      date,
      description,
      category,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! Update Category API
export const updateTransactionAPI = async ({
  type,
  date,
  description,
  category,
  amount,
  id,
}) => {
  const response = await axios.put(
    `${BASE_URL}/transactions/update-transaction/${id}`,
    {
      type,
      date,
      description,
      category,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};

//! Delete Category API
export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const listTransactionsAPI = async (filters) => {
  const token = getUserFromStorage();

  const params = {};

  // Only send filters if they exist
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;
  if (filters.type) params.type = filters.type;
  if (filters.category) params.category = filters.category;

  const response = await axios.get(`${BASE_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params, // ✅ sends only valid filters
  });

  return response.data;
};

