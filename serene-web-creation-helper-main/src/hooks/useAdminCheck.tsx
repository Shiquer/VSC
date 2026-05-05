import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const useAdminCheck = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.email) {
      // Check if user email contains "admin" or is in the authorized list
      const adminEmails = ['admin@example.com', 'christopher@sophrologue.com', 'quershichristopher@gmail.com'];
      const isAdminUser = user.email.includes('admin') || adminEmails.includes(user.email);
      setIsAdmin(isAdminUser);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return isAdmin;
};