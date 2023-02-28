import { PrismaClient, Prisma, Post } from '@prisma/client';
const prisma = new PrismaClient();

// モデル投入用のデータ定義
const postData: Post[] = [
  {
    id: '20',
    contentPath: 'aaa',
    emoji: 'hello',
    excerpt: 'hello',
    md5Hash: 'hello',
    title: '気持ちを落ち着かせる呼吸法',
    thumbNailUrl: 'hello',
    type: '',
    publishDate: new Date('2022-01-31'),
    published: true,
    like: 0,
    createdAt: new Date('2022-01-31T04:34:22+09:00'),
    updatedAt: new Date('2022-01-31T04:34:22+09:00'),
  },
];

const doSeed = async () => {
  prisma.post.deleteMany();
  const posts = [];
  for (const post of postData) {
    const createPosts = prisma.post.create({
      data: post,
    });
    posts.push(createPosts);
  }
  return await prisma.$transaction(posts);
};

const main = async () => {
  console.log(`Start seeding ...`);

  await doSeed();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
