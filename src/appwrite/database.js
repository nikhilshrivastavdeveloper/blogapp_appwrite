import config from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

class DatabaseService {

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectID);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const promise = await this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                { title, content, featuredImage, status, userId }
            );

            return promise
        } catch (err) {
            console.log("Appwrite serive :: createPost :: error", err);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                { title, content, featuredImage, status }
            )
        } catch (err) {
            console.log("Appwrite serive :: updatePost :: error", err);
        }
    }

    async deletePost(slug) {
        try {
            const result = await this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
            );
            return true
        } catch (err) {
            console.log("Appwrite serive :: deletePost :: error", err);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug
            )
        } catch (err) {
            console.log("Appwrite serive :: getPost :: error", err);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                queries
            )
        } catch (err) {
            console.log("Appwrite serive :: getPosts :: error", err);
            return false
        }
    }

    //file upload service

    async uploadFile(file) {
        try {
            const promise = await this.storage.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file
            );

            return promise
        } catch (err) {
            console.log("Appwrite serive :: uploadFile :: error", err);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            const result = await this.storage.deleteFile(
                config.appWriteBucketID,
                fileId
            );

            return result
        } catch (err) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

     getFilePreview(fileId) {
             const result = this.storage.getFileView(
                config.appWriteBucketID,
                fileId
            )

            // console.log(result)
            return result
    }
}

const databaseService = new DatabaseService();

export default databaseService;