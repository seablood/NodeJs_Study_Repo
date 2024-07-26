import { readFile, writeFile } from "fs/promises";
import { Injectable } from "@nestjs/common";
import { PostDTO } from "./blog.model";
import { Blog, BlogDocument } from "./blog.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

export interface BlogRepository {
    getAllPosts(): Promise<PostDTO[]>;
    createPost(postDto: PostDTO);
    getPost(id: string): Promise<PostDTO>;
    deletePost(id: string);
    updatePost(id: string, postDto: PostDTO);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = "./src/blog.data.json";

    async getAllPosts(): Promise<PostDTO[]> {
        const data = await readFile(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(data);
        return posts;
    }
    async createPost(postDto: PostDTO) {
        let posts = await this.getAllPosts();
        const id = posts.length + 1;
        const inputPost = {id: id.toString(), ...postDto, createdDate: new Date()};

        posts.push(inputPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
    async getPost(id: string): Promise<PostDTO> {
        let posts = await this.getAllPosts();
        const post = posts.find((post) => post.id === id);

        return post;
    }
    async deletePost(id: string) {
        let posts = await this.getAllPosts();
        posts = posts.filter((post) => post.id !== id);

        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
    async updatePost(id: string, postDto: PostDTO) {
        let posts = await this.getAllPosts();
        const idx = posts.findIndex((post) => post.id === id);
        const updateData = {id: id, ...postDto, updatedDate: new Date()};

        posts[idx] = updateData;

        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
    
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    async getAllPosts(): Promise<Blog[]> {
        return await this.blogModel.find().exec();
    }
    async createPost(postDto: PostDTO) {
        const post = {
            ...postDto, 
            createdDate: new Date(), 
            updatedDate: new Date(), 
        };

        await this.blogModel.create(post);
    }
    async getPost(id: string): Promise<Blog> {
        return await this.blogModel.findById(id);
    }
    async deletePost(id: string) {
        await this.blogModel.findByIdAndDelete(id);
    }
    async updatePost(id: string, postDto: PostDTO) {
        const updateData = {
            ...postDto, 
            updatedDate: new Date(), 
        };

        await this.blogModel.findByIdAndUpdate(id, updateData);
    }
    
}