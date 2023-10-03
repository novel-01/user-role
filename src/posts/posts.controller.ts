  import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
    create(@Body() createPostDto: CreatePostDto, @UploadedFile() image:any) {
    return this.postsService.create(createPostDto, image);
  }

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.postsService.getOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @UploadedFile() image:any) {
    return this.postsService.update(id, updatePostDto, image);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
