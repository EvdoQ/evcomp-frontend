export default interface computerModel {
    id: number;
    image: string;
    description: string;
    price: number;
    processor: string;
    graphicsCard: string;
    motherboard: string;
    powerSupply: string;
    ram: string;
    storage: string;
    processorCooler: string;
    case: string;
    color: string;
    hasWiFi: boolean;
    hasLightingControl: boolean;
    orders: any[];
}
