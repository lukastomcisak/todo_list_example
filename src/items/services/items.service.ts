import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/typeorm/entities/Items';
import { List } from 'src/typeorm/entities/List';
import { User } from 'src/typeorm/entities/User';
import { STATUS } from 'src/utils/enums';
import { Repository } from 'typeorm';
import { AddItemsDto } from '../dtos/add-items.dto';
import { PatchItemsDto } from '../dtos/patch-items.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(Items) private itemRepository: Repository<Items>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async addItems(itemDetails: AddItemsDto, createdBy: number, listId: number) {
    const list = await this.listRepository.find({
      where: { id: listId },
      relations: ['users'],
    });

    const user = await this.userRepository.findOneBy({
      id: createdBy,
    });

    if (!list[0]) {
      throw new HttpException('List not found', HttpStatus.BAD_REQUEST);
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const isInArray = list[0].users.some((element) => {
      if (element.id === user.id) {
        return true;
      }
      return false;
    });

    if (!isInArray) {
      throw new HttpException(
        'User is not assigned to this list',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newItem = this.itemRepository.create({
      title: itemDetails.title,
      text: itemDetails.text,
      deadline: itemDetails.deadline,
      createdBy: createdBy.toString(),
      status: itemDetails.status as STATUS,
      list: list[0],
    });

    const createdItem = await this.itemRepository.save(newItem);

    return {
      id: createdItem.id,
      listId: list[0].id,
    };
  }

  async patchItems(itemDetails: PatchItemsDto, userId: number, id: number) {
    const item = await this.itemRepository.find({
      where: { id: id },
      relations: ['list'],
    });

    if (!item[0]) {
      throw new HttpException('Item not found', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const list = await this.listRepository.find({
      where: { id: item[0].list.id },
      relations: ['users'],
    });

    if (!list[0]) {
        throw new HttpException('List not found', HttpStatus.BAD_REQUEST);
      }

    const isInArray = list[0].users.some((element) => {
      if (element.id === user.id) {
        return true;
      }
      return false;
    });

    if (!isInArray) {
      throw new HttpException(
        'User cant edit this item',
        HttpStatus.UNAUTHORIZED,
      );
    }

    itemDetails.deadline ? (item[0].deadline = new Date(itemDetails.deadline)) : item[0].deadline = item[0].deadline
    itemDetails.status ? (item[0].status = itemDetails.status as STATUS) : item[0].status = item[0].status
    itemDetails.text ? (item[0].text = itemDetails.text) : item[0].text = item[0].text
    itemDetails.title ? (item[0].title = itemDetails.title) : item[0].title = item[0].title

    await this.itemRepository.save(item);

    return {
        status: "Item was updated"
    };
  }
}
