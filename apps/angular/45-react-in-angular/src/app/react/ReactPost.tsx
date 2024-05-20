// import React from 'react';

export default function ReactPost(props: {
  title?: string;
  description?: string;
  pictureLink?: string;
  selected?: boolean;
  handleClick: () => void;
}) {
  return (
    <div className={props.selected ? 'bg-blue-100' : 'bg-white'}>
      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        <img
          className="h-32 w-full object-cover"
          src={props.pictureLink}
          alt={props.title}></img>
        <div className="flex flex-col gap-2 px-6 py-4">
          <div className="mb-2 text-xl font-bold">{props.title}</div>
          <p className="text-base text-gray-700">{props.description}</p>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={props.handleClick}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
