import config from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class AuthService {

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectID);

        this.account = new Account(this.client);
    }

    async createAccount({ name, email, password }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (user) {
                //call another method
                return this.login({ email, password })
            }
            else {
                return user;
            }
        } catch (err) {
            console.log(err)
        }
    }

    async login({ email, password }) {
        try {

            const session = await this.account.createEmailPasswordSession(
                email,
                password
            );

            return session

        } catch (err) {
            console.log(err)
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get(); // return current information of logged-in user
            console.log(user)
            return user
        } catch (err) {
            console.log(err.message) 
        }
    }

    async logout() {
        try {
            const result = await this.account.deleteSessions();
            return result
        } catch (err) {
            console.log(err)
        }
    }
}

const authService = new AuthService()

export default authService