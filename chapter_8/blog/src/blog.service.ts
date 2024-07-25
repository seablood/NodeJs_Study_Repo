import { Injectable } from "@nestjs/common";
import { PostDTO } from "./blog.model";
import { BlogFileRepository } from "./blog.repository";

@Injectable()
export class BlogService {
    constructor(private blogRepository: BlogFileRepository) {}

    async getAllPosts(){
        return await this.blogRepository.getAllPosts();
    }

    createPost(postDto: PostDTO){
        this.blogRepository.createPost(postDto);
    }

    async getPost(id){
        return await this.blogRepository.getPost(id);
    }

    deletePost(id){
        this.blogRepository.deletePost(id);
    }

    updatePost(id, postDto: PostDTO){
        this.blogRepository.updatePost(id, postDto);
    }
}