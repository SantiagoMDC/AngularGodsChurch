interface TipoFinanza {
    label: string;
    value: string;
}
export interface Finanza {
    codigo?: string;
    descripcion?: string;
    valor?: number;
    fecha?: String;
    tipo?: TipoFinanza;
}