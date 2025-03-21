import React, { JSX } from 'react';
import { Answer, Question as TQuestion } from '../../types';

export function Question({
  question,
}: {
  question: TQuestion;
}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);
  // Til að sýna/hafa stjórn á því hvort notandi hafi sent svarið
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Athugum hvaða svar notandinn valdi
    const chosenAnswer = question.answers.find((a) => a.id === answerId);
    if (!chosenAnswer) {
      console.log('Enginn valdi svar');
      return;
    }

    if (chosenAnswer.correct) {
      console.log('Rétt svar!');
    } else {
      console.log('Rangt svar!');
    }
  };

  return (
    <li className='space'>
      <p className="question">{question.body}</p>
      <p className="bold">Svarmöguleikar:</p>
      <form className='answer-list' onSubmit={onSubmit}>
        <ol>
          {question.answers.map((answer: Answer) => {
            const isChosen = answerId === answer.id;
            const liClassName =
              submitted && isChosen
                ? answer.correct
                  ? 'answer-list correct'
                  : 'answer-list incorrect'
                : 'answer-list';

            return (
              <li className={liClassName} key={answer.id}>
                <input
                  type="radio"
                  name="answer"
                  value={answer.id}
                  checked={isChosen}
                  onChange={() => {
                    setAnswerId(answer.id);
                    setSubmitted(false); // Endurstilla ef notandi skiptir um svar
                  }}
                />
                <label>{answer.body}</label>
              </li>
            );
          })}
        </ol>
        <button type="submit">Senda svar</button>
      </form>
    </li>
  );
}
