type EntityId = string | number;

interface BaseProduct {
    readonly id: EntityId;
    title: string;
    price: number;
    description?: string;
    tags: string[];
    inStock: boolean;
}

interface Product extends BaseProduct {
    weightGrams: number;
    calories: number;
    isSpicy: boolean;
    allergens: string[];
}

function createProduct(productData: Product): Product {
    return productData;
}

function calculateLineTotal(
    price: number,
    quantity: number,
    discountPercent: number = 0
): number {
    if (quantity < 0 || price < 0) {
        throw new Error("Кількість або ціна не може бути менше нуля");
    }
    const percentNumber = 1 - discountPercent / 100;
    const total = (price * quantity) * percentNumber;
    return total;
}

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type DeliveryMethod = 'express_courier' | 'scheduled_courier' | 'takeaway';

interface CartItem {
    product: Product;
    quantity: number;
}

interface TimestampMetadata {
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

type Order = {
    readonly orderId: string;
    customerEmail: string;
    items: CartItem[];
    status: OrderStatus;
    delivery: DeliveryMethod;
} & TimestampMetadata;

function updateOrderStatus(order: Order, newStatus: OrderStatus): Order {
    if (order.status === 'delivered' || order.status === 'cancelled') {
        throw new Error('Це замовлення вже виконане або відхилене')
    }
    return {...order, status: newStatus, updatedAt: new Date()}
}

function validateCustomerInput(input: unknown): string {
    if (typeof input !== 'string') {
        throw new TypeError('Тип даних повинен бути рядком');
    }
    if (input.trim() === "") {
        throw new Error("Рядок не може бути пустим")
    }
    if (!input.includes('@')) {
        throw new Error('Рядок повинен містити @')
    } 

    return input;
}
