import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 현재 세션 확인
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setLoading(false);
      }
    };

    // 초기 세션 확인
    checkUser();

    // 인증 상태 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 클린업 함수
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
};
