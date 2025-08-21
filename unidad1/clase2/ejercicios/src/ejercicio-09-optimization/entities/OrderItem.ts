import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity("order_items")
@Index("idx_order_item_order", ["orderId"]) // Consultas por pedido
@Index("idx_order_item_product", ["productId"]) // Consultas por producto
@Index("idx_order_item_order_product", ["orderId", "productId"]) // Consulta específica
@Index("idx_order_item_price", ["unitPrice"]) // Análisis de precios
@Index("idx_order_item_quantity", ["quantity"]) // Análisis de cantidades
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 1 })
  quantity!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  unitPrice!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  totalPrice!: number;

  // Campos desnormalizados para evitar JOINs en reportes
  @Column({ type: "varchar", length: 300 })
  productName!: string;

  @Column({ type: "varchar", length: 50 })
  productSku!: string;

  @Column({ type: "varchar", length: 100 })
  productBrand!: string;

  @Column({ type: "varchar", length: 200 })
  categoryName!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  productImageUrl!: string | null;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  productCost!: number; // Para cálculo de margen

  @Column({ type: "text", nullable: true })
  productAttributes!: string | null; // JSON de atributos al momento de la compra

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación muchos-a-uno con pedido
  @Column()
  orderId!: number; // FK explícita para optimización

  @ManyToOne(() => Order, (order) => order.orderItems, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "orderId" })
  order!: Promise<Order>;

  // Relación muchos-a-uno con producto
  @Column()
  productId!: number; // FK explícita para optimización

  @ManyToOne(() => Product, (product) => product.orderItems, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product!: Promise<Product>;

  // Métodos helper
  get totalPriceFormatted(): string {
    return `$${this.totalPrice.toFixed(2)}`;
  }

  get unitPriceFormatted(): string {
    return `$${this.unitPrice.toFixed(2)}`;
  }

  get totalCost(): number {
    return this.productCost * this.quantity;
  }

  get totalProfit(): number {
    return this.totalPrice - this.totalCost;
  }

  get profitMargin(): number {
    return this.totalPrice > 0 ? (this.totalProfit / this.totalPrice) * 100 : 0;
  }

  get averageUnitPrice(): number {
    return this.quantity > 0 ? this.totalPrice / this.quantity : 0;
  }

  get isHighQuantity(): boolean {
    return this.quantity >= 5;
  }

  get isHighValue(): boolean {
    return this.totalPrice >= 100;
  }

  get isBulkItem(): boolean {
    return this.quantity >= 10;
  }

  // Método para calcular precio total
  calculateTotal() {
    this.totalPrice = this.unitPrice * this.quantity;
  }

  // Método para actualizar información del producto (desnormalización)
  updateProductInfo(
    name: string,
    sku: string,
    brand: string,
    categoryName: string,
    imageUrl: string | null,
    cost: number,
    attributes?: Record<string, any>
  ) {
    this.productName = name;
    this.productSku = sku;
    this.productBrand = brand;
    this.categoryName = categoryName;
    this.productImageUrl = imageUrl;
    this.productCost = cost;
    if (attributes) {
      this.productAttributes = JSON.stringify(attributes);
    }
  }

  // Método para obtener atributos parseados
  getParsedAttributes(): Record<string, any> {
    if (!this.productAttributes) return {};
    try {
      return JSON.parse(this.productAttributes);
    } catch {
      return {};
    }
  }

  // Método para setear atributos
  setAttributes(attributes: Record<string, any>) {
    this.productAttributes = JSON.stringify(attributes);
  }

  // Método para obtener descripción del item
  getDescription(): string {
    let description = `${this.productName} (${this.productSku})`;
    if (this.quantity > 1) {
      description += ` x${this.quantity}`;
    }
    return description;
  }

  // Método para verificar si el item es rentable
  isProfitable(): boolean {
    return this.totalProfit > 0;
  }

  // Método para obtener información resumida
  getSummary(): string {
    return `${this.quantity}x ${this.productName} @ ${this.unitPriceFormatted} = ${this.totalPriceFormatted}`;
  }

  // Método para actualizar cantidad
  updateQuantity(newQuantity: number) {
    if (newQuantity <= 0) {
      throw new Error("La cantidad debe ser mayor que 0");
    }
    this.quantity = newQuantity;
    this.calculateTotal();
  }

  // Método para aplicar descuento
  applyDiscount(discountPercentage: number) {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error("El descuento debe estar entre 0% y 100%");
    }
    this.unitPrice = this.unitPrice * (1 - discountPercentage / 100);
    this.calculateTotal();
  }

  // Método para clonar item (útil para carritos)
  clone(): OrderItem {
    const clonedItem = new OrderItem();
    clonedItem.quantity = this.quantity;
    clonedItem.unitPrice = this.unitPrice;
    clonedItem.totalPrice = this.totalPrice;
    clonedItem.productName = this.productName;
    clonedItem.productSku = this.productSku;
    clonedItem.productBrand = this.productBrand;
    clonedItem.categoryName = this.categoryName;
    clonedItem.productImageUrl = this.productImageUrl;
    clonedItem.productCost = this.productCost;
    clonedItem.productAttributes = this.productAttributes;
    clonedItem.notes = this.notes;
    clonedItem.productId = this.productId;
    return clonedItem;
  }
}
