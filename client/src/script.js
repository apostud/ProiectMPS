import axios from 'axios';

const ceva = () => {
    for (let i = 0; i < 20; i++) {
        axios.post('/api/teachers', {
            email: `teacher${i}@qresent.upb.ro`,
            firstName: "Teacher",
            lastName: `${i}`,
            password: "Test12345!",
            isAdmin: i % 2,
            role: 'TEACHER'
        })
            .then(() => console.log(i))
    }
}

export default ceva;

