/**
 * Пример использования API клиента
 * 
 * Этот файл показывает как использовать сгенерированные типы и API клиенты
 * После генерации Orval создаст реальные сервисы и типы
 */

// Пример импорта типов (после генерации)
// import type { User, CreateClientDto, Lead, Deal } from '@workspace/api-client';

// Пример использования API (после генерации)
// import { 
//   AuthControllerService,
//   ClientsControllerService,
//   LeadsControllerService,
//   PortalsControllerService 
// } from '@workspace/api-client';

// Пример регистрации пользователя
/*
const registerUser = async () => {
  try {
    const response = await AuthControllerService.authControllerRegister({
      email: 'user@example.com',
      password: 'password123',
      name: 'John',
      surname: 'Doe',
    });
    console.log('User registered:', response);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
*/

// Пример работы с клиентами
/*
const getClients = async (portalId: string) => {
  try {
    const clients = await ClientsControllerService.clientsControllerFindAll(portalId);
    return clients;
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    throw error;
  }
};

const createClient = async (portalId: string, clientData: CreateClientDto) => {
  try {
    const client = await ClientsControllerService.clientsControllerCreate(portalId, clientData);
    return client;
  } catch (error) {
    console.error('Failed to create client:', error);
    throw error;
  }
};
*/

// Пример работы с лидами
/*
const convertLeadToClient = async (portalId: string, leadId: string) => {
  try {
    const client = await LeadsControllerService.leadsControllerConvertToClient(portalId, leadId);
    return client;
  } catch (error) {
    console.error('Failed to convert lead:', error);
    throw error;
  }
};
*/

// Пример работы с порталами
/*
const getPortals = async () => {
  try {
    const portals = await PortalsControllerService.portalsControllerFindAll();
    return portals;
  } catch (error) {
    console.error('Failed to fetch portals:', error);
    throw error;
  }
};
*/

export {};

