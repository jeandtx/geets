import Link from 'next/link'
import { Form } from '@/components/form'
import { signIn } from '@/app/auth'
import { SubmitButton } from '@/components/ui/submit-button'

export default function Login() {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white'>
                <div className='flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16'>
                    <h3 className='text-xl font-semibold'>Se connecter</h3>
                    <div className='text-sm text-gray-500'>
                        Connectez-vous à notre plateforme et participez à des
                        projets
                    </div>
                </div>
                <Form
                    action={async (formData: FormData) => {
                        'use server'
                        await signIn('credentials', {
                            redirectTo: '/' + formData.get('email'),
                            email: formData.get('email') as string,
                            password: formData.get('password') as string,
                        })
                    }}
                >
                    <SubmitButton
                        style={{
                            backgroundColor: 'rgb(58, 93, 240)',
                            color: 'white',
                        }}
                    >
                        Se connecter
                    </SubmitButton>
                    <div className='flex flex-row justify-center space-x-2'>
                        <div className='text-center text-xs text-gray-500'>
                            {'Pas de compte ? '}
                            <Link
                                href='/register'
                                className='font-semibold text-textblue'
                            >
                                Inscrivez-vous
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
