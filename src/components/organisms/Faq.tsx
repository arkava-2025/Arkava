import React from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  data?: {
    title?: string;
    items?: FaqItem[];
  };
  sectionMeta?: unknown;
};

function Faq({ data }: Props) {
  const title = data?.title ?? 'Preguntas frecuentes sdad';
  const items = data?.items ?? [];

  return (
    <section className="py-12 bg-red-900">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl md:text-3xl font-pp-sans">{title}</h2>
        <div className="mt-6 divide-y divide-gray-200">
          {items.length === 0 ? (
            <p className="text-gray-600">No hay preguntas por el momento.</p>
          ) : (
            <dl className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="pt-4">
                  <dt className="font-medium text-gray-900">{item.question}</dt>
                  <dd className="mt-2 text-gray-700">{item.answer}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

export default Faq;
