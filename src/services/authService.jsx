import { jwtDecode } from "jwt-decode";

const apiUrl = 'http://localhost:8090/api/auth'; 

export async function signIn(username, password) {
    try {
        const response = await fetch(`${apiUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Failed to sign in');
        }
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('roles', JSON.stringify(data.roles));

    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
}

export async function signUp(username, email, password) {
    try {
        const response = await fetch(`${apiUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) {
            throw new Error('Failed to sign up');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Sign up error:', error);
        throw error; 
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem('accessToken'); // Ensure you are retrieving the access token
        if (!token) {
            console.log('No token found in localStorage');
            return null;
        }
        console.log('Token from localStorage:', token); // Log the token

        // Decode and return the token payload
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export function getJwt() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaa')
    return localStorage.getItem('token');
}

