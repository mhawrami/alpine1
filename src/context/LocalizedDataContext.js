import { createContext, useContext } from 'react';

export const LocalizedDataContext = createContext(null);

export const useLocalizedData = () => useContext(LocalizedDataContext);
