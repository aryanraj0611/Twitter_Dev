import UserService from "../../src/services/user-service";
import UserRepository from "../../src/repository/user-repository.js"; 

jest.mock('../../src/repository/user-repository.js');

describe('user service signup test', ()=>{
    test('should successfully create a user', async ()=>{
        const data = {
            email: 'a@b.com',
            password: '123456'
        }
        UserRepository.prototype.create.mockReturnValue({
            ...data, createdAt: new Date(), updatedAt: new Date()
        })
        const service = new UserService();
        const response = await service.signup();
        expect(response.email).toBe(data.email);
        
    })
})

describe('Signin Service Tests', () => {

    test('should throw error when no user is found', async () => {

        UserRepository.mockImplementation(() => {
            return {
                findBy: jest.fn().mockResolvedValue(null)
            };
        });

        const userService = new UserService();

        await expect(
            userService.signin({
                email: 'aryan@gmail.com',
                password: '123456'
            })
        ).rejects.toMatchObject({
            message: 'User not found',
            success: false
        });
    });

    test('should throw error when password is incorrect', async () => {

        const mockUser = {
            email: 'aryan@gmail.com',
            comparePassword: jest.fn().mockReturnValue(false)
        };

        UserRepository.mockImplementation(() => {
            return {
                findBy: jest.fn().mockResolvedValue(mockUser)
            };
        });

        const userService = new UserService();

        await expect(
            userService.signin({
                email: 'aryan@gmail.com',
                password: 'wrongpassword'
            })
        ).rejects.toMatchObject({
            message: 'Incorrect password',
            success: false
        });
    });

    test('should login successfully and return token', async () => {

        const mockUser = {
            email: 'aryan@gmail.com',
            comparePassword: jest.fn().mockReturnValue(true),
            genJWT: jest.fn().mockReturnValue('sample_token')
        };

        UserRepository.mockImplementation(() => {
            return {
                findBy: jest.fn().mockResolvedValue(mockUser)
            };
        });

        const userService = new UserService();

        const token = await userService.signin({
            email: 'aryan@gmail.com',
            password: '123456'
        });

        expect(token).toBe('sample_token');
    });

    test('should throw catch error', async () => {

        UserRepository.mockImplementation(() => {
            return {
                findBy: jest.fn().mockRejectedValue(new Error('DB Error'))
            };
        });

        const userService = new UserService();

        await expect(
            userService.signin({
                email: 'aryan@gmail.com',
                password: '123456'
            })
        ).rejects.toThrow('DB Error');
    });

});

