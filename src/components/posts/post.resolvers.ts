import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';
import { ConfigService } from '@nestjs/config';
import { PbEnv } from '../../config/environments/pb-env.service';

// PostModelに対応するスキーマを定義
// PostsResolverクラスで設定した'posts'スキーマがgetPostsのリターン結果を返す事になる
@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private configService: ConfigService, private pbEnv: PbEnv) {}

  @Query(() => String)
  hello(): string {
    // デフォルトのconfigServiceを使用
    return this.configService.get<string>('DATABASE_URL'); // こっちと比べて
  }

  @Query(() => String)
  helloEnv(): string {
    // configServiceをラップしたpbEnvを使用
    return this.pbEnv.DatabaseUrl; // かなり直感的に
  }

  @Query(() => String)
  helloConfiguration(): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV'); // development （.env.development.localのもの）
    const databaseUrl = this.configService.get<string>('DATABASE_URL'); // postgresql:/... （.env.development.localのもの）
    const microCmsKey = this.configService.get<string>('MICRO_CMS_KEY'); // 1234567890（環境変数のもの）

    return nodeEnv + databaseUrl + microCmsKey;
  }

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
