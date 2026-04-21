import UserRepository from "../repository/user-repository.js";

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup(data){
        try {
            const user = await this.userRepository.create(data);      
            return user;
        } catch (error) {
            throw error;
        }
        
    }
}

export default UserService;