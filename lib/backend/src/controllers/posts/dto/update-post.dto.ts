import { CreatePostDto } from '@controllers/posts/dto/create-post.dto';
import { PickType } from '@nestjs/swagger';

export class UpdatePostDto extends PickType(CreatePostDto, ['title', 'content']) {}
