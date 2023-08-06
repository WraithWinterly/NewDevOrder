/**
 * Client
 **/

import * as runtime from './runtime/library';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Team
 *
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>;
/**
 * Model Project
 *
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>;
/**
 * Model Bounty
 *
 */
export type Bounty = $Result.DefaultSelection<Prisma.$BountyPayload>;
/**
 * Model Member
 *
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>;
/**
 * Model TeamInvite
 *
 */
export type TeamInvite = $Result.DefaultSelection<Prisma.$TeamInvitePayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const ProjectStage: {
    PendingBountyMgrQuote: 'PendingBountyMgrQuote';
    PendingFounderPay: 'PendingFounderPay';
    PendingBountyDesign: 'PendingBountyDesign';
    PendingBountyValidator: 'PendingBountyValidator';
    PendingApproval: 'PendingApproval';
    Declined: 'Declined';
    Ready: 'Ready';
  };

  export type ProjectStage = (typeof ProjectStage)[keyof typeof ProjectStage];

  export const BountyStage: {
    Active: 'Active';
    Draft: 'Draft';
    PendingApproval: 'PendingApproval';
    Completed: 'Completed';
  };

  export type BountyStage = (typeof BountyStage)[keyof typeof BountyStage];

  export const BountyType: {
    Frontend: 'Frontend';
    Backend: 'Backend';
    Fullstack: 'Fullstack';
    Web3: 'Web3';
  };

  export type BountyType = (typeof BountyType)[keyof typeof BountyType];

  export const RoleType: {
    Founder: 'Founder';
    BountyHunter: 'BountyHunter';
    BountyManager: 'BountyManager';
    BountyDesigner: 'BountyDesigner';
    BountyValidator: 'BountyValidator';
  };

  export type RoleType = (typeof RoleType)[keyof typeof RoleType];
}

export type ProjectStage = $Enums.ProjectStage;

export const ProjectStage: typeof $Enums.ProjectStage;

export type BountyStage = $Enums.BountyStage;

export const BountyStage: typeof $Enums.BountyStage;

export type BountyType = $Enums.BountyType;

export const BountyType: typeof $Enums.BountyType;

export type RoleType = $Enums.RoleType;

export const RoleType: typeof $Enums.RoleType;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Teams
 * const teams = await prisma.team.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T
    ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T['log']>
      : never
    : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> {
  [K: symbol]: {types: Prisma.TypeMap<ExtArgs>['other']};

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Teams
   * const teams = await prisma.team.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: {isolationLevel?: Prisma.TransactionIsolationLevel},
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Teams
   * const teams = await prisma.team.findMany()
   * ```
   */
  get team(): Prisma.TeamDelegate<ExtArgs>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   */
  get project(): Prisma.ProjectDelegate<ExtArgs>;

  /**
   * `prisma.bounty`: Exposes CRUD operations for the **Bounty** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Bounties
   * const bounties = await prisma.bounty.findMany()
   * ```
   */
  get bounty(): Prisma.BountyDelegate<ExtArgs>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Members
   * const members = await prisma.member.findMany()
   * ```
   */
  get member(): Prisma.MemberDelegate<ExtArgs>;

  /**
   * `prisma.teamInvite`: Exposes CRUD operations for the **TeamInvite** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more TeamInvites
   * const teamInvites = await prisma.teamInvite.findMany()
   * ```
   */
  get teamInvite(): Prisma.TeamInviteDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.1.0
   * Query Engine version: a9b7003df90aa623086e4d6f4e43c72468e6339b
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
   */
  export type JsonObject = {[Key in string]?: JsonValue};

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue =
    | string
    | number
    | boolean
    | JsonObject
    | JsonArray
    | null;

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {
    readonly [Key in string]?: InputJsonValue | null;
  };

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray
    extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue =
    | string
    | number
    | boolean
    | InputJsonObject
    | InputJsonArray
    | {toJSON(): unknown};

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
    infer U
  >
    ? U
    : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = {[P in Exclude<keyof T, keyof U>]?: never};

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
    ? False
    : T extends Uint8Array
    ? False
    : T extends BigInt
    ? False
    : T extends object
    ? True
    : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? {[P in K]: O[P]} & O : O)
          | ({[P in keyof O as P extends K ? K : never]-?: O[P]} & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Team: 'Team';
    Project: 'Project';
    Bounty: 'Bounty';
    Member: 'Member';
    TeamInvite: 'TeamInvite';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb
    extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    meta: {
      modelProps: 'team' | 'project' | 'bounty' | 'member' | 'teamInvite';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>;
        fields: Prisma.TeamFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>;
          };
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>;
          };
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[];
          };
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>;
          };
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>;
          };
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>;
          };
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>;
          };
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTeam>;
          };
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TeamGroupByOutputType>[];
          };
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>;
            result: $Utils.Optional<TeamCountAggregateOutputType> | number;
          };
        };
      };
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>;
        fields: Prisma.ProjectFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>;
          };
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>;
          };
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[];
          };
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>;
          };
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>;
          };
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>;
          };
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>;
          };
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProject>;
          };
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProjectGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>;
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number;
          };
        };
      };
      Bounty: {
        payload: Prisma.$BountyPayload<ExtArgs>;
        fields: Prisma.BountyFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.BountyFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.BountyFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>;
          };
          findFirst: {
            args: Prisma.BountyFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.BountyFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>;
          };
          findMany: {
            args: Prisma.BountyFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>[];
          };
          create: {
            args: Prisma.BountyCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>;
          };
          createMany: {
            args: Prisma.BountyCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.BountyDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>;
          };
          update: {
            args: Prisma.BountyUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>;
          };
          deleteMany: {
            args: Prisma.BountyDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.BountyUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.BountyUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$BountyPayload>;
          };
          aggregate: {
            args: Prisma.BountyAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateBounty>;
          };
          groupBy: {
            args: Prisma.BountyGroupByArgs<ExtArgs>;
            result: $Utils.Optional<BountyGroupByOutputType>[];
          };
          count: {
            args: Prisma.BountyCountArgs<ExtArgs>;
            result: $Utils.Optional<BountyCountAggregateOutputType> | number;
          };
        };
      };
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>;
        fields: Prisma.MemberFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>;
          };
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>;
          };
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[];
          };
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>;
          };
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>;
          };
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>;
          };
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>;
          };
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMember>;
          };
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MemberGroupByOutputType>[];
          };
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>;
            result: $Utils.Optional<MemberCountAggregateOutputType> | number;
          };
        };
      };
      TeamInvite: {
        payload: Prisma.$TeamInvitePayload<ExtArgs>;
        fields: Prisma.TeamInviteFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TeamInviteFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TeamInviteFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload>;
          };
          findFirst: {
            args: Prisma.TeamInviteFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TeamInviteFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload>;
          };
          findMany: {
            args: Prisma.TeamInviteFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload>[];
          };
          create: {
            args: Prisma.TeamInviteCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload>;
          };
          createMany: {
            args: Prisma.TeamInviteCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.TeamInviteDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload>;
          };
          update: {
            args: Prisma.TeamInviteUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload>;
          };
          deleteMany: {
            args: Prisma.TeamInviteDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.TeamInviteUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.TeamInviteUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TeamInvitePayload>;
          };
          aggregate: {
            args: Prisma.TeamInviteAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTeamInvite>;
          };
          groupBy: {
            args: Prisma.TeamInviteGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TeamInviteGroupByOutputType>[];
          };
          count: {
            args: Prisma.TeamInviteCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<TeamInviteCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>;
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T['emit'] extends 'event'
        ? T['level']
        : never
      : never;
  export type GetEvents<T extends any> = T extends Array<
    LogLevel | LogDefinition
  >
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    members: number;
  };

  export type TeamCountOutputTypeSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    members?: boolean | TeamCountOutputTypeCountMembersArgs;
  };

  // Custom InputTypes

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMembersArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: MemberWhereInput;
  };

  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    bounties: number;
  };

  export type ProjectCountOutputTypeSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    bounties?: boolean | ProjectCountOutputTypeCountBountiesArgs;
  };

  // Custom InputTypes

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountBountiesArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: BountyWhereInput;
  };

  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    teamInvites: number;
    bounties: number;
    createdTeams: number;
    teams: number;
    Project: number;
  };

  export type MemberCountOutputTypeSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    teamInvites?: boolean | MemberCountOutputTypeCountTeamInvitesArgs;
    bounties?: boolean | MemberCountOutputTypeCountBountiesArgs;
    createdTeams?: boolean | MemberCountOutputTypeCountCreatedTeamsArgs;
    teams?: boolean | MemberCountOutputTypeCountTeamsArgs;
    Project?: boolean | MemberCountOutputTypeCountProjectArgs;
  };

  // Custom InputTypes

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountTeamInvitesArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: TeamInviteWhereInput;
  };

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountBountiesArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: BountyWhereInput;
  };

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountCreatedTeamsArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: TeamWhereInput;
  };

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountTeamsArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: TeamWhereInput;
  };

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountProjectArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: ProjectWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null;
    _min: TeamMinAggregateOutputType | null;
    _max: TeamMaxAggregateOutputType | null;
  };

  export type TeamMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    link: string | null;
    creatorAddress: string | null;
  };

  export type TeamMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    link: string | null;
    creatorAddress: string | null;
  };

  export type TeamCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    link: number;
    creatorAddress: number;
    _all: number;
  };

  export type TeamMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    link?: true;
    creatorAddress?: true;
  };

  export type TeamMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    link?: true;
    creatorAddress?: true;
  };

  export type TeamCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    link?: true;
    creatorAddress?: true;
    _all?: true;
  };

  export type TeamAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Teams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Teams
     **/
    _count?: true | TeamCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TeamMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TeamMaxAggregateInputType;
  };

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
    [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>;
  };

  export type TeamGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: TeamWhereInput;
    orderBy?:
      | TeamOrderByWithAggregationInput
      | TeamOrderByWithAggregationInput[];
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum;
    having?: TeamScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TeamCountAggregateInputType | true;
    _min?: TeamMinAggregateInputType;
    _max?: TeamMaxAggregateInputType;
  };

  export type TeamGroupByOutputType = {
    id: string;
    name: string;
    description: string;
    link: string;
    creatorAddress: string;
    _count: TeamCountAggregateOutputType | null;
    _min: TeamMinAggregateOutputType | null;
    _max: TeamMaxAggregateOutputType | null;
  };

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> & {
        [P in keyof T & keyof TeamGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
          : GetScalarType<T[P], TeamGroupByOutputType[P]>;
      }
    >
  >;

  export type TeamSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      link?: boolean;
      creatorAddress?: boolean;
      members?: boolean | Team$membersArgs<ExtArgs>;
      creator?: boolean | MemberDefaultArgs<ExtArgs>;
      _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['team']
  >;

  export type TeamSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    link?: boolean;
    creatorAddress?: boolean;
  };

  export type TeamInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    members?: boolean | Team$membersArgs<ExtArgs>;
    creator?: boolean | MemberDefaultArgs<ExtArgs>;
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>;
  };

  export type $TeamPayload<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    name: 'Team';
    objects: {
      members: Prisma.$MemberPayload<ExtArgs>[];
      creator: Prisma.$MemberPayload<ExtArgs>;
    };
    scalars: $Extensions.GetResult<
      {
        id: string;
        name: string;
        description: string;
        link: string;
        creatorAddress: string;
      },
      ExtArgs['result']['team']
    >;
    composites: {};
  };

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> =
    $Result.GetResult<Prisma.$TeamPayload, S>;

  type TeamCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<TeamFindManyArgs, 'select' | 'include'> & {
    select?: TeamCountAggregateInputType | true;
  };

  export interface TeamDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Team'];
      meta: {name: 'Team'};
    };
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends TeamFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>,
    ): Prisma__TeamClient<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Team that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__TeamClient<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends TeamFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>,
    ): Prisma__TeamClient<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__TeamClient<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     *
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends TeamFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     *
     **/
    create<T extends TeamCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TeamCreateArgs<ExtArgs>>,
    ): Prisma__TeamClient<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Teams.
     *     @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     *     @example
     *     // Create many Teams
     *     const team = await prisma.team.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends TeamCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     *
     **/
    delete<T extends TeamDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>,
    ): Prisma__TeamClient<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends TeamUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>,
    ): Prisma__TeamClient<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends TeamDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends TeamUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     **/
    upsert<T extends TeamUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>,
    ): Prisma__TeamClient<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
     **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TeamAggregateArgs>(
      args: Subset<T, TeamAggregateArgs>,
    ): Prisma.PrismaPromise<GetTeamAggregateType<T>>;

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? {orderBy: TeamGroupByArgs['orderBy']}
        : {orderBy?: TeamGroupByArgs['orderBy']},
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
    >(
      args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetTeamGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Team model
     */
    readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    members<T extends Team$membersArgs<ExtArgs> = {}>(
      args?: Subset<T, Team$membersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findMany'> | Null
    >;

    creator<T extends MemberDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, MemberDefaultArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      | $Result.GetResult<
          Prisma.$MemberPayload<ExtArgs>,
          T,
          'findUniqueOrThrow'
        >
      | Null,
      Null,
      ExtArgs
    >;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<'Team', 'String'>;
    readonly name: FieldRef<'Team', 'String'>;
    readonly description: FieldRef<'Team', 'String'>;
    readonly link: FieldRef<'Team', 'String'>;
    readonly creatorAddress: FieldRef<'Team', 'String'>;
  }

  // Custom InputTypes

  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput;
  };

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput;
  };

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Teams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[];
  };

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Teams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[];
  };

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Teams.
     */
    skip?: number;
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[];
  };

  /**
   * Team create
   */
  export type TeamCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>;
  };

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Team update
   */
  export type TeamUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>;
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput;
  };

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>;
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput;
  };

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput;
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>;
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>;
  };

  /**
   * Team delete
   */
  export type TeamDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput;
  };

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput;
  };

  /**
   * Team.members
   */
  export type Team$membersArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    where?: MemberWhereInput;
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[];
    cursor?: MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[];
  };

  /**
   * Team without action
   */
  export type TeamDefaultArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
  };

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null;
    _avg: ProjectAvgAggregateOutputType | null;
    _sum: ProjectSumAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
  };

  export type ProjectAvgAggregateOutputType = {
    quotePrice: number | null;
  };

  export type ProjectSumAggregateOutputType = {
    quotePrice: number | null;
  };

  export type ProjectMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    email: string | null;
    phone: string | null;
    quotePrice: number | null;
    stage: $Enums.ProjectStage | null;
    memberWalletAddress: string | null;
  };

  export type ProjectMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    email: string | null;
    phone: string | null;
    quotePrice: number | null;
    stage: $Enums.ProjectStage | null;
    memberWalletAddress: string | null;
  };

  export type ProjectCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    email: number;
    phone: number;
    bountyIDs: number;
    quotePrice: number;
    stage: number;
    memberWalletAddress: number;
    _all: number;
  };

  export type ProjectAvgAggregateInputType = {
    quotePrice?: true;
  };

  export type ProjectSumAggregateInputType = {
    quotePrice?: true;
  };

  export type ProjectMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    email?: true;
    phone?: true;
    quotePrice?: true;
    stage?: true;
    memberWalletAddress?: true;
  };

  export type ProjectMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    email?: true;
    phone?: true;
    quotePrice?: true;
    stage?: true;
    memberWalletAddress?: true;
  };

  export type ProjectCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    email?: true;
    phone?: true;
    bountyIDs?: true;
    quotePrice?: true;
    stage?: true;
    memberWalletAddress?: true;
    _all?: true;
  };

  export type ProjectAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Projects to fetch.
     */
    orderBy?:
      | ProjectOrderByWithRelationInput
      | ProjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Projects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Projects
     **/
    _count?: true | ProjectCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProjectAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProjectSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProjectMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProjectMaxAggregateInputType;
  };

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
    [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>;
  };

  export type ProjectGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: ProjectWhereInput;
    orderBy?:
      | ProjectOrderByWithAggregationInput
      | ProjectOrderByWithAggregationInput[];
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum;
    having?: ProjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectCountAggregateInputType | true;
    _avg?: ProjectAvgAggregateInputType;
    _sum?: ProjectSumAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
  };

  export type ProjectGroupByOutputType = {
    id: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs: string[];
    quotePrice: number;
    stage: $Enums.ProjectStage;
    memberWalletAddress: string;
    _count: ProjectCountAggregateOutputType | null;
    _avg: ProjectAvgAggregateOutputType | null;
    _sum: ProjectSumAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
  };

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProjectGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ProjectGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>;
        }
      >
    >;

  export type ProjectSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      description?: boolean;
      email?: boolean;
      phone?: boolean;
      bountyIDs?: boolean;
      quotePrice?: boolean;
      stage?: boolean;
      memberWalletAddress?: boolean;
      bounties?: boolean | Project$bountiesArgs<ExtArgs>;
      founder?: boolean | MemberDefaultArgs<ExtArgs>;
      _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['project']
  >;

  export type ProjectSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    email?: boolean;
    phone?: boolean;
    bountyIDs?: boolean;
    quotePrice?: boolean;
    stage?: boolean;
    memberWalletAddress?: boolean;
  };

  export type ProjectInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    bounties?: boolean | Project$bountiesArgs<ExtArgs>;
    founder?: boolean | MemberDefaultArgs<ExtArgs>;
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>;
  };

  export type $ProjectPayload<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    name: 'Project';
    objects: {
      bounties: Prisma.$BountyPayload<ExtArgs>[];
      founder: Prisma.$MemberPayload<ExtArgs>;
    };
    scalars: $Extensions.GetResult<
      {
        id: string;
        title: string;
        description: string;
        email: string;
        phone: string;
        bountyIDs: string[];
        quotePrice: number;
        stage: $Enums.ProjectStage;
        memberWalletAddress: string;
      },
      ExtArgs['result']['project']
    >;
    composites: {};
  };

  type ProjectGetPayload<
    S extends boolean | null | undefined | ProjectDefaultArgs,
  > = $Result.GetResult<Prisma.$ProjectPayload, S>;

  type ProjectCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<ProjectFindManyArgs, 'select' | 'include'> & {
    select?: ProjectCountAggregateInputType | true;
  };

  export interface ProjectDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Project'];
      meta: {name: 'Project'};
    };
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends ProjectFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<
        Prisma.$ProjectPayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Project that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<
        Prisma.$ProjectPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends ProjectFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     *
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends ProjectFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     *
     **/
    create<T extends ProjectCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Projects.
     *     @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     *     @example
     *     // Create many Projects
     *     const project = await prisma.project.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends ProjectCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     *
     **/
    delete<T extends ProjectDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ProjectUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ProjectDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ProjectUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     **/
    upsert<T extends ProjectUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
     **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProjectAggregateArgs>(
      args: Subset<T, ProjectAggregateArgs>,
    ): Prisma.PrismaPromise<GetProjectAggregateType<T>>;

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? {orderBy: ProjectGroupByArgs['orderBy']}
        : {orderBy?: ProjectGroupByArgs['orderBy']},
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
    >(
      args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetProjectGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Project model
     */
    readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    bounties<T extends Project$bountiesArgs<ExtArgs> = {}>(
      args?: Subset<T, Project$bountiesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'findMany'> | Null
    >;

    founder<T extends MemberDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, MemberDefaultArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      | $Result.GetResult<
          Prisma.$MemberPayload<ExtArgs>,
          T,
          'findUniqueOrThrow'
        >
      | Null,
      Null,
      ExtArgs
    >;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<'Project', 'String'>;
    readonly title: FieldRef<'Project', 'String'>;
    readonly description: FieldRef<'Project', 'String'>;
    readonly email: FieldRef<'Project', 'String'>;
    readonly phone: FieldRef<'Project', 'String'>;
    readonly bountyIDs: FieldRef<'Project', 'String[]'>;
    readonly quotePrice: FieldRef<'Project', 'Int'>;
    readonly stage: FieldRef<'Project', 'ProjectStage'>;
    readonly memberWalletAddress: FieldRef<'Project', 'String'>;
  }

  // Custom InputTypes

  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput;
  };

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput;
  };

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Projects to fetch.
     */
    orderBy?:
      | ProjectOrderByWithRelationInput
      | ProjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Projects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[];
  };

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Projects to fetch.
     */
    orderBy?:
      | ProjectOrderByWithRelationInput
      | ProjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Projects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[];
  };

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Projects to fetch.
     */
    orderBy?:
      | ProjectOrderByWithRelationInput
      | ProjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Projects.
     */
    skip?: number;
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[];
  };

  /**
   * Project create
   */
  export type ProjectCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>;
  };

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Project update
   */
  export type ProjectUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>;
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput;
  };

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>;
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput;
  };

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput;
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>;
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>;
  };

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput;
  };

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput;
  };

  /**
   * Project.bounties
   */
  export type Project$bountiesArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    where?: BountyWhereInput;
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[];
    cursor?: BountyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[];
  };

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
  };

  /**
   * Model Bounty
   */

  export type AggregateBounty = {
    _count: BountyCountAggregateOutputType | null;
    _avg: BountyAvgAggregateOutputType | null;
    _sum: BountySumAggregateOutputType | null;
    _min: BountyMinAggregateOutputType | null;
    _max: BountyMaxAggregateOutputType | null;
  };

  export type BountyAvgAggregateOutputType = {
    reward: number | null;
  };

  export type BountySumAggregateOutputType = {
    reward: number | null;
  };

  export type BountyMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    postDate: Date | null;
    deadline: Date | null;
    stage: $Enums.BountyStage | null;
    aboutProject: string | null;
    approvedByFounder: boolean | null;
    approvedByManager: boolean | null;
    approvedByValidator: boolean | null;
    reward: number | null;
    founderAddress: string | null;
    projectId: string | null;
  };

  export type BountyMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    postDate: Date | null;
    deadline: Date | null;
    stage: $Enums.BountyStage | null;
    aboutProject: string | null;
    approvedByFounder: boolean | null;
    approvedByManager: boolean | null;
    approvedByValidator: boolean | null;
    reward: number | null;
    founderAddress: string | null;
    projectId: string | null;
  };

  export type BountyCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    postDate: number;
    types: number;
    deadline: number;
    participantsTeamIDs: number;
    testCases: number;
    stage: number;
    submissions: number;
    aboutProject: number;
    headerSections: number;
    approvedByFounder: number;
    approvedByManager: number;
    approvedByValidator: number;
    reward: number;
    founderAddress: number;
    projectId: number;
    _all: number;
  };

  export type BountyAvgAggregateInputType = {
    reward?: true;
  };

  export type BountySumAggregateInputType = {
    reward?: true;
  };

  export type BountyMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    postDate?: true;
    deadline?: true;
    stage?: true;
    aboutProject?: true;
    approvedByFounder?: true;
    approvedByManager?: true;
    approvedByValidator?: true;
    reward?: true;
    founderAddress?: true;
    projectId?: true;
  };

  export type BountyMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    postDate?: true;
    deadline?: true;
    stage?: true;
    aboutProject?: true;
    approvedByFounder?: true;
    approvedByManager?: true;
    approvedByValidator?: true;
    reward?: true;
    founderAddress?: true;
    projectId?: true;
  };

  export type BountyCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    postDate?: true;
    types?: true;
    deadline?: true;
    participantsTeamIDs?: true;
    testCases?: true;
    stage?: true;
    submissions?: true;
    aboutProject?: true;
    headerSections?: true;
    approvedByFounder?: true;
    approvedByManager?: true;
    approvedByValidator?: true;
    reward?: true;
    founderAddress?: true;
    projectId?: true;
    _all?: true;
  };

  export type BountyAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Bounty to aggregate.
     */
    where?: BountyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Bounties to fetch.
     */
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: BountyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Bounties from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Bounties.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Bounties
     **/
    _count?: true | BountyCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: BountyAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: BountySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: BountyMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: BountyMaxAggregateInputType;
  };

  export type GetBountyAggregateType<T extends BountyAggregateArgs> = {
    [P in keyof T & keyof AggregateBounty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBounty[P]>
      : GetScalarType<T[P], AggregateBounty[P]>;
  };

  export type BountyGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: BountyWhereInput;
    orderBy?:
      | BountyOrderByWithAggregationInput
      | BountyOrderByWithAggregationInput[];
    by: BountyScalarFieldEnum[] | BountyScalarFieldEnum;
    having?: BountyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BountyCountAggregateInputType | true;
    _avg?: BountyAvgAggregateInputType;
    _sum?: BountySumAggregateInputType;
    _min?: BountyMinAggregateInputType;
    _max?: BountyMaxAggregateInputType;
  };

  export type BountyGroupByOutputType = {
    id: string;
    title: string;
    description: string;
    postDate: Date;
    types: $Enums.BountyType[];
    deadline: Date;
    participantsTeamIDs: string[];
    testCases: string[];
    stage: $Enums.BountyStage;
    submissions: string[];
    aboutProject: string | null;
    headerSections: JsonValue | null;
    approvedByFounder: boolean;
    approvedByManager: boolean;
    approvedByValidator: boolean;
    reward: number;
    founderAddress: string | null;
    projectId: string | null;
    _count: BountyCountAggregateOutputType | null;
    _avg: BountyAvgAggregateOutputType | null;
    _sum: BountySumAggregateOutputType | null;
    _min: BountyMinAggregateOutputType | null;
    _max: BountyMaxAggregateOutputType | null;
  };

  type GetBountyGroupByPayload<T extends BountyGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<BountyGroupByOutputType, T['by']> & {
          [P in keyof T & keyof BountyGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BountyGroupByOutputType[P]>
            : GetScalarType<T[P], BountyGroupByOutputType[P]>;
        }
      >
    >;

  export type BountySelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      description?: boolean;
      postDate?: boolean;
      types?: boolean;
      deadline?: boolean;
      participantsTeamIDs?: boolean;
      testCases?: boolean;
      stage?: boolean;
      submissions?: boolean;
      aboutProject?: boolean;
      headerSections?: boolean;
      approvedByFounder?: boolean;
      approvedByManager?: boolean;
      approvedByValidator?: boolean;
      reward?: boolean;
      founderAddress?: boolean;
      projectId?: boolean;
      founder?: boolean | Bounty$founderArgs<ExtArgs>;
      project?: boolean | Bounty$projectArgs<ExtArgs>;
    },
    ExtArgs['result']['bounty']
  >;

  export type BountySelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    postDate?: boolean;
    types?: boolean;
    deadline?: boolean;
    participantsTeamIDs?: boolean;
    testCases?: boolean;
    stage?: boolean;
    submissions?: boolean;
    aboutProject?: boolean;
    headerSections?: boolean;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: boolean;
    founderAddress?: boolean;
    projectId?: boolean;
  };

  export type BountyInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    founder?: boolean | Bounty$founderArgs<ExtArgs>;
    project?: boolean | Bounty$projectArgs<ExtArgs>;
  };

  export type $BountyPayload<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    name: 'Bounty';
    objects: {
      founder: Prisma.$MemberPayload<ExtArgs> | null;
      project: Prisma.$ProjectPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetResult<
      {
        id: string;
        title: string;
        description: string;
        postDate: Date;
        types: $Enums.BountyType[];
        deadline: Date;
        participantsTeamIDs: string[];
        testCases: string[];
        stage: $Enums.BountyStage;
        submissions: string[];
        aboutProject: string | null;
        headerSections: Prisma.JsonValue | null;
        approvedByFounder: boolean;
        approvedByManager: boolean;
        approvedByValidator: boolean;
        reward: number;
        founderAddress: string | null;
        projectId: string | null;
      },
      ExtArgs['result']['bounty']
    >;
    composites: {};
  };

  type BountyGetPayload<
    S extends boolean | null | undefined | BountyDefaultArgs,
  > = $Result.GetResult<Prisma.$BountyPayload, S>;

  type BountyCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<BountyFindManyArgs, 'select' | 'include'> & {
    select?: BountyCountAggregateInputType | true;
  };

  export interface BountyDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Bounty'];
      meta: {name: 'Bounty'};
    };
    /**
     * Find zero or one Bounty that matches the filter.
     * @param {BountyFindUniqueArgs} args - Arguments to find a Bounty
     * @example
     * // Get one Bounty
     * const bounty = await prisma.bounty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends BountyFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, BountyFindUniqueArgs<ExtArgs>>,
    ): Prisma__BountyClient<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Bounty that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {BountyFindUniqueOrThrowArgs} args - Arguments to find a Bounty
     * @example
     * // Get one Bounty
     * const bounty = await prisma.bounty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends BountyFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BountyFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__BountyClient<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Bounty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyFindFirstArgs} args - Arguments to find a Bounty
     * @example
     * // Get one Bounty
     * const bounty = await prisma.bounty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends BountyFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, BountyFindFirstArgs<ExtArgs>>,
    ): Prisma__BountyClient<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Bounty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyFindFirstOrThrowArgs} args - Arguments to find a Bounty
     * @example
     * // Get one Bounty
     * const bounty = await prisma.bounty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends BountyFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BountyFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__BountyClient<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Bounties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bounties
     * const bounties = await prisma.bounty.findMany()
     *
     * // Get first 10 Bounties
     * const bounties = await prisma.bounty.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const bountyWithIdOnly = await prisma.bounty.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends BountyFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BountyFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a Bounty.
     * @param {BountyCreateArgs} args - Arguments to create a Bounty.
     * @example
     * // Create one Bounty
     * const Bounty = await prisma.bounty.create({
     *   data: {
     *     // ... data to create a Bounty
     *   }
     * })
     *
     **/
    create<T extends BountyCreateArgs<ExtArgs>>(
      args: SelectSubset<T, BountyCreateArgs<ExtArgs>>,
    ): Prisma__BountyClient<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Bounties.
     *     @param {BountyCreateManyArgs} args - Arguments to create many Bounties.
     *     @example
     *     // Create many Bounties
     *     const bounty = await prisma.bounty.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends BountyCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BountyCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Bounty.
     * @param {BountyDeleteArgs} args - Arguments to delete one Bounty.
     * @example
     * // Delete one Bounty
     * const Bounty = await prisma.bounty.delete({
     *   where: {
     *     // ... filter to delete one Bounty
     *   }
     * })
     *
     **/
    delete<T extends BountyDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, BountyDeleteArgs<ExtArgs>>,
    ): Prisma__BountyClient<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Bounty.
     * @param {BountyUpdateArgs} args - Arguments to update one Bounty.
     * @example
     * // Update one Bounty
     * const bounty = await prisma.bounty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends BountyUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, BountyUpdateArgs<ExtArgs>>,
    ): Prisma__BountyClient<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Bounties.
     * @param {BountyDeleteManyArgs} args - Arguments to filter Bounties to delete.
     * @example
     * // Delete a few Bounties
     * const { count } = await prisma.bounty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends BountyDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BountyDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Bounties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bounties
     * const bounty = await prisma.bounty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends BountyUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, BountyUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Bounty.
     * @param {BountyUpsertArgs} args - Arguments to update or create a Bounty.
     * @example
     * // Update or create a Bounty
     * const bounty = await prisma.bounty.upsert({
     *   create: {
     *     // ... data to create a Bounty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bounty we want to update
     *   }
     * })
     **/
    upsert<T extends BountyUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, BountyUpsertArgs<ExtArgs>>,
    ): Prisma__BountyClient<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Bounties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyCountArgs} args - Arguments to filter Bounties to count.
     * @example
     * // Count the number of Bounties
     * const count = await prisma.bounty.count({
     *   where: {
     *     // ... the filter for the Bounties we want to count
     *   }
     * })
     **/
    count<T extends BountyCountArgs>(
      args?: Subset<T, BountyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BountyCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Bounty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends BountyAggregateArgs>(
      args: Subset<T, BountyAggregateArgs>,
    ): Prisma.PrismaPromise<GetBountyAggregateType<T>>;

    /**
     * Group by Bounty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BountyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends BountyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? {orderBy: BountyGroupByArgs['orderBy']}
        : {orderBy?: BountyGroupByArgs['orderBy']},
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
    >(
      args: SubsetIntersection<T, BountyGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetBountyGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Bounty model
     */
    readonly fields: BountyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bounty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BountyClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    founder<T extends Bounty$founderArgs<ExtArgs> = {}>(
      args?: Subset<T, Bounty$founderArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<
        Prisma.$MemberPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      > | null,
      null,
      ExtArgs
    >;

    project<T extends Bounty$projectArgs<ExtArgs> = {}>(
      args?: Subset<T, Bounty$projectArgs<ExtArgs>>,
    ): Prisma__ProjectClient<
      $Result.GetResult<
        Prisma.$ProjectPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Bounty model
   */
  interface BountyFieldRefs {
    readonly id: FieldRef<'Bounty', 'String'>;
    readonly title: FieldRef<'Bounty', 'String'>;
    readonly description: FieldRef<'Bounty', 'String'>;
    readonly postDate: FieldRef<'Bounty', 'DateTime'>;
    readonly types: FieldRef<'Bounty', 'BountyType[]'>;
    readonly deadline: FieldRef<'Bounty', 'DateTime'>;
    readonly participantsTeamIDs: FieldRef<'Bounty', 'String[]'>;
    readonly testCases: FieldRef<'Bounty', 'String[]'>;
    readonly stage: FieldRef<'Bounty', 'BountyStage'>;
    readonly submissions: FieldRef<'Bounty', 'String[]'>;
    readonly aboutProject: FieldRef<'Bounty', 'String'>;
    readonly headerSections: FieldRef<'Bounty', 'Json'>;
    readonly approvedByFounder: FieldRef<'Bounty', 'Boolean'>;
    readonly approvedByManager: FieldRef<'Bounty', 'Boolean'>;
    readonly approvedByValidator: FieldRef<'Bounty', 'Boolean'>;
    readonly reward: FieldRef<'Bounty', 'Int'>;
    readonly founderAddress: FieldRef<'Bounty', 'String'>;
    readonly projectId: FieldRef<'Bounty', 'String'>;
  }

  // Custom InputTypes

  /**
   * Bounty findUnique
   */
  export type BountyFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * Filter, which Bounty to fetch.
     */
    where: BountyWhereUniqueInput;
  };

  /**
   * Bounty findUniqueOrThrow
   */
  export type BountyFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * Filter, which Bounty to fetch.
     */
    where: BountyWhereUniqueInput;
  };

  /**
   * Bounty findFirst
   */
  export type BountyFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * Filter, which Bounty to fetch.
     */
    where?: BountyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Bounties to fetch.
     */
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Bounties.
     */
    cursor?: BountyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Bounties from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Bounties.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Bounties.
     */
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[];
  };

  /**
   * Bounty findFirstOrThrow
   */
  export type BountyFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * Filter, which Bounty to fetch.
     */
    where?: BountyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Bounties to fetch.
     */
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Bounties.
     */
    cursor?: BountyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Bounties from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Bounties.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Bounties.
     */
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[];
  };

  /**
   * Bounty findMany
   */
  export type BountyFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * Filter, which Bounties to fetch.
     */
    where?: BountyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Bounties to fetch.
     */
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Bounties.
     */
    cursor?: BountyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Bounties from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Bounties.
     */
    skip?: number;
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[];
  };

  /**
   * Bounty create
   */
  export type BountyCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * The data needed to create a Bounty.
     */
    data: XOR<BountyCreateInput, BountyUncheckedCreateInput>;
  };

  /**
   * Bounty createMany
   */
  export type BountyCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Bounties.
     */
    data: BountyCreateManyInput | BountyCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Bounty update
   */
  export type BountyUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * The data needed to update a Bounty.
     */
    data: XOR<BountyUpdateInput, BountyUncheckedUpdateInput>;
    /**
     * Choose, which Bounty to update.
     */
    where: BountyWhereUniqueInput;
  };

  /**
   * Bounty updateMany
   */
  export type BountyUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Bounties.
     */
    data: XOR<BountyUpdateManyMutationInput, BountyUncheckedUpdateManyInput>;
    /**
     * Filter which Bounties to update
     */
    where?: BountyWhereInput;
  };

  /**
   * Bounty upsert
   */
  export type BountyUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * The filter to search for the Bounty to update in case it exists.
     */
    where: BountyWhereUniqueInput;
    /**
     * In case the Bounty found by the `where` argument doesn't exist, create a new Bounty with this data.
     */
    create: XOR<BountyCreateInput, BountyUncheckedCreateInput>;
    /**
     * In case the Bounty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BountyUpdateInput, BountyUncheckedUpdateInput>;
  };

  /**
   * Bounty delete
   */
  export type BountyDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    /**
     * Filter which Bounty to delete.
     */
    where: BountyWhereUniqueInput;
  };

  /**
   * Bounty deleteMany
   */
  export type BountyDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Bounties to delete
     */
    where?: BountyWhereInput;
  };

  /**
   * Bounty.founder
   */
  export type Bounty$founderArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    where?: MemberWhereInput;
  };

  /**
   * Bounty.project
   */
  export type Bounty$projectArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    where?: ProjectWhereInput;
  };

  /**
   * Bounty without action
   */
  export type BountyDefaultArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
  };

  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null;
    _avg: MemberAvgAggregateOutputType | null;
    _sum: MemberSumAggregateOutputType | null;
    _min: MemberMinAggregateOutputType | null;
    _max: MemberMaxAggregateOutputType | null;
  };

  export type MemberAvgAggregateOutputType = {
    level: number | null;
    bountiesWon: number | null;
    membersInvited: number | null;
  };

  export type MemberSumAggregateOutputType = {
    level: number | null;
    bountiesWon: number | null;
    membersInvited: number | null;
  };

  export type MemberMinAggregateOutputType = {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    walletAddress: string | null;
    email: string | null;
    bio: string | null;
    level: number | null;
    playingRole: $Enums.RoleType | null;
    bountiesWon: number | null;
    membersInvited: number | null;
    completedWelcome: boolean | null;
  };

  export type MemberMaxAggregateOutputType = {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    walletAddress: string | null;
    email: string | null;
    bio: string | null;
    level: number | null;
    playingRole: $Enums.RoleType | null;
    bountiesWon: number | null;
    membersInvited: number | null;
    completedWelcome: boolean | null;
  };

  export type MemberCountAggregateOutputType = {
    username: number;
    firstName: number;
    lastName: number;
    walletAddress: number;
    email: number;
    bio: number;
    level: number;
    roles: number;
    playingRole: number;
    bountiesWon: number;
    teamsJoined: number;
    membersInvited: number;
    completedWelcome: number;
    _all: number;
  };

  export type MemberAvgAggregateInputType = {
    level?: true;
    bountiesWon?: true;
    membersInvited?: true;
  };

  export type MemberSumAggregateInputType = {
    level?: true;
    bountiesWon?: true;
    membersInvited?: true;
  };

  export type MemberMinAggregateInputType = {
    username?: true;
    firstName?: true;
    lastName?: true;
    walletAddress?: true;
    email?: true;
    bio?: true;
    level?: true;
    playingRole?: true;
    bountiesWon?: true;
    membersInvited?: true;
    completedWelcome?: true;
  };

  export type MemberMaxAggregateInputType = {
    username?: true;
    firstName?: true;
    lastName?: true;
    walletAddress?: true;
    email?: true;
    bio?: true;
    level?: true;
    playingRole?: true;
    bountiesWon?: true;
    membersInvited?: true;
    completedWelcome?: true;
  };

  export type MemberCountAggregateInputType = {
    username?: true;
    firstName?: true;
    lastName?: true;
    walletAddress?: true;
    email?: true;
    bio?: true;
    level?: true;
    roles?: true;
    playingRole?: true;
    bountiesWon?: true;
    teamsJoined?: true;
    membersInvited?: true;
    completedWelcome?: true;
    _all?: true;
  };

  export type MemberAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Members from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Members.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Members
     **/
    _count?: true | MemberCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: MemberAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: MemberSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MemberMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MemberMaxAggregateInputType;
  };

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
    [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>;
  };

  export type MemberGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: MemberWhereInput;
    orderBy?:
      | MemberOrderByWithAggregationInput
      | MemberOrderByWithAggregationInput[];
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum;
    having?: MemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MemberCountAggregateInputType | true;
    _avg?: MemberAvgAggregateInputType;
    _sum?: MemberSumAggregateInputType;
    _min?: MemberMinAggregateInputType;
    _max?: MemberMaxAggregateInputType;
  };

  export type MemberGroupByOutputType = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level: number;
    roles: $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined: string[];
    membersInvited: number;
    completedWelcome: boolean;
    _count: MemberCountAggregateOutputType | null;
    _avg: MemberAvgAggregateOutputType | null;
    _sum: MemberSumAggregateOutputType | null;
    _min: MemberMinAggregateOutputType | null;
    _max: MemberMaxAggregateOutputType | null;
  };

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MemberGroupByOutputType, T['by']> & {
          [P in keyof T & keyof MemberGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>;
        }
      >
    >;

  export type MemberSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      username?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      walletAddress?: boolean;
      email?: boolean;
      bio?: boolean;
      level?: boolean;
      roles?: boolean;
      playingRole?: boolean;
      bountiesWon?: boolean;
      teamsJoined?: boolean;
      membersInvited?: boolean;
      completedWelcome?: boolean;
      teamInvites?: boolean | Member$teamInvitesArgs<ExtArgs>;
      bounties?: boolean | Member$bountiesArgs<ExtArgs>;
      createdTeams?: boolean | Member$createdTeamsArgs<ExtArgs>;
      teams?: boolean | Member$teamsArgs<ExtArgs>;
      Project?: boolean | Member$ProjectArgs<ExtArgs>;
      _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['member']
  >;

  export type MemberSelectScalar = {
    username?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    walletAddress?: boolean;
    email?: boolean;
    bio?: boolean;
    level?: boolean;
    roles?: boolean;
    playingRole?: boolean;
    bountiesWon?: boolean;
    teamsJoined?: boolean;
    membersInvited?: boolean;
    completedWelcome?: boolean;
  };

  export type MemberInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    teamInvites?: boolean | Member$teamInvitesArgs<ExtArgs>;
    bounties?: boolean | Member$bountiesArgs<ExtArgs>;
    createdTeams?: boolean | Member$createdTeamsArgs<ExtArgs>;
    teams?: boolean | Member$teamsArgs<ExtArgs>;
    Project?: boolean | Member$ProjectArgs<ExtArgs>;
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>;
  };

  export type $MemberPayload<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    name: 'Member';
    objects: {
      teamInvites: Prisma.$TeamInvitePayload<ExtArgs>[];
      bounties: Prisma.$BountyPayload<ExtArgs>[];
      createdTeams: Prisma.$TeamPayload<ExtArgs>[];
      teams: Prisma.$TeamPayload<ExtArgs>[];
      Project: Prisma.$ProjectPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetResult<
      {
        username: string;
        firstName: string;
        lastName: string;
        walletAddress: string;
        email: string;
        bio: string;
        level: number;
        roles: $Enums.RoleType[];
        playingRole: $Enums.RoleType;
        bountiesWon: number;
        teamsJoined: string[];
        membersInvited: number;
        completedWelcome: boolean;
      },
      ExtArgs['result']['member']
    >;
    composites: {};
  };

  type MemberGetPayload<
    S extends boolean | null | undefined | MemberDefaultArgs,
  > = $Result.GetResult<Prisma.$MemberPayload, S>;

  type MemberCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<MemberFindManyArgs, 'select' | 'include'> & {
    select?: MemberCountAggregateInputType | true;
  };

  export interface MemberDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Member'];
      meta: {name: 'Member'};
    };
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends MemberFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Member that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends MemberFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     *
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     *
     * // Only select the `username`
     * const memberWithUsernameOnly = await prisma.member.findMany({ select: { username: true } })
     *
     **/
    findMany<T extends MemberFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     *
     **/
    create<T extends MemberCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MemberCreateArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Members.
     *     @param {MemberCreateManyArgs} args - Arguments to create many Members.
     *     @example
     *     // Create many Members
     *     const member = await prisma.member.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends MemberCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     *
     **/
    delete<T extends MemberDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends MemberUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends MemberDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends MemberUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     **/
    upsert<T extends MemberUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
     **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MemberAggregateArgs>(
      args: Subset<T, MemberAggregateArgs>,
    ): Prisma.PrismaPromise<GetMemberAggregateType<T>>;

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? {orderBy: MemberGroupByArgs['orderBy']}
        : {orderBy?: MemberGroupByArgs['orderBy']},
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
    >(
      args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetMemberGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Member model
     */
    readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    teamInvites<T extends Member$teamInvitesArgs<ExtArgs> = {}>(
      args?: Subset<T, Member$teamInvitesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$TeamInvitePayload<ExtArgs>, T, 'findMany'>
      | Null
    >;

    bounties<T extends Member$bountiesArgs<ExtArgs> = {}>(
      args?: Subset<T, Member$bountiesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$BountyPayload<ExtArgs>, T, 'findMany'> | Null
    >;

    createdTeams<T extends Member$createdTeamsArgs<ExtArgs> = {}>(
      args?: Subset<T, Member$createdTeamsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'findMany'> | Null
    >;

    teams<T extends Member$teamsArgs<ExtArgs> = {}>(
      args?: Subset<T, Member$teamsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, 'findMany'> | Null
    >;

    Project<T extends Member$ProjectArgs<ExtArgs> = {}>(
      args?: Subset<T, Member$ProjectArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, 'findMany'> | Null
    >;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Member model
   */
  interface MemberFieldRefs {
    readonly username: FieldRef<'Member', 'String'>;
    readonly firstName: FieldRef<'Member', 'String'>;
    readonly lastName: FieldRef<'Member', 'String'>;
    readonly walletAddress: FieldRef<'Member', 'String'>;
    readonly email: FieldRef<'Member', 'String'>;
    readonly bio: FieldRef<'Member', 'String'>;
    readonly level: FieldRef<'Member', 'Int'>;
    readonly roles: FieldRef<'Member', 'RoleType[]'>;
    readonly playingRole: FieldRef<'Member', 'RoleType'>;
    readonly bountiesWon: FieldRef<'Member', 'Int'>;
    readonly teamsJoined: FieldRef<'Member', 'String[]'>;
    readonly membersInvited: FieldRef<'Member', 'Int'>;
    readonly completedWelcome: FieldRef<'Member', 'Boolean'>;
  }

  // Custom InputTypes

  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput;
  };

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput;
  };

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Members from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Members.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[];
  };

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Members from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Members.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[];
  };

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Members from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Members.
     */
    skip?: number;
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[];
  };

  /**
   * Member create
   */
  export type MemberCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>;
  };

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Member update
   */
  export type MemberUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>;
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput;
  };

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>;
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput;
  };

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput;
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>;
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>;
  };

  /**
   * Member delete
   */
  export type MemberDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput;
  };

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput;
  };

  /**
   * Member.teamInvites
   */
  export type Member$teamInvitesArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    where?: TeamInviteWhereInput;
    orderBy?:
      | TeamInviteOrderByWithRelationInput
      | TeamInviteOrderByWithRelationInput[];
    cursor?: TeamInviteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TeamInviteScalarFieldEnum | TeamInviteScalarFieldEnum[];
  };

  /**
   * Member.bounties
   */
  export type Member$bountiesArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Bounty
     */
    select?: BountySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BountyInclude<ExtArgs> | null;
    where?: BountyWhereInput;
    orderBy?: BountyOrderByWithRelationInput | BountyOrderByWithRelationInput[];
    cursor?: BountyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: BountyScalarFieldEnum | BountyScalarFieldEnum[];
  };

  /**
   * Member.createdTeams
   */
  export type Member$createdTeamsArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    where?: TeamWhereInput;
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[];
    cursor?: TeamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[];
  };

  /**
   * Member.teams
   */
  export type Member$teamsArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInclude<ExtArgs> | null;
    where?: TeamWhereInput;
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[];
    cursor?: TeamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[];
  };

  /**
   * Member.Project
   */
  export type Member$ProjectArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude<ExtArgs> | null;
    where?: ProjectWhereInput;
    orderBy?:
      | ProjectOrderByWithRelationInput
      | ProjectOrderByWithRelationInput[];
    cursor?: ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[];
  };

  /**
   * Member without action
   */
  export type MemberDefaultArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
  };

  /**
   * Model TeamInvite
   */

  export type AggregateTeamInvite = {
    _count: TeamInviteCountAggregateOutputType | null;
    _min: TeamInviteMinAggregateOutputType | null;
    _max: TeamInviteMaxAggregateOutputType | null;
  };

  export type TeamInviteMinAggregateOutputType = {
    id: string | null;
    fromAddress: string | null;
    fromName: string | null;
    toTeamId: string | null;
    toTeamName: string | null;
    memberAddress: string | null;
  };

  export type TeamInviteMaxAggregateOutputType = {
    id: string | null;
    fromAddress: string | null;
    fromName: string | null;
    toTeamId: string | null;
    toTeamName: string | null;
    memberAddress: string | null;
  };

  export type TeamInviteCountAggregateOutputType = {
    id: number;
    fromAddress: number;
    fromName: number;
    toTeamId: number;
    toTeamName: number;
    memberAddress: number;
    _all: number;
  };

  export type TeamInviteMinAggregateInputType = {
    id?: true;
    fromAddress?: true;
    fromName?: true;
    toTeamId?: true;
    toTeamName?: true;
    memberAddress?: true;
  };

  export type TeamInviteMaxAggregateInputType = {
    id?: true;
    fromAddress?: true;
    fromName?: true;
    toTeamId?: true;
    toTeamName?: true;
    memberAddress?: true;
  };

  export type TeamInviteCountAggregateInputType = {
    id?: true;
    fromAddress?: true;
    fromName?: true;
    toTeamId?: true;
    toTeamName?: true;
    memberAddress?: true;
    _all?: true;
  };

  export type TeamInviteAggregateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which TeamInvite to aggregate.
     */
    where?: TeamInviteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TeamInvites to fetch.
     */
    orderBy?:
      | TeamInviteOrderByWithRelationInput
      | TeamInviteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TeamInviteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TeamInvites from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TeamInvites.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned TeamInvites
     **/
    _count?: true | TeamInviteCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TeamInviteMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TeamInviteMaxAggregateInputType;
  };

  export type GetTeamInviteAggregateType<T extends TeamInviteAggregateArgs> = {
    [P in keyof T & keyof AggregateTeamInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamInvite[P]>
      : GetScalarType<T[P], AggregateTeamInvite[P]>;
  };

  export type TeamInviteGroupByArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: TeamInviteWhereInput;
    orderBy?:
      | TeamInviteOrderByWithAggregationInput
      | TeamInviteOrderByWithAggregationInput[];
    by: TeamInviteScalarFieldEnum[] | TeamInviteScalarFieldEnum;
    having?: TeamInviteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TeamInviteCountAggregateInputType | true;
    _min?: TeamInviteMinAggregateInputType;
    _max?: TeamInviteMaxAggregateInputType;
  };

  export type TeamInviteGroupByOutputType = {
    id: string;
    fromAddress: string;
    fromName: string;
    toTeamId: string;
    toTeamName: string;
    memberAddress: string | null;
    _count: TeamInviteCountAggregateOutputType | null;
    _min: TeamInviteMinAggregateOutputType | null;
    _max: TeamInviteMaxAggregateOutputType | null;
  };

  type GetTeamInviteGroupByPayload<T extends TeamInviteGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<TeamInviteGroupByOutputType, T['by']> & {
          [P in keyof T & keyof TeamInviteGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamInviteGroupByOutputType[P]>
            : GetScalarType<T[P], TeamInviteGroupByOutputType[P]>;
        }
      >
    >;

  export type TeamInviteSelect<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      fromAddress?: boolean;
      fromName?: boolean;
      toTeamId?: boolean;
      toTeamName?: boolean;
      memberAddress?: boolean;
      member?: boolean | TeamInvite$memberArgs<ExtArgs>;
    },
    ExtArgs['result']['teamInvite']
  >;

  export type TeamInviteSelectScalar = {
    id?: boolean;
    fromAddress?: boolean;
    fromName?: boolean;
    toTeamId?: boolean;
    toTeamName?: boolean;
    memberAddress?: boolean;
  };

  export type TeamInviteInclude<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    member?: boolean | TeamInvite$memberArgs<ExtArgs>;
  };

  export type $TeamInvitePayload<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    name: 'TeamInvite';
    objects: {
      member: Prisma.$MemberPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetResult<
      {
        id: string;
        fromAddress: string;
        fromName: string;
        toTeamId: string;
        toTeamName: string;
        memberAddress: string | null;
      },
      ExtArgs['result']['teamInvite']
    >;
    composites: {};
  };

  type TeamInviteGetPayload<
    S extends boolean | null | undefined | TeamInviteDefaultArgs,
  > = $Result.GetResult<Prisma.$TeamInvitePayload, S>;

  type TeamInviteCountArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = Omit<TeamInviteFindManyArgs, 'select' | 'include'> & {
    select?: TeamInviteCountAggregateInputType | true;
  };

  export interface TeamInviteDelegate<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['TeamInvite'];
      meta: {name: 'TeamInvite'};
    };
    /**
     * Find zero or one TeamInvite that matches the filter.
     * @param {TeamInviteFindUniqueArgs} args - Arguments to find a TeamInvite
     * @example
     * // Get one TeamInvite
     * const teamInvite = await prisma.teamInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends TeamInviteFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TeamInviteFindUniqueArgs<ExtArgs>>,
    ): Prisma__TeamInviteClient<
      $Result.GetResult<
        Prisma.$TeamInvitePayload<ExtArgs>,
        T,
        'findUnique'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find one TeamInvite that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {TeamInviteFindUniqueOrThrowArgs} args - Arguments to find a TeamInvite
     * @example
     * // Get one TeamInvite
     * const teamInvite = await prisma.teamInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends TeamInviteFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamInviteFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__TeamInviteClient<
      $Result.GetResult<
        Prisma.$TeamInvitePayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find the first TeamInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamInviteFindFirstArgs} args - Arguments to find a TeamInvite
     * @example
     * // Get one TeamInvite
     * const teamInvite = await prisma.teamInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends TeamInviteFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamInviteFindFirstArgs<ExtArgs>>,
    ): Prisma__TeamInviteClient<
      $Result.GetResult<
        Prisma.$TeamInvitePayload<ExtArgs>,
        T,
        'findFirst'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first TeamInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamInviteFindFirstOrThrowArgs} args - Arguments to find a TeamInvite
     * @example
     * // Get one TeamInvite
     * const teamInvite = await prisma.teamInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends TeamInviteFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamInviteFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__TeamInviteClient<
      $Result.GetResult<
        Prisma.$TeamInvitePayload<ExtArgs>,
        T,
        'findFirstOrThrow'
      >,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more TeamInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamInviteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamInvites
     * const teamInvites = await prisma.teamInvite.findMany()
     *
     * // Get first 10 TeamInvites
     * const teamInvites = await prisma.teamInvite.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const teamInviteWithIdOnly = await prisma.teamInvite.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends TeamInviteFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamInviteFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$TeamInvitePayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a TeamInvite.
     * @param {TeamInviteCreateArgs} args - Arguments to create a TeamInvite.
     * @example
     * // Create one TeamInvite
     * const TeamInvite = await prisma.teamInvite.create({
     *   data: {
     *     // ... data to create a TeamInvite
     *   }
     * })
     *
     **/
    create<T extends TeamInviteCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TeamInviteCreateArgs<ExtArgs>>,
    ): Prisma__TeamInviteClient<
      $Result.GetResult<Prisma.$TeamInvitePayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many TeamInvites.
     *     @param {TeamInviteCreateManyArgs} args - Arguments to create many TeamInvites.
     *     @example
     *     // Create many TeamInvites
     *     const teamInvite = await prisma.teamInvite.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends TeamInviteCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamInviteCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a TeamInvite.
     * @param {TeamInviteDeleteArgs} args - Arguments to delete one TeamInvite.
     * @example
     * // Delete one TeamInvite
     * const TeamInvite = await prisma.teamInvite.delete({
     *   where: {
     *     // ... filter to delete one TeamInvite
     *   }
     * })
     *
     **/
    delete<T extends TeamInviteDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TeamInviteDeleteArgs<ExtArgs>>,
    ): Prisma__TeamInviteClient<
      $Result.GetResult<Prisma.$TeamInvitePayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one TeamInvite.
     * @param {TeamInviteUpdateArgs} args - Arguments to update one TeamInvite.
     * @example
     * // Update one TeamInvite
     * const teamInvite = await prisma.teamInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends TeamInviteUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TeamInviteUpdateArgs<ExtArgs>>,
    ): Prisma__TeamInviteClient<
      $Result.GetResult<Prisma.$TeamInvitePayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more TeamInvites.
     * @param {TeamInviteDeleteManyArgs} args - Arguments to filter TeamInvites to delete.
     * @example
     * // Delete a few TeamInvites
     * const { count } = await prisma.teamInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends TeamInviteDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamInviteDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more TeamInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamInvites
     * const teamInvite = await prisma.teamInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends TeamInviteUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TeamInviteUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one TeamInvite.
     * @param {TeamInviteUpsertArgs} args - Arguments to update or create a TeamInvite.
     * @example
     * // Update or create a TeamInvite
     * const teamInvite = await prisma.teamInvite.upsert({
     *   create: {
     *     // ... data to create a TeamInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamInvite we want to update
     *   }
     * })
     **/
    upsert<T extends TeamInviteUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TeamInviteUpsertArgs<ExtArgs>>,
    ): Prisma__TeamInviteClient<
      $Result.GetResult<Prisma.$TeamInvitePayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of TeamInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamInviteCountArgs} args - Arguments to filter TeamInvites to count.
     * @example
     * // Count the number of TeamInvites
     * const count = await prisma.teamInvite.count({
     *   where: {
     *     // ... the filter for the TeamInvites we want to count
     *   }
     * })
     **/
    count<T extends TeamInviteCountArgs>(
      args?: Subset<T, TeamInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamInviteCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a TeamInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TeamInviteAggregateArgs>(
      args: Subset<T, TeamInviteAggregateArgs>,
    ): Prisma.PrismaPromise<GetTeamInviteAggregateType<T>>;

    /**
     * Group by TeamInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TeamInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? {orderBy: TeamInviteGroupByArgs['orderBy']}
        : {orderBy?: TeamInviteGroupByArgs['orderBy']},
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
    >(
      args: SubsetIntersection<T, TeamInviteGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetTeamInviteGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the TeamInvite model
     */
    readonly fields: TeamInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamInviteClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    member<T extends TeamInvite$memberArgs<ExtArgs> = {}>(
      args?: Subset<T, TeamInvite$memberArgs<ExtArgs>>,
    ): Prisma__MemberClient<
      $Result.GetResult<
        Prisma.$MemberPayload<ExtArgs>,
        T,
        'findUniqueOrThrow'
      > | null,
      null,
      ExtArgs
    >;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the TeamInvite model
   */
  interface TeamInviteFieldRefs {
    readonly id: FieldRef<'TeamInvite', 'String'>;
    readonly fromAddress: FieldRef<'TeamInvite', 'String'>;
    readonly fromName: FieldRef<'TeamInvite', 'String'>;
    readonly toTeamId: FieldRef<'TeamInvite', 'String'>;
    readonly toTeamName: FieldRef<'TeamInvite', 'String'>;
    readonly memberAddress: FieldRef<'TeamInvite', 'String'>;
  }

  // Custom InputTypes

  /**
   * TeamInvite findUnique
   */
  export type TeamInviteFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * Filter, which TeamInvite to fetch.
     */
    where: TeamInviteWhereUniqueInput;
  };

  /**
   * TeamInvite findUniqueOrThrow
   */
  export type TeamInviteFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * Filter, which TeamInvite to fetch.
     */
    where: TeamInviteWhereUniqueInput;
  };

  /**
   * TeamInvite findFirst
   */
  export type TeamInviteFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * Filter, which TeamInvite to fetch.
     */
    where?: TeamInviteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TeamInvites to fetch.
     */
    orderBy?:
      | TeamInviteOrderByWithRelationInput
      | TeamInviteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for TeamInvites.
     */
    cursor?: TeamInviteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TeamInvites from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TeamInvites.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TeamInvites.
     */
    distinct?: TeamInviteScalarFieldEnum | TeamInviteScalarFieldEnum[];
  };

  /**
   * TeamInvite findFirstOrThrow
   */
  export type TeamInviteFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * Filter, which TeamInvite to fetch.
     */
    where?: TeamInviteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TeamInvites to fetch.
     */
    orderBy?:
      | TeamInviteOrderByWithRelationInput
      | TeamInviteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for TeamInvites.
     */
    cursor?: TeamInviteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TeamInvites from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TeamInvites.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TeamInvites.
     */
    distinct?: TeamInviteScalarFieldEnum | TeamInviteScalarFieldEnum[];
  };

  /**
   * TeamInvite findMany
   */
  export type TeamInviteFindManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * Filter, which TeamInvites to fetch.
     */
    where?: TeamInviteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TeamInvites to fetch.
     */
    orderBy?:
      | TeamInviteOrderByWithRelationInput
      | TeamInviteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing TeamInvites.
     */
    cursor?: TeamInviteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TeamInvites from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TeamInvites.
     */
    skip?: number;
    distinct?: TeamInviteScalarFieldEnum | TeamInviteScalarFieldEnum[];
  };

  /**
   * TeamInvite create
   */
  export type TeamInviteCreateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * The data needed to create a TeamInvite.
     */
    data: XOR<TeamInviteCreateInput, TeamInviteUncheckedCreateInput>;
  };

  /**
   * TeamInvite createMany
   */
  export type TeamInviteCreateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many TeamInvites.
     */
    data: TeamInviteCreateManyInput | TeamInviteCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * TeamInvite update
   */
  export type TeamInviteUpdateArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * The data needed to update a TeamInvite.
     */
    data: XOR<TeamInviteUpdateInput, TeamInviteUncheckedUpdateInput>;
    /**
     * Choose, which TeamInvite to update.
     */
    where: TeamInviteWhereUniqueInput;
  };

  /**
   * TeamInvite updateMany
   */
  export type TeamInviteUpdateManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update TeamInvites.
     */
    data: XOR<
      TeamInviteUpdateManyMutationInput,
      TeamInviteUncheckedUpdateManyInput
    >;
    /**
     * Filter which TeamInvites to update
     */
    where?: TeamInviteWhereInput;
  };

  /**
   * TeamInvite upsert
   */
  export type TeamInviteUpsertArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * The filter to search for the TeamInvite to update in case it exists.
     */
    where: TeamInviteWhereUniqueInput;
    /**
     * In case the TeamInvite found by the `where` argument doesn't exist, create a new TeamInvite with this data.
     */
    create: XOR<TeamInviteCreateInput, TeamInviteUncheckedCreateInput>;
    /**
     * In case the TeamInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamInviteUpdateInput, TeamInviteUncheckedUpdateInput>;
  };

  /**
   * TeamInvite delete
   */
  export type TeamInviteDeleteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
    /**
     * Filter which TeamInvite to delete.
     */
    where: TeamInviteWhereUniqueInput;
  };

  /**
   * TeamInvite deleteMany
   */
  export type TeamInviteDeleteManyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which TeamInvites to delete
     */
    where?: TeamInviteWhereInput;
  };

  /**
   * TeamInvite.member
   */
  export type TeamInvite$memberArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null;
    where?: MemberWhereInput;
  };

  /**
   * TeamInvite without action
   */
  export type TeamInviteDefaultArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TeamInvite
     */
    select?: TeamInviteSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamInviteInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const TeamScalarFieldEnum: {
    id: 'id';
    name: 'name';
    description: 'description';
    link: 'link';
    creatorAddress: 'creatorAddress';
  };

  export type TeamScalarFieldEnum =
    (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum];

  export const ProjectScalarFieldEnum: {
    id: 'id';
    title: 'title';
    description: 'description';
    email: 'email';
    phone: 'phone';
    bountyIDs: 'bountyIDs';
    quotePrice: 'quotePrice';
    stage: 'stage';
    memberWalletAddress: 'memberWalletAddress';
  };

  export type ProjectScalarFieldEnum =
    (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];

  export const BountyScalarFieldEnum: {
    id: 'id';
    title: 'title';
    description: 'description';
    postDate: 'postDate';
    types: 'types';
    deadline: 'deadline';
    participantsTeamIDs: 'participantsTeamIDs';
    testCases: 'testCases';
    stage: 'stage';
    submissions: 'submissions';
    aboutProject: 'aboutProject';
    headerSections: 'headerSections';
    approvedByFounder: 'approvedByFounder';
    approvedByManager: 'approvedByManager';
    approvedByValidator: 'approvedByValidator';
    reward: 'reward';
    founderAddress: 'founderAddress';
    projectId: 'projectId';
  };

  export type BountyScalarFieldEnum =
    (typeof BountyScalarFieldEnum)[keyof typeof BountyScalarFieldEnum];

  export const MemberScalarFieldEnum: {
    username: 'username';
    firstName: 'firstName';
    lastName: 'lastName';
    walletAddress: 'walletAddress';
    email: 'email';
    bio: 'bio';
    level: 'level';
    roles: 'roles';
    playingRole: 'playingRole';
    bountiesWon: 'bountiesWon';
    teamsJoined: 'teamsJoined';
    membersInvited: 'membersInvited';
    completedWelcome: 'completedWelcome';
  };

  export type MemberScalarFieldEnum =
    (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum];

  export const TeamInviteScalarFieldEnum: {
    id: 'id';
    fromAddress: 'fromAddress';
    fromName: 'fromName';
    toTeamId: 'toTeamId';
    toTeamName: 'toTeamName';
    memberAddress: 'memberAddress';
  };

  export type TeamInviteScalarFieldEnum =
    (typeof TeamInviteScalarFieldEnum)[keyof typeof TeamInviteScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'ProjectStage'
   */
  export type EnumProjectStageFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ProjectStage'
  >;

  /**
   * Reference to a field of type 'ProjectStage[]'
   */
  export type ListEnumProjectStageFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'ProjectStage[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'BountyType[]'
   */
  export type ListEnumBountyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'BountyType[]'
  >;

  /**
   * Reference to a field of type 'BountyType'
   */
  export type EnumBountyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'BountyType'
  >;

  /**
   * Reference to a field of type 'BountyStage'
   */
  export type EnumBountyStageFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'BountyStage'
  >;

  /**
   * Reference to a field of type 'BountyStage[]'
   */
  export type ListEnumBountyStageFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'BountyStage[]'>;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Json'
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Boolean'
  >;

  /**
   * Reference to a field of type 'RoleType[]'
   */
  export type ListEnumRoleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RoleType[]'
  >;

  /**
   * Reference to a field of type 'RoleType'
   */
  export type EnumRoleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RoleType'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[];
    OR?: TeamWhereInput[];
    NOT?: TeamWhereInput | TeamWhereInput[];
    id?: StringFilter<'Team'> | string;
    name?: StringFilter<'Team'> | string;
    description?: StringFilter<'Team'> | string;
    link?: StringFilter<'Team'> | string;
    creatorAddress?: StringFilter<'Team'> | string;
    members?: MemberListRelationFilter;
    creator?: XOR<MemberRelationFilter, MemberWhereInput>;
  };

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    link?: SortOrder;
    creatorAddress?: SortOrder;
    members?: MemberOrderByRelationAggregateInput;
    creator?: MemberOrderByWithRelationInput;
  };

  export type TeamWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: TeamWhereInput | TeamWhereInput[];
      OR?: TeamWhereInput[];
      NOT?: TeamWhereInput | TeamWhereInput[];
      name?: StringFilter<'Team'> | string;
      description?: StringFilter<'Team'> | string;
      link?: StringFilter<'Team'> | string;
      creatorAddress?: StringFilter<'Team'> | string;
      members?: MemberListRelationFilter;
      creator?: XOR<MemberRelationFilter, MemberWhereInput>;
    },
    'id'
  >;

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    link?: SortOrder;
    creatorAddress?: SortOrder;
    _count?: TeamCountOrderByAggregateInput;
    _max?: TeamMaxOrderByAggregateInput;
    _min?: TeamMinOrderByAggregateInput;
  };

  export type TeamScalarWhereWithAggregatesInput = {
    AND?:
      | TeamScalarWhereWithAggregatesInput
      | TeamScalarWhereWithAggregatesInput[];
    OR?: TeamScalarWhereWithAggregatesInput[];
    NOT?:
      | TeamScalarWhereWithAggregatesInput
      | TeamScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Team'> | string;
    name?: StringWithAggregatesFilter<'Team'> | string;
    description?: StringWithAggregatesFilter<'Team'> | string;
    link?: StringWithAggregatesFilter<'Team'> | string;
    creatorAddress?: StringWithAggregatesFilter<'Team'> | string;
  };

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[];
    OR?: ProjectWhereInput[];
    NOT?: ProjectWhereInput | ProjectWhereInput[];
    id?: StringFilter<'Project'> | string;
    title?: StringFilter<'Project'> | string;
    description?: StringFilter<'Project'> | string;
    email?: StringFilter<'Project'> | string;
    phone?: StringFilter<'Project'> | string;
    bountyIDs?: StringNullableListFilter<'Project'>;
    quotePrice?: IntFilter<'Project'> | number;
    stage?: EnumProjectStageFilter<'Project'> | $Enums.ProjectStage;
    memberWalletAddress?: StringFilter<'Project'> | string;
    bounties?: BountyListRelationFilter;
    founder?: XOR<MemberRelationFilter, MemberWhereInput>;
  };

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    bountyIDs?: SortOrder;
    quotePrice?: SortOrder;
    stage?: SortOrder;
    memberWalletAddress?: SortOrder;
    bounties?: BountyOrderByRelationAggregateInput;
    founder?: MemberOrderByWithRelationInput;
  };

  export type ProjectWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ProjectWhereInput | ProjectWhereInput[];
      OR?: ProjectWhereInput[];
      NOT?: ProjectWhereInput | ProjectWhereInput[];
      title?: StringFilter<'Project'> | string;
      description?: StringFilter<'Project'> | string;
      email?: StringFilter<'Project'> | string;
      phone?: StringFilter<'Project'> | string;
      bountyIDs?: StringNullableListFilter<'Project'>;
      quotePrice?: IntFilter<'Project'> | number;
      stage?: EnumProjectStageFilter<'Project'> | $Enums.ProjectStage;
      memberWalletAddress?: StringFilter<'Project'> | string;
      bounties?: BountyListRelationFilter;
      founder?: XOR<MemberRelationFilter, MemberWhereInput>;
    },
    'id'
  >;

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    bountyIDs?: SortOrder;
    quotePrice?: SortOrder;
    stage?: SortOrder;
    memberWalletAddress?: SortOrder;
    _count?: ProjectCountOrderByAggregateInput;
    _avg?: ProjectAvgOrderByAggregateInput;
    _max?: ProjectMaxOrderByAggregateInput;
    _min?: ProjectMinOrderByAggregateInput;
    _sum?: ProjectSumOrderByAggregateInput;
  };

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?:
      | ProjectScalarWhereWithAggregatesInput
      | ProjectScalarWhereWithAggregatesInput[];
    OR?: ProjectScalarWhereWithAggregatesInput[];
    NOT?:
      | ProjectScalarWhereWithAggregatesInput
      | ProjectScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Project'> | string;
    title?: StringWithAggregatesFilter<'Project'> | string;
    description?: StringWithAggregatesFilter<'Project'> | string;
    email?: StringWithAggregatesFilter<'Project'> | string;
    phone?: StringWithAggregatesFilter<'Project'> | string;
    bountyIDs?: StringNullableListFilter<'Project'>;
    quotePrice?: IntWithAggregatesFilter<'Project'> | number;
    stage?:
      | EnumProjectStageWithAggregatesFilter<'Project'>
      | $Enums.ProjectStage;
    memberWalletAddress?: StringWithAggregatesFilter<'Project'> | string;
  };

  export type BountyWhereInput = {
    AND?: BountyWhereInput | BountyWhereInput[];
    OR?: BountyWhereInput[];
    NOT?: BountyWhereInput | BountyWhereInput[];
    id?: StringFilter<'Bounty'> | string;
    title?: StringFilter<'Bounty'> | string;
    description?: StringFilter<'Bounty'> | string;
    postDate?: DateTimeFilter<'Bounty'> | Date | string;
    types?: EnumBountyTypeNullableListFilter<'Bounty'>;
    deadline?: DateTimeFilter<'Bounty'> | Date | string;
    participantsTeamIDs?: StringNullableListFilter<'Bounty'>;
    testCases?: StringNullableListFilter<'Bounty'>;
    stage?: EnumBountyStageFilter<'Bounty'> | $Enums.BountyStage;
    submissions?: StringNullableListFilter<'Bounty'>;
    aboutProject?: StringNullableFilter<'Bounty'> | string | null;
    headerSections?: JsonNullableFilter<'Bounty'>;
    approvedByFounder?: BoolFilter<'Bounty'> | boolean;
    approvedByManager?: BoolFilter<'Bounty'> | boolean;
    approvedByValidator?: BoolFilter<'Bounty'> | boolean;
    reward?: IntFilter<'Bounty'> | number;
    founderAddress?: StringNullableFilter<'Bounty'> | string | null;
    projectId?: StringNullableFilter<'Bounty'> | string | null;
    founder?: XOR<MemberNullableRelationFilter, MemberWhereInput> | null;
    project?: XOR<ProjectNullableRelationFilter, ProjectWhereInput> | null;
  };

  export type BountyOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    postDate?: SortOrder;
    types?: SortOrder;
    deadline?: SortOrder;
    participantsTeamIDs?: SortOrder;
    testCases?: SortOrder;
    stage?: SortOrder;
    submissions?: SortOrder;
    aboutProject?: SortOrderInput | SortOrder;
    headerSections?: SortOrderInput | SortOrder;
    approvedByFounder?: SortOrder;
    approvedByManager?: SortOrder;
    approvedByValidator?: SortOrder;
    reward?: SortOrder;
    founderAddress?: SortOrderInput | SortOrder;
    projectId?: SortOrderInput | SortOrder;
    founder?: MemberOrderByWithRelationInput;
    project?: ProjectOrderByWithRelationInput;
  };

  export type BountyWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: BountyWhereInput | BountyWhereInput[];
      OR?: BountyWhereInput[];
      NOT?: BountyWhereInput | BountyWhereInput[];
      title?: StringFilter<'Bounty'> | string;
      description?: StringFilter<'Bounty'> | string;
      postDate?: DateTimeFilter<'Bounty'> | Date | string;
      types?: EnumBountyTypeNullableListFilter<'Bounty'>;
      deadline?: DateTimeFilter<'Bounty'> | Date | string;
      participantsTeamIDs?: StringNullableListFilter<'Bounty'>;
      testCases?: StringNullableListFilter<'Bounty'>;
      stage?: EnumBountyStageFilter<'Bounty'> | $Enums.BountyStage;
      submissions?: StringNullableListFilter<'Bounty'>;
      aboutProject?: StringNullableFilter<'Bounty'> | string | null;
      headerSections?: JsonNullableFilter<'Bounty'>;
      approvedByFounder?: BoolFilter<'Bounty'> | boolean;
      approvedByManager?: BoolFilter<'Bounty'> | boolean;
      approvedByValidator?: BoolFilter<'Bounty'> | boolean;
      reward?: IntFilter<'Bounty'> | number;
      founderAddress?: StringNullableFilter<'Bounty'> | string | null;
      projectId?: StringNullableFilter<'Bounty'> | string | null;
      founder?: XOR<MemberNullableRelationFilter, MemberWhereInput> | null;
      project?: XOR<ProjectNullableRelationFilter, ProjectWhereInput> | null;
    },
    'id'
  >;

  export type BountyOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    postDate?: SortOrder;
    types?: SortOrder;
    deadline?: SortOrder;
    participantsTeamIDs?: SortOrder;
    testCases?: SortOrder;
    stage?: SortOrder;
    submissions?: SortOrder;
    aboutProject?: SortOrderInput | SortOrder;
    headerSections?: SortOrderInput | SortOrder;
    approvedByFounder?: SortOrder;
    approvedByManager?: SortOrder;
    approvedByValidator?: SortOrder;
    reward?: SortOrder;
    founderAddress?: SortOrderInput | SortOrder;
    projectId?: SortOrderInput | SortOrder;
    _count?: BountyCountOrderByAggregateInput;
    _avg?: BountyAvgOrderByAggregateInput;
    _max?: BountyMaxOrderByAggregateInput;
    _min?: BountyMinOrderByAggregateInput;
    _sum?: BountySumOrderByAggregateInput;
  };

  export type BountyScalarWhereWithAggregatesInput = {
    AND?:
      | BountyScalarWhereWithAggregatesInput
      | BountyScalarWhereWithAggregatesInput[];
    OR?: BountyScalarWhereWithAggregatesInput[];
    NOT?:
      | BountyScalarWhereWithAggregatesInput
      | BountyScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Bounty'> | string;
    title?: StringWithAggregatesFilter<'Bounty'> | string;
    description?: StringWithAggregatesFilter<'Bounty'> | string;
    postDate?: DateTimeWithAggregatesFilter<'Bounty'> | Date | string;
    types?: EnumBountyTypeNullableListFilter<'Bounty'>;
    deadline?: DateTimeWithAggregatesFilter<'Bounty'> | Date | string;
    participantsTeamIDs?: StringNullableListFilter<'Bounty'>;
    testCases?: StringNullableListFilter<'Bounty'>;
    stage?: EnumBountyStageWithAggregatesFilter<'Bounty'> | $Enums.BountyStage;
    submissions?: StringNullableListFilter<'Bounty'>;
    aboutProject?: StringNullableWithAggregatesFilter<'Bounty'> | string | null;
    headerSections?: JsonNullableWithAggregatesFilter<'Bounty'>;
    approvedByFounder?: BoolWithAggregatesFilter<'Bounty'> | boolean;
    approvedByManager?: BoolWithAggregatesFilter<'Bounty'> | boolean;
    approvedByValidator?: BoolWithAggregatesFilter<'Bounty'> | boolean;
    reward?: IntWithAggregatesFilter<'Bounty'> | number;
    founderAddress?:
      | StringNullableWithAggregatesFilter<'Bounty'>
      | string
      | null;
    projectId?: StringNullableWithAggregatesFilter<'Bounty'> | string | null;
  };

  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[];
    OR?: MemberWhereInput[];
    NOT?: MemberWhereInput | MemberWhereInput[];
    username?: StringFilter<'Member'> | string;
    firstName?: StringFilter<'Member'> | string;
    lastName?: StringFilter<'Member'> | string;
    walletAddress?: StringFilter<'Member'> | string;
    email?: StringFilter<'Member'> | string;
    bio?: StringFilter<'Member'> | string;
    level?: IntFilter<'Member'> | number;
    roles?: EnumRoleTypeNullableListFilter<'Member'>;
    playingRole?: EnumRoleTypeFilter<'Member'> | $Enums.RoleType;
    bountiesWon?: IntFilter<'Member'> | number;
    teamsJoined?: StringNullableListFilter<'Member'>;
    membersInvited?: IntFilter<'Member'> | number;
    completedWelcome?: BoolFilter<'Member'> | boolean;
    teamInvites?: TeamInviteListRelationFilter;
    bounties?: BountyListRelationFilter;
    createdTeams?: TeamListRelationFilter;
    teams?: TeamListRelationFilter;
    Project?: ProjectListRelationFilter;
  };

  export type MemberOrderByWithRelationInput = {
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    walletAddress?: SortOrder;
    email?: SortOrder;
    bio?: SortOrder;
    level?: SortOrder;
    roles?: SortOrder;
    playingRole?: SortOrder;
    bountiesWon?: SortOrder;
    teamsJoined?: SortOrder;
    membersInvited?: SortOrder;
    completedWelcome?: SortOrder;
    teamInvites?: TeamInviteOrderByRelationAggregateInput;
    bounties?: BountyOrderByRelationAggregateInput;
    createdTeams?: TeamOrderByRelationAggregateInput;
    teams?: TeamOrderByRelationAggregateInput;
    Project?: ProjectOrderByRelationAggregateInput;
  };

  export type MemberWhereUniqueInput = Prisma.AtLeast<
    {
      walletAddress?: string;
      AND?: MemberWhereInput | MemberWhereInput[];
      OR?: MemberWhereInput[];
      NOT?: MemberWhereInput | MemberWhereInput[];
      username?: StringFilter<'Member'> | string;
      firstName?: StringFilter<'Member'> | string;
      lastName?: StringFilter<'Member'> | string;
      email?: StringFilter<'Member'> | string;
      bio?: StringFilter<'Member'> | string;
      level?: IntFilter<'Member'> | number;
      roles?: EnumRoleTypeNullableListFilter<'Member'>;
      playingRole?: EnumRoleTypeFilter<'Member'> | $Enums.RoleType;
      bountiesWon?: IntFilter<'Member'> | number;
      teamsJoined?: StringNullableListFilter<'Member'>;
      membersInvited?: IntFilter<'Member'> | number;
      completedWelcome?: BoolFilter<'Member'> | boolean;
      teamInvites?: TeamInviteListRelationFilter;
      bounties?: BountyListRelationFilter;
      createdTeams?: TeamListRelationFilter;
      teams?: TeamListRelationFilter;
      Project?: ProjectListRelationFilter;
    },
    'walletAddress' | 'walletAddress'
  >;

  export type MemberOrderByWithAggregationInput = {
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    walletAddress?: SortOrder;
    email?: SortOrder;
    bio?: SortOrder;
    level?: SortOrder;
    roles?: SortOrder;
    playingRole?: SortOrder;
    bountiesWon?: SortOrder;
    teamsJoined?: SortOrder;
    membersInvited?: SortOrder;
    completedWelcome?: SortOrder;
    _count?: MemberCountOrderByAggregateInput;
    _avg?: MemberAvgOrderByAggregateInput;
    _max?: MemberMaxOrderByAggregateInput;
    _min?: MemberMinOrderByAggregateInput;
    _sum?: MemberSumOrderByAggregateInput;
  };

  export type MemberScalarWhereWithAggregatesInput = {
    AND?:
      | MemberScalarWhereWithAggregatesInput
      | MemberScalarWhereWithAggregatesInput[];
    OR?: MemberScalarWhereWithAggregatesInput[];
    NOT?:
      | MemberScalarWhereWithAggregatesInput
      | MemberScalarWhereWithAggregatesInput[];
    username?: StringWithAggregatesFilter<'Member'> | string;
    firstName?: StringWithAggregatesFilter<'Member'> | string;
    lastName?: StringWithAggregatesFilter<'Member'> | string;
    walletAddress?: StringWithAggregatesFilter<'Member'> | string;
    email?: StringWithAggregatesFilter<'Member'> | string;
    bio?: StringWithAggregatesFilter<'Member'> | string;
    level?: IntWithAggregatesFilter<'Member'> | number;
    roles?: EnumRoleTypeNullableListFilter<'Member'>;
    playingRole?: EnumRoleTypeWithAggregatesFilter<'Member'> | $Enums.RoleType;
    bountiesWon?: IntWithAggregatesFilter<'Member'> | number;
    teamsJoined?: StringNullableListFilter<'Member'>;
    membersInvited?: IntWithAggregatesFilter<'Member'> | number;
    completedWelcome?: BoolWithAggregatesFilter<'Member'> | boolean;
  };

  export type TeamInviteWhereInput = {
    AND?: TeamInviteWhereInput | TeamInviteWhereInput[];
    OR?: TeamInviteWhereInput[];
    NOT?: TeamInviteWhereInput | TeamInviteWhereInput[];
    id?: StringFilter<'TeamInvite'> | string;
    fromAddress?: StringFilter<'TeamInvite'> | string;
    fromName?: StringFilter<'TeamInvite'> | string;
    toTeamId?: StringFilter<'TeamInvite'> | string;
    toTeamName?: StringFilter<'TeamInvite'> | string;
    memberAddress?: StringNullableFilter<'TeamInvite'> | string | null;
    member?: XOR<MemberNullableRelationFilter, MemberWhereInput> | null;
  };

  export type TeamInviteOrderByWithRelationInput = {
    id?: SortOrder;
    fromAddress?: SortOrder;
    fromName?: SortOrder;
    toTeamId?: SortOrder;
    toTeamName?: SortOrder;
    memberAddress?: SortOrderInput | SortOrder;
    member?: MemberOrderByWithRelationInput;
  };

  export type TeamInviteWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: TeamInviteWhereInput | TeamInviteWhereInput[];
      OR?: TeamInviteWhereInput[];
      NOT?: TeamInviteWhereInput | TeamInviteWhereInput[];
      fromAddress?: StringFilter<'TeamInvite'> | string;
      fromName?: StringFilter<'TeamInvite'> | string;
      toTeamId?: StringFilter<'TeamInvite'> | string;
      toTeamName?: StringFilter<'TeamInvite'> | string;
      memberAddress?: StringNullableFilter<'TeamInvite'> | string | null;
      member?: XOR<MemberNullableRelationFilter, MemberWhereInput> | null;
    },
    'id'
  >;

  export type TeamInviteOrderByWithAggregationInput = {
    id?: SortOrder;
    fromAddress?: SortOrder;
    fromName?: SortOrder;
    toTeamId?: SortOrder;
    toTeamName?: SortOrder;
    memberAddress?: SortOrderInput | SortOrder;
    _count?: TeamInviteCountOrderByAggregateInput;
    _max?: TeamInviteMaxOrderByAggregateInput;
    _min?: TeamInviteMinOrderByAggregateInput;
  };

  export type TeamInviteScalarWhereWithAggregatesInput = {
    AND?:
      | TeamInviteScalarWhereWithAggregatesInput
      | TeamInviteScalarWhereWithAggregatesInput[];
    OR?: TeamInviteScalarWhereWithAggregatesInput[];
    NOT?:
      | TeamInviteScalarWhereWithAggregatesInput
      | TeamInviteScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'TeamInvite'> | string;
    fromAddress?: StringWithAggregatesFilter<'TeamInvite'> | string;
    fromName?: StringWithAggregatesFilter<'TeamInvite'> | string;
    toTeamId?: StringWithAggregatesFilter<'TeamInvite'> | string;
    toTeamName?: StringWithAggregatesFilter<'TeamInvite'> | string;
    memberAddress?:
      | StringNullableWithAggregatesFilter<'TeamInvite'>
      | string
      | null;
  };

  export type TeamCreateInput = {
    id?: string;
    name: string;
    description: string;
    link: string;
    members?: MemberCreateNestedManyWithoutTeamsInput;
    creator: MemberCreateNestedOneWithoutCreatedTeamsInput;
  };

  export type TeamUncheckedCreateInput = {
    id?: string;
    name: string;
    description: string;
    link: string;
    creatorAddress: string;
    members?: MemberUncheckedCreateNestedManyWithoutTeamsInput;
  };

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
    members?: MemberUpdateManyWithoutTeamsNestedInput;
    creator?: MemberUpdateOneRequiredWithoutCreatedTeamsNestedInput;
  };

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
    creatorAddress?: StringFieldUpdateOperationsInput | string;
    members?: MemberUncheckedUpdateManyWithoutTeamsNestedInput;
  };

  export type TeamCreateManyInput = {
    id?: string;
    name: string;
    description: string;
    link: string;
    creatorAddress: string;
  };

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
  };

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
    creatorAddress?: StringFieldUpdateOperationsInput | string;
  };

  export type ProjectCreateInput = {
    id?: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs?: ProjectCreatebountyIDsInput | string[];
    quotePrice?: number;
    stage?: $Enums.ProjectStage;
    bounties?: BountyCreateNestedManyWithoutProjectInput;
    founder: MemberCreateNestedOneWithoutProjectInput;
  };

  export type ProjectUncheckedCreateInput = {
    id?: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs?: ProjectCreatebountyIDsInput | string[];
    quotePrice?: number;
    stage?: $Enums.ProjectStage;
    memberWalletAddress: string;
    bounties?: BountyUncheckedCreateNestedManyWithoutProjectInput;
  };

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
    bounties?: BountyUpdateManyWithoutProjectNestedInput;
    founder?: MemberUpdateOneRequiredWithoutProjectNestedInput;
  };

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
    memberWalletAddress?: StringFieldUpdateOperationsInput | string;
    bounties?: BountyUncheckedUpdateManyWithoutProjectNestedInput;
  };

  export type ProjectCreateManyInput = {
    id?: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs?: ProjectCreatebountyIDsInput | string[];
    quotePrice?: number;
    stage?: $Enums.ProjectStage;
    memberWalletAddress: string;
  };

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
  };

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
    memberWalletAddress?: StringFieldUpdateOperationsInput | string;
  };

  export type BountyCreateInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    founder?: MemberCreateNestedOneWithoutBountiesInput;
    project?: ProjectCreateNestedOneWithoutBountiesInput;
  };

  export type BountyUncheckedCreateInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    founderAddress?: string | null;
    projectId?: string | null;
  };

  export type BountyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    founder?: MemberUpdateOneWithoutBountiesNestedInput;
    project?: ProjectUpdateOneWithoutBountiesNestedInput;
  };

  export type BountyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    founderAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type BountyCreateManyInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    founderAddress?: string | null;
    projectId?: string | null;
  };

  export type BountyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
  };

  export type BountyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    founderAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type MemberCreateInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteCreateNestedManyWithoutMemberInput;
    bounties?: BountyCreateNestedManyWithoutFounderInput;
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput;
    teams?: TeamCreateNestedManyWithoutMembersInput;
    Project?: ProjectCreateNestedManyWithoutFounderInput;
  };

  export type MemberUncheckedCreateInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteUncheckedCreateNestedManyWithoutMemberInput;
    bounties?: BountyUncheckedCreateNestedManyWithoutFounderInput;
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput;
    teams?: TeamUncheckedCreateNestedManyWithoutMembersInput;
    Project?: ProjectUncheckedCreateNestedManyWithoutFounderInput;
  };

  export type MemberUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUpdateManyWithoutMemberNestedInput;
    bounties?: BountyUpdateManyWithoutFounderNestedInput;
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput;
    teams?: TeamUpdateManyWithoutMembersNestedInput;
    Project?: ProjectUpdateManyWithoutFounderNestedInput;
  };

  export type MemberUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUncheckedUpdateManyWithoutMemberNestedInput;
    bounties?: BountyUncheckedUpdateManyWithoutFounderNestedInput;
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput;
    teams?: TeamUncheckedUpdateManyWithoutMembersNestedInput;
    Project?: ProjectUncheckedUpdateManyWithoutFounderNestedInput;
  };

  export type MemberCreateManyInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
  };

  export type MemberUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type MemberUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type TeamInviteCreateInput = {
    id?: string;
    fromAddress: string;
    fromName: string;
    toTeamId: string;
    toTeamName: string;
    member?: MemberCreateNestedOneWithoutTeamInvitesInput;
  };

  export type TeamInviteUncheckedCreateInput = {
    id?: string;
    fromAddress: string;
    fromName: string;
    toTeamId: string;
    toTeamName: string;
    memberAddress?: string | null;
  };

  export type TeamInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fromAddress?: StringFieldUpdateOperationsInput | string;
    fromName?: StringFieldUpdateOperationsInput | string;
    toTeamId?: StringFieldUpdateOperationsInput | string;
    toTeamName?: StringFieldUpdateOperationsInput | string;
    member?: MemberUpdateOneWithoutTeamInvitesNestedInput;
  };

  export type TeamInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fromAddress?: StringFieldUpdateOperationsInput | string;
    fromName?: StringFieldUpdateOperationsInput | string;
    toTeamId?: StringFieldUpdateOperationsInput | string;
    toTeamName?: StringFieldUpdateOperationsInput | string;
    memberAddress?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type TeamInviteCreateManyInput = {
    id?: string;
    fromAddress: string;
    fromName: string;
    toTeamId: string;
    toTeamName: string;
    memberAddress?: string | null;
  };

  export type TeamInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fromAddress?: StringFieldUpdateOperationsInput | string;
    fromName?: StringFieldUpdateOperationsInput | string;
    toTeamId?: StringFieldUpdateOperationsInput | string;
    toTeamName?: StringFieldUpdateOperationsInput | string;
  };

  export type TeamInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fromAddress?: StringFieldUpdateOperationsInput | string;
    fromName?: StringFieldUpdateOperationsInput | string;
    toTeamId?: StringFieldUpdateOperationsInput | string;
    toTeamName?: StringFieldUpdateOperationsInput | string;
    memberAddress?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type MemberListRelationFilter = {
    every?: MemberWhereInput;
    some?: MemberWhereInput;
    none?: MemberWhereInput;
  };

  export type MemberRelationFilter = {
    is?: MemberWhereInput;
    isNot?: MemberWhereInput;
  };

  export type MemberOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    link?: SortOrder;
    creatorAddress?: SortOrder;
  };

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    link?: SortOrder;
    creatorAddress?: SortOrder;
  };

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    link?: SortOrder;
    creatorAddress?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type EnumProjectStageFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStage | EnumProjectStageFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProjectStage[]
      | ListEnumProjectStageFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProjectStage[]
      | ListEnumProjectStageFieldRefInput<$PrismaModel>;
    not?: NestedEnumProjectStageFilter<$PrismaModel> | $Enums.ProjectStage;
  };

  export type BountyListRelationFilter = {
    every?: BountyWhereInput;
    some?: BountyWhereInput;
    none?: BountyWhereInput;
  };

  export type BountyOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    bountyIDs?: SortOrder;
    quotePrice?: SortOrder;
    stage?: SortOrder;
    memberWalletAddress?: SortOrder;
  };

  export type ProjectAvgOrderByAggregateInput = {
    quotePrice?: SortOrder;
  };

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    quotePrice?: SortOrder;
    stage?: SortOrder;
    memberWalletAddress?: SortOrder;
  };

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    email?: SortOrder;
    phone?: SortOrder;
    quotePrice?: SortOrder;
    stage?: SortOrder;
    memberWalletAddress?: SortOrder;
  };

  export type ProjectSumOrderByAggregateInput = {
    quotePrice?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type EnumProjectStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStage | EnumProjectStageFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProjectStage[]
      | ListEnumProjectStageFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProjectStage[]
      | ListEnumProjectStageFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumProjectStageWithAggregatesFilter<$PrismaModel>
      | $Enums.ProjectStage;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumProjectStageFilter<$PrismaModel>;
    _max?: NestedEnumProjectStageFilter<$PrismaModel>;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type EnumBountyTypeNullableListFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.BountyType[]
      | ListEnumBountyTypeFieldRefInput<$PrismaModel>
      | null;
    has?: $Enums.BountyType | EnumBountyTypeFieldRefInput<$PrismaModel> | null;
    hasEvery?:
      | $Enums.BountyType[]
      | ListEnumBountyTypeFieldRefInput<$PrismaModel>;
    hasSome?:
      | $Enums.BountyType[]
      | ListEnumBountyTypeFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type EnumBountyStageFilter<$PrismaModel = never> = {
    equals?: $Enums.BountyStage | EnumBountyStageFieldRefInput<$PrismaModel>;
    in?: $Enums.BountyStage[] | ListEnumBountyStageFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.BountyStage[]
      | ListEnumBountyStageFieldRefInput<$PrismaModel>;
    not?: NestedEnumBountyStageFilter<$PrismaModel> | $Enums.BountyStage;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
      >;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type MemberNullableRelationFilter = {
    is?: MemberWhereInput | null;
    isNot?: MemberWhereInput | null;
  };

  export type ProjectNullableRelationFilter = {
    is?: ProjectWhereInput | null;
    isNot?: ProjectWhereInput | null;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type BountyCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    postDate?: SortOrder;
    types?: SortOrder;
    deadline?: SortOrder;
    participantsTeamIDs?: SortOrder;
    testCases?: SortOrder;
    stage?: SortOrder;
    submissions?: SortOrder;
    aboutProject?: SortOrder;
    headerSections?: SortOrder;
    approvedByFounder?: SortOrder;
    approvedByManager?: SortOrder;
    approvedByValidator?: SortOrder;
    reward?: SortOrder;
    founderAddress?: SortOrder;
    projectId?: SortOrder;
  };

  export type BountyAvgOrderByAggregateInput = {
    reward?: SortOrder;
  };

  export type BountyMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    postDate?: SortOrder;
    deadline?: SortOrder;
    stage?: SortOrder;
    aboutProject?: SortOrder;
    approvedByFounder?: SortOrder;
    approvedByManager?: SortOrder;
    approvedByValidator?: SortOrder;
    reward?: SortOrder;
    founderAddress?: SortOrder;
    projectId?: SortOrder;
  };

  export type BountyMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    description?: SortOrder;
    postDate?: SortOrder;
    deadline?: SortOrder;
    stage?: SortOrder;
    aboutProject?: SortOrder;
    approvedByFounder?: SortOrder;
    approvedByManager?: SortOrder;
    approvedByValidator?: SortOrder;
    reward?: SortOrder;
    founderAddress?: SortOrder;
    projectId?: SortOrder;
  };

  export type BountySumOrderByAggregateInput = {
    reward?: SortOrder;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type EnumBountyStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BountyStage | EnumBountyStageFieldRefInput<$PrismaModel>;
    in?: $Enums.BountyStage[] | ListEnumBountyStageFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.BountyStage[]
      | ListEnumBountyStageFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumBountyStageWithAggregatesFilter<$PrismaModel>
      | $Enums.BountyStage;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumBountyStageFilter<$PrismaModel>;
    _max?: NestedEnumBountyStageFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          'path'
        >
      >;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type EnumRoleTypeNullableListFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.RoleType[]
      | ListEnumRoleTypeFieldRefInput<$PrismaModel>
      | null;
    has?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel> | null;
    hasEvery?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    hasSome?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type EnumRoleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoleTypeFilter<$PrismaModel> | $Enums.RoleType;
  };

  export type TeamInviteListRelationFilter = {
    every?: TeamInviteWhereInput;
    some?: TeamInviteWhereInput;
    none?: TeamInviteWhereInput;
  };

  export type TeamListRelationFilter = {
    every?: TeamWhereInput;
    some?: TeamWhereInput;
    none?: TeamWhereInput;
  };

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput;
    some?: ProjectWhereInput;
    none?: ProjectWhereInput;
  };

  export type TeamInviteOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type MemberCountOrderByAggregateInput = {
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    walletAddress?: SortOrder;
    email?: SortOrder;
    bio?: SortOrder;
    level?: SortOrder;
    roles?: SortOrder;
    playingRole?: SortOrder;
    bountiesWon?: SortOrder;
    teamsJoined?: SortOrder;
    membersInvited?: SortOrder;
    completedWelcome?: SortOrder;
  };

  export type MemberAvgOrderByAggregateInput = {
    level?: SortOrder;
    bountiesWon?: SortOrder;
    membersInvited?: SortOrder;
  };

  export type MemberMaxOrderByAggregateInput = {
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    walletAddress?: SortOrder;
    email?: SortOrder;
    bio?: SortOrder;
    level?: SortOrder;
    playingRole?: SortOrder;
    bountiesWon?: SortOrder;
    membersInvited?: SortOrder;
    completedWelcome?: SortOrder;
  };

  export type MemberMinOrderByAggregateInput = {
    username?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    walletAddress?: SortOrder;
    email?: SortOrder;
    bio?: SortOrder;
    level?: SortOrder;
    playingRole?: SortOrder;
    bountiesWon?: SortOrder;
    membersInvited?: SortOrder;
    completedWelcome?: SortOrder;
  };

  export type MemberSumOrderByAggregateInput = {
    level?: SortOrder;
    bountiesWon?: SortOrder;
    membersInvited?: SortOrder;
  };

  export type EnumRoleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRoleTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.RoleType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRoleTypeFilter<$PrismaModel>;
    _max?: NestedEnumRoleTypeFilter<$PrismaModel>;
  };

  export type TeamInviteCountOrderByAggregateInput = {
    id?: SortOrder;
    fromAddress?: SortOrder;
    fromName?: SortOrder;
    toTeamId?: SortOrder;
    toTeamName?: SortOrder;
    memberAddress?: SortOrder;
  };

  export type TeamInviteMaxOrderByAggregateInput = {
    id?: SortOrder;
    fromAddress?: SortOrder;
    fromName?: SortOrder;
    toTeamId?: SortOrder;
    toTeamName?: SortOrder;
    memberAddress?: SortOrder;
  };

  export type TeamInviteMinOrderByAggregateInput = {
    id?: SortOrder;
    fromAddress?: SortOrder;
    fromName?: SortOrder;
    toTeamId?: SortOrder;
    toTeamName?: SortOrder;
    memberAddress?: SortOrder;
  };

  export type MemberCreateNestedManyWithoutTeamsInput = {
    create?:
      | XOR<
          MemberCreateWithoutTeamsInput,
          MemberUncheckedCreateWithoutTeamsInput
        >
      | MemberCreateWithoutTeamsInput[]
      | MemberUncheckedCreateWithoutTeamsInput[];
    connectOrCreate?:
      | MemberCreateOrConnectWithoutTeamsInput
      | MemberCreateOrConnectWithoutTeamsInput[];
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
  };

  export type MemberCreateNestedOneWithoutCreatedTeamsInput = {
    create?: XOR<
      MemberCreateWithoutCreatedTeamsInput,
      MemberUncheckedCreateWithoutCreatedTeamsInput
    >;
    connectOrCreate?: MemberCreateOrConnectWithoutCreatedTeamsInput;
    connect?: MemberWhereUniqueInput;
  };

  export type MemberUncheckedCreateNestedManyWithoutTeamsInput = {
    create?:
      | XOR<
          MemberCreateWithoutTeamsInput,
          MemberUncheckedCreateWithoutTeamsInput
        >
      | MemberCreateWithoutTeamsInput[]
      | MemberUncheckedCreateWithoutTeamsInput[];
    connectOrCreate?:
      | MemberCreateOrConnectWithoutTeamsInput
      | MemberCreateOrConnectWithoutTeamsInput[];
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type MemberUpdateManyWithoutTeamsNestedInput = {
    create?:
      | XOR<
          MemberCreateWithoutTeamsInput,
          MemberUncheckedCreateWithoutTeamsInput
        >
      | MemberCreateWithoutTeamsInput[]
      | MemberUncheckedCreateWithoutTeamsInput[];
    connectOrCreate?:
      | MemberCreateOrConnectWithoutTeamsInput
      | MemberCreateOrConnectWithoutTeamsInput[];
    upsert?:
      | MemberUpsertWithWhereUniqueWithoutTeamsInput
      | MemberUpsertWithWhereUniqueWithoutTeamsInput[];
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
    update?:
      | MemberUpdateWithWhereUniqueWithoutTeamsInput
      | MemberUpdateWithWhereUniqueWithoutTeamsInput[];
    updateMany?:
      | MemberUpdateManyWithWhereWithoutTeamsInput
      | MemberUpdateManyWithWhereWithoutTeamsInput[];
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[];
  };

  export type MemberUpdateOneRequiredWithoutCreatedTeamsNestedInput = {
    create?: XOR<
      MemberCreateWithoutCreatedTeamsInput,
      MemberUncheckedCreateWithoutCreatedTeamsInput
    >;
    connectOrCreate?: MemberCreateOrConnectWithoutCreatedTeamsInput;
    upsert?: MemberUpsertWithoutCreatedTeamsInput;
    connect?: MemberWhereUniqueInput;
    update?: XOR<
      XOR<
        MemberUpdateToOneWithWhereWithoutCreatedTeamsInput,
        MemberUpdateWithoutCreatedTeamsInput
      >,
      MemberUncheckedUpdateWithoutCreatedTeamsInput
    >;
  };

  export type MemberUncheckedUpdateManyWithoutTeamsNestedInput = {
    create?:
      | XOR<
          MemberCreateWithoutTeamsInput,
          MemberUncheckedCreateWithoutTeamsInput
        >
      | MemberCreateWithoutTeamsInput[]
      | MemberUncheckedCreateWithoutTeamsInput[];
    connectOrCreate?:
      | MemberCreateOrConnectWithoutTeamsInput
      | MemberCreateOrConnectWithoutTeamsInput[];
    upsert?:
      | MemberUpsertWithWhereUniqueWithoutTeamsInput
      | MemberUpsertWithWhereUniqueWithoutTeamsInput[];
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[];
    update?:
      | MemberUpdateWithWhereUniqueWithoutTeamsInput
      | MemberUpdateWithWhereUniqueWithoutTeamsInput[];
    updateMany?:
      | MemberUpdateManyWithWhereWithoutTeamsInput
      | MemberUpdateManyWithWhereWithoutTeamsInput[];
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[];
  };

  export type ProjectCreatebountyIDsInput = {
    set: string[];
  };

  export type BountyCreateNestedManyWithoutProjectInput = {
    create?:
      | XOR<
          BountyCreateWithoutProjectInput,
          BountyUncheckedCreateWithoutProjectInput
        >
      | BountyCreateWithoutProjectInput[]
      | BountyUncheckedCreateWithoutProjectInput[];
    connectOrCreate?:
      | BountyCreateOrConnectWithoutProjectInput
      | BountyCreateOrConnectWithoutProjectInput[];
    createMany?: BountyCreateManyProjectInputEnvelope;
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
  };

  export type MemberCreateNestedOneWithoutProjectInput = {
    create?: XOR<
      MemberCreateWithoutProjectInput,
      MemberUncheckedCreateWithoutProjectInput
    >;
    connectOrCreate?: MemberCreateOrConnectWithoutProjectInput;
    connect?: MemberWhereUniqueInput;
  };

  export type BountyUncheckedCreateNestedManyWithoutProjectInput = {
    create?:
      | XOR<
          BountyCreateWithoutProjectInput,
          BountyUncheckedCreateWithoutProjectInput
        >
      | BountyCreateWithoutProjectInput[]
      | BountyUncheckedCreateWithoutProjectInput[];
    connectOrCreate?:
      | BountyCreateOrConnectWithoutProjectInput
      | BountyCreateOrConnectWithoutProjectInput[];
    createMany?: BountyCreateManyProjectInputEnvelope;
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
  };

  export type ProjectUpdatebountyIDsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumProjectStageFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStage;
  };

  export type BountyUpdateManyWithoutProjectNestedInput = {
    create?:
      | XOR<
          BountyCreateWithoutProjectInput,
          BountyUncheckedCreateWithoutProjectInput
        >
      | BountyCreateWithoutProjectInput[]
      | BountyUncheckedCreateWithoutProjectInput[];
    connectOrCreate?:
      | BountyCreateOrConnectWithoutProjectInput
      | BountyCreateOrConnectWithoutProjectInput[];
    upsert?:
      | BountyUpsertWithWhereUniqueWithoutProjectInput
      | BountyUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: BountyCreateManyProjectInputEnvelope;
    set?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    disconnect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    delete?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    update?:
      | BountyUpdateWithWhereUniqueWithoutProjectInput
      | BountyUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?:
      | BountyUpdateManyWithWhereWithoutProjectInput
      | BountyUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: BountyScalarWhereInput | BountyScalarWhereInput[];
  };

  export type MemberUpdateOneRequiredWithoutProjectNestedInput = {
    create?: XOR<
      MemberCreateWithoutProjectInput,
      MemberUncheckedCreateWithoutProjectInput
    >;
    connectOrCreate?: MemberCreateOrConnectWithoutProjectInput;
    upsert?: MemberUpsertWithoutProjectInput;
    connect?: MemberWhereUniqueInput;
    update?: XOR<
      XOR<
        MemberUpdateToOneWithWhereWithoutProjectInput,
        MemberUpdateWithoutProjectInput
      >,
      MemberUncheckedUpdateWithoutProjectInput
    >;
  };

  export type BountyUncheckedUpdateManyWithoutProjectNestedInput = {
    create?:
      | XOR<
          BountyCreateWithoutProjectInput,
          BountyUncheckedCreateWithoutProjectInput
        >
      | BountyCreateWithoutProjectInput[]
      | BountyUncheckedCreateWithoutProjectInput[];
    connectOrCreate?:
      | BountyCreateOrConnectWithoutProjectInput
      | BountyCreateOrConnectWithoutProjectInput[];
    upsert?:
      | BountyUpsertWithWhereUniqueWithoutProjectInput
      | BountyUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: BountyCreateManyProjectInputEnvelope;
    set?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    disconnect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    delete?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    update?:
      | BountyUpdateWithWhereUniqueWithoutProjectInput
      | BountyUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?:
      | BountyUpdateManyWithWhereWithoutProjectInput
      | BountyUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: BountyScalarWhereInput | BountyScalarWhereInput[];
  };

  export type BountyCreatetypesInput = {
    set: $Enums.BountyType[];
  };

  export type BountyCreateparticipantsTeamIDsInput = {
    set: string[];
  };

  export type BountyCreatetestCasesInput = {
    set: string[];
  };

  export type BountyCreatesubmissionsInput = {
    set: string[];
  };

  export type MemberCreateNestedOneWithoutBountiesInput = {
    create?: XOR<
      MemberCreateWithoutBountiesInput,
      MemberUncheckedCreateWithoutBountiesInput
    >;
    connectOrCreate?: MemberCreateOrConnectWithoutBountiesInput;
    connect?: MemberWhereUniqueInput;
  };

  export type ProjectCreateNestedOneWithoutBountiesInput = {
    create?: XOR<
      ProjectCreateWithoutBountiesInput,
      ProjectUncheckedCreateWithoutBountiesInput
    >;
    connectOrCreate?: ProjectCreateOrConnectWithoutBountiesInput;
    connect?: ProjectWhereUniqueInput;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type BountyUpdatetypesInput = {
    set?: $Enums.BountyType[];
    push?: $Enums.BountyType | $Enums.BountyType[];
  };

  export type BountyUpdateparticipantsTeamIDsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type BountyUpdatetestCasesInput = {
    set?: string[];
    push?: string | string[];
  };

  export type EnumBountyStageFieldUpdateOperationsInput = {
    set?: $Enums.BountyStage;
  };

  export type BountyUpdatesubmissionsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type MemberUpdateOneWithoutBountiesNestedInput = {
    create?: XOR<
      MemberCreateWithoutBountiesInput,
      MemberUncheckedCreateWithoutBountiesInput
    >;
    connectOrCreate?: MemberCreateOrConnectWithoutBountiesInput;
    upsert?: MemberUpsertWithoutBountiesInput;
    disconnect?: MemberWhereInput | boolean;
    delete?: MemberWhereInput | boolean;
    connect?: MemberWhereUniqueInput;
    update?: XOR<
      XOR<
        MemberUpdateToOneWithWhereWithoutBountiesInput,
        MemberUpdateWithoutBountiesInput
      >,
      MemberUncheckedUpdateWithoutBountiesInput
    >;
  };

  export type ProjectUpdateOneWithoutBountiesNestedInput = {
    create?: XOR<
      ProjectCreateWithoutBountiesInput,
      ProjectUncheckedCreateWithoutBountiesInput
    >;
    connectOrCreate?: ProjectCreateOrConnectWithoutBountiesInput;
    upsert?: ProjectUpsertWithoutBountiesInput;
    disconnect?: ProjectWhereInput | boolean;
    delete?: ProjectWhereInput | boolean;
    connect?: ProjectWhereUniqueInput;
    update?: XOR<
      XOR<
        ProjectUpdateToOneWithWhereWithoutBountiesInput,
        ProjectUpdateWithoutBountiesInput
      >,
      ProjectUncheckedUpdateWithoutBountiesInput
    >;
  };

  export type MemberCreaterolesInput = {
    set: $Enums.RoleType[];
  };

  export type MemberCreateteamsJoinedInput = {
    set: string[];
  };

  export type TeamInviteCreateNestedManyWithoutMemberInput = {
    create?:
      | XOR<
          TeamInviteCreateWithoutMemberInput,
          TeamInviteUncheckedCreateWithoutMemberInput
        >
      | TeamInviteCreateWithoutMemberInput[]
      | TeamInviteUncheckedCreateWithoutMemberInput[];
    connectOrCreate?:
      | TeamInviteCreateOrConnectWithoutMemberInput
      | TeamInviteCreateOrConnectWithoutMemberInput[];
    createMany?: TeamInviteCreateManyMemberInputEnvelope;
    connect?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
  };

  export type BountyCreateNestedManyWithoutFounderInput = {
    create?:
      | XOR<
          BountyCreateWithoutFounderInput,
          BountyUncheckedCreateWithoutFounderInput
        >
      | BountyCreateWithoutFounderInput[]
      | BountyUncheckedCreateWithoutFounderInput[];
    connectOrCreate?:
      | BountyCreateOrConnectWithoutFounderInput
      | BountyCreateOrConnectWithoutFounderInput[];
    createMany?: BountyCreateManyFounderInputEnvelope;
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
  };

  export type TeamCreateNestedManyWithoutCreatorInput = {
    create?:
      | XOR<
          TeamCreateWithoutCreatorInput,
          TeamUncheckedCreateWithoutCreatorInput
        >
      | TeamCreateWithoutCreatorInput[]
      | TeamUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?:
      | TeamCreateOrConnectWithoutCreatorInput
      | TeamCreateOrConnectWithoutCreatorInput[];
    createMany?: TeamCreateManyCreatorInputEnvelope;
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
  };

  export type TeamCreateNestedManyWithoutMembersInput = {
    create?:
      | XOR<
          TeamCreateWithoutMembersInput,
          TeamUncheckedCreateWithoutMembersInput
        >
      | TeamCreateWithoutMembersInput[]
      | TeamUncheckedCreateWithoutMembersInput[];
    connectOrCreate?:
      | TeamCreateOrConnectWithoutMembersInput
      | TeamCreateOrConnectWithoutMembersInput[];
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
  };

  export type ProjectCreateNestedManyWithoutFounderInput = {
    create?:
      | XOR<
          ProjectCreateWithoutFounderInput,
          ProjectUncheckedCreateWithoutFounderInput
        >
      | ProjectCreateWithoutFounderInput[]
      | ProjectUncheckedCreateWithoutFounderInput[];
    connectOrCreate?:
      | ProjectCreateOrConnectWithoutFounderInput
      | ProjectCreateOrConnectWithoutFounderInput[];
    createMany?: ProjectCreateManyFounderInputEnvelope;
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
  };

  export type TeamInviteUncheckedCreateNestedManyWithoutMemberInput = {
    create?:
      | XOR<
          TeamInviteCreateWithoutMemberInput,
          TeamInviteUncheckedCreateWithoutMemberInput
        >
      | TeamInviteCreateWithoutMemberInput[]
      | TeamInviteUncheckedCreateWithoutMemberInput[];
    connectOrCreate?:
      | TeamInviteCreateOrConnectWithoutMemberInput
      | TeamInviteCreateOrConnectWithoutMemberInput[];
    createMany?: TeamInviteCreateManyMemberInputEnvelope;
    connect?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
  };

  export type BountyUncheckedCreateNestedManyWithoutFounderInput = {
    create?:
      | XOR<
          BountyCreateWithoutFounderInput,
          BountyUncheckedCreateWithoutFounderInput
        >
      | BountyCreateWithoutFounderInput[]
      | BountyUncheckedCreateWithoutFounderInput[];
    connectOrCreate?:
      | BountyCreateOrConnectWithoutFounderInput
      | BountyCreateOrConnectWithoutFounderInput[];
    createMany?: BountyCreateManyFounderInputEnvelope;
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
  };

  export type TeamUncheckedCreateNestedManyWithoutCreatorInput = {
    create?:
      | XOR<
          TeamCreateWithoutCreatorInput,
          TeamUncheckedCreateWithoutCreatorInput
        >
      | TeamCreateWithoutCreatorInput[]
      | TeamUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?:
      | TeamCreateOrConnectWithoutCreatorInput
      | TeamCreateOrConnectWithoutCreatorInput[];
    createMany?: TeamCreateManyCreatorInputEnvelope;
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
  };

  export type TeamUncheckedCreateNestedManyWithoutMembersInput = {
    create?:
      | XOR<
          TeamCreateWithoutMembersInput,
          TeamUncheckedCreateWithoutMembersInput
        >
      | TeamCreateWithoutMembersInput[]
      | TeamUncheckedCreateWithoutMembersInput[];
    connectOrCreate?:
      | TeamCreateOrConnectWithoutMembersInput
      | TeamCreateOrConnectWithoutMembersInput[];
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
  };

  export type ProjectUncheckedCreateNestedManyWithoutFounderInput = {
    create?:
      | XOR<
          ProjectCreateWithoutFounderInput,
          ProjectUncheckedCreateWithoutFounderInput
        >
      | ProjectCreateWithoutFounderInput[]
      | ProjectUncheckedCreateWithoutFounderInput[];
    connectOrCreate?:
      | ProjectCreateOrConnectWithoutFounderInput
      | ProjectCreateOrConnectWithoutFounderInput[];
    createMany?: ProjectCreateManyFounderInputEnvelope;
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
  };

  export type MemberUpdaterolesInput = {
    set?: $Enums.RoleType[];
    push?: $Enums.RoleType | $Enums.RoleType[];
  };

  export type EnumRoleTypeFieldUpdateOperationsInput = {
    set?: $Enums.RoleType;
  };

  export type MemberUpdateteamsJoinedInput = {
    set?: string[];
    push?: string | string[];
  };

  export type TeamInviteUpdateManyWithoutMemberNestedInput = {
    create?:
      | XOR<
          TeamInviteCreateWithoutMemberInput,
          TeamInviteUncheckedCreateWithoutMemberInput
        >
      | TeamInviteCreateWithoutMemberInput[]
      | TeamInviteUncheckedCreateWithoutMemberInput[];
    connectOrCreate?:
      | TeamInviteCreateOrConnectWithoutMemberInput
      | TeamInviteCreateOrConnectWithoutMemberInput[];
    upsert?:
      | TeamInviteUpsertWithWhereUniqueWithoutMemberInput
      | TeamInviteUpsertWithWhereUniqueWithoutMemberInput[];
    createMany?: TeamInviteCreateManyMemberInputEnvelope;
    set?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
    disconnect?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
    delete?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
    connect?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
    update?:
      | TeamInviteUpdateWithWhereUniqueWithoutMemberInput
      | TeamInviteUpdateWithWhereUniqueWithoutMemberInput[];
    updateMany?:
      | TeamInviteUpdateManyWithWhereWithoutMemberInput
      | TeamInviteUpdateManyWithWhereWithoutMemberInput[];
    deleteMany?: TeamInviteScalarWhereInput | TeamInviteScalarWhereInput[];
  };

  export type BountyUpdateManyWithoutFounderNestedInput = {
    create?:
      | XOR<
          BountyCreateWithoutFounderInput,
          BountyUncheckedCreateWithoutFounderInput
        >
      | BountyCreateWithoutFounderInput[]
      | BountyUncheckedCreateWithoutFounderInput[];
    connectOrCreate?:
      | BountyCreateOrConnectWithoutFounderInput
      | BountyCreateOrConnectWithoutFounderInput[];
    upsert?:
      | BountyUpsertWithWhereUniqueWithoutFounderInput
      | BountyUpsertWithWhereUniqueWithoutFounderInput[];
    createMany?: BountyCreateManyFounderInputEnvelope;
    set?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    disconnect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    delete?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    update?:
      | BountyUpdateWithWhereUniqueWithoutFounderInput
      | BountyUpdateWithWhereUniqueWithoutFounderInput[];
    updateMany?:
      | BountyUpdateManyWithWhereWithoutFounderInput
      | BountyUpdateManyWithWhereWithoutFounderInput[];
    deleteMany?: BountyScalarWhereInput | BountyScalarWhereInput[];
  };

  export type TeamUpdateManyWithoutCreatorNestedInput = {
    create?:
      | XOR<
          TeamCreateWithoutCreatorInput,
          TeamUncheckedCreateWithoutCreatorInput
        >
      | TeamCreateWithoutCreatorInput[]
      | TeamUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?:
      | TeamCreateOrConnectWithoutCreatorInput
      | TeamCreateOrConnectWithoutCreatorInput[];
    upsert?:
      | TeamUpsertWithWhereUniqueWithoutCreatorInput
      | TeamUpsertWithWhereUniqueWithoutCreatorInput[];
    createMany?: TeamCreateManyCreatorInputEnvelope;
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    update?:
      | TeamUpdateWithWhereUniqueWithoutCreatorInput
      | TeamUpdateWithWhereUniqueWithoutCreatorInput[];
    updateMany?:
      | TeamUpdateManyWithWhereWithoutCreatorInput
      | TeamUpdateManyWithWhereWithoutCreatorInput[];
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[];
  };

  export type TeamUpdateManyWithoutMembersNestedInput = {
    create?:
      | XOR<
          TeamCreateWithoutMembersInput,
          TeamUncheckedCreateWithoutMembersInput
        >
      | TeamCreateWithoutMembersInput[]
      | TeamUncheckedCreateWithoutMembersInput[];
    connectOrCreate?:
      | TeamCreateOrConnectWithoutMembersInput
      | TeamCreateOrConnectWithoutMembersInput[];
    upsert?:
      | TeamUpsertWithWhereUniqueWithoutMembersInput
      | TeamUpsertWithWhereUniqueWithoutMembersInput[];
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    update?:
      | TeamUpdateWithWhereUniqueWithoutMembersInput
      | TeamUpdateWithWhereUniqueWithoutMembersInput[];
    updateMany?:
      | TeamUpdateManyWithWhereWithoutMembersInput
      | TeamUpdateManyWithWhereWithoutMembersInput[];
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[];
  };

  export type ProjectUpdateManyWithoutFounderNestedInput = {
    create?:
      | XOR<
          ProjectCreateWithoutFounderInput,
          ProjectUncheckedCreateWithoutFounderInput
        >
      | ProjectCreateWithoutFounderInput[]
      | ProjectUncheckedCreateWithoutFounderInput[];
    connectOrCreate?:
      | ProjectCreateOrConnectWithoutFounderInput
      | ProjectCreateOrConnectWithoutFounderInput[];
    upsert?:
      | ProjectUpsertWithWhereUniqueWithoutFounderInput
      | ProjectUpsertWithWhereUniqueWithoutFounderInput[];
    createMany?: ProjectCreateManyFounderInputEnvelope;
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
    update?:
      | ProjectUpdateWithWhereUniqueWithoutFounderInput
      | ProjectUpdateWithWhereUniqueWithoutFounderInput[];
    updateMany?:
      | ProjectUpdateManyWithWhereWithoutFounderInput
      | ProjectUpdateManyWithWhereWithoutFounderInput[];
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[];
  };

  export type TeamInviteUncheckedUpdateManyWithoutMemberNestedInput = {
    create?:
      | XOR<
          TeamInviteCreateWithoutMemberInput,
          TeamInviteUncheckedCreateWithoutMemberInput
        >
      | TeamInviteCreateWithoutMemberInput[]
      | TeamInviteUncheckedCreateWithoutMemberInput[];
    connectOrCreate?:
      | TeamInviteCreateOrConnectWithoutMemberInput
      | TeamInviteCreateOrConnectWithoutMemberInput[];
    upsert?:
      | TeamInviteUpsertWithWhereUniqueWithoutMemberInput
      | TeamInviteUpsertWithWhereUniqueWithoutMemberInput[];
    createMany?: TeamInviteCreateManyMemberInputEnvelope;
    set?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
    disconnect?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
    delete?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
    connect?: TeamInviteWhereUniqueInput | TeamInviteWhereUniqueInput[];
    update?:
      | TeamInviteUpdateWithWhereUniqueWithoutMemberInput
      | TeamInviteUpdateWithWhereUniqueWithoutMemberInput[];
    updateMany?:
      | TeamInviteUpdateManyWithWhereWithoutMemberInput
      | TeamInviteUpdateManyWithWhereWithoutMemberInput[];
    deleteMany?: TeamInviteScalarWhereInput | TeamInviteScalarWhereInput[];
  };

  export type BountyUncheckedUpdateManyWithoutFounderNestedInput = {
    create?:
      | XOR<
          BountyCreateWithoutFounderInput,
          BountyUncheckedCreateWithoutFounderInput
        >
      | BountyCreateWithoutFounderInput[]
      | BountyUncheckedCreateWithoutFounderInput[];
    connectOrCreate?:
      | BountyCreateOrConnectWithoutFounderInput
      | BountyCreateOrConnectWithoutFounderInput[];
    upsert?:
      | BountyUpsertWithWhereUniqueWithoutFounderInput
      | BountyUpsertWithWhereUniqueWithoutFounderInput[];
    createMany?: BountyCreateManyFounderInputEnvelope;
    set?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    disconnect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    delete?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    connect?: BountyWhereUniqueInput | BountyWhereUniqueInput[];
    update?:
      | BountyUpdateWithWhereUniqueWithoutFounderInput
      | BountyUpdateWithWhereUniqueWithoutFounderInput[];
    updateMany?:
      | BountyUpdateManyWithWhereWithoutFounderInput
      | BountyUpdateManyWithWhereWithoutFounderInput[];
    deleteMany?: BountyScalarWhereInput | BountyScalarWhereInput[];
  };

  export type TeamUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?:
      | XOR<
          TeamCreateWithoutCreatorInput,
          TeamUncheckedCreateWithoutCreatorInput
        >
      | TeamCreateWithoutCreatorInput[]
      | TeamUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?:
      | TeamCreateOrConnectWithoutCreatorInput
      | TeamCreateOrConnectWithoutCreatorInput[];
    upsert?:
      | TeamUpsertWithWhereUniqueWithoutCreatorInput
      | TeamUpsertWithWhereUniqueWithoutCreatorInput[];
    createMany?: TeamCreateManyCreatorInputEnvelope;
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    update?:
      | TeamUpdateWithWhereUniqueWithoutCreatorInput
      | TeamUpdateWithWhereUniqueWithoutCreatorInput[];
    updateMany?:
      | TeamUpdateManyWithWhereWithoutCreatorInput
      | TeamUpdateManyWithWhereWithoutCreatorInput[];
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[];
  };

  export type TeamUncheckedUpdateManyWithoutMembersNestedInput = {
    create?:
      | XOR<
          TeamCreateWithoutMembersInput,
          TeamUncheckedCreateWithoutMembersInput
        >
      | TeamCreateWithoutMembersInput[]
      | TeamUncheckedCreateWithoutMembersInput[];
    connectOrCreate?:
      | TeamCreateOrConnectWithoutMembersInput
      | TeamCreateOrConnectWithoutMembersInput[];
    upsert?:
      | TeamUpsertWithWhereUniqueWithoutMembersInput
      | TeamUpsertWithWhereUniqueWithoutMembersInput[];
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[];
    update?:
      | TeamUpdateWithWhereUniqueWithoutMembersInput
      | TeamUpdateWithWhereUniqueWithoutMembersInput[];
    updateMany?:
      | TeamUpdateManyWithWhereWithoutMembersInput
      | TeamUpdateManyWithWhereWithoutMembersInput[];
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[];
  };

  export type ProjectUncheckedUpdateManyWithoutFounderNestedInput = {
    create?:
      | XOR<
          ProjectCreateWithoutFounderInput,
          ProjectUncheckedCreateWithoutFounderInput
        >
      | ProjectCreateWithoutFounderInput[]
      | ProjectUncheckedCreateWithoutFounderInput[];
    connectOrCreate?:
      | ProjectCreateOrConnectWithoutFounderInput
      | ProjectCreateOrConnectWithoutFounderInput[];
    upsert?:
      | ProjectUpsertWithWhereUniqueWithoutFounderInput
      | ProjectUpsertWithWhereUniqueWithoutFounderInput[];
    createMany?: ProjectCreateManyFounderInputEnvelope;
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[];
    update?:
      | ProjectUpdateWithWhereUniqueWithoutFounderInput
      | ProjectUpdateWithWhereUniqueWithoutFounderInput[];
    updateMany?:
      | ProjectUpdateManyWithWhereWithoutFounderInput
      | ProjectUpdateManyWithWhereWithoutFounderInput[];
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[];
  };

  export type MemberCreateNestedOneWithoutTeamInvitesInput = {
    create?: XOR<
      MemberCreateWithoutTeamInvitesInput,
      MemberUncheckedCreateWithoutTeamInvitesInput
    >;
    connectOrCreate?: MemberCreateOrConnectWithoutTeamInvitesInput;
    connect?: MemberWhereUniqueInput;
  };

  export type MemberUpdateOneWithoutTeamInvitesNestedInput = {
    create?: XOR<
      MemberCreateWithoutTeamInvitesInput,
      MemberUncheckedCreateWithoutTeamInvitesInput
    >;
    connectOrCreate?: MemberCreateOrConnectWithoutTeamInvitesInput;
    upsert?: MemberUpsertWithoutTeamInvitesInput;
    disconnect?: MemberWhereInput | boolean;
    delete?: MemberWhereInput | boolean;
    connect?: MemberWhereUniqueInput;
    update?: XOR<
      XOR<
        MemberUpdateToOneWithWhereWithoutTeamInvitesInput,
        MemberUpdateWithoutTeamInvitesInput
      >,
      MemberUncheckedUpdateWithoutTeamInvitesInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedEnumProjectStageFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStage | EnumProjectStageFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ProjectStage[]
      | ListEnumProjectStageFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ProjectStage[]
      | ListEnumProjectStageFieldRefInput<$PrismaModel>;
    not?: NestedEnumProjectStageFilter<$PrismaModel> | $Enums.ProjectStage;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedEnumProjectStageWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.ProjectStage
        | EnumProjectStageFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.ProjectStage[]
        | ListEnumProjectStageFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.ProjectStage[]
        | ListEnumProjectStageFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumProjectStageWithAggregatesFilter<$PrismaModel>
        | $Enums.ProjectStage;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumProjectStageFilter<$PrismaModel>;
      _max?: NestedEnumProjectStageFilter<$PrismaModel>;
    };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedEnumBountyStageFilter<$PrismaModel = never> = {
    equals?: $Enums.BountyStage | EnumBountyStageFieldRefInput<$PrismaModel>;
    in?: $Enums.BountyStage[] | ListEnumBountyStageFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.BountyStage[]
      | ListEnumBountyStageFieldRefInput<$PrismaModel>;
    not?: NestedEnumBountyStageFilter<$PrismaModel> | $Enums.BountyStage;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumBountyStageWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.BountyStage | EnumBountyStageFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.BountyStage[]
        | ListEnumBountyStageFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.BountyStage[]
        | ListEnumBountyStageFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumBountyStageWithAggregatesFilter<$PrismaModel>
        | $Enums.BountyStage;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumBountyStageFilter<$PrismaModel>;
      _max?: NestedEnumBountyStageFilter<$PrismaModel>;
    };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>
      >;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumRoleTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumRoleTypeFilter<$PrismaModel> | $Enums.RoleType;
  };

  export type NestedEnumRoleTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleType | EnumRoleTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RoleType[] | ListEnumRoleTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRoleTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.RoleType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRoleTypeFilter<$PrismaModel>;
    _max?: NestedEnumRoleTypeFilter<$PrismaModel>;
  };

  export type MemberCreateWithoutTeamsInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteCreateNestedManyWithoutMemberInput;
    bounties?: BountyCreateNestedManyWithoutFounderInput;
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput;
    Project?: ProjectCreateNestedManyWithoutFounderInput;
  };

  export type MemberUncheckedCreateWithoutTeamsInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteUncheckedCreateNestedManyWithoutMemberInput;
    bounties?: BountyUncheckedCreateNestedManyWithoutFounderInput;
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput;
    Project?: ProjectUncheckedCreateNestedManyWithoutFounderInput;
  };

  export type MemberCreateOrConnectWithoutTeamsInput = {
    where: MemberWhereUniqueInput;
    create: XOR<
      MemberCreateWithoutTeamsInput,
      MemberUncheckedCreateWithoutTeamsInput
    >;
  };

  export type MemberCreateWithoutCreatedTeamsInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteCreateNestedManyWithoutMemberInput;
    bounties?: BountyCreateNestedManyWithoutFounderInput;
    teams?: TeamCreateNestedManyWithoutMembersInput;
    Project?: ProjectCreateNestedManyWithoutFounderInput;
  };

  export type MemberUncheckedCreateWithoutCreatedTeamsInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteUncheckedCreateNestedManyWithoutMemberInput;
    bounties?: BountyUncheckedCreateNestedManyWithoutFounderInput;
    teams?: TeamUncheckedCreateNestedManyWithoutMembersInput;
    Project?: ProjectUncheckedCreateNestedManyWithoutFounderInput;
  };

  export type MemberCreateOrConnectWithoutCreatedTeamsInput = {
    where: MemberWhereUniqueInput;
    create: XOR<
      MemberCreateWithoutCreatedTeamsInput,
      MemberUncheckedCreateWithoutCreatedTeamsInput
    >;
  };

  export type MemberUpsertWithWhereUniqueWithoutTeamsInput = {
    where: MemberWhereUniqueInput;
    update: XOR<
      MemberUpdateWithoutTeamsInput,
      MemberUncheckedUpdateWithoutTeamsInput
    >;
    create: XOR<
      MemberCreateWithoutTeamsInput,
      MemberUncheckedCreateWithoutTeamsInput
    >;
  };

  export type MemberUpdateWithWhereUniqueWithoutTeamsInput = {
    where: MemberWhereUniqueInput;
    data: XOR<
      MemberUpdateWithoutTeamsInput,
      MemberUncheckedUpdateWithoutTeamsInput
    >;
  };

  export type MemberUpdateManyWithWhereWithoutTeamsInput = {
    where: MemberScalarWhereInput;
    data: XOR<
      MemberUpdateManyMutationInput,
      MemberUncheckedUpdateManyWithoutTeamsInput
    >;
  };

  export type MemberScalarWhereInput = {
    AND?: MemberScalarWhereInput | MemberScalarWhereInput[];
    OR?: MemberScalarWhereInput[];
    NOT?: MemberScalarWhereInput | MemberScalarWhereInput[];
    username?: StringFilter<'Member'> | string;
    firstName?: StringFilter<'Member'> | string;
    lastName?: StringFilter<'Member'> | string;
    walletAddress?: StringFilter<'Member'> | string;
    email?: StringFilter<'Member'> | string;
    bio?: StringFilter<'Member'> | string;
    level?: IntFilter<'Member'> | number;
    roles?: EnumRoleTypeNullableListFilter<'Member'>;
    playingRole?: EnumRoleTypeFilter<'Member'> | $Enums.RoleType;
    bountiesWon?: IntFilter<'Member'> | number;
    teamsJoined?: StringNullableListFilter<'Member'>;
    membersInvited?: IntFilter<'Member'> | number;
    completedWelcome?: BoolFilter<'Member'> | boolean;
  };

  export type MemberUpsertWithoutCreatedTeamsInput = {
    update: XOR<
      MemberUpdateWithoutCreatedTeamsInput,
      MemberUncheckedUpdateWithoutCreatedTeamsInput
    >;
    create: XOR<
      MemberCreateWithoutCreatedTeamsInput,
      MemberUncheckedCreateWithoutCreatedTeamsInput
    >;
    where?: MemberWhereInput;
  };

  export type MemberUpdateToOneWithWhereWithoutCreatedTeamsInput = {
    where?: MemberWhereInput;
    data: XOR<
      MemberUpdateWithoutCreatedTeamsInput,
      MemberUncheckedUpdateWithoutCreatedTeamsInput
    >;
  };

  export type MemberUpdateWithoutCreatedTeamsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUpdateManyWithoutMemberNestedInput;
    bounties?: BountyUpdateManyWithoutFounderNestedInput;
    teams?: TeamUpdateManyWithoutMembersNestedInput;
    Project?: ProjectUpdateManyWithoutFounderNestedInput;
  };

  export type MemberUncheckedUpdateWithoutCreatedTeamsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUncheckedUpdateManyWithoutMemberNestedInput;
    bounties?: BountyUncheckedUpdateManyWithoutFounderNestedInput;
    teams?: TeamUncheckedUpdateManyWithoutMembersNestedInput;
    Project?: ProjectUncheckedUpdateManyWithoutFounderNestedInput;
  };

  export type BountyCreateWithoutProjectInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    founder?: MemberCreateNestedOneWithoutBountiesInput;
  };

  export type BountyUncheckedCreateWithoutProjectInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    founderAddress?: string | null;
  };

  export type BountyCreateOrConnectWithoutProjectInput = {
    where: BountyWhereUniqueInput;
    create: XOR<
      BountyCreateWithoutProjectInput,
      BountyUncheckedCreateWithoutProjectInput
    >;
  };

  export type BountyCreateManyProjectInputEnvelope = {
    data: BountyCreateManyProjectInput | BountyCreateManyProjectInput[];
    skipDuplicates?: boolean;
  };

  export type MemberCreateWithoutProjectInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteCreateNestedManyWithoutMemberInput;
    bounties?: BountyCreateNestedManyWithoutFounderInput;
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput;
    teams?: TeamCreateNestedManyWithoutMembersInput;
  };

  export type MemberUncheckedCreateWithoutProjectInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteUncheckedCreateNestedManyWithoutMemberInput;
    bounties?: BountyUncheckedCreateNestedManyWithoutFounderInput;
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput;
    teams?: TeamUncheckedCreateNestedManyWithoutMembersInput;
  };

  export type MemberCreateOrConnectWithoutProjectInput = {
    where: MemberWhereUniqueInput;
    create: XOR<
      MemberCreateWithoutProjectInput,
      MemberUncheckedCreateWithoutProjectInput
    >;
  };

  export type BountyUpsertWithWhereUniqueWithoutProjectInput = {
    where: BountyWhereUniqueInput;
    update: XOR<
      BountyUpdateWithoutProjectInput,
      BountyUncheckedUpdateWithoutProjectInput
    >;
    create: XOR<
      BountyCreateWithoutProjectInput,
      BountyUncheckedCreateWithoutProjectInput
    >;
  };

  export type BountyUpdateWithWhereUniqueWithoutProjectInput = {
    where: BountyWhereUniqueInput;
    data: XOR<
      BountyUpdateWithoutProjectInput,
      BountyUncheckedUpdateWithoutProjectInput
    >;
  };

  export type BountyUpdateManyWithWhereWithoutProjectInput = {
    where: BountyScalarWhereInput;
    data: XOR<
      BountyUpdateManyMutationInput,
      BountyUncheckedUpdateManyWithoutProjectInput
    >;
  };

  export type BountyScalarWhereInput = {
    AND?: BountyScalarWhereInput | BountyScalarWhereInput[];
    OR?: BountyScalarWhereInput[];
    NOT?: BountyScalarWhereInput | BountyScalarWhereInput[];
    id?: StringFilter<'Bounty'> | string;
    title?: StringFilter<'Bounty'> | string;
    description?: StringFilter<'Bounty'> | string;
    postDate?: DateTimeFilter<'Bounty'> | Date | string;
    types?: EnumBountyTypeNullableListFilter<'Bounty'>;
    deadline?: DateTimeFilter<'Bounty'> | Date | string;
    participantsTeamIDs?: StringNullableListFilter<'Bounty'>;
    testCases?: StringNullableListFilter<'Bounty'>;
    stage?: EnumBountyStageFilter<'Bounty'> | $Enums.BountyStage;
    submissions?: StringNullableListFilter<'Bounty'>;
    aboutProject?: StringNullableFilter<'Bounty'> | string | null;
    headerSections?: JsonNullableFilter<'Bounty'>;
    approvedByFounder?: BoolFilter<'Bounty'> | boolean;
    approvedByManager?: BoolFilter<'Bounty'> | boolean;
    approvedByValidator?: BoolFilter<'Bounty'> | boolean;
    reward?: IntFilter<'Bounty'> | number;
    founderAddress?: StringNullableFilter<'Bounty'> | string | null;
    projectId?: StringNullableFilter<'Bounty'> | string | null;
  };

  export type MemberUpsertWithoutProjectInput = {
    update: XOR<
      MemberUpdateWithoutProjectInput,
      MemberUncheckedUpdateWithoutProjectInput
    >;
    create: XOR<
      MemberCreateWithoutProjectInput,
      MemberUncheckedCreateWithoutProjectInput
    >;
    where?: MemberWhereInput;
  };

  export type MemberUpdateToOneWithWhereWithoutProjectInput = {
    where?: MemberWhereInput;
    data: XOR<
      MemberUpdateWithoutProjectInput,
      MemberUncheckedUpdateWithoutProjectInput
    >;
  };

  export type MemberUpdateWithoutProjectInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUpdateManyWithoutMemberNestedInput;
    bounties?: BountyUpdateManyWithoutFounderNestedInput;
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput;
    teams?: TeamUpdateManyWithoutMembersNestedInput;
  };

  export type MemberUncheckedUpdateWithoutProjectInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUncheckedUpdateManyWithoutMemberNestedInput;
    bounties?: BountyUncheckedUpdateManyWithoutFounderNestedInput;
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput;
    teams?: TeamUncheckedUpdateManyWithoutMembersNestedInput;
  };

  export type MemberCreateWithoutBountiesInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteCreateNestedManyWithoutMemberInput;
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput;
    teams?: TeamCreateNestedManyWithoutMembersInput;
    Project?: ProjectCreateNestedManyWithoutFounderInput;
  };

  export type MemberUncheckedCreateWithoutBountiesInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    teamInvites?: TeamInviteUncheckedCreateNestedManyWithoutMemberInput;
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput;
    teams?: TeamUncheckedCreateNestedManyWithoutMembersInput;
    Project?: ProjectUncheckedCreateNestedManyWithoutFounderInput;
  };

  export type MemberCreateOrConnectWithoutBountiesInput = {
    where: MemberWhereUniqueInput;
    create: XOR<
      MemberCreateWithoutBountiesInput,
      MemberUncheckedCreateWithoutBountiesInput
    >;
  };

  export type ProjectCreateWithoutBountiesInput = {
    id?: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs?: ProjectCreatebountyIDsInput | string[];
    quotePrice?: number;
    stage?: $Enums.ProjectStage;
    founder: MemberCreateNestedOneWithoutProjectInput;
  };

  export type ProjectUncheckedCreateWithoutBountiesInput = {
    id?: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs?: ProjectCreatebountyIDsInput | string[];
    quotePrice?: number;
    stage?: $Enums.ProjectStage;
    memberWalletAddress: string;
  };

  export type ProjectCreateOrConnectWithoutBountiesInput = {
    where: ProjectWhereUniqueInput;
    create: XOR<
      ProjectCreateWithoutBountiesInput,
      ProjectUncheckedCreateWithoutBountiesInput
    >;
  };

  export type MemberUpsertWithoutBountiesInput = {
    update: XOR<
      MemberUpdateWithoutBountiesInput,
      MemberUncheckedUpdateWithoutBountiesInput
    >;
    create: XOR<
      MemberCreateWithoutBountiesInput,
      MemberUncheckedCreateWithoutBountiesInput
    >;
    where?: MemberWhereInput;
  };

  export type MemberUpdateToOneWithWhereWithoutBountiesInput = {
    where?: MemberWhereInput;
    data: XOR<
      MemberUpdateWithoutBountiesInput,
      MemberUncheckedUpdateWithoutBountiesInput
    >;
  };

  export type MemberUpdateWithoutBountiesInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUpdateManyWithoutMemberNestedInput;
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput;
    teams?: TeamUpdateManyWithoutMembersNestedInput;
    Project?: ProjectUpdateManyWithoutFounderNestedInput;
  };

  export type MemberUncheckedUpdateWithoutBountiesInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUncheckedUpdateManyWithoutMemberNestedInput;
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput;
    teams?: TeamUncheckedUpdateManyWithoutMembersNestedInput;
    Project?: ProjectUncheckedUpdateManyWithoutFounderNestedInput;
  };

  export type ProjectUpsertWithoutBountiesInput = {
    update: XOR<
      ProjectUpdateWithoutBountiesInput,
      ProjectUncheckedUpdateWithoutBountiesInput
    >;
    create: XOR<
      ProjectCreateWithoutBountiesInput,
      ProjectUncheckedCreateWithoutBountiesInput
    >;
    where?: ProjectWhereInput;
  };

  export type ProjectUpdateToOneWithWhereWithoutBountiesInput = {
    where?: ProjectWhereInput;
    data: XOR<
      ProjectUpdateWithoutBountiesInput,
      ProjectUncheckedUpdateWithoutBountiesInput
    >;
  };

  export type ProjectUpdateWithoutBountiesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
    founder?: MemberUpdateOneRequiredWithoutProjectNestedInput;
  };

  export type ProjectUncheckedUpdateWithoutBountiesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
    memberWalletAddress?: StringFieldUpdateOperationsInput | string;
  };

  export type TeamInviteCreateWithoutMemberInput = {
    id?: string;
    fromAddress: string;
    fromName: string;
    toTeamId: string;
    toTeamName: string;
  };

  export type TeamInviteUncheckedCreateWithoutMemberInput = {
    id?: string;
    fromAddress: string;
    fromName: string;
    toTeamId: string;
    toTeamName: string;
  };

  export type TeamInviteCreateOrConnectWithoutMemberInput = {
    where: TeamInviteWhereUniqueInput;
    create: XOR<
      TeamInviteCreateWithoutMemberInput,
      TeamInviteUncheckedCreateWithoutMemberInput
    >;
  };

  export type TeamInviteCreateManyMemberInputEnvelope = {
    data: TeamInviteCreateManyMemberInput | TeamInviteCreateManyMemberInput[];
    skipDuplicates?: boolean;
  };

  export type BountyCreateWithoutFounderInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    project?: ProjectCreateNestedOneWithoutBountiesInput;
  };

  export type BountyUncheckedCreateWithoutFounderInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    projectId?: string | null;
  };

  export type BountyCreateOrConnectWithoutFounderInput = {
    where: BountyWhereUniqueInput;
    create: XOR<
      BountyCreateWithoutFounderInput,
      BountyUncheckedCreateWithoutFounderInput
    >;
  };

  export type BountyCreateManyFounderInputEnvelope = {
    data: BountyCreateManyFounderInput | BountyCreateManyFounderInput[];
    skipDuplicates?: boolean;
  };

  export type TeamCreateWithoutCreatorInput = {
    id?: string;
    name: string;
    description: string;
    link: string;
    members?: MemberCreateNestedManyWithoutTeamsInput;
  };

  export type TeamUncheckedCreateWithoutCreatorInput = {
    id?: string;
    name: string;
    description: string;
    link: string;
    members?: MemberUncheckedCreateNestedManyWithoutTeamsInput;
  };

  export type TeamCreateOrConnectWithoutCreatorInput = {
    where: TeamWhereUniqueInput;
    create: XOR<
      TeamCreateWithoutCreatorInput,
      TeamUncheckedCreateWithoutCreatorInput
    >;
  };

  export type TeamCreateManyCreatorInputEnvelope = {
    data: TeamCreateManyCreatorInput | TeamCreateManyCreatorInput[];
    skipDuplicates?: boolean;
  };

  export type TeamCreateWithoutMembersInput = {
    id?: string;
    name: string;
    description: string;
    link: string;
    creator: MemberCreateNestedOneWithoutCreatedTeamsInput;
  };

  export type TeamUncheckedCreateWithoutMembersInput = {
    id?: string;
    name: string;
    description: string;
    link: string;
    creatorAddress: string;
  };

  export type TeamCreateOrConnectWithoutMembersInput = {
    where: TeamWhereUniqueInput;
    create: XOR<
      TeamCreateWithoutMembersInput,
      TeamUncheckedCreateWithoutMembersInput
    >;
  };

  export type ProjectCreateWithoutFounderInput = {
    id?: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs?: ProjectCreatebountyIDsInput | string[];
    quotePrice?: number;
    stage?: $Enums.ProjectStage;
    bounties?: BountyCreateNestedManyWithoutProjectInput;
  };

  export type ProjectUncheckedCreateWithoutFounderInput = {
    id?: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs?: ProjectCreatebountyIDsInput | string[];
    quotePrice?: number;
    stage?: $Enums.ProjectStage;
    bounties?: BountyUncheckedCreateNestedManyWithoutProjectInput;
  };

  export type ProjectCreateOrConnectWithoutFounderInput = {
    where: ProjectWhereUniqueInput;
    create: XOR<
      ProjectCreateWithoutFounderInput,
      ProjectUncheckedCreateWithoutFounderInput
    >;
  };

  export type ProjectCreateManyFounderInputEnvelope = {
    data: ProjectCreateManyFounderInput | ProjectCreateManyFounderInput[];
    skipDuplicates?: boolean;
  };

  export type TeamInviteUpsertWithWhereUniqueWithoutMemberInput = {
    where: TeamInviteWhereUniqueInput;
    update: XOR<
      TeamInviteUpdateWithoutMemberInput,
      TeamInviteUncheckedUpdateWithoutMemberInput
    >;
    create: XOR<
      TeamInviteCreateWithoutMemberInput,
      TeamInviteUncheckedCreateWithoutMemberInput
    >;
  };

  export type TeamInviteUpdateWithWhereUniqueWithoutMemberInput = {
    where: TeamInviteWhereUniqueInput;
    data: XOR<
      TeamInviteUpdateWithoutMemberInput,
      TeamInviteUncheckedUpdateWithoutMemberInput
    >;
  };

  export type TeamInviteUpdateManyWithWhereWithoutMemberInput = {
    where: TeamInviteScalarWhereInput;
    data: XOR<
      TeamInviteUpdateManyMutationInput,
      TeamInviteUncheckedUpdateManyWithoutMemberInput
    >;
  };

  export type TeamInviteScalarWhereInput = {
    AND?: TeamInviteScalarWhereInput | TeamInviteScalarWhereInput[];
    OR?: TeamInviteScalarWhereInput[];
    NOT?: TeamInviteScalarWhereInput | TeamInviteScalarWhereInput[];
    id?: StringFilter<'TeamInvite'> | string;
    fromAddress?: StringFilter<'TeamInvite'> | string;
    fromName?: StringFilter<'TeamInvite'> | string;
    toTeamId?: StringFilter<'TeamInvite'> | string;
    toTeamName?: StringFilter<'TeamInvite'> | string;
    memberAddress?: StringNullableFilter<'TeamInvite'> | string | null;
  };

  export type BountyUpsertWithWhereUniqueWithoutFounderInput = {
    where: BountyWhereUniqueInput;
    update: XOR<
      BountyUpdateWithoutFounderInput,
      BountyUncheckedUpdateWithoutFounderInput
    >;
    create: XOR<
      BountyCreateWithoutFounderInput,
      BountyUncheckedCreateWithoutFounderInput
    >;
  };

  export type BountyUpdateWithWhereUniqueWithoutFounderInput = {
    where: BountyWhereUniqueInput;
    data: XOR<
      BountyUpdateWithoutFounderInput,
      BountyUncheckedUpdateWithoutFounderInput
    >;
  };

  export type BountyUpdateManyWithWhereWithoutFounderInput = {
    where: BountyScalarWhereInput;
    data: XOR<
      BountyUpdateManyMutationInput,
      BountyUncheckedUpdateManyWithoutFounderInput
    >;
  };

  export type TeamUpsertWithWhereUniqueWithoutCreatorInput = {
    where: TeamWhereUniqueInput;
    update: XOR<
      TeamUpdateWithoutCreatorInput,
      TeamUncheckedUpdateWithoutCreatorInput
    >;
    create: XOR<
      TeamCreateWithoutCreatorInput,
      TeamUncheckedCreateWithoutCreatorInput
    >;
  };

  export type TeamUpdateWithWhereUniqueWithoutCreatorInput = {
    where: TeamWhereUniqueInput;
    data: XOR<
      TeamUpdateWithoutCreatorInput,
      TeamUncheckedUpdateWithoutCreatorInput
    >;
  };

  export type TeamUpdateManyWithWhereWithoutCreatorInput = {
    where: TeamScalarWhereInput;
    data: XOR<
      TeamUpdateManyMutationInput,
      TeamUncheckedUpdateManyWithoutCreatorInput
    >;
  };

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[];
    OR?: TeamScalarWhereInput[];
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[];
    id?: StringFilter<'Team'> | string;
    name?: StringFilter<'Team'> | string;
    description?: StringFilter<'Team'> | string;
    link?: StringFilter<'Team'> | string;
    creatorAddress?: StringFilter<'Team'> | string;
  };

  export type TeamUpsertWithWhereUniqueWithoutMembersInput = {
    where: TeamWhereUniqueInput;
    update: XOR<
      TeamUpdateWithoutMembersInput,
      TeamUncheckedUpdateWithoutMembersInput
    >;
    create: XOR<
      TeamCreateWithoutMembersInput,
      TeamUncheckedCreateWithoutMembersInput
    >;
  };

  export type TeamUpdateWithWhereUniqueWithoutMembersInput = {
    where: TeamWhereUniqueInput;
    data: XOR<
      TeamUpdateWithoutMembersInput,
      TeamUncheckedUpdateWithoutMembersInput
    >;
  };

  export type TeamUpdateManyWithWhereWithoutMembersInput = {
    where: TeamScalarWhereInput;
    data: XOR<
      TeamUpdateManyMutationInput,
      TeamUncheckedUpdateManyWithoutMembersInput
    >;
  };

  export type ProjectUpsertWithWhereUniqueWithoutFounderInput = {
    where: ProjectWhereUniqueInput;
    update: XOR<
      ProjectUpdateWithoutFounderInput,
      ProjectUncheckedUpdateWithoutFounderInput
    >;
    create: XOR<
      ProjectCreateWithoutFounderInput,
      ProjectUncheckedCreateWithoutFounderInput
    >;
  };

  export type ProjectUpdateWithWhereUniqueWithoutFounderInput = {
    where: ProjectWhereUniqueInput;
    data: XOR<
      ProjectUpdateWithoutFounderInput,
      ProjectUncheckedUpdateWithoutFounderInput
    >;
  };

  export type ProjectUpdateManyWithWhereWithoutFounderInput = {
    where: ProjectScalarWhereInput;
    data: XOR<
      ProjectUpdateManyMutationInput,
      ProjectUncheckedUpdateManyWithoutFounderInput
    >;
  };

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[];
    OR?: ProjectScalarWhereInput[];
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[];
    id?: StringFilter<'Project'> | string;
    title?: StringFilter<'Project'> | string;
    description?: StringFilter<'Project'> | string;
    email?: StringFilter<'Project'> | string;
    phone?: StringFilter<'Project'> | string;
    bountyIDs?: StringNullableListFilter<'Project'>;
    quotePrice?: IntFilter<'Project'> | number;
    stage?: EnumProjectStageFilter<'Project'> | $Enums.ProjectStage;
    memberWalletAddress?: StringFilter<'Project'> | string;
  };

  export type MemberCreateWithoutTeamInvitesInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    bounties?: BountyCreateNestedManyWithoutFounderInput;
    createdTeams?: TeamCreateNestedManyWithoutCreatorInput;
    teams?: TeamCreateNestedManyWithoutMembersInput;
    Project?: ProjectCreateNestedManyWithoutFounderInput;
  };

  export type MemberUncheckedCreateWithoutTeamInvitesInput = {
    username: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    email: string;
    bio: string;
    level?: number;
    roles?: MemberCreaterolesInput | $Enums.RoleType[];
    playingRole: $Enums.RoleType;
    bountiesWon: number;
    teamsJoined?: MemberCreateteamsJoinedInput | string[];
    membersInvited: number;
    completedWelcome: boolean;
    bounties?: BountyUncheckedCreateNestedManyWithoutFounderInput;
    createdTeams?: TeamUncheckedCreateNestedManyWithoutCreatorInput;
    teams?: TeamUncheckedCreateNestedManyWithoutMembersInput;
    Project?: ProjectUncheckedCreateNestedManyWithoutFounderInput;
  };

  export type MemberCreateOrConnectWithoutTeamInvitesInput = {
    where: MemberWhereUniqueInput;
    create: XOR<
      MemberCreateWithoutTeamInvitesInput,
      MemberUncheckedCreateWithoutTeamInvitesInput
    >;
  };

  export type MemberUpsertWithoutTeamInvitesInput = {
    update: XOR<
      MemberUpdateWithoutTeamInvitesInput,
      MemberUncheckedUpdateWithoutTeamInvitesInput
    >;
    create: XOR<
      MemberCreateWithoutTeamInvitesInput,
      MemberUncheckedCreateWithoutTeamInvitesInput
    >;
    where?: MemberWhereInput;
  };

  export type MemberUpdateToOneWithWhereWithoutTeamInvitesInput = {
    where?: MemberWhereInput;
    data: XOR<
      MemberUpdateWithoutTeamInvitesInput,
      MemberUncheckedUpdateWithoutTeamInvitesInput
    >;
  };

  export type MemberUpdateWithoutTeamInvitesInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    bounties?: BountyUpdateManyWithoutFounderNestedInput;
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput;
    teams?: TeamUpdateManyWithoutMembersNestedInput;
    Project?: ProjectUpdateManyWithoutFounderNestedInput;
  };

  export type MemberUncheckedUpdateWithoutTeamInvitesInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    bounties?: BountyUncheckedUpdateManyWithoutFounderNestedInput;
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput;
    teams?: TeamUncheckedUpdateManyWithoutMembersNestedInput;
    Project?: ProjectUncheckedUpdateManyWithoutFounderNestedInput;
  };

  export type MemberUpdateWithoutTeamsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUpdateManyWithoutMemberNestedInput;
    bounties?: BountyUpdateManyWithoutFounderNestedInput;
    createdTeams?: TeamUpdateManyWithoutCreatorNestedInput;
    Project?: ProjectUpdateManyWithoutFounderNestedInput;
  };

  export type MemberUncheckedUpdateWithoutTeamsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
    teamInvites?: TeamInviteUncheckedUpdateManyWithoutMemberNestedInput;
    bounties?: BountyUncheckedUpdateManyWithoutFounderNestedInput;
    createdTeams?: TeamUncheckedUpdateManyWithoutCreatorNestedInput;
    Project?: ProjectUncheckedUpdateManyWithoutFounderNestedInput;
  };

  export type MemberUncheckedUpdateManyWithoutTeamsInput = {
    username?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    walletAddress?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    bio?: StringFieldUpdateOperationsInput | string;
    level?: IntFieldUpdateOperationsInput | number;
    roles?: MemberUpdaterolesInput | $Enums.RoleType[];
    playingRole?: EnumRoleTypeFieldUpdateOperationsInput | $Enums.RoleType;
    bountiesWon?: IntFieldUpdateOperationsInput | number;
    teamsJoined?: MemberUpdateteamsJoinedInput | string[];
    membersInvited?: IntFieldUpdateOperationsInput | number;
    completedWelcome?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type BountyCreateManyProjectInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    founderAddress?: string | null;
  };

  export type BountyUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    founder?: MemberUpdateOneWithoutBountiesNestedInput;
  };

  export type BountyUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    founderAddress?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type BountyUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    founderAddress?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type TeamInviteCreateManyMemberInput = {
    id?: string;
    fromAddress: string;
    fromName: string;
    toTeamId: string;
    toTeamName: string;
  };

  export type BountyCreateManyFounderInput = {
    id?: string;
    title: string;
    description: string;
    postDate: Date | string;
    types?: BountyCreatetypesInput | $Enums.BountyType[];
    deadline: Date | string;
    participantsTeamIDs?: BountyCreateparticipantsTeamIDsInput | string[];
    testCases?: BountyCreatetestCasesInput | string[];
    stage?: $Enums.BountyStage;
    submissions?: BountyCreatesubmissionsInput | string[];
    aboutProject?: string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: boolean;
    approvedByManager?: boolean;
    approvedByValidator?: boolean;
    reward?: number;
    projectId?: string | null;
  };

  export type TeamCreateManyCreatorInput = {
    id?: string;
    name: string;
    description: string;
    link: string;
  };

  export type ProjectCreateManyFounderInput = {
    id?: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    bountyIDs?: ProjectCreatebountyIDsInput | string[];
    quotePrice?: number;
    stage?: $Enums.ProjectStage;
  };

  export type TeamInviteUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fromAddress?: StringFieldUpdateOperationsInput | string;
    fromName?: StringFieldUpdateOperationsInput | string;
    toTeamId?: StringFieldUpdateOperationsInput | string;
    toTeamName?: StringFieldUpdateOperationsInput | string;
  };

  export type TeamInviteUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fromAddress?: StringFieldUpdateOperationsInput | string;
    fromName?: StringFieldUpdateOperationsInput | string;
    toTeamId?: StringFieldUpdateOperationsInput | string;
    toTeamName?: StringFieldUpdateOperationsInput | string;
  };

  export type TeamInviteUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fromAddress?: StringFieldUpdateOperationsInput | string;
    fromName?: StringFieldUpdateOperationsInput | string;
    toTeamId?: StringFieldUpdateOperationsInput | string;
    toTeamName?: StringFieldUpdateOperationsInput | string;
  };

  export type BountyUpdateWithoutFounderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    project?: ProjectUpdateOneWithoutBountiesNestedInput;
  };

  export type BountyUncheckedUpdateWithoutFounderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    projectId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type BountyUncheckedUpdateManyWithoutFounderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    postDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    types?: BountyUpdatetypesInput | $Enums.BountyType[];
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string;
    participantsTeamIDs?: BountyUpdateparticipantsTeamIDsInput | string[];
    testCases?: BountyUpdatetestCasesInput | string[];
    stage?: EnumBountyStageFieldUpdateOperationsInput | $Enums.BountyStage;
    submissions?: BountyUpdatesubmissionsInput | string[];
    aboutProject?: NullableStringFieldUpdateOperationsInput | string | null;
    headerSections?: NullableJsonNullValueInput | InputJsonValue;
    approvedByFounder?: BoolFieldUpdateOperationsInput | boolean;
    approvedByManager?: BoolFieldUpdateOperationsInput | boolean;
    approvedByValidator?: BoolFieldUpdateOperationsInput | boolean;
    reward?: IntFieldUpdateOperationsInput | number;
    projectId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type TeamUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
    members?: MemberUpdateManyWithoutTeamsNestedInput;
  };

  export type TeamUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
    members?: MemberUncheckedUpdateManyWithoutTeamsNestedInput;
  };

  export type TeamUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
  };

  export type TeamUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
    creator?: MemberUpdateOneRequiredWithoutCreatedTeamsNestedInput;
  };

  export type TeamUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
    creatorAddress?: StringFieldUpdateOperationsInput | string;
  };

  export type TeamUncheckedUpdateManyWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    link?: StringFieldUpdateOperationsInput | string;
    creatorAddress?: StringFieldUpdateOperationsInput | string;
  };

  export type ProjectUpdateWithoutFounderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
    bounties?: BountyUpdateManyWithoutProjectNestedInput;
  };

  export type ProjectUncheckedUpdateWithoutFounderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
    bounties?: BountyUncheckedUpdateManyWithoutProjectNestedInput;
  };

  export type ProjectUncheckedUpdateManyWithoutFounderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    phone?: StringFieldUpdateOperationsInput | string;
    bountyIDs?: ProjectUpdatebountyIDsInput | string[];
    quotePrice?: IntFieldUpdateOperationsInput | number;
    stage?: EnumProjectStageFieldUpdateOperationsInput | $Enums.ProjectStage;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use TeamDefaultArgs instead
   */
  export type TeamArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = TeamDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use ProjectDefaultArgs instead
   */
  export type ProjectArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = ProjectDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use BountyDefaultArgs instead
   */
  export type BountyArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = BountyDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use MemberDefaultArgs instead
   */
  export type MemberArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = MemberDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use TeamInviteDefaultArgs instead
   */
  export type TeamInviteArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = TeamInviteDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
