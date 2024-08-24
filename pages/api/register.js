export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, nickname, password } = req.body;

        if (!email || !nickname || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // 회원가입 API로 데이터 전송
            const response = await fetch('https://sp-globalnomad-api.vercel.app/6-3/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    nickname,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return res.status(response.status).json({ message: errorData.message || 'Registration failed' });
            }

            const data = await response.json();
            return res.status(200).json(data);

        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}