import axios from "axios";

const baseUrl = "http://localhost:3001" || import.meta.env.VITE_API_DOMAIN

export const getNotes = async() => {
  try {
    const resp = await axios.get(`${baseUrl}/notes`);
    return resp.data;
  } catch (err) {
    return err.response.data;
  }
}

export const createNote = async(note) => {
  try {
    const resp = await axios.post(`${baseUrl}/notes`, note);
    return resp.data;
  } catch (err) {
    return err.response.data;
  }
}

export const saveNote = async(note) => {
  try {
    const resp = await axios.patch(`${baseUrl}/notes`, note);
    return resp.data;
  } catch (err) {
    return err.response.data;
  }
}

export const deleteNote = async(id) => {
  try {
    const resp = await axios.delete(`${baseUrl}/notes/${id}`);
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