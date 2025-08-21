import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum ShippingMethod {
  STANDARD = "standard",
  EXPRESS = "express",
  OVERNIGHT = "overnight",
  PICKUP = "pickup",
}

@Entity("orders")
@Index("idx_order_user_status", ["userId", "status"]) // Consultas por usuario y estado
@Index("idx_order_status_date", ["status", "createdAt"]) // Consultas por estado y fecha
@Index("idx_order_payment_status", ["paymentStatus"]) // Consultas por estado de pago
@Index("idx_order_total", ["total"]) // Ordenamiento por total
@Index("idx_order_date", ["createdAt"]) // Ordenamiento por fecha
@Index("idx_order_shipping_date", ["shippedAt"]) // Ordenamiento por fecha de envío
@Index("idx_order_user_date", ["userId", "createdAt"]) // Historial de pedidos por usuario
@Index("idx_order_tracking", ["trackingNumber"]) // Búsqueda por tracking
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true, length: 50 })
  orderNumber!: string;

  @Column({
    type: "varchar",
    length: 20,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: PaymentStatus.PENDING,
  })
  paymentStatus!: PaymentStatus;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
  })
  subtotal!: number;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 0,
  })
  tax!: number;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 0,
  })
  shipping!: number;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 0,
  })
  discount!: number;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
  })
  total!: number;

  @Column({ default: 0 })
  itemCount!: number; // Campo desnormalizado para evitar COUNT()

  @Column({ default: 0 })
  totalQuantity!: number; // Campo desnormalizado para evitar SUM()

  @Column({ type: "varchar", length: 50, nullable: true })
  couponCode!: string | null;

  @Column({
    type: "varchar",
    length: 20,
    default: ShippingMethod.STANDARD,
  })
  shippingMethod!: ShippingMethod;

  @Column({ type: "varchar", length: 100, nullable: true })
  trackingNumber!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  carrier!: string | null;

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @Column({ type: "text", nullable: true })
  shippingAddress!: string | null; // JSON serializado

  @Column({ type: "text", nullable: true })
  billingAddress!: string | null; // JSON serializado

  @Column({ type: "text", nullable: true })
  paymentDetails!: string | null; // JSON serializado (sin datos sensibles)

  @Column({ type: "datetime", nullable: true })
  confirmedAt!: Date | null;

  @Column({ type: "datetime", nullable: true })
  shippedAt!: Date | null;

  @Column({ type: "datetime", nullable: true })
  deliveredAt!: Date | null;

  @Column({ type: "datetime", nullable: true })
  cancelledAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación muchos-a-uno con usuario
  @Column()
  userId!: number; // FK explícita para optimización

  @ManyToOne(() => User, (user) => user.orders, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: Promise<User>;

  // Relación uno-a-muchos con items del pedido
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    lazy: true,
  })
  orderItems!: Promise<OrderItem[]>;

  // Métodos helper
  get isPending(): boolean {
    return this.status === OrderStatus.PENDING;
  }

  get isConfirmed(): boolean {
    return this.status === OrderStatus.CONFIRMED;
  }

  get isProcessing(): boolean {
    return this.status === OrderStatus.PROCESSING;
  }

  get isShipped(): boolean {
    return this.status === OrderStatus.SHIPPED;
  }

  get isDelivered(): boolean {
    return this.status === OrderStatus.DELIVERED;
  }

  get isCancelled(): boolean {
    return this.status === OrderStatus.CANCELLED;
  }

  get isRefunded(): boolean {
    return this.status === OrderStatus.REFUNDED;
  }

  get isPaid(): boolean {
    return this.paymentStatus === PaymentStatus.PAID;
  }

  get canBeCancelled(): boolean {
    return this.isPending || this.isConfirmed;
  }

  get canBeShipped(): boolean {
    return (this.isConfirmed || this.isProcessing) && this.isPaid;
  }

  get hasDiscount(): boolean {
    return this.discount > 0;
  }

  get effectiveTotal(): number {
    return this.subtotal + this.tax + this.shipping - this.discount;
  }

  get totalFormatted(): string {
    return `$${this.total.toFixed(2)}`;
  }

  get discountFormatted(): string {
    return `$${this.discount.toFixed(2)}`;
  }

  get taxRate(): number {
    return this.subtotal > 0 ? (this.tax / this.subtotal) * 100 : 0;
  }

  get shippingRate(): number {
    return this.subtotal > 0 ? (this.shipping / this.subtotal) * 100 : 0;
  }

  get processingTime(): number | null {
    if (!this.confirmedAt) return null;
    const endTime = this.shippedAt || this.deliveredAt || new Date();
    return Math.ceil(
      (endTime.getTime() - this.confirmedAt.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  get deliveryTime(): number | null {
    if (!this.shippedAt || !this.deliveredAt) return null;
    return Math.ceil(
      (this.deliveredAt.getTime() - this.shippedAt.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }

  get isHighValue(): boolean {
    return this.total >= 500;
  }

  get isBulkOrder(): boolean {
    return this.totalQuantity >= 10;
  }

  // Método para actualizar estadísticas desnormalizadas
  updateStats(itemCount: number, totalQuantity: number, subtotal: number) {
    this.itemCount = itemCount;
    this.totalQuantity = totalQuantity;
    this.subtotal = subtotal;
    this.total = this.subtotal + this.tax + this.shipping - this.discount;
  }

  // Método para confirmar pedido
  confirm() {
    this.status = OrderStatus.CONFIRMED;
    this.confirmedAt = new Date();
  }

  // Método para procesar pedido
  process() {
    this.status = OrderStatus.PROCESSING;
  }

  // Método para enviar pedido
  ship(trackingNumber: string, carrier: string) {
    this.status = OrderStatus.SHIPPED;
    this.shippedAt = new Date();
    this.trackingNumber = trackingNumber;
    this.carrier = carrier;
  }

  // Método para entregar pedido
  deliver() {
    this.status = OrderStatus.DELIVERED;
    this.deliveredAt = new Date();
  }

  // Método para cancelar pedido
  cancel() {
    this.status = OrderStatus.CANCELLED;
    this.cancelledAt = new Date();
  }

  // Método para reembolsar pedido
  refund() {
    this.status = OrderStatus.REFUNDED;
    this.paymentStatus = PaymentStatus.REFUNDED;
  }

  // Método para marcar como pagado
  markAsPaid() {
    this.paymentStatus = PaymentStatus.PAID;
  }

  // Método para aplicar descuento
  applyDiscount(discountAmount: number, couponCode?: string) {
    this.discount = discountAmount;
    this.couponCode = couponCode || null;
    this.total = this.subtotal + this.tax + this.shipping - this.discount;
  }

  // Método para obtener dirección de envío parseada
  getParsedShippingAddress(): Record<string, any> {
    if (!this.shippingAddress) return {};
    try {
      return JSON.parse(this.shippingAddress);
    } catch {
      return {};
    }
  }

  // Método para setear dirección de envío
  setShippingAddress(address: Record<string, any>) {
    this.shippingAddress = JSON.stringify(address);
  }

  // Método para obtener dirección de facturación parseada
  getParsedBillingAddress(): Record<string, any> {
    if (!this.billingAddress) return {};
    try {
      return JSON.parse(this.billingAddress);
    } catch {
      return {};
    }
  }

  // Método para setear dirección de facturación
  setBillingAddress(address: Record<string, any>) {
    this.billingAddress = JSON.stringify(address);
  }

  // Método para obtener detalles de pago parseados
  getParsedPaymentDetails(): Record<string, any> {
    if (!this.paymentDetails) return {};
    try {
      return JSON.parse(this.paymentDetails);
    } catch {
      return {};
    }
  }

  // Método para setear detalles de pago
  setPaymentDetails(details: Record<string, any>) {
    this.paymentDetails = JSON.stringify(details);
  }

  // Método para generar número de pedido único
  static generateOrderNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }

  // Método para calcular tiempo estimado de entrega
  getEstimatedDeliveryDate(): Date {
    const baseDate = this.shippedAt || new Date();
    const deliveryDays = this.getDeliveryDays();
    return new Date(baseDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
  }

  // Método para obtener días de entrega según método de envío
  private getDeliveryDays(): number {
    switch (this.shippingMethod) {
      case ShippingMethod.OVERNIGHT:
        return 1;
      case ShippingMethod.EXPRESS:
        return 2;
      case ShippingMethod.STANDARD:
        return 5;
      case ShippingMethod.PICKUP:
        return 0;
      default:
        return 5;
    }
  }
}
