import React, { JSX } from 'react';
import { Answer, Question as TQuestion } from '../../types';

export function Question({
  question,
}: {
  question: TQuestion;
}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit, valið svar:', answerId);
  };

  return (
    <div>
      <h2>{question.body}</h2>
      <form onSubmit={onSubmit}>
        <ul>
          {question.answers.map((answer: Answer) => {
            return (
              <li key={answer.id}>
                <input
                  type="radio"
                  name="answer"
                  value={answer.id}
                  onChange={() => setAnswerId(answer.id)}
                />
                {answer.body}—{answer.correct ? 'RÉTT' : 'RANGT'}
              </li>
            );
          })}
        </ul>
        <button>Svara</button>
      </form>
    </div>
  );
}