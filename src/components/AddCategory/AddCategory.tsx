'use client';

import React, { useEffect, useState } from 'react';
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