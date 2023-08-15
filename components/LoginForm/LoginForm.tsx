import { IconExclamationCircle } from '@tabler/icons-react';
import { FC, useState } from 'react';
import {users} from '../../users'
import { useTranslation } from 'next-i18next';

interface Props {
    onSubmit: (username: string, password: string) => void;
}
const LoginForm: FC<Props> = ({ onSubmit }) => {

    const [error, setError] = useState<string | undefined>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setError(undefined)
        
        const username: string = e.target.username.value;
        const password: string = e.target.password.value;

        const index = users.findIndex( u => u.user===username)
        if(index!= -1 && users[index].password === password){
            onSubmit(username, password);
        } else {
            setError('Wrong username or password')
        }
        
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form  className="flex items-center flex-col w-250px" onSubmit={handleSubmit}>
                <input
                    className="w-full flex-1 rounded-md border border-neutral-600 bg-[#202123] px-4 py-3 pr-10 text-[14px] leading-3 text-white"
                    type="text"
                    name="username"
                    placeholder={'Username'}
                    required
                />

                <input
                    className="w-full flex-1 rounded-md border border-neutral-600 bg-[#202123] px-4 py-3 pr-10 text-[14px] leading-3 text-white mt-3"
                    type="password"
                    name="password"
                    placeholder={'Password'}
                    required
                />

                <button 
                    type='submit'
                    className="w-full bg-[#10a37f] text-white text-center cursor-pointer select-none  rounded-md border border-white/20 p-3 px-4 py-3 pr-10 text-[14px] transition-colors duration-200 hover:bg-[#10a37f] hover:bg-opacity-10 mt-6"
                >
                    Log In
                </button>

                { error && <p className="text-[12px] text-[#d00e17] mt-3 flex"><IconExclamationCircle size={16}/>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
