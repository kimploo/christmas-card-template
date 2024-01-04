export interface SuccessResDTO<ActualData> {
  data: ActualData;
}

export interface ErrorResDTO<E> {
  error: E;
}
