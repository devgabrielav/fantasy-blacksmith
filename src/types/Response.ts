export type ResponseType<T> = {
  status: number,
  data: T,
};

export type ResponseArrayType<T> = {
  status: number,
  data: T[],
};