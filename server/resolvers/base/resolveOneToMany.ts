import { Repository } from 'typeorm';

// Extract all keys of T that have type V
type KeysMatching<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

interface ResolverOpts<T, R> {
  repository: Repository<R>;
  relation: KeysMatching<R, T>;
  parentId: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function resolveOneToMany<T extends { [k: string]: any }, R>(
  opts: ResolverOpts<T, R>,
): Promise<R[]> {
  const { repository, parentId } = opts;
  const relation = opts.relation as string;

  return repository.find({
    relations: [relation],
    where: { [relation]: { id: parentId } },
  });
}

export default resolveOneToMany;
