import { Controller, Param, Body, Post, Get, Put, Delete } from "@nestjs/common";

@Controller('blog')
export class BlogController {
    @Get()
    getAllPosts() {
        console.log("모든 게시물 로딩");
    }

    @Post()
    createPost(@Body() post: any) {
        console.log("게시물 작성");
        console.log(post);
    }

    @Get('/:id')
    getPost(@Param() id: string) {
        console.log(`${id} 게시물 로딩`);
    }

    @Delete('/:id')
    deletePost(@Param() id: string) {
        console.log(`${id} 게시물 삭제`);
    }

    @Put('/:id')
    updatePost(@Param() id: string, @Body() post: any) {
        console.log(`${id} 게시물 수정`);
        console.log(post);
    }
}