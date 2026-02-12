import * as bcrypt from 'bcrypt';
import { AppDataSource } from './data-source';
import { User } from '../user/user.entity';

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);

  const exists = await repo.findOne({
    where: { username: 'admin' },
  });

  if (!exists) {
    const user = repo.create({
      id: 1,
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
    });

    await repo.save(user);
  }
  await AppDataSource.destroy();
}

seed();
