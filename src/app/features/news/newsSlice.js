import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Replace with your actual News API key
const API_KEY = "c3f3452d1ce9491690650ab6444cd713";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`
  );
  return response.data.articles;
});
const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
