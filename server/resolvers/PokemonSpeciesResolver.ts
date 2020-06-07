import {
  Resolver,
  FieldResolver,
  Root,
  Arg,
  ArgsType,
  Query,
  Int,
  Field,
  Args,
  ObjectType,
} from 'type-graphql';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import PokemonSpecies from '../../types/PokemonSpecies';
import PokemonSpeciesSearchResult from '../../types/PokemonSpeciesSearchResult';
import PokemonSpeciesName from '../../types/PokemonSpeciesName';
import Pokemon from '../../types/Pokemon';
import GrowthRate from '../../types/GrowthRate';
import PokemonColor from '../../types/PokemonColor';
import PokemonShape from '../../types/PokemonShape';
import PokemonHabitat from '../../types/PokemonHabitat';
import EggGroup from '../../types/EggGroup';
import PokemonSpeciesFlavorText from '../../types/PokemonSpeciesFlavorText';
import resolveManyToOne from './base/resolveManyToOne';
import resolveOneToMany from './base/resolveOneToMany';
import LangArg from './LangArg';
import { SupportedLanguageName } from '../../types/Language';

@ArgsType()
class SpeciesArgs {
  @Field(() => Int, { nullable: false })
  id: number;
}

@ArgsType()
class SearchArgs {
  @Field(() => String, { nullable: false })
  lang: SupportedLanguageName;

  @Field(() => String, { nullable: false })
  searchTerm: string;
}

@Resolver(() => PokemonSpecies)
class PokemonSpeciesResolver {
  constructor(
    @InjectRepository(PokemonSpecies)
    private readonly pokemonSpeciesRepository: Repository<PokemonSpecies>,
    @InjectRepository(EggGroup)
    private readonly eggGroupRepository: Repository<EggGroup>,
    @InjectRepository(PokemonSpeciesFlavorText)
    private readonly flavorTextRepository: Repository<PokemonSpeciesFlavorText>,
    @InjectRepository(PokemonSpeciesName)
    private readonly nameRepository: Repository<PokemonSpeciesName>,
  ) {}

  @Query(() => PokemonSpecies)
  async species(@Args() { id }: SpeciesArgs): Promise<PokemonSpecies> {
    return this.pokemonSpeciesRepository.findOneOrFail(id);
  }

  @Query(() => [PokemonSpeciesSearchResult])
  async speciesSearch(
    @Args() { lang, searchTerm }: SearchArgs,
  ): Promise<PokemonSpeciesSearchResult[]> {
    return this.nameRepository
      .find({
        relations: ['species'],
        where: {
          name: Like(`${searchTerm}%`),
        },
      })
      .then((names) =>
        names
          .filter((n) => n.language.name === lang)
          .map((n) => ({ name: n.name, speciesId: n.species.id })),
      );
  }

  @FieldResolver(() => Pokemon)
  async pokemon(
    @Root() pokemonSpecies: PokemonSpecies,
    @Arg('default', { defaultValue: false, nullable: true }) isDefault: boolean,
  ): Promise<Pokemon[]> {
    if (isDefault) {
      return pokemonSpecies.pokemon.reduce(
        (acc: Pokemon[], p) => (p.isDefault ? [...acc, p] : acc),
        [],
      );
    }

    return pokemonSpecies.pokemon;
  }

  @FieldResolver()
  localeName(@Root() pokemonSpecies: PokemonSpecies, @Args() { lang }: LangArg): string {
    // Names are eager loaded, so filter in application
    return (
      pokemonSpecies.names.find((name) => name.language.name === lang)?.name ||
      'translation not found'
    );
  }

  @FieldResolver()
  localeGenus(@Root() pokemonSpecies: PokemonSpecies, @Args() { lang }: LangArg): string {
    // Names are eager loaded, so filter in application
    return (
      pokemonSpecies.names.find((name) => name.language.name === lang)?.genus ||
      'translation not found'
    );
  }

  @FieldResolver(() => String)
  async flavorText(@Root() species: PokemonSpecies, @Args() { lang }: LangArg): Promise<string> {
    return await this.flavorTextRepository
      .find({
        where: { pokemonSpecies: { id: species.id } },
        order: { version: 'ASC' },
      })
      .then((f) => {
        // language is eager-loaded so filter in application
        return f.find((f) => f.language.name === lang)?.flavorText || 'translation not found';
      });
  }

  @FieldResolver(() => PokemonSpecies)
  async evolution(@Root() species: PokemonSpecies): Promise<PokemonSpecies[]> {
    return await this.pokemonSpeciesRepository.find({
      where: { evolutionChainId: species.evolutionChainId },
      order: { order: 'ASC' },
    });
  }

  @FieldResolver(() => GrowthRate)
  async growthRate(@Root() pokemonSpecies: PokemonSpecies): Promise<GrowthRate> {
    return resolveManyToOne<PokemonSpecies, GrowthRate>({
      repository: this.pokemonSpeciesRepository,
      relation: 'growthRate',
      parentId: pokemonSpecies.id,
    });
  }

  @FieldResolver(() => PokemonColor)
  async color(@Root() pokemonSpecies: PokemonSpecies): Promise<PokemonColor> {
    return resolveManyToOne<PokemonSpecies, PokemonColor>({
      repository: this.pokemonSpeciesRepository,
      relation: 'color',
      parentId: pokemonSpecies.id,
    });
  }

  @FieldResolver(() => PokemonShape)
  async shape(@Root() pokemonSpecies: PokemonSpecies): Promise<PokemonShape> {
    return resolveManyToOne<PokemonSpecies, PokemonShape>({
      repository: this.pokemonSpeciesRepository,
      relation: 'shape',
      parentId: pokemonSpecies.id,
    });
  }

  @FieldResolver(() => PokemonHabitat)
  async habitat(@Root() pokemonSpecies: PokemonSpecies): Promise<PokemonHabitat> {
    return resolveManyToOne<PokemonSpecies, PokemonHabitat>({
      repository: this.pokemonSpeciesRepository,
      relation: 'habitat',
      parentId: pokemonSpecies.id,
    });
  }

  @FieldResolver(() => EggGroup)
  async eggGroups(@Root() pokemonSpecies: PokemonSpecies): Promise<EggGroup[]> {
    // TODO: extract ManyToMany into helper function
    return this.eggGroupRepository.find({
      relations: ['pokemonSpecies'],
      where: { pokemonSpecies: { id: pokemonSpecies.id } },
    });
  }

  @FieldResolver(() => PokemonSpeciesFlavorText)
  async flavorTextEntries(@Root() species: PokemonSpecies): Promise<PokemonSpeciesFlavorText[]> {
    return resolveOneToMany<PokemonSpecies, PokemonSpeciesFlavorText>({
      repository: this.flavorTextRepository,
      relation: 'pokemonSpecies',
      parentId: species.id,
    });
  }
}

export default PokemonSpeciesResolver;
