import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({
    required: true,
    description: 'Name of this NFT',
    examples: ['Foo', 'Bar', 'Punk #6539'],
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description for this NFT',
  })
  description?: string;

  @ApiProperty({
    required: false,
    description: 'Artist name',
  })
  image?: string;
}
