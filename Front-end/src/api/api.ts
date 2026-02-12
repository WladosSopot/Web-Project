import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

const $api = axios.create({ baseURL: baseUrl });

export const api = {
    login: () =>
        $api.post()
    
};
