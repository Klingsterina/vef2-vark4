'use client';

import xss from 'xss';
import { QuestionsApi } from '@/api';
import { CategoryPostBody } from '@/types';
import { useRouter } from 'next/navigation';


export default function AddCategory() {
    const router = useRouter();
    

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { currentTarget: form } = e;
        const formData = new FormData(form);

        const categoryName = xss(formData.get('categoryName') as string);

        if (categoryName.length < 3) {
            alert('Titill þarf að vera að minnsta kosti 3 stafir!');
            return;
        }
        
        if (categoryName.length > 20) {
            alert('Titill má að hámarki vera 20 stafir!');
            return;
        }
        const api = new QuestionsApi();
        const body: CategoryPostBody = {
            title: categoryName
        }
        const success = await api.createCategory(body);

        if (!success) {
            alert('Ekki tókst að búa til flokk');
            return;
        }

        router.push('/categoryCreated');
        form.reset();
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="spurning">
                <label htmlFor="categoryName">Category Name</label>
                <input type="text" id="categoryName" name="categoryName" required />
            </div>
            <button type="submit">Senda</button>
        </form>
    )
}