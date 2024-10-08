import { Module } from '@nestjs/common';
// import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    // UserModule,
  ]
})
export class AppModule { }
