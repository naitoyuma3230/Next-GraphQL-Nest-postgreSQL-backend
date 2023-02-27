import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';

// PostModelに対応するスキーマを定義
// PostsResolverクラスで設定した'posts'スキーマがgetPostsのリターン結果を返す事になる
@Resolver((of) => PostModel)
export class PostsResolver {
  constructor() {}

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }
}
