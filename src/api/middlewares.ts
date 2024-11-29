import {
    authenticate,
} from "@medusajs/medusa"
import type {
    MedusaNextFunction,
    MedusaRequest,
    MedusaResponse,
    MiddlewaresConfig,
    UserService,
} from "@medusajs/medusa"
import * as cors from 'cors' 
import { parseCorsOrigins } from 'medusa-core-utils'
import { User } from "../models/user"

const registerAuthenticatedStore = async (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) => {
    let authenticatedUser: User | null = null

    if (req.user && req.user.userId) {
        const userService =
            req.scope.resolve("userService") as UserService
        authenticatedUser = await userService.retrieve(req.user.userId)
    }

    req.scope.register({
        loggedInStoreId: {
            resolve: () => authenticatedUser.store_id,
        },
    })

    next()
}

export const config: MiddlewaresConfig = {
    routes: [
        {

            matcher: /^\/admin\/(customers-analytics|marketing-analytics|orders-analytics|products-analytics|sales-analytics|reports-analytics).*/,
            middlewares: [
                cors.default({ credentials: true, origin: parseCorsOrigins(process.env.ADMIN_CORS ?? '') }),
                authenticate(),
                registerAuthenticatedStore
            ],
        }

    ],
}

