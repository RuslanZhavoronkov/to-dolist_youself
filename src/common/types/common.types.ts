// export type BaseResponseType<D = {}> = {
//   resultCode: number;
//   messages: Array<string>;
//   data: D;
// };

export type FieldErrorType = {
  error: string;
  field: string;
};

//Чтобы не было пересечения имен, назовем общий тип BaseResponseType
export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldErrorType[];
};
