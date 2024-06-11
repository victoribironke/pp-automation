import { FieldValue } from "firebase/firestore";

export type Item = {
  seed: string;
  timestamp: FieldValue;
  type: string;
};
