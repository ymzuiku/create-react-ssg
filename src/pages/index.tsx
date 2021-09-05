import { useState } from "react";

export default function Index() {
  const [num, setNum] = useState(0);
  function handleAddNum() {
    setNum(num + 1);
  }

  return (
    <div>
      num: {num}
      <button className="bg-gray-200 p-2 m-3" onClick={handleAddNum}>
        add num
      </button>
    </div>
  );
}
