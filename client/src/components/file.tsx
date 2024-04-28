import React from "react";

interface Iprops {
  createFile: Function
}

export default function File({ createFile }: Iprops) {

  const [filename, setFilename] = React.useState<string>('');
  const handleClick = () => {
    createFile(filename);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };


  return (
    <div>
      <input value={filename} onChange={handleChange} required />
      <button onClick={handleClick}>CreateFile</button>
    </div>
  );
}