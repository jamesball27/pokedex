import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import PokemonSpecies from './PokemonSpecies';
import FlavorText from './base/FlavorText';

@ObjectType()
@Entity('pokemonspeciesflavortext')
class PokemonSpeciesFlavorText extends FlavorText {
  @Field((type) => PokemonSpecies, { nullable: true })
  @ManyToOne(() => PokemonSpecies, 'flavorTextEntries')
  pokemonSpecies: PokemonSpecies;
}

export default PokemonSpeciesFlavorText;
