import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detecta sesión activa
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        fetchUserRole(data.session.user.id);
      }
      setLoading(false);
    });

    // Listener de cambios de auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchUserRole(session.user.id);
        } else {
          setUser(null);
          setRole(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Obtiene rol desde tabla pública users
  const fetchUserRole = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("rol")
      .eq("id", userId)
      .single();

    if (error) {
      console.warn("No se pudo obtener rol de usuario:", error.message);
      setRole("cliente"); // fallback
    } else {
      setRole(data.rol);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar auth
export const useAuth = () => useContext(AuthContext);
