import LoginForm from "@/components/features/auth/LoginForm";
import SignUpForm from "@/components/features/auth/SignUpForm";
import { ROUTES } from "@/constants/routes";
import { useNavigation } from "@/hooks/useNavigation";
import { Wrapper } from "@/styles/common.styles";
import { supabase } from "@/supabase/supabaseClient";
import { LoginFormData, SignUpFormData } from "@/types/auth";
import { useState } from "react";

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

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    if (error) {
      console.log(error);
      alert("로그인에 실패하였습니다.");
    } else {
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

    const { error } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
    });
    if (error) {
      console.log(error);
      alert("회원가입에 실패하였습니다.");
    } else {
      alert("회원가입에 성공하였습니다. 이메일을 확인해주세요.");
      navigateTo(ROUTES.LOGIN);
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
