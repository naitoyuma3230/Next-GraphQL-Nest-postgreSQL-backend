import { Module } from '@nestjs/common';
import { PostsResolver } from './post.resolvers';

// postModelのスキーマの取得について設定したPostsResolverをModule化
@Module({
  providers: [PostsResolver],
})
export class PostsModule {}
