'use client'
import { useToast } from './ui/use-toast'

export function Form({
    action,
    children,
    fillInformationForm = false,
}: Readonly<{
    action: any
    children: React.ReactNode
    fillInformationForm?: boolean
}>) {
    const { toast } = useToast()

    function handleSubmit(e: any) {
        action(e)
            .catch(() => {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Un problème est survenu',
                    description: 'Un titre, un hook et un thème sont requis.',
                })
            })
            .finally(() => {
                toast({
                    title: 'Succès',
                    description: 'Votre formulaire a été soumis',
                    variant: 'success',
                })
            })
    }

    return (
        <form
            action={handleSubmit}
            className='flex flex-col space-y-4 px-4 py-1 pb-20 sm:px-16'
        >
            {!fillInformationForm ? (
                <div>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-xs textcolor'
                        >
                            Adresse e-mail
                        </label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='user@acme.com'
                            autoComplete='email'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='password'
                            className='block text-xs textcolor'
                        >
                            Mot de passe
                        </label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <label
                            htmlFor='firstName'
                            className='block text-xs textcolor'
                        >
                            Prénom
                        </label>
                        <input
                            id='firstName'
                            name='firstName'
                            type='text'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='lastName'
                            className='block text-xs textcolor'
                        >
                            Nom de famille
                        </label>
                        <input
                            id='lastName'
                            name='lastName'
                            type='text'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='pseudo'
                            className='block text-xs textcolor'
                        >
                            Pseudo
                        </label>
                        <input
                            id='pseudo'
                            name='pseudo'
                            type='text'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='birthday'
                            className='block text-xs textcolor'
                        >
                            Date de naissance
                        </label>
                        <input
                            id='birthday'
                            name='birthday'
                            type='date'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='location'
                            className='block text-xs textcolor'
                        >
                            Localisation
                        </label>
                        <input
                            id='location'
                            name='location'
                            type='text'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='gender'
                            className='block text-xs textcolor'
                        >
                            Genre
                        </label>
                        <select
                            id='gender'
                            name='gender'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        >
                            <option value=''>
                                --Veuillez choisir une option--
                            </option>
                            <option value='female'>Femme</option>
                            <option value='male'>Homme</option>
                            <option value='hamster'>Confidentiel</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor='experience'
                            className='block text-xs textcolor'
                        >
                            Expériences
                        </label>
                        <input
                            id='experience'
                            name='experience'
                            type='number'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='available'
                            className='block text-xs textcolor'
                        >
                            Disponible
                        </label>
                        <select
                            id='available'
                            name='available'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        >
                            <option value=''>
                                --Veuillez choisir une option--
                            </option>
                            <option value='yes'>Oui</option>
                            <option value='no'>Non</option>
                            <option value='maybe'>Peut-être</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor='mobile'
                            className='block text-xs textcolor'
                        >
                            Mobile
                        </label>
                        <input
                            id='mobile'
                            name='mobile'
                            type='tel'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='allowEmails'
                            className='block text-xs textcolor'
                        >
                            Autoriser les e-mails
                        </label>
                        <select
                            id='allowEmails'
                            name='allowEmails'
                            required
                            className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-inputborder focus:outline-none focus:ring-black sm:text-sm'
                        >
                            <option value=''>
                                --Veuillez choisir une option--
                            </option>
                            <option value='yes'>Oui</option>
                            <option value='no'>Non</option>
                        </select>
                    </div>
                </div>
            )}

            {children}
        </form>
    )
}
