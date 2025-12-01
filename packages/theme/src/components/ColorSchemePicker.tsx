'use client';

import { useState, useRef } from 'react';
import { Palette } from 'lucide-react';
import { useColorScheme } from '../hook/useColorScheme';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from '../hook/useOutsideClick';
import { ColorScheme } from '../provider/Theme';

const schemeList = [
    { value: 'default', color: '#1E293B' },
    { value: 'blue', color: '#3B82F6' },
    { value: 'violet', color: '#8B5CF6' },
    { value: 'pink', color: '#EC4899' },
    { value: 'red', color: '#EF4444' },
    { value: 'orange', color: '#F97316' },
    { value: 'yellow', color: '#FACC15' },
    { value: 'green', color: '#22C55E' },
    { value: 'bx', color: '#30c3ef' },
    { value: 'beige', color: '#F5F3F0' },
    { value: 'explosive-pink', color: '#bb52d4' },
];

export const ColorSchemePicker = () => {
    const { scheme, setScheme } = useColorScheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, () => setOpen(false));

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                className="cursor-pointer text-foreground p-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setOpen(!open)}
                title="Выбрать цветовую схему"
                aria-label="Выбрать цветовую схему"
                aria-expanded={open}
            >
                <Palette size={20} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 p-4 bg-popover border border-border rounded-md shadow-lg z-[9999]"
                        style={{ minWidth: '200px', maxWidth: '250px' }}
                        role="menu"
                        aria-label="Цветовые схемы"
                    >
                        <div className="grid grid-cols-4 gap-3">
                            {schemeList.map(({ value, color }) => (
                                <button
                                    key={value}
                                    type="button"
                                    className={`cursor-pointer w-10 h-10 rounded-full border-2 transition-all ${scheme === value
                                        ? 'ring-2 ring-primary ring-offset-2 scale-110'
                                        : 'border-border hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        setScheme(value as ColorScheme);
                                        setOpen(false);
                                    }}
                                    title={value}
                                    aria-label={`Выбрать схему ${value}`}
                                    role="menuitem"
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
