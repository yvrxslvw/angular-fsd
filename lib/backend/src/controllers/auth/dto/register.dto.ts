import { PickType } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class RegisterDto extends PickType(LoginDto, ['login', 'password']) {}
