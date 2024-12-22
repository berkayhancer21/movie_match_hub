import '../styles/globals.css';
import { createContext, useState, useContext } from 'react';

// Kullanıcı durumu için AuthContext oluşturuyoruz
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null); // Kullanıcı durumu (giriş yapmış kullanıcı bilgisi)

  return (
      <AuthContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
  );
}

export default MyApp;
