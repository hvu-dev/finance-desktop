export interface Adapter<D, T> {
    adapt(data: D): T;
    adaptMultiple(data: D[]): T[];
}
