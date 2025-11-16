import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User, UserRole } from '../entities/User';
import { RegisterDTO, LoginDTO, AuthResponse, JWTPayload } from '../types/auth.types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(data: RegisterDTO): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userRepository.findOne({ 
      where: { email: data.email } 
    });
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || UserRole.EMPLOYEE
    });

    await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(data: LoginDTO): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ 
      where: { email: data.email } 
    });
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    };
  }

  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async getUserById(userId: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}