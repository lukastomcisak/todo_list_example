import { Items } from './../typeorm/entities/Items';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';
import { List } from 'src/typeorm/entities/List';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, Items, User]),
    AuthenticationModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
