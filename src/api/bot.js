import axios from "axios";

export const diagnose = async (data, onSuccess, onFail) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/ask`,
      {
        query: data.query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      onSuccess && onSuccess(response.data);
    }
  } catch (error) {
    onFail && onFail(error);
  }
};
