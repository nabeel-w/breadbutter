import { RecommendationData } from "@/types/interface";
import { Talent } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createTalent, getAllTalents } from "@/lib/data/talent";
import { TalentFormData } from "@/components/form/talent-form";

interface TalentData extends Talent {
  recommendations: RecommendationData[];
}

interface TalentSliceState {
  talents: TalentData[];
  error: string | null;
  loading: boolean;
}

const initialState: TalentSliceState = {
  talents: [],
  error: null,
  loading: false,
};

export const fetchTalents = createAsyncThunk<
  TalentData[],
  void,
  { state: RootState }
>("talent/fetchTalents", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllTalents();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createTalentThunk = createAsyncThunk<
  TalentData,
  { data: TalentFormData },
  { state: RootState }
>("talent/createTalent", async ({ data }, { rejectWithValue }) => {
  try {
    const response = await createTalent(data);
    return {
      ...response,
      recommendations: [], // Initialize with an empty array for recommendations
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const talentSlice = createSlice({
  name: "talent",
  initialState,
  reducers: {
    resetTalents: (state) => {
      state.talents = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTalents.fulfilled, (state, action) => {
        state.loading = false;
        state.talents = action.payload;
      })
      .addCase(fetchTalents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTalentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTalentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.talents.push(action.payload);
      })
      .addCase(createTalentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTalents } = talentSlice.actions;
export default talentSlice.reducer;
