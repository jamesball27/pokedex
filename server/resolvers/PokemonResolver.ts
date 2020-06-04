import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Pokemon from '../../types/Pokemon';
import PokemonAbility from '../../types/PokemonAbility';
import PokemonType from '../../types/PokemonType';
import PokemonSpecies from '../../types/PokemonSpecies';
import resolveOneToMany from './base/resolveOneToMany';
import resolveManyToOne from './base/resolveManyToOne';
import PokemonImage from '../../types/PokemonImage';
import PokemonStat from '../../types/PokemonStat';
import PokemonMove from '../../types/PokemonMove';
import Type from '../../types/Type';
import Move from '../../types/Move';

@Resolver(() => Pokemon)
class PokemonResolver {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(PokemonAbility)
    private readonly pokemonAbilityRepository: Repository<PokemonAbility>,
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>,
    @InjectRepository(PokemonStat)
    private readonly pokemonStatRepository: Repository<PokemonStat>,
    @InjectRepository(PokemonMove)
    private readonly pokemonMoveRepository: Repository<PokemonMove>,
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

  @FieldResolver(() => PokemonStat)
  async stats(@Root() pokemon: Pokemon): Promise<PokemonStat[]> {
    return this.pokemonStatRepository.find({
      relations: ['pokemon'],
      where: { pokemon: { id: pokemon.id } },
    });
  }

  @FieldResolver(() => Move)
  async moves(@Root() pokemon: Pokemon): Promise<Move[]> {
    // Only select Moves from Pokemon's first version appearance that are learned by levelling up
    return this.pokemonMoveRepository
      .find({
        relations: ['pokemon'],
        where: { pokemon: { id: pokemon.id } },
        order: { versionGroupId: 'ASC', moveLearnMethodId: 'ASC' },
      })
      .then((ms) => {
        const firstVersion = ms[0].versionGroupId;
        const firstMoveLearnMethod = ms[0].moveLearnMethodId;
        return ms
          .filter(
            (pm) =>
              pm.versionGroupId === firstVersion && pm.moveLearnMethodId === firstMoveLearnMethod,
          )
          .map((pm) => pm.move);
      });
  }
}

export default PokemonResolver;
