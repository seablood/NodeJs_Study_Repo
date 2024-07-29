import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`, 
    }), 
    MongooseModule.forRootAsync({ // 환경 설정 파일을 사용하기 위한 설정
      imports: [ConfigModule],
      inject: [ConfigService],  
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }), 
    }), 
    MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]), 
  ],
  controllers: [BlogController], 
  providers: [BlogService, BlogFileRepository, BlogMongoRepository], 
})

export class AppModule {}