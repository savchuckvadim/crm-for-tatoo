import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export type ColorScheme =
    | 'default'
    | 'blue'
    | 'violet'
    | 'pink'
    | 'green'
    | 'yellow'
    | 'orange'
    | 'red' | 'bx' | 'beige' | 'explosive-pink';
export const ColorSchemes = [
    'default',
    'blue',
    'violet',
    'pink',
    'green',
    'yellow',
    'orange',
    'red',
    'bx',
    'beige',
    'explosive-pink',
] as const;

interface ColorContextValue {
    scheme: ColorScheme;
    setScheme: (s: ColorScheme) => void;
}

export const ColorContext = createContext<ColorContextValue | null>(null);

export const AprilThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [scheme, setScheme] = useState<ColorScheme>('default');
    const { theme, resolvedTheme } = useTheme(); // light / dark / system

    useEffect(() => {
        const stored = localStorage.getItem('color-scheme') as ColorScheme;
        if (stored && ColorSchemes.includes(stored)) {
            setScheme(stored);
        }
    }, []);

    useEffect(() => {
        // Используем resolvedTheme чтобы получить реальную тему (light/dark), а не 'system'
        const actualTheme = resolvedTheme || theme || 'light';
        const className = `${scheme}-${actualTheme}`;
        
        // Удаляем все возможные классы тем
        document.documentElement.classList.remove(
            ...ColorSchemes.flatMap(s => [`${s}-light`, `${s}-dark`]),
        );
        
        // Добавляем текущий класс темы
        document.documentElement.classList.add(className);
        localStorage.setItem('color-scheme', scheme);
    }, [scheme, theme, resolvedTheme]);

    return (
        <ColorContext.Provider value={{ scheme, setScheme }}>
            {children}
        </ColorContext.Provider>
    );
};
