import { createMachine } from "xstate";

type LoadingEvent = { type: "SUCCESS" | "FAILURE" };

type LoadingState =
  | { value: "loading"; context: undefined }
  | { value: "userFound"; context: undefined }
  | { value: "userNotFound"; context: undefined };

export const loadingMachine = createMachine<
  undefined, // We don’t have context, so we type it as undefined
  LoadingEvent,
  LoadingState
>({
  id: "loadingMachine",
  initial: "loading",
  states: {
    loading: {
      on: {
        SUCCESS: "userFound",
        FAILURE: "userNotFound",
      },
    },
    userFound: {},
    userNotFound: {},
  },
});
