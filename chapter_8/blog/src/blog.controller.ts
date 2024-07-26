import { Controller, Param, Body, Post, Get, Put, Delete } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get()
    async getAllPosts() {
        console.log("모든 게시물 로딩");
        return await this.blogService.getAllPosts();
    }

    @Post()
    createPost(@Body() post: any) {
        console.log("게시물 작성");
        console.log(post);
        this.blogService.createPost(post);
        return 'success';
    }

    @Get('/:id')
    async getPost(@Param('id') id: string) {
        console.log(`${id} 게시물 로딩`);
        return await this.blogService.getPost(id);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        console.log(`${id} 게시물 삭제`);
        this.blogService.deletePost(id);
        return 'success';
    }

    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() post: any) {
        console.log(`${id} 게시물 수정`);
        return this.blogService.updatePost(id, post);
    }
}