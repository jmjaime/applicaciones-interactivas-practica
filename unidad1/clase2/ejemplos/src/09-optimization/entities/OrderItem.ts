import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity("order_items")
@Index("idx_order_item_order", ["orderId"]) // Consultas por pedido
@Index("idx_order_item_product", ["productId"]) // Consultas por producto
@Index("idx_order_item_order_product", ["orderId", "productId"]) // Índice compuesto único
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  unitPrice!: number; // Precio al momento de la compra

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
  })
  totalPrice!: number; // Campo calculado/desnormalizado

  // Campos desnormalizados para evitar JOINs en reportes
  @Column({ length: 300 })
  productName!: string; // Nombre del producto al momento de la compra

  @Column({ length: 50 })
  productSku!: string; // SKU del producto al momento de la compra

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
    onDelete: "RESTRICT", // No permitir eliminar productos con pedidos
  })
  @JoinColumn({ name: "productId" })
  product!: Promise<Product>;
}
