import { InputData, SearchParams } from "../models/dogs";

export const transformData = (data: InputData): SearchParams => ({
  ...data,
  zipCodes: data.zipCodes
    ? data.zipCodes
        .split(",")
        .map((zip: string) => zip.trim())
        .filter((zip: string) => zip)
    : [],
});
