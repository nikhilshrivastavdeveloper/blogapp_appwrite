const config = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    RTEapi : String(import.meta.env.VITE_RTE_API)
}

export default config

// https://chatgpt.com/share/6811f67e-6600-8011-b98a-1139676964a9