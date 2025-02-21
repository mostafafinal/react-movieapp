import { Client, Databases, ID, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const db = new Databases(client);

export const updateSearchTerm = async (searchTerm, movie) => {
    const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

    try {
        const result = await db.listDocuments(DB_ID, COLLECTION_ID, [
            Query.equal("searchTerm", searchTerm),
        ]);

        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await db.updateDocument(DB_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        } else {
            await db.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error(error);
    }
};
