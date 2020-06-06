import { ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import PokemonSpecies from './PokemonSpecies';
import Version from './Version';
import FlavorText from './base/FlavorText';

@ObjectType()
@Entity('pokemonspeciesflavortext')
class PokemonSpeciesFlavorText extends FlavorText {
  @ManyToOne(() => PokemonSpecies, 'flavorTextEntries')
  pokemonSpecies: PokemonSpecies;

  @ManyToOne(() => Version, 'flavorText')
  version: Version;
}

export default PokemonSpeciesFlavorText;
