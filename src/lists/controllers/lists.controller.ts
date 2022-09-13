import { ListsService } from '../services/lists.service';
import { Body, Controller, Get, Post, UseGuards, Request, Param, Delete } from '@nestjs/common';
import { ListCreateDto } from '../dtos/list.create.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-authorization.guard';

@Controller('lists')
export class ListsController {
  constructor(private listService: ListsService) {}

  @Get()
  getLists() {
      return this.listService.getLists()
  }

  @Get('list/:id')
  getList(@Param('id') id: number) {
      return this.listService.getList(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createList(@Body() listCreateDto: ListCreateDto, @Request() req) {
    return this.listService.createList(listCreateDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('join')
  async joinList(@Body() listCreateDto: ListCreateDto, @Request() req) {
    return this.listService.joinList(listCreateDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unjoin')
  async unJoinList(@Body() listCreateDto: ListCreateDto, @Request() req) {
    return this.listService.unJoinList(listCreateDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteList(@Param('id') id: number) {
    return this.listService.deleteList(id);
  }
}
