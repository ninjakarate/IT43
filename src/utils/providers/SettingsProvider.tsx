import React, { createContext, useContext, useState } from 'react';
import { SettingsType } from '../types';
import { map } from '../assets/map';

const SettingsContext = createContext<{
    settings: SettingsType;
    setSettings: (v: SettingsType | ((prev: SettingsType) => SettingsType)) => void;
}>(null!);

export const SettingsProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [settings, setSettings] = useState<SettingsType>({
        isShading: true,
        isWiggling: true,
        isShowFps: true,
        map: map,
    });

    return (
        <SettingsContext.Provider value={
            {
                settings,
                setSettings,
            }
        }>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    return useContext(SettingsContext);
};
