import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Pokemon from '../../types/Pokemon';
import PokemonAbility from '../../types/PokemonAbility';
import PokemonType from '../../types/PokemonType';
import PokemonSpecies from '../../types/PokemonSpecies';
import resolveOneToMany from './base/resolveOneToMany';
import resolveManyToOne from './base/resolveManyToOne';
import PokemonSprite from '../../types/PokemonSprite';

@Resolver(() => Pokemon)
class PokemonResolver {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(PokemonAbility)
    private readonly pokemonAbilityRepository: Repository<PokemonAbility>,
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>,
  ) {}

  @FieldResolver(() => PokemonSprite)
  async sprites(@Root() pokemon: Pokemon): Promise<PokemonSprite> {
    return new PokemonSprite(pokemon.id);
  }

  @FieldResolver(() => PokemonAbility)
  async abilities(@Root() pokemon: Pokemon): Promise<PokemonAbility[]> {
    return resolveOneToMany<Pokemon, PokemonAbility>({
      repository: this.pokemonAbilityRepository,
      relation: 'pokemon',
      parentId: pokemon.id,
    });
  }

  @FieldResolver(() => PokemonType)
  async types(@Root() pokemon: Pokemon): Promise<PokemonType[]> {
    return resolveOneToMany<Pokemon, PokemonType>({
      repository: this.pokemonTypeRepository,
      relation: 'pokemon',
      parentId: pokemon.id,
    });
  }

  @FieldResolver(() => PokemonSpecies)
  async species(@Root() pokemon: Pokemon): Promise<PokemonSpecies> {
    return resolveManyToOne<Pokemon, PokemonSpecies>({
      repository: this.pokemonRepository,
      relation: 'species',
      parentId: pokemon.id,
    });
  }
}

export default PokemonResolver;
