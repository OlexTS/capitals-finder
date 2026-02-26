import axios from "axios";

axios.defaults.baseURL = 'https://restcountries.com/v3.1/';

export const fetchCountryInfo = async (country)=>{
    const response = await axios.get(`name/${country}`);
    return response.data
}