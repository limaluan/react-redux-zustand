import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

export interface ICourse {
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface IPlayerState {
  currentModuleIndex: number;
  currentLessonIndex: number;
  course: ICourse | null;
  isLoading: boolean;
}

interface IPlayActionPayload {
  lessonIndex: number;
  moduleIndex: number;
}

const initialState: IPlayerState = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: true,
};

export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get<ICourse>("/course");

  return response.data;
});

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<IPlayActionPayload>) => {
      state.currentModuleIndex = action.payload.moduleIndex;
      state.currentLessonIndex = action.payload.lessonIndex;
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(
      loadCourse.fulfilled,
      (state, action: PayloadAction<ICourse>) => {
        state.isLoading = false;
        state.course = action.payload;
      }
    );
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player;

    const currentLesson =
      state.player.course?.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];

    const currentModule = state.player.course?.modules[currentModuleIndex];

    return { currentLesson, currentModule };
  });
};
