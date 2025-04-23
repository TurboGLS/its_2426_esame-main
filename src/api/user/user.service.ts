import { User } from "./user.entity";
import { UserModel } from "./user.model";

export class UserExistsError extends Error {
    constructor() {
        super();
        this.name = 'UserExists';
        this.message = 'username already in use';
    }
}

export class UserService {
    async list(role?: string): Promise<User[]> {
        const filter: any = {};

        if (role) {
            filter.role = role;
        }

        const users = await UserModel.find(filter);

        return users;
    }
}

export default new UserService();