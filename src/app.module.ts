import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as path from 'path';

import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './components/posts/posts.module';

@Module({
  // graphql導入
  imports: [
    GraphQLModule.forRoot({
      // コードファースト：.gqlの出力先設定
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    // スキーマ(Model)、取得設定(resolve)を含むModuleを設定
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
