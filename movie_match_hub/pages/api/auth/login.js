import { verifyUser } from '../../../utils/memoryDatabase';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email ve şifre gerekli!' });
        }

        // Kullanıcı doğrula
        const isValid = verifyUser(email, password);

        if (!isValid) {
            return res.status(401).json({ error: 'Geçersiz email veya şifre!' });
        }

        return res.status(200).json({ message: 'Giriş başarılı!' });
    }

    return res.status(405).json({ error: 'Sadece POST isteklerine izin var!' });
}
