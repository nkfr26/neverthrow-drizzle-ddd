declare const __brand: unique symbol;

export type Branded<Type, Constructor> = Type & {
  readonly [__brand]: Constructor;
};
