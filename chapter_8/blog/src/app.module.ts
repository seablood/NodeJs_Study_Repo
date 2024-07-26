import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://dudwnszero99:nodejs@cluster1.k5bjxhc.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster1"
    ), 
    MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]), 
  ],
  controllers: [BlogController], 
  providers: [BlogService, BlogFileRepository, BlogMongoRepository], 
})

export class AppModule {}