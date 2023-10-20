import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^.*((В процессе)|(Новая)|(Завершена)).*$/gi, {
    message: 'Status must be В процессе/Новая/Завершена',
  })
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  definition: string;
}
