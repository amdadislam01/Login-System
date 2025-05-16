document.addEventListener('DOMContentLoaded', function () {
    // Get form elements
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutBtn = document.getElementById('logout-btn');

    // User database (in a real app, this would be server-side)
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Signup form submission
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('signup-password').value;

        // Simple validation
        if (!username || !email || !phone || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        // Check if user already exists
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert('Email already registered');
            return;
        }

        // Add new user
        users.push({
            username,
            email,
            phone,
            password
        });

        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        document.getElementById('chk').checked = true;
        this.reset();
    });

    // Login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        // Find user
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Successful login
            document.querySelector('.main').style.display = 'none';
            welcomeMessage.classList.remove('hidden');
            document.getElementById('display-name').textContent = user.username;
        } else {
            alert('Invalid email or password');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function () {
        welcomeMessage.classList.add('hidden');
        document.querySelector('.main').style.display = 'block';
        loginForm.reset();
        document.getElementById('chk').checked = false;
    });
});