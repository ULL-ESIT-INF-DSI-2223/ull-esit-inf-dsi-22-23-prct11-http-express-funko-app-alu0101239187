export type FunkoType = {
  id: number;
  name: string;
  description: string;
  type: string;
  genre: string;
  franchise: string;
  number: number;
  exclusive: boolean;
  characteristics: string;
};

export type ResponseType = {
  success: boolean;
  funkos?: FunkoType[];
};
