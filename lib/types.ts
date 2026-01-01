// lib/types.ts

import { Models } from "react-native-appwrite";

export interface Agent extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}

export interface Review extends Models.Document {
  name: string;
  avatar: string;
  review: string;
  rating: number;
}

export interface Gallery extends Models.Document {
  image: string;
}

export interface Property extends Models.Document {
  name: string;
  type: string;
  description: string;
  address: string;
  geolocation: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: string[];
  image: string;
  agent: Agent;
  reviews: Review[];
  gallery: Gallery[];
}