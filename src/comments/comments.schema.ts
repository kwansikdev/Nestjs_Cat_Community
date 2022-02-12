import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상 (게시글, 정보글)',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
