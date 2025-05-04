import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";
import { User } from "./user.entity";
import { UserModel } from "./user.model";
import * as bcrypt from 'bcrypt';

export class UserExistsError extends Error {
    constructor() {
        super();
        this.name = 'UserExists';
        this.message = 'username already in use';
    }
}

export class UserService {

    async add(user: User, credentials: { username: string, password: string }): Promise<User> {
        const existingIdentity = await UserIdentityModel.findOne({'credentials.username': credentials.username});
        if (existingIdentity) {
            throw new UserExistsError();
        }
        const newUser = await UserModel.create(user);

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        await UserIdentityModel.create({
            provider: 'local',
            user: newUser.id,
            credentials: {
                username: credentials.username,
                hashedPassword
            }
        });

        return newUser;
    }

    async getByID(userId: string): Promise<User | null> {
        const user = await UserModel.findById(userId);
        return user ? user.toObject() : null;
    }

    async list(role?: string): Promise<User[]> {

        if (role) {
            return UserModel.find({ role });
        }
        else {
            return UserModel.find();
        }
    }
}

export default new UserService();