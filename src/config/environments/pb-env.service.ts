import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';

import * as path from 'path';
import * as process from 'process';
// const path = require('path');
// const process = require('process');
import { LoggingWinston } from '@google-cloud/logging-winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import winston from 'winston';
import { PrismaClientOptions } from '@prisma/client/runtime';

/* アプリケーションモジュールで利用する設定値はここから取得*/
@Injectable()
export class PbEnv {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get service() {
    return this.configService;
  }

  get NodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get Port(): number {
    return this.configService.get('PORT');
  }

  get DatabaseUrl(): string {
    return this.configService.get('DATABASE_URL');
  }

  // GraphQl: .gplの実行設定に関するGqlmoduleOptionsを環境によって使い分ける
  get GqlModuleOptionsFactory(): GqlModuleOptions {
    // 開発環境：コードからスキーマを生成,playgroundはブラウザ上でGraphQLを検証する機能
    // バックエンドのコードが正なのでコードファーストアプローチを使う
    const devOptions: GqlModuleOptions = {
      autoSchemaFile: path.join(
        process.cwd(),
        'src/generated/graphql/schema.gql',
      ),
      sortSchema: true,
      debug: true,
      playground: true,
    };

    // 本番環境：実行だけ
    const prdOptions: GqlModuleOptions = {
      autoSchemaFile: true,
      debug: false,
      playground: false,
    };
    if (this.isProduction()) {
      return prdOptions;
    } else {
      return devOptions;
    }
  }
}
