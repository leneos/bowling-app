export type THits = {
  '1': number | null;
  '2': number | null;
  '3': number | null;
}
export type TScore = {
  id: number;
  hits: THits;
  total: number | null;
}