import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { PoiController } from './api/controllers/poi.controller';
import { PoiService } from './api/services/poi.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { DbModule } from './db/db.module';
import { GeoModule } from './geo/geo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DbModule,
    AuthModule,
    UsersModule,
    EventsModule,
    TasksModule,
    GeoModule,
  ],
  providers: [PoiService],
  controllers: [PoiController],
})
export class AppModule {}
