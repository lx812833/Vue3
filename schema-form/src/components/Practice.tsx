/**
 * Partial<Type>
 * 构造一个类型，其中 Type 的所有属性都设置为可选
 * 
 * type Partial<T> = {
 *  [P in keyof T]?: T[P];
 * };
 */

type User = {
  age: number;
  name: string;
  height: string;
  weight?: string;
  country?: string;
}


type PartialUser = Partial<User>;

// Required<Type>
// 构造一个类型，该类型所有属性可设置为必选

/**
 * Make all properties in T required
 */
//  type Required<T> = {
//   [P in keyof T]-?: T[P];
// };
type RequiredUser = Required<User>;

// Readonly<Type>
// 构造一个 Type 的所有属性都设置为 readonly 的类型，这意味着构造类型的属性不能被重新分配。

/**
 * Make all properties in T readonly
 */
//  type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };
type ReadonlyUser = Readonly<User>;

let student: ReadonlyUser = {
  age: 18,
  name: "张三",
  height: "175",
  weight: "130",
  country: ""
}

// Record<Keys, Type>
// 构造一个对象类型，其属性键为 Keys，其属性值为 Type，此实用程序可用于将一种类型的属性映射到另一种类型。

/**
 * Construct a type with a set of properties K of type T
 */
// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

type UserIds = 1000 | 1001 | 1002;
type RecordUser = Record<UserIds, User>;

// 定义一个对象的 key 和 value 类型
type keys = "A" | "B" | "C";
const result: Record<keys, number> = {
  A: 1,
  B: 2,
  C: 3
}

// Exclude<UnionType, ExcludedMembers>  (Exclude：除去，不包括)
// 通过从联合类型（UnionType）中排除分配给 ExcludedMembers 的类型外的所有类型成员来构造的类型。

/**
 * Exclude from T those types that are assignable to U
 */
//  type Exclude<T, U> = T extends U ? never : T;

type T1 = Exclude<string | number, Function>; // string | number
type T2 = Exclude<"A" | "B" | "C", "A" | "B">; // "C"

// Extract<Type, Union>
// 通过从 Type 中萃取所有可分配给 Union 的联合成员来构造一个类型。
type T3 = Extract<"a" | "b" | "c", "a">; // "a"
type T4 = Extract<T1, T2>; // never


// Pick<Type, Keys>
// 通过从 Type 中选择一组属性 Keys（字符串文字或字符串文字的联合）来构造一个类型。

/**
 * From T, pick a set of properties whose keys are in the union K
 */
//  type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

type PickUser = Pick<User, "age" | "weight">;

// Omit<Type, Keys>
// 通过从 Type 中选择所有属性然后删除 Keys（字符串文字或字符串文字的联合）来构造一个类型。

type OmitUser = Omit<User, "age" | "weight">;