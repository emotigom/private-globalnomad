// pages/api/users.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
    const { email, nickname, password } = req.body;


    try {
    // 외부 회원가입 API로 데이터 전송
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
        return res.status(response.status).json({ message: errorData.message || '회원가입에 실패했습니다.' });
        
    }

    const data = await response.json();
    return res.status(200).json(data);
    } catch (error) {
    return res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
    }
} else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `허용되지 않는 메서드: ${req.method}` });
}
}
