import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("public"); // public por defecto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setUser(data.session.user);
        fetchUserRole(data.session.user.id);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setUserRole("public");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("rol")
      .eq("id", userId)
      .single();
    if (!error && data) setUserRole(data.rol);
    else setUserRole("cliente"); // default por seguridad
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole("public");
  };

  return (
    <AuthContext.Provider value={{ user, userRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
