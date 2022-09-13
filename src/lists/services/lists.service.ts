import { ListCreateDto } from '../dtos/list.create.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/typeorm/entities/List';
import { DataSource, QueryBuilder, Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import _ from 'lodash';
import { Items } from 'src/typeorm/entities/Items';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Items) private itemRepository: Repository<Items>,
  ) {}

  getLists() {
    return this.listRepository.find();
  }

  async getList(id: number) {
    const list = await this.listRepository.findOne({
      where: {
        id: id,
      },
      relations: ['items'],
    });

    if (!list) {
      throw new HttpException('List not found', HttpStatus.BAD_REQUEST);
    }

    return list;
  }

  async createList(listDetails: ListCreateDto, createdBy: number) {
    const list = await this.listRepository.findOneBy({
      name: listDetails.name,
    });

    const user = await this.userRepository.findOneBy({
      id: createdBy,
    });

    if (list) {
      throw new HttpException(
        'List with this name already exists',
        HttpStatus.CONFLICT,
      );
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newList = this.listRepository.create({
      name: listDetails.name,
      createdBy: createdBy.toString(),
      users: [user],
    });

    const createdList = await this.listRepository.save(newList);

    return createdList;
  }

  async joinList(listDetails: ListCreateDto, userId: number) {
    const list = await this.listRepository.find({
      where: { name: listDetails.name },
      relations: ['users'],
    });

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!list[0]) {
      throw new HttpException('List not found', HttpStatus.BAD_REQUEST);
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (list[0].users.filter((usr) => usr.email === user.email).length > 0) {
      throw new HttpException('User already joined list', HttpStatus.CONFLICT);
    }

    list[0].users = [user, ...list[0].users];

    await this.listRepository.save(list);

    return {
      status: 'User joined list',
    };
  }

  async unJoinList(listDetails: ListCreateDto, userId: number) {
    const list = await this.listRepository.find({
      where: { name: listDetails.name },
      relations: ['users'],
    });

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!list[0]) {
      throw new HttpException('List not found', HttpStatus.BAD_REQUEST);
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const isInArray = list[0].users.some((element) => {
      if (element.email === user.email) {
        return true;
      }
      return false;
    });

    if (!isInArray) {
      throw new HttpException(
        'List is not joined by this user',
        HttpStatus.CONFLICT,
      );
    }

    const joinedUsers = list[0].users.filter((usr) => usr.email !== user.email);

    list[0].users = [...joinedUsers];

    await this.listRepository.save(list);

    return {
      status: 'User unjoined list',
    };
  }

  async deleteList(id: number) {
    const list = await this.listRepository.find({
      where: { id: id },
      relations: ['items']
    });

    if (!list[0]) {
      throw new HttpException('List not found', HttpStatus.BAD_REQUEST);
    }

    list[0].items.map(async (item) => {
      await this.itemRepository.remove(item)
    })

    await this.listRepository.remove(list[0]);

    return {
      status: 'List was deleted',
    };
  }
}
