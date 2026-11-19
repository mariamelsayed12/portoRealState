import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n from "../../i18n";

export interface IProfile {
  _id?: string;
  name?: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  whatsapp?: string;
  companyLocation: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

export interface IProfileResponse {
  status: string;
  code: number;
  message: string;
  data: IProfile;
}

export const ProfileApiSlice = createApi({
  reducerPath: "ApiProfile",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {
      headers.set("Accept-Language", i18n.language);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // ----------------------------- Get Profile -----------------------------
    getProfile: builder.query<IProfile, { lang: string }>({
      query: () => ({
        url: "admin/profile",
        method: "GET",
      }),

      transformResponse: (response: IProfileResponse) => response.data,
    }),
  }),
});

export const { useGetProfileQuery } = ProfileApiSlice;