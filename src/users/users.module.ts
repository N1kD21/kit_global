import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ApiController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
