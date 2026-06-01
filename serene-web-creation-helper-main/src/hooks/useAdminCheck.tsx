import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { clientConfig } from "@/client.config";

export const useAdminCheck = () => {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
          if (user?.email) {
                  const adminEmails = clientConfig.adminEmails;
                  const isAdminUser = user.email.includes('admin') || adminEmails.includes(user.email);
                  setIsAdmin(isAdminUser);
          } else {
                  setIsAdmin(false);
          }
    }, [user]);

    return isAdmin;
};
