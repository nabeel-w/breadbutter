import { RecommendationData } from "@/types/interface";
import { Gig } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createGig, getGigs } from "@/lib/data/gigs";
import { GigFormData } from "@/components/form/gig-form";

interface GigData extends Gig {
  Recommendations: RecommendationData[];
}

interface GigsSliceState {
  gigs: GigData[];
  error: string | null;
  loading: boolean;
}

const initialState: GigsSliceState = {
  gigs: [],
  error: null,
  loading: false,
};

export const fetchGigs = createAsyncThunk<
  GigData[],
  void,
  { state: RootState }
>("gigs/fetchGigs", async (_, { rejectWithValue }) => {
  try {
    const response = await getGigs();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createGigThunk = createAsyncThunk<
  GigData,
  { data: GigFormData },
  { state: RootState }
>("gigs/createGig", async ({ data }, { rejectWithValue }) => {
  try {
    const response = await createGig(data);
    return {
      ...response,
      Recommendations: [], // Initialize with an empty array for recommendations
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const gigsSlice = createSlice({
  name: "gigs",
  initialState,
  reducers: {
    resetGigs: (state) => {
      state.gigs = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.gigs = action.payload;
        state.loading = false;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(createGigThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGigThunk.fulfilled, (state, action) => {
        state.gigs.push(action.payload);
        state.loading = false;
      })
      .addCase(createGigThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { resetGigs } = gigsSlice.actions;
export default gigsSlice.reducer;