import { Items } from './../typeorm/entities/Items';
import { AuthenticationModule } from './../authentication/authentication.module';
import { Module } from '@nestjs/common';
import { ListsController } from './controllers/lists.controller';
import { ListsService } from './services/lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { List } from 'src/typeorm/entities/List';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, List, Items]),
    AuthenticationModule
  ],
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule {}
