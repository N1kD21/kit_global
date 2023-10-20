import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, Matches } from 'class-validator';

export class FiltrTask {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^.*((В процессе)|(Новая)|(Завершена)).*$/gi, {
    message: 'Status must be В процессе/Новая/Завершена',
  })
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dateStart: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dateEnd: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  projectId: string;
}
