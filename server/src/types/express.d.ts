import User from "../models/User";

declare global {
    namespace Express {
        interface User extends InstanceType<typeof User> {}
    }
}

export {};