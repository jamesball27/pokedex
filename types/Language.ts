import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';

export type SupportedLanguageName = 'ja-Hrkt' | 'ko' | 'fr' | 'de' | 'es' | 'it' | 'en';

@ObjectType()
@Entity('language')
class Language {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: SupportedLanguageName;

  @Field()
  @Column()
  official: boolean;

  @Field()
  @Column()
  iso639: string;

  @Field()
  @Column()
  iso3166: string;

  localeName: string;
}

export default Language;
