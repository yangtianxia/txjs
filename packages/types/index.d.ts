export type Numeric = number | string

export type UnknownCallback<T = unknown, U = void> = (...args: T[]) => U

export type Writeable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type NonNullableProps<T> = {
  [p in keyof T]: NonNullable<T[p]>
}

export type NonNullableParams<T> = T extends (...args: infer P) => infer R
  ? (...args: { [K in keyof P]-?: NonNullable<P[K]> }) => R
  : never

export type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S
