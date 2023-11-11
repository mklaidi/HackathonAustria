import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SQLiteService } from './db/sqlite.service';
import { MongoDBService } from './db/mongodb.service';
import { EventsModule } from './events/events.module';
import { PoiController } from './api/controllers/poi.controller';
import { PoiService } from './api/services/poi.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, EventsModule],
  providers: [SQLiteService, MongoDBService, PoiService],
  controllers: [PoiController],
})
export class AppModule {}
