import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import PokemonSpecies from './PokemonSpecies';
import FlavorText from './base/FlavorText';

@ObjectType()
@Entity('pokemonspeciesflavortext')
class PokemonSpeciesFlavorText extends FlavorText {
  @ManyToOne(() => PokemonSpecies, 'flavorTextEntries')
  pokemonSpecies: PokemonSpecies;
}

export default PokemonSpeciesFlavorText;
