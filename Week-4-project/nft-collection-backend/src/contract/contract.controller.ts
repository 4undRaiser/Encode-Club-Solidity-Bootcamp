import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { MintRequestDto } from './dtos/mint-request.dto';

@Controller('contract')
@ApiTags('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get('token-balance/:address')
  @ApiOperation({
    summary: 'Token balance',
    description: 'Gets the token balance of the provided address',
  })
  @ApiResponse({
    status: 200,
    description: 'Token balance',
    type: Number,
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not connected to a valid provider',
    type: HttpException,
  })
  async getTokenBalance(@Param('address') address: string) {
    try {
      const result = await this.contractService.tokenBalanceOf(address);
      return Number(result);
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Post('mint-token')
  @ApiOperation({
    summary: 'Mint Token',
    description:
      'Requests the server to mint a given amount of tokens to a provided address',
  })
  @ApiResponse({
    status: 200,
    description: 'Token balance',
    type: Number,
  })
  @ApiResponse({
    status: 401,
    description: 'Missing signature',
    type: HttpException,
  })
  @ApiResponse({
    status: 403,
    description: 'Wrong signature',
    type: HttpException,
  })
  @ApiResponse({
    status: 500,
    description: 'Invalid signature',
    type: HttpException,
  })
  @ApiResponse({
    status: 503,
    description: 'Server Error',
    type: HttpException,
  })
  async mintToken(@Body() mintRequestDto: MintRequestDto) {
    try {
      const result = await this.contractService.mintNFTToken(
        mintRequestDto.address,
        mintRequestDto.tokenId,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }
}
