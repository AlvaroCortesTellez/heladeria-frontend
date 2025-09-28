// src/components/auth/AuthProvider.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import supabase from "../../lib/supabaseClient";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    setUser(user);
    return user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
