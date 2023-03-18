interface MiembroStatus {
    label: string;
    value: string;
}
export interface Miembro {
    id?: string;
    nombre?: string;
    apellido?: string;
    edad?: number;
    telefono?: number;
    miembroStatus?: MiembroStatus;
    categoria?: string;
    direccion?: string;
}