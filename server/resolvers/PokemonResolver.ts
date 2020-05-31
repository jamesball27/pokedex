import { Resolver, FieldResolver, Root, ArgsType, Field } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Pokemon from '../../types/Pokemon';
import PokemonAbility from '../../types/PokemonAbility';
import PokemonType from '../../types/PokemonType';
import PokemonSpecies from '../../types/PokemonSpecies';
import resolveOneToMany from './base/resolveOneToMany';
import resolveManyToOne from './base/resolveManyToOne';
import PokemonImage from '../../types/PokemonImage';
import Type from '../../types/Type';

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

  @FieldResolver(() => PokemonImage)
  async images(@Root() pokemon: Pokemon): Promise<PokemonImage> {
    return new PokemonImage(pokemon.id);
  }

  @FieldResolver(() => PokemonAbility)
  async abilities(@Root() pokemon: Pokemon): Promise<PokemonAbility[]> {
    return resolveOneToMany<Pokemon, PokemonAbility>({
      repository: this.pokemonAbilityRepository,
      relation: 'pokemon',
      parentId: pokemon.id,
    });
  }

  @FieldResolver(() => Type)
  async types(@Root() pokemon: Pokemon): Promise<Type[]> {
    return this.pokemonTypeRepository
      .find({
        relations: ['pokemon'],
        where: { pokemon: { id: pokemon.id } },
        order: { slot: 'ASC' },
      })
      .then((pt) => pt.map((t) => t.type));
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
