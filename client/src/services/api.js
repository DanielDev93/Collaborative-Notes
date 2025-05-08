import axios from "axios";

const baseUrl = "http://localhost:3001" || import.meta.env.VITE_API_DOMAIN

export const getNotes = async(start, end) => {
  try {
    const resp = await axios.get(`${baseUrl}/notes?start=${start}&end=${end}`);
    return resp.data;
  } catch (err) {
    return err.response.data;
  }
}

export const getNoteById = async(id) => {
  try {
    const resp = await axios.get(`${baseUrl}/notes/${id}`);
    return resp.data;
  } catch (err) {
    return err.response.data;
  }
}