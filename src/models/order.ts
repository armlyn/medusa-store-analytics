import { Column, Entity } from 'typeorm'
import { Order as MedusaOrder } from '@medusajs/medusa'

@Entity()
export class Order extends MedusaOrder {
    @Column({ nullable: true })
    store_id?: string
}
