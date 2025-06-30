// src/services/mockAPI.js

const API_BASE = 'https://api.spamdetector.com';

export const mockAPI = {
  login: async (phone, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (phone === '1234567890' && password === 'password') {
      return { 
        token: 'mock-jwt-token', 
        user: { id: 1, name: 'John Doe', phone, email: 'john@example.com' } 
      };
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      token: 'mock-jwt-token', 
      user: { id: 2, ...userData } 
    };
  },
  
  searchByName: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockData = [
      { id: 1, name: 'Alice Johnson', phone: '9876543210', spamLikelihood: 0.1 },
      { id: 2, name: 'Alice Smith', phone: '9876543211', spamLikelihood: 0.8 },
      { id: 3, name: 'Bob Alice', phone: '9876543212', spamLikelihood: 0.3 },
      { id: 4, name: 'Charlie Brown', phone: '9876543213', spamLikelihood: 0.6 },
      { id: 5, name: 'David Wilson', phone: '9876543214', spamLikelihood: 0.2 }
    ];
    
    return mockData
      .filter(person => 
        person.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query.toLowerCase());
        const bStarts = b.name.toLowerCase().startsWith(query.toLowerCase());
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });
  },
  
  searchByPhone: async (phone) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      { 
        id: 1, 
        name: 'Alice Johnson', 
        phone, 
        spamLikelihood: 0.2, 
        isRegistered: true 
      }
    ];
  },
  
  getPersonDetails: async (id, userInContacts = false) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockDetails = {
      1: { name: 'Alice Johnson', phone: '9876543210', spamLikelihood: 0.2 },
      2: { name: 'Alice Smith', phone: '9876543211', spamLikelihood: 0.8 },
      3: { name: 'Bob Alice', phone: '9876543212', spamLikelihood: 0.3 },
      4: { name: 'Charlie Brown', phone: '9876543213', spamLikelihood: 0.6 },
      5: { name: 'David Wilson', phone: '9876543214', spamLikelihood: 0.2 }
    };
    
    const person = mockDetails[id] || mockDetails[1];
    return {
      id,
      ...person,
      email: userInContacts ? `${person.name.toLowerCase().replace(' ', '.')}@example.com` : null,
      isRegistered: Math.random() > 0.3
    };
  },
  
  reportSpam: async (phone) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: `Successfully reported ${phone} as spam` };
  }
};