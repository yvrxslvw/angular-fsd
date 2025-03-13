import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '@controllers/users/dto';

export class RegisterDto extends PickType(CreateUserDto, ['login', 'password']) {}
