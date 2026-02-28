import axios from "axios";
import type { Country } from "../types/country";

axios.defaults.baseURL = "https://restcountries.com/v3.1/";

export const fetchCountryInfo = async (
  country: string,
): Promise<Country | null> => {
  try {
    const response = await axios.get<Country[]>(
      `name/${country}?fullText=true`,
    );
    return response.data[0];
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.warn(`The ${country} doesn't find`);
      return null;
    }
    console.error(error);
    throw error;
  }
};
