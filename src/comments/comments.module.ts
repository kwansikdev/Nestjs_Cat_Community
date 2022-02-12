import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comments, CommentsSchema } from './comments.schema';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),
    CatsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
