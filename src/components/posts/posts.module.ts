import { Module } from '@nestjs/common';
import { PostsResolver } from './post.resolvers';
import { ConfigModule } from '@nestjs/config';

// postModelのスキーマの取得について設定したPostsResolverをModule化
@Module({
  providers: [PostsResolver],
  imports: [ConfigModule],
})
export class PostsModule {}
