import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FilesService } from 'src/files/files.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService) { }

  async create(createPostDto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image)
    const post = await this.postRepository.create({ ...createPostDto, image: fileName })
    return post
  }

  async findAll() {
    return await this.postRepository.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({ where: { id }, include: { all: true } })
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(updatePostDto, { where: { id } })
  }

  async remove(id: number) {
    return await this.postRepository.destroy({ where: { id } })
  }
}
