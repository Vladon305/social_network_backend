import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Post as post } from './entities/post.entity'

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiOperation({ summary: 'Создание Пост' })
  @ApiResponse({ status: 200, type: post })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPostDto: CreatePostDto,
    @UploadedFile() image: any) {
    return this.postsService.create(createPostDto, image)
  }

  @ApiOperation({ summary: 'Получить все посты' })
  @ApiResponse({ status: 200, type: [post] })
  @Get()
  findAll() {
    return this.postsService.findAll()
  }

  @ApiOperation({ summary: 'Получить пост' })
  @ApiResponse({ status: 200, type: post })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @ApiOperation({ summary: 'Изменить пост' })
  @ApiResponse({ status: 200, type: post })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @ApiOperation({ summary: 'Удалить пост' })
  @ApiResponse({ status: 200, type: post })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id)
  }
}
