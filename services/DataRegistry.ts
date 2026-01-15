import { AuthService, DataService } from './types';
import { mockAuthService } from './mock/auth';
import { mockDataService } from './mock/data';

// This is where we will eventually swap for Real services
const USE_MOCK = true;

export const authService: AuthService = USE_MOCK ? mockAuthService : mockAuthService; // Replace second one later
export const dataService: DataService = USE_MOCK ? mockDataService : mockDataService;
