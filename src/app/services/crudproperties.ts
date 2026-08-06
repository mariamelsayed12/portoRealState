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
  propertyType: string;
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
  amenities: string[];
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
  tagTypes: ["properties"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", i18n.language);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //----------------------------- Get =>get---------------------
    getProperty: builder.query<IProperty[], { lang: string }>({
      query: () => {
        return {
          url: "properties?limit=1000",
        };
      },
      transformResponse: (response: IpropertyResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "properties" as const,
                id: _id,
              })),
              { type: "properties", id: "LIST" },
            ]
          : [{ type: "properties", id: "LIST" }],
    }),

    getPaginatedProperties: builder.query<IpropertyResponse, Record<string, string | number | undefined>>({
      query: (params) => {
        // Filter out undefined values to avoid appending them as empty strings in URL
        const cleanParams = Object.keys(params).reduce((acc, key) => {
          if (params[key] !== undefined) {
            acc[key] = params[key]!;
          }
          return acc;
        }, {} as Record<string, string | number>);

        return {
          url: "properties",
          params: cleanParams,
        };
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: "properties" as const,
                id: _id,
              })),
              { type: "properties", id: "LIST" },
            ]
          : [{ type: "properties", id: "LIST" }],
    }),

    //--------------------- Get single property by ID ---------------------
    getPropertyById: builder.query<IProperty, { id: string; lang: string }>({
      query: ({ id }) => ({
        url: `properties/${id}`,
      }),

      transformResponse: (response: ISinglePropertyResponse) => response.data,

      providesTags: (_result, _error, { id }) => [{ type: "properties", id }],
    }),
  }),
});

export const {
  useGetPropertyQuery,
  useGetPaginatedPropertiesQuery,
  useGetPropertyByIdQuery,
} = propertyApiSlice;
