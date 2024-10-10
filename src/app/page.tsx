'use client';

import React, { useState } from 'react';

export default function Page() {
  const [welcomeData, setWelcomeData] = useState<
    Array<{
      id: string,
      title: string,
      description: string
    }>
  >([]);

  const [tileInfo, setTileInfo] = useState<{ title?: string, description?: string } | null>(null);

  const addNewElement = () => {
    if (welcomeData.length >= 55) {
      return;
    }

    setWelcomeData((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        title: tileInfo?.title || '',
        description: tileInfo?.description || ''
      },
    ]);

    setTileInfo(null);
  }

  const renderContent = ({
    id,
    title,
    description
  }: {
    id: string;
    title: string;
    description: string;
  }) => {
    return (
      <div
        key={id}
        className="flex flex-col gap-1 bg-gray-50 opacity-0 opacity-100 shadow line-clamp-1 p-2 rounded-xl w-[10rem] h-[10rem] animate-fade-in duration-1000"
      >
        {title ? (
          <p>
            {title}
          </p>
        ) : null}

        {description ? (
          <p>
            {description}
          </p>
        ) : null}

        <button className='bg-slate-400 hover:bg-slate-200 mt-auto py-2 rounded-lg'
          onClick={() => setWelcomeData((prev) => prev.filter((data) => data.id !== id))}>
          Удалить
        </button>
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-row gap-4'>
        <button
          onClick={addNewElement}
          className='bg-[--color-brand-lighten] hover:bg-[--color-brand-light] px-2 py-3 rounded-lg w-[15rem] text-[--color-brand-dark] hover:text-[--color-secondary] cursor-pointer'
        >
          Добавить элемент
        </button>
        <input
          type='text'
          onChange={(e) =>
            setTileInfo((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder='Title'
          className='border-2 border-gray-300 px-2 rounded-lg'
        />
        <input
          type='text'
          onChange={(e) =>
            setTileInfo((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder='Description'
          className='border-2 border-gray-300 px-2 rounded-lg'
        />
      </div>

      <div className='flex flex-row flex-wrap gap-4'>
        {welcomeData.map((data) => renderContent(data))}
      </div>
    </>
  );
}
