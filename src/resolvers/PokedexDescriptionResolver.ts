import { Resolver } from 'type-graphql';

import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import PokedexDescription from '../entities/PokedexDescription';

const BaseResolver = createLanguageFieldResolver<PokedexDescription>(PokedexDescription);

@Resolver((of) => PokedexDescription)
class PokedexDescriptionResolver extends BaseResolver {}

export default PokedexDescriptionResolver;
