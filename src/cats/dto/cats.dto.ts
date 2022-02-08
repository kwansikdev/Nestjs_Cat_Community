import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class readOnlyCatData extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '62013f44aaad719c04426399',
    description: 'id',
    required: true,
  })
  id: string;
}
