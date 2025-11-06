import { createContext, useState, ReactNode } from "react";

interface User {
    id: number;
    username: string;
    email: string;
    role: "admin" | "user";
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: () => { },
    isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        // Simulación de login (en producción sería una llamada a API)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (username && password) {
            setUser({
                id: 1,
                username: username,
                email: `${username}@example.com`,
                role: username === "admin" ? "admin" : "user",
            });
        } else {
            throw new Error("Credenciales inválidas");
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext
            value={{
                user,
                login,
                logout,
                isAuthenticated: user !== null,
            }}
        >
            {children}
        </AuthContext>
    );
}

