export class UserEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
    ) { }

    public static fromObject(object: { [key: string]: any }): UserEntity {
        const { id, name, email } = object
        if (!id) throw "Id is required"
        if (!name) throw "Missing name"
        if (!email) throw "Missing email"

        return new UserEntity(id, name, email)
    }
}