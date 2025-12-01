/**
 * API клиент для работы с бэкендом
 * Использует @workspace/api-client для типизированных запросов
 */

// После генерации Orval, импорты будут выглядеть так:
// import { AuthControllerService, PortalsControllerService } from '@workspace/api-client';

/**
 * Базовый URL API
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Пример использования API (после генерации):
 * 
 * export async function registerUser(data: RegisterDto) {
 *   return await AuthControllerService.authControllerRegister(data);
 * }
 * 
 * export async function getPortals() {
 *   return await PortalsControllerService.portalsControllerFindAll();
 * }
 */

// Пока API клиент не сгенерирован, используем заглушку
export async function registerUser(data: unknown) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

