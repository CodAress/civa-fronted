export class Bus {
    id: number;
    number: string;
    licensePlate: string;
    brand: string;
    status: string;
    features: string;

    constructor(bus: { id?: number; number?: string; licensePlate?: string; brand?: string; status?: string; features?: string }) {
        this.id = bus.id || 0;
        this.number = bus.number || '';
        this.licensePlate = bus.licensePlate || '';
        this.brand = bus.brand || '';
        this.status = bus.status || '';
        this.features = bus.features || '';
    }
}