'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";


interface AuthFormProps {
    mode: 'login' | 'register' | 'reset' | 'confirm';
    title: string;
    description?: string;
    submitButtonText: string;
    secondaryAction?: {
        text: string;
        href: string;
        label: string;
    };
    onSubmit: (data: { email: string; password: string }) => Promise<void>;
}

export function AuthForm({
    mode,
    title,
    description,
    submitButtonText,
    secondaryAction,
    onSubmit
}: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSubmit({ email, password });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Ошибка",
                description: "Произошла ошибка при выполнении операции",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                {description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {mode !== 'reset' && (
                        <div>
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : submitButtonText}
                </Button>

                {secondaryAction && (
                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">{secondaryAction.text}</span>{" "}
                        <a
                            href={secondaryAction.href}
                            className="font-medium text-primary hover:underline"
                        >
                            {secondaryAction.label}
                        </a>
                    </div>
                )}
            </form>
        </div>
    );
} 