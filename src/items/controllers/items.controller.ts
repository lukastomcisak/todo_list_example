import { ItemsService } from './../services/items.service';
import { Body, Controller, Post, UseGuards, Request, Param, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-authorization.guard';
import { AddItemsDto } from '../dtos/add-items.dto';
import { PatchItemsDto } from '../dtos/patch-items.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addItems/:listId')
  async addItems(@Body() addItemsDto: AddItemsDto, @Request() req, @Param('listId') listId: number) {
    return this.itemService.addItems(addItemsDto, req.user.id, listId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('patchItem/:id')
  async patchItems(@Body() patchItemsDto: PatchItemsDto,@Request() req, @Param('id') id: number) {
    return this.itemService.patchItems(patchItemsDto, req.user.id, id);
  }
}
