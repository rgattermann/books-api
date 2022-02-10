import { MigrationInterface, QueryRunner, getMongoManager } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

export default class CreateUsers1634952389361 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {

    const user = new User();
    user.name = 'Rodrigo Gattermann';
    user.email = 'rodrigo.gattermann@gmail.com';
    user.password = '$2a$08$6o949yt2ukVzvXxqHuCt6Oqw/cjgQWvgPbz9LtAJSzu4pb2CENZWa';

    await getMongoManager().save(user);
  }

  public async down(_: QueryRunner): Promise<void> {
    await getMongoManager().clear('users');
  }
}
