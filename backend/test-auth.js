const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAuth() {
  try {
    console.log('🧪 Testing Authentication System...\n');

    // Test 1: Register a vendor
    console.log('1. Testing Registration...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      name: 'Test Vendor',
      email: 'vendor@test.com',
      password: 'password123',
      role: 'vendor',
      phone: '+91 9876543210',
      address: 'Bangalore, Karnataka'
    });
    
    console.log('✅ Registration successful');
    console.log('User:', registerResponse.data.user.name);
    console.log('Role:', registerResponse.data.user.role);
    
    const token = registerResponse.data.token;
    console.log('Token received:', token.substring(0, 20) + '...\n');

    // Test 2: Login
    console.log('2. Testing Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'vendor@test.com',
      password: 'password123'
    });
    
    console.log('✅ Login successful');
    console.log('User:', loginResponse.data.user.name, '\n');

    // Test 3: Get Profile (protected route)
    console.log('3. Testing Protected Route (Get Profile)...');
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Profile retrieved successfully');
    console.log('Profile:', profileResponse.data.user.name, '\n');

    console.log('🎉 All authentication tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAuth();