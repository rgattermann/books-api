import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity('users')
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default User;
