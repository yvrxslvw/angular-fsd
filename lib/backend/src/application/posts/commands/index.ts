import { CreatePostHandler } from './create-post.handler';
import { DeletePostHandler } from './delete-post.handler';
import { UpdatePostHandler } from './update-post.handler';

export const CommandHandlers = [CreatePostHandler, UpdatePostHandler, DeletePostHandler];
