'use client'; // Nauðsynlegt í Next.js 13 ef þú notar client-hliðar virkni

import React, { useEffect, useState } from 'react';
import xss from 'xss';
import { QuestionsApi } from '@/api';
import { AnswerPostBody, Category, QuestionPostBody } from '@/types';
import { useRouter } from 'next/navigation';

export default function Form() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);

      const api = new QuestionsApi();
      const result = await api.getCategories();
      if (!result) {
        setError('Tókst ekki að sækja flokka');
        setLoading(false);
        return;
      }
      setCategories(result);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  function handleAddAnswer() {
    const container = document.getElementById('answers');
    if (!container) return;

    const count = container.getElementsByClassName('answer').length;

    const div = document.createElement('div');
    div.className = 'answer';
    
    const radioId = `correct_${count}`;
    div.innerHTML = `
      <input
        type="text"
        name="answerBody[]"
        placeholder="Svarmöguleiki ${count + 1}"
        required
      />
      <input
        type="radio"
        name="correctIndex"
        value="${count}"
        required
        id="${radioId}"
      />
      <label for="${radioId}">Rétt svar</label>
    `;
    container.appendChild(div);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { currentTarget: form } = e;

    const questionBody = formData.get('body')?.toString().trim();
    const categorySlug = formData.get('categorySlug');
    const answerBodies = formData.getAll('answerBody[]').map((val) => val.toString().trim());
    const correctIndex = formData.get('correctIndex');

    if (!questionBody || !categorySlug || answerBodies.length === 0 || correctIndex === null) {
      alert('Vinsamlegast fylltu út spurningu, flokk og svarmöguleika');
      return;
    }

    if (questionBody.length > 100) {
        alert('Spurning má ekki vera lengri en 100 stafir.');
        return;
    }

    if (answerBodies.length < 2) {
        alert('Þú verður að hafa a.m.k. tvo svarmöguleika');
        return;
    }

    for (let i = 0; i < answerBodies.length; i++) {
        if (!answerBodies[i]) {
          alert(`Svarmöguleiki nr. ${i + 1} má ekki vera tómur`);
          return;
        }
        if (answerBodies[i].length > 50) {
          alert(`Svarmöguleiki nr. ${i + 1} má ekki vera lengri en 50 stafir.`);
          return;
        }
      }

    const answers: AnswerPostBody[] = answerBodies.map((bodyValue, i) => ({
      body: xss(bodyValue.toString()),
      correct: i.toString() === correctIndex, 
    }));

    const questionPayload: QuestionPostBody = {
      body: xss(questionBody.toString()),
      categorySlug: categorySlug.toString(),
      answers,
    };

    const api = new QuestionsApi();
    const success = await api.createQuestion(questionPayload);

    if (!success) {
      alert('Mistókst að búa til spurningu');
      return;
    }

    router.push('/questionCreated'); 
    form.reset();
  }

  if (loading) {
    return <div>Sæki flokka...</div>;
  }
  
  if (error) {
    return <div>Villa: {error}</div>;
  }

  return (
      <form className='form' onSubmit={handleSubmit}>
        <div className="spurning">
          <label htmlFor="questionBody">Question</label>
          <textarea
            id="questionBody"
            name="body"
            placeholder="Skrifa spurningu:"
            required
          />
        </div>

        <div className="heiti-flokks">
          <label htmlFor="categorySlug">Heiti flokks:</label>
          <select id="categorySlug" name="categorySlug" required defaultValue="">
            <option value="" disabled>
              Veldu flokk
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div id="answers">
          <div className="answer">
            <input
              type="text"
              name="answerBody[]"
              placeholder="Svarmöguleiki 1"
              required
            />
            <input
              type="radio"
              name="correctIndex"
              value="0"
              required
              id="correct_0"
            />
            <label htmlFor="correct_0">Rétt svar</label>
          </div>
          <div className="answer">
            <input
              type="text"
              name="answerBody[]"
              placeholder="Svarmöguleiki 2"
              required
            />
            <input
              type="radio"
              name="correctIndex"
              value="1"
              id="correct_1"
            />
            <label htmlFor="correct_1">Rétt svar</label>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddAnswer}
        >
          Bæta við svarmöguleika
        </button>

        <button type="submit">Senda inn</button>
      </form>
  );
}
