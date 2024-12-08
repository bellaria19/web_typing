import LoginForm from "@/components/features/auth/LoginForm";
import SignUpForm from "@/components/features/auth/SignUpForm";
import { ROUTES } from "@/constants/routes";
import { useNavigation } from "@/hooks/useNavigation";
import { Wrapper } from "@/styles/common.styles";
import { supabase } from "@/supabase/supabaseClient";
import { LoginFormData, SignUpFormData } from "@/types/auth";
import { useState } from "react";
import { useSettingStore } from "@/store/settingStore";
import { settingsService } from "@/services/settingService";
import { useSessionStore } from "@/store/sessionStore";

const Auth = () => {
  const { navigateTo } = useNavigation();
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loadUserSettings } = useSettingStore();
  const { setSession } = useSessionStore();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      console.log(error);
      alert("로그인에 실패하였습니다.");
    } else {
      if (data.user) {
        console.log(data.session);
        setSession(data.session);
        await loadUserSettings(data.user.id);
      }
      alert("로그인에 성공하였습니다.");
      navigateTo(ROUTES.TYPING);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
      });

      if (error) throw error;

      if (data.user) {
        const { settings } = useSettingStore.getState();
        try {
          await settingsService.saveUserSettings(data.user.id, settings);
          alert("회원가입에 성공하였습니다. 이메일을 확인해주세요.");
          navigateTo(ROUTES.LOGIN);
        } catch (settingsError) {
          console.error("설정 저장 중 오류 발생:", settingsError);
          alert("회원가입은 완료되었으나, 초기 설정 저장에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <Wrapper>
      <div className="flex items-center justify-center p-4">
        <div className="flex w-full gap-8">
          <div className="flex-1">
            <LoginForm
              formData={loginData}
              onChange={handleLoginChange}
              onSubmit={handleLoginSubmit}
            />
          </div>
          <div className="flex-1">
            <SignUpForm
              formData={signUpData}
              onChange={handleSignUpChange}
              onSubmit={handleSignUpSubmit}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Auth;
