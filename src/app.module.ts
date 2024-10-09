import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './Exception/exception_filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ValidationExceptionFilter }],
})
export class AppModule {}
