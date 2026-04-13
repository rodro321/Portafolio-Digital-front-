import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const INITIAL_USER_DATA = {
  techSkills: [],
  softSkills: [],
  proyectos: [],
};

export const AppProvider = ({ children }) => {
  const [userData, setUserDataState] = useState(() => {
    try {
      const saved = localStorage.getItem("portagen_userData");
      return saved ? JSON.parse(saved) : INITIAL_USER_DATA;
    } catch { return INITIAL_USER_DATA; }
  });

  useEffect(() => {
    const toSave = {
      ...userData,
      preview: null,
      proyectos: (userData.proyectos || []).map(p => ({ ...p, imagenes: [] })),
    };
    localStorage.setItem("portagen_userData", JSON.stringify(toSave));
  }, [userData]);

  const setUserData = (updater) =>
    setUserDataState(s =>
      typeof updater === "function" ? updater(s) : { ...s, ...updater }
    );

  const resetState = () => {
    localStorage.removeItem("portagen_userData");
    setUserDataState(INITIAL_USER_DATA);
  };

  return (
    <AppContext.Provider value={{ userData, setUserData, resetState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);