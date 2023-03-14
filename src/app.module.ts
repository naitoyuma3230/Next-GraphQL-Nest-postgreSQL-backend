import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './components/posts/posts.module';
import { PbEnvModule } from './config/environments/pb-env.module';
import { PostsResolver } from './components/posts/post.resolvers';
import { PbEnv } from './config/environments/pb-env.service';

@Module({
  imports: [
    // graphql導入
    // コードファースト：.gqlの出力先設定
    // GraphQLModule.forRoot({
    //   autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    // }),

    // enc設定用にカスタムしたPbEnv-moduleを使用するために同期的読み込み
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    // スキーマ(Model)、取得設定(resolve)を含むModuleを設定
    PostsModule,
    PbEnvModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostsResolver],
})
export class AppModule {}
