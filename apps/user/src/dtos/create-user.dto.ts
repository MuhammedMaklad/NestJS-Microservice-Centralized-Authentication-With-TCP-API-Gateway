import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
  @ApiProperty({ required: true })
  username: string;
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  password: string;
}