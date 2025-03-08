
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  isPremium: boolean;
  usageCount: number;
  name?: string;
}

interface Blueprint {
  id: string;
  userId: string;
  title: string;
  description: string;
  requirements: string;
  blueprint: string; // JSON string of blueprint data
  createdAt: string;
  updatedAt: string;
}

// Mock localStorage database for frontend-only prototype
// In a real application, this would be replaced with actual backend calls
class DatabaseService {
  private static instance: DatabaseService;
  private users: Record<string, User> = {};
  private blueprints: Blueprint[] = [];
  private currentUser: User | null = null;
  
  private constructor() {
    // Load data from localStorage
    this.loadFromStorage();
  }
  
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }
  
  private loadFromStorage() {
    try {
      const usersData = localStorage.getItem('users');
      const blueprintsData = localStorage.getItem('blueprints');
      const currentUserData = localStorage.getItem('currentUser');
      
      if (usersData) {
        this.users = JSON.parse(usersData);
      }
      
      if (blueprintsData) {
        this.blueprints = JSON.parse(blueprintsData);
      }
      
      if (currentUserData) {
        this.currentUser = JSON.parse(currentUserData);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }
  
  private saveToStorage() {
    try {
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('blueprints', JSON.stringify(this.blueprints));
      if (this.currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }
  
  public async register(email: string, password: string, name?: string): Promise<User> {
    if (this.users[email]) {
      throw new Error('User already exists');
    }
    
    const user: User = {
      id: Date.now().toString(),
      email,
      isPremium: false,
      usageCount: 0,
      name,
    };
    
    // Store user (in real app, we would hash the password)
    this.users[email] = user;
    this.currentUser = user;
    this.saveToStorage();
    
    return user;
  }
  
  public async login(email: string, password: string): Promise<User> {
    const user = this.users[email];
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, we would check the password hash
    
    this.currentUser = user;
    this.saveToStorage();
    
    return user;
  }
  
  public async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.saveToStorage();
  }
  
  public getCurrentUser(): User | null {
    return this.currentUser;
  }
  
  public async updateUserToPremium(): Promise<User> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }
    
    this.currentUser.isPremium = true;
    this.users[this.currentUser.email] = this.currentUser;
    this.saveToStorage();
    
    return this.currentUser;
  }
  
  public async incrementUsageCount(): Promise<User> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }
    
    this.currentUser.usageCount += 1;
    this.users[this.currentUser.email] = this.currentUser;
    this.saveToStorage();
    
    return this.currentUser;
  }
  
  public async saveBlueprint(blueprintData: Omit<Blueprint, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Blueprint> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }
    
    const now = new Date().toISOString();
    
    const blueprint: Blueprint = {
      id: Date.now().toString(),
      userId: this.currentUser.id,
      ...blueprintData,
      createdAt: now,
      updatedAt: now,
    };
    
    this.blueprints.push(blueprint);
    this.saveToStorage();
    
    return blueprint;
  }
  
  public async updateBlueprint(id: string, blueprintData: Partial<Omit<Blueprint, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Blueprint> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }
    
    const index = this.blueprints.findIndex(bp => bp.id === id);
    
    if (index === -1) {
      throw new Error('Blueprint not found');
    }
    
    const blueprint = this.blueprints[index];
    
    if (blueprint.userId !== this.currentUser.id) {
      throw new Error('Unauthorized');
    }
    
    const updatedBlueprint: Blueprint = {
      ...blueprint,
      ...blueprintData,
      updatedAt: new Date().toISOString(),
    };
    
    this.blueprints[index] = updatedBlueprint;
    this.saveToStorage();
    
    return updatedBlueprint;
  }
  
  public async getBlueprints(): Promise<Blueprint[]> {
    if (!this.currentUser) {
      return [];
    }
    
    return this.blueprints.filter(bp => bp.userId === this.currentUser!.id);
  }
  
  public async getBlueprintById(id: string): Promise<Blueprint | null> {
    if (!this.currentUser) {
      return null;
    }
    
    const blueprint = this.blueprints.find(bp => bp.id === id);
    
    if (!blueprint || blueprint.userId !== this.currentUser.id) {
      return null;
    }
    
    return blueprint;
  }
  
  public async deleteBlueprint(id: string): Promise<void> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }
    
    const index = this.blueprints.findIndex(bp => bp.id === id);
    
    if (index === -1) {
      throw new Error('Blueprint not found');
    }
    
    const blueprint = this.blueprints[index];
    
    if (blueprint.userId !== this.currentUser.id) {
      throw new Error('Unauthorized');
    }
    
    this.blueprints.splice(index, 1);
    this.saveToStorage();
  }
  
  public canGenerateBlueprint(): boolean {
    if (!this.currentUser) {
      return false;
    }
    
    return this.currentUser.isPremium || this.currentUser.usageCount < 3;
  }
}

export const db = DatabaseService.getInstance();
