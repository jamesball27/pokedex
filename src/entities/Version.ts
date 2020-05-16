import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

import PokemonVersionName from './VersionName';

@ObjectType()
@Entity('version')
class Version {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => PokemonVersionName, { nullable: true })
  @OneToMany(() => PokemonVersionName, 'version', { eager: true })
  names: PokemonVersionName[];
}

export default Version;
