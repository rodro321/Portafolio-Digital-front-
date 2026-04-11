import RegisterForm from "../components/RegisterForm";

export default function RegisterModule({ onNext, isDark }) {
  return <RegisterForm onNext={onNext} isDark={isDark} />;
}