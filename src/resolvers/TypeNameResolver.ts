import createLanguageFieldResolver from './base/createLanguageFieldResolver';
import TypeName from '../entities/TypeName';
import { Resolver } from 'type-graphql';

const BaseResolver = createLanguageFieldResolver<TypeName>(TypeName);

@Resolver((of) => TypeName)
class TypeNameResolver extends BaseResolver {}

export default TypeNameResolver;
