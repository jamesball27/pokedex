import { Repository } from 'typeorm';

// Extract all keys of T that have type V
type KeysMatching<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

interface ResolverOpts<T, R> {
  repository: Repository<T>;
  relation: KeysMatching<T, R>;
  parentId: number;
}

async function resolveManyToOne<T extends { [k: string]: any }, R>(
  opts: ResolverOpts<T, R>,
): Promise<R> {
  const { repository, parentId } = opts;
  const relation = opts.relation as string;

  return repository
    .findOneOrFail(parentId, { relations: [relation] })
    .then((res: T) => res[relation]);
}

export default resolveManyToOne;
