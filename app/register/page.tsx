import Link from 'next/link'
import { Form } from '@/components/form'
import { redirect } from 'next/navigation'
import { createUser, getUser } from '@/app/db'
import { signIn } from '@/app/auth'
import { SubmitButton } from '@/components/ui/submit-button'
import { generateVerificationToken } from '@/lib/crypto'
import { sendEmail } from '@/lib/mailer'

export default function Login() {
    async function register(formData: FormData) {
        'use server'
        let email = formData.get('email') as string
        let password = formData.get('password') as string
        let user = await getUser(email)

        if (user) {
            console.log('User already exists')
            return 'User already exists'
        } else {
            const verificationToken = generateVerificationToken()
            const verificationTokenExpires = new Date()
            verificationTokenExpires.setHours(
                verificationTokenExpires.getHours() + 1
            ) // 1 hour expiration

            const result = await createUser(
                email,
                password,
                verificationToken,
                verificationTokenExpires
            )
            console.log('User created')

            await sendEmail({
                email,
                emailType: 'verify',
                userId: result.insertedId,
            })

            // Automatically sign in the user after successful registration
            await signIn('credentials', {
                redirectTo: '/fill-information',
                email: email,
                password: password,
            })
        }
    }

    return (
        <div className='flex w-full items-center justify-center'>
            <div className='z-10 w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white'>
                <div className='flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16	'>
                    <h3 className='text-xl font-semibold'>S&apos;inscire</h3>
                    <div className='text-sm text-gray-500'>
                        Rejoignez notre plateforme et découvrez de nouveaux
                        projets
                    </div>
                </div>
                <Form action={register}>
                    <SubmitButton
                        style={{
                            backgroundColor: 'rgb(58, 93, 240)',
                            color: 'white',
                        }}
                    >
                        S&apos;inscire
                    </SubmitButton>
                    <div className='text-center text-xs text-gray-500'>
                        {'Vous avez déjà un compte ? '}
                        <Link
                            href='/fill-information'
                            className='font-semibold text-textblue'
                        >
                            Connectez-vous
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}
