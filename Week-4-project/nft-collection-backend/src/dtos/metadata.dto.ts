import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({
    required: true,
    description: 'Name of Coutry',
    examples: ['canada', 'nigeria', 'usa'],
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description for this NFT',
  })
  description?: string;
}
