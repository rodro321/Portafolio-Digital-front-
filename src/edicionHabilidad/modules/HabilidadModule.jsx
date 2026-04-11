import SkillSelector from "../components/SkillSelector";

export default function HabilidadModule({ isDark, onBack, onSave }) {
  return <SkillSelector isDark={isDark} onBack={onBack} onSave={onSave} />;
}