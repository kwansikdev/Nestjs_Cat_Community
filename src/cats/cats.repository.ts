import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    return await this.catModel.find();
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');

    return cat;
  }

  async existsByEmail(email: string) {
    try {
      const result = await this.catModel.exists({ email });

      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findByIdAndUpdateImg(id: string, filename: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media${filename}`;

    const newCat = await cat.save();

    return newCat.readonlyData;
  }
}
