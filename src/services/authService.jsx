import { jwtDecode } from "jwt-decode";

const apiUrl = 'http://localhost:8090/api/auth'; // Your backend API URL

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
        throw error; // Propagate the error for handling in the UI or calling code
    }
}

export async function signUp(username, email, password) {
    try {
        const response = await fetch(`${apiUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password}),

        });
        console.log(username,email,password,'aaaaaaaaaaaaaaaaaaaaaaa');
        if (!response.ok) {
            throw new Error('Failed to sign up');

        }
        console.log(username,email,password,'aaaaaaaaaaaaaaaaaaaaaaa');

        const data = await response.json();
        return data; // Return the response data for potential further processing

    } 
    
    
    
    catch (error) {
        console.error('Sign up error:', error);
        throw error; // Propagate the error for handling in the UI or calling code
    }
    

}

export function logout() {
    localStorage.removeItem('token');
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log(token,'aaaaaaaaaaaaaaaaaaaaaaa')
            return null;
            
        }
        return jwtDecode(token);
        
    } catch (error) {
        console.error('Error decoding token:', error);
        console.log(error,'aaaaaaaaaaaaaaaaaaaaaaa')

        return null;
    }
    
}

export function getJwt() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaa')
    return localStorage.getItem('token');
}

