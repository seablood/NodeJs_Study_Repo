import { readFile, writeFile } from "fs/promises";
import { Injectable } from "@nestjs/common";
import { PostDTO } from "./blog.model";

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