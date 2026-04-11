import SkillsEditor from "../components/SkillsEditor";

export default function VistaModule({ userData, isDark, onNavigateToAddSkill }) {
  return <SkillsEditor userData={userData} isDark={isDark} onNavigateToAddSkill={onNavigateToAddSkill} />;
}