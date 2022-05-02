export type TScore = {
  id: number;
  hits: {
    '1': number | null;
    '2': number | null;
    '3': number | null;
  };
  total: number | null;
}