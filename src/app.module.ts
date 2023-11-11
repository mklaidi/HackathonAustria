import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SQLiteService } from './db/sqlite.service';
import { MongoDBService } from './db/mongodb.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, EventsModule],
  providers: [SQLiteService, MongoDBService],
})
export class AppModule {}
