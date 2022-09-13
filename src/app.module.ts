import { List } from './typeorm/entities/List';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { AuthenticationModule } from './authentication/authentication.module';
import { ListsModule } from './lists/lists.module';
import { ItemsModule } from './items/items.module';
import { Items } from './typeorm/entities/Items';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, List, Items],
      synchronize: true,
      // cli: {
      //   migrationsDir: 'src/migrations',
      // },
    }),
    AuthenticationModule,
    ListsModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
