import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
          username: username,
          password: password,
      }

        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/login',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        });

        console.log(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default LoginForm;


// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography } from '@mui/material';

// interface UserRegister {
//   firstname?: string;
//   lastname?: string;
//   email?: string;
//   password?: string;
// }

// export const LoginForm: React.FC = () => {
//   const [formData, setFormData] = useState<UserRegister>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: '100%', maxWidth: 400, m: 'auto' }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Login to app</Typography>

//       <TextField
//         name="username"
//         label="Email"
//         type="email"
//         variant="outlined"
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         name="password"
//         label="Password"
//         type="password"
//         variant="outlined"
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//       />
//       <Button type="submit" variant="contained" color="primary" fullWidth>
//         Login
//       </Button>
//     </Box>
//   );
// };
