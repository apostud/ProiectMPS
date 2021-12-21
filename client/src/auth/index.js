import axios from 'axios';

/**
 * Add user data to local storage or session storage
 */
export const authenticate = (data, next) => {
    const storage = data.remember ? window.localStorage : window.sessionStorage;

    if (typeof window !== 'undefined') {
        storage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

/**
 * Reauthenticate user
 */
export const updateAuth = (next) => {
    const data = isAuthenticated();

    if (!data) {
        return;
    }

    authenticate(data, next);
};

/**
 * Log user out and remove the data stored in browser memory
 * @param next - a callback that executes after logout
 */
export const signOut = (next) => {
    if (typeof window !== 'undefined') {
        const token = isAuthenticated().token;

        if (!token) {
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        localStorage.removeItem('jwt');
        sessionStorage.removeItem('jwt');

        axios.get('/api/auth/logout', config)
            .then(response => console.log(response))
            .catch(err => console.log(err));

        next();
    }
};

/**
 * Check if the user is authenticated
 * @returns JWT token stored in browser memory | false if not authenticated
 */
export const isAuthenticated = () => {
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }

    if (sessionStorage.getItem('jwt')) {
        return JSON.parse(sessionStorage.getItem('jwt'));
    }

    return false;
};