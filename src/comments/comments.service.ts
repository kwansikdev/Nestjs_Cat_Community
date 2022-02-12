import { CatsRepository } from 'src/cats/cats.repository';
import { CommentsCreateDto } from './dto/comments.create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Comments } from './comments.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    return 'hello get all comments';
  }

  async createComment(id: string, comments: CommentsCreateDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );

      const { author, contents } = comments;
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);
      const newComment = new this.commentModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });

      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentModel.findById(id);
      comment.likeCount += 1;

      return await comment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
