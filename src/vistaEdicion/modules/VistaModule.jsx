
import SkillsEditor from "../components/SkillsEditor";

export default function VistaModule({ userData, isDark, onGoToHabilidad, onGoToProyecto, onBack }) {
  return (
    <SkillsEditor
      userData={userData}
      isDark={isDark}
      onGoToHabilidad={onGoToHabilidad}
      onGoToProyecto={onGoToProyecto}
      onBack={onBack}
    />
  );
}