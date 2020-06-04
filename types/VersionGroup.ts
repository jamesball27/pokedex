import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

import PokemonVersionName from './VersionName';

@ObjectType()
@Entity('versiongroup')
class VersionGroup {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  // @Field()
  // @Column()
  // name: string;

  // @Field(() => PokemonVersionNameGroup, { nullable: true })
  // @OneToMany(() => PokemonVersionName, 'version', { eager: true })
  // names: PokemonVersionName[];
}

export default VersionGroup;
