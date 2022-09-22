import { configureStore } from "@reduxjs/toolkit";

import { robotApi } from "../services/robotApi";

export const store = configureStore({
  reducer: { [robotApi.reducerPath]: robotApi.reducer },
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }).concat(robotApi.middleware),
});

export default store;
