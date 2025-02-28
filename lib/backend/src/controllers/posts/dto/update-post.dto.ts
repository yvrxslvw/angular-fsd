import { PickType } from '@nestjs/swagger';
import { CreatePostDto } from '@controllers/posts/dto/create-post.dto';

export class UpdatePostDto extends PickType(CreatePostDto, ['title', 'content']) {}
