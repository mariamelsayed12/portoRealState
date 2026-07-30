import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n from "../../i18n";

export interface IProperty {
  _id: string;
  name: string;
  description: string;
  listingType: string;
  status: string;
  isFeatured: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  finishingStatus: string;
  orientation: string;
  deliveryDate: string;
  paymentModel: string;
  installmentPrice: number;
  downPaymentPercentage: number;
  downPaymentAmount: number;
  installmentPeriod: string;
  installmentValue: number;
  images: string[];
  coverImage?: string;
  village: {
    _id: string;
    name: string;
    slug: string;
    locationText: string;
    coverImage: string;
  };
}

export interface IpropertyResponse {
  status: string;
  code: number;
  message: string;
  results: number;
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next?: number;
  };
  data: IProperty[];
}

export interface ISinglePropertyResponse {
  status: string;
  code: number;
  message: string;
  data: IProperty;
}

export const propertyApiSlice = createApi({
  reducerPath: "ApiProperty",
  tagTypes: ["Property"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", i18n.language);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //----------------------------- Get =>get---------------------
    getProperty: builder.query<IProperty[], void>({
      query: () => {
        return {
          url: "properties",
        };
      },
      transformResponse: (response: IpropertyResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Property" as const,
                id: _id,
              })),
              { type: "Property", id: "LIST" },
            ]
          : [{ type: "Property", id: "LIST" }],
    }),

    //--------------------- Get single property by ID ---------------------
    getPropertyById: builder.query<IProperty, string>({
      query: (id) => ({
        url: `properties/${id}`,
      }),

      transformResponse: (response: ISinglePropertyResponse) => response.data,

      providesTags: (_result, _error, id) => [
        { type: "Property", id },
      ],
    }),
  }),
});

export const { useGetPropertyQuery , useGetPropertyByIdQuery } = propertyApiSlice;
