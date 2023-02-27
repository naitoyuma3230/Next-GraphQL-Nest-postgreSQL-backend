import { Field, ObjectType } from '@nestjs/graphql';

// schema.gql自動生成のためのクラス
// テーブルの原型
@ObjectType()
export class PostModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  title: string;
}
