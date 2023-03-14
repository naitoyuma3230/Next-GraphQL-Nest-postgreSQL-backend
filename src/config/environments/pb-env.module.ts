import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env-validator';
import { PbEnv } from './pb-env.service';

@Global()
@Module({
  imports: [
    // 環境設定用に準備されたmoduleの使用
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      validate,
      // globalに読み込めるよう設定(app.moduleへの設置と同様)
      isGlobal: true,
    }),
  ],
  providers: [PbEnv],
  exports: [PbEnv],
})
export class PbEnvModule {}
