import {Injectable} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {InjectModel} from '@nestjs/sequelize';
import {Posts} from './models/post.model';
import {FilesService} from 'src/files/files.service';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Posts) private readonly postRepo: typeof Posts, private readonly fileService: FilesService) { }
  async create(createPostDto: CreatePostDto,image:any) {
    const fileName = await this.fileService.createFile(image);
    return await this.postRepo.create({...createPostDto, image: fileName})
  }
  async getAll() {
    return await this.postRepo.findAll()
  }

  async getOne(id: number) {
    return await this.postRepo.findOne({where: {id}})
  }

  async update(id: number, updatePostDto: UpdatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const updatePost = await this.postRepo.update({...updatePostDto, image: fileName}, {where: {id}, returning: true})

    return updatePost[1][0];
  }

  async delete(id: number) {
    return await this.postRepo.destroy({where: {id}});
  }
}
