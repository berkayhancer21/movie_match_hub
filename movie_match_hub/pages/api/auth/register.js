import { addUser, findUser } from '../../../utils/memoryDatabase';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email ve şifre gerekli!' });
        }

        // Kullanıcı zaten var mı kontrol et
        if (findUser(email)) {
            return res.status(400).json({ error: 'Bu email zaten kayıtlı!' });
        }

        // Yeni kullanıcıyı ekle
        addUser({ email, password });
        return res.status(201).json({ message: 'Kayıt başarılı!' });
    }

    return res.status(405).json({ error: 'Sadece POST isteklerine izin var!' });
}
