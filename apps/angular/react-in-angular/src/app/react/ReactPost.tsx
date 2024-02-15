// import React from 'react';

export default function ReactPost(props: {
  title?: string,
  description?: string,
  pictureLink?: string,
  selected?: boolean,
  handleClick: () => void
}) {
  return (
    <div className={props.selected ? 'bg-blue-100' : 'bg-white'}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full h-32 object-cover" src={props.pictureLink} alt={props.title}></img>
        <div className="px-6 py-4 flex flex-col gap-2">
          <div className="font-bold text-xl mb-2">{props.title}</div>
          <p className="text-gray-700 text-base">
            {props.description}
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={props.handleClick}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
