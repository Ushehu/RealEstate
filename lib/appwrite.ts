// lib/appwrite.ts

import { Client, Account, Avatars, OAuthProvider, Databases, Query, Storage } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Property } from "./types";

export const config = {
  platform: "com.jsm.realestate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesTableId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_TABLE_ID,
  reviewsTableId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_TABLE_ID,
  agentsTableId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_TABLE_ID,
  propertiesTableId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_TABLE_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
}

export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function login() {
  try {
    const redirectUrl = Linking.createURL('/');

    const response = await account.createOAuth2Token(
      OAuthProvider.Google, redirectUrl
    );
    if (!response) throw new Error('Login failed');
    const broswerResult = await openAuthSessionAsync(response.toString(), redirectUrl);
    if (broswerResult.type !== 'success') throw new Error('Authentication failed');

    const url = new URL(broswerResult.url);

    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();
    if (!secret || !userId) throw new Error('Failed to login');

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error('Session creation failed');
    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name)
      return { ...response, avatar: userAvatar.toString() };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLatestProperties(): Promise<Property[]> {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesTableId!,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );

    // Ensure arrays exist for each property and cast to Property type
    return result.documents.map(doc => ({
      ...doc,
      reviews: Array.isArray(doc.reviews) ? doc.reviews : [],
      gallery: Array.isArray(doc.gallery) ? doc.gallery : [],
      facilities: Array.isArray(doc.facilities) ? doc.facilities : [],
    })) as unknown as Property[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}): Promise<Property[]> {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query),
        ])
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesTableId!,
      buildQuery
    );

    // Ensure arrays exist for each property and cast to Property type
    return result.documents.map(doc => ({
      ...doc,
      reviews: Array.isArray(doc.reviews) ? doc.reviews : [],
      gallery: Array.isArray(doc.gallery) ? doc.gallery : [],
      facilities: Array.isArray(doc.facilities) ? doc.facilities : [],
    })) as unknown as Property[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPropertyById({ id }: { id: string }): Promise<Property | null> {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesTableId!,
      id
    );
    
    // Ensure arrays exist with defaults and cast to Property type
    const property = {
      ...result,
      reviews: Array.isArray(result.reviews) ? result.reviews : [],
      gallery: Array.isArray(result.gallery) ? result.gallery : [],
      facilities: Array.isArray(result.facilities) ? result.facilities : [],
    } as unknown as Property;
    
    return property;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}