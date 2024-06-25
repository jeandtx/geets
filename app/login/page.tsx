import Link from 'next/link'
import { Form } from '@/components/form'
import { signIn } from '@/app/auth'
import { SubmitButton } from '@/components/ui/submit-button'

export default function Login() {
    return (
        <div className='flex h-full w-full items-center justify-center mt-5'>
            <div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl'>
                <div className='flex flex-col space-y-1 bg-white px-4 py-6 pt-8 sm:px-16 '>
                    <h3 className='text-xl font-semibold'>Se connecter</h3>
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
                    <div className='flex flex-row justify-center space-x-4'>
                        <div className='text-center text-sm text-plaintext'>
                            Mot de passe oublié ?{' '}
                        </div>
                        <div className='text-center text-sm text-plaintext'>
                            {'Pas de compte ?'}
                            <Link href='/register' className='text-textblue'>
                                S&apos;inscrire
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
