import {
    Column,
    Entity,
    Index
} from "typeorm"
import {
    User as MedusaUser,
} from "@medusajs/medusa"

@Entity()
export class User extends MedusaUser {
    @Index("UserStoreId")
    @Column({ nullable: true })
    store_id?: string
}