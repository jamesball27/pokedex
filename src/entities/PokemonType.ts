import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import Pokemon from './Pokemon';
import Type from './Type';

@ObjectType()
@Entity('pokemontype')
class PokemonType {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field(() => Int)
  @Column()
  slot: number;

  @Field(() => Type, { nullable: true })
  @ManyToOne(() => Type, 'pokemon')
  @JoinColumn()
  type: Type;

  @Field(() => Pokemon, { nullable: true })
  @ManyToOne(() => Pokemon, 'types')
  @JoinColumn()
  pokemon: Pokemon;
}

export default PokemonType;
