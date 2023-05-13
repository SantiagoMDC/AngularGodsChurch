interface MiembroStatus {
    label: string;
    value: string;
}
export interface Miembro {
    identificacion?: string;
    nombre?: string;
    apellido?: string;
    edad?: number;
    telefono?: number;
    estado?: MiembroStatus;
    categoria?: string;
    direccion?: string;
}