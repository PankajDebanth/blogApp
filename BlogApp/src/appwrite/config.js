import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectUrl);
    this.databases = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
        title,
        content,
        featuredImage,
        status,
        userId,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
        title,
        content,
        featuredImage,
        status,
      });
    } catch (error) {
      console.error("Error updating Post:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
    } catch (error) {
      console.error("Error in get post:", error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
    } catch (error) {
      console.error("Error in get posts:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error("Error file uploading:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Error in delete file:", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
