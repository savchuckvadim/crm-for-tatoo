'use client';

// import { supaAuth } from '@/modules/services/db/supabase/model';
import { FormEvent, useState } from 'react';


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoadingScreen from '@/modules/shared/LoadingScreen/ui/LoadingScreen';
import AuthInput from './components/AuthInput';
import { useToast } from '@/components/ui/use-toast';


const getSignupFormData = ({
    setName,
    setSurname,
    setEmail,
    setPassword,
    setPasswordConfirm
}: {
    setName: (string: string) => void;
    setSurname: (string: string) => void;
    setEmail: (string: string) => void;
    setPassword: (string: string) => void;
    setPasswordConfirm: (string: string) => void;
}) => {
    const SignupFormData = [
        {
            id: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Name',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
        },
        {
            id: 'surname',
            label: 'Surname',
            type: 'text',
            placeholder: 'Surname',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Email',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
        },
        {
            id: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Password',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
        },
        {
            id: 'confirm-password',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm Password',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)
        },
    
    ]
    return SignupFormData
}

const SignUpForm = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) => {
    const { toast } = useToast()
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const signupFormData = getSignupFormData({
        setName,
        setSurname,
        setEmail,
        setPassword,
        setPasswordConfirm
    })
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('')
        if (!isLoading) {
            setIsLoading(true)
            if (password !== passwordConfirm) {
                setError('Passwords do not match');
                setIsLoading(false)
                return;
            }
            try {
                // const { user, session } = await supaAuth.register(email, password);

                // if (user && user?.email_confirmed_at && user.role === 'admin') {
                //     return window.location.href = '/admin/projects';
                // } else if (user && !user?.user_metadata.email_verified) {

                //     return window.location.href = '/auth/confirm';
                // } {

                //     return window.location.href = '/';
                // }
            } catch (err: any) {
                setError(err.message || 'Ошибка аутентификации');
            }
        }
        setIsLoading(false)
    };

    return (<div className={cn("flex flex-col justify-center items-center", className)} {...props}>
        {!isLoading
            ? <Card className='border rounded-3xl w-[500px]'>
          
                <CardContent className='p-7'>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            {error && (
                                <div className="text-red-500 text-sm">
                                    {error}
                                </div>
                            )}
                            {signupFormData.map((item) => (
                                <AuthInput key={item.id} {...item} />
                            ))}
                           
                            <Button type="submit" className="w-full mt-2" >
                                Sign up
                            </Button>

                        </div>
                        <p className='text-sm text-neutral-500'>By pressing sign up, you agree to the Terms of Service 
                            and Privacy Policy.
                        </p>
                        <div className="mt-4 text-center text-sm">
                           Already have an account?{" "}
                            <a href="/auth/login" className="underline underline-offset-4"
                                onClick={() => setIsLoading(true)}
                            >
                                Sign in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
            : <LoadingScreen />
        }
    </div>
    )
}
export default SignUpForm