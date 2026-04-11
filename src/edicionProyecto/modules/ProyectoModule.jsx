import ProyectoForm from "../components/ProyectoForm";

export default function ProyectoModule({ isDark, onBack, onSave }) {
  return <ProyectoForm isDark={isDark} onBack={onBack} onSave={onSave} />;
}