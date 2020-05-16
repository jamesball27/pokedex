import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import PokedexName from './PokedexName';
import PokedexDescription from './PokedexDescription';
import PokemonEntry from './PokemonEntry';

@ObjectType()
@Entity('pokedex')
class Pokedex {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column()
  isMainSeries: boolean;

  @Field(() => PokedexDescription, { nullable: true })
  @OneToMany(() => PokedexDescription, 'pokedex')
  descriptions: PokedexDescription[];

  @Field(() => PokedexName, { nullable: true })
  @OneToMany(() => PokedexName, 'pokedex')
  names: PokedexName[];

  @Field(() => PokemonEntry)
  @OneToMany(() => PokemonEntry, 'pokedex')
  pokemonEntries: PokemonEntry[];
}

export default Pokedex;
