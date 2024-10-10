'use client';

export default function Page() {
  return (
    <div>
      <button onClick={() => {
        // const roomId = Math.random().toString(36).substring(2, 15);
        window.location.href = `/room/${Math.floor(Math.random() * 3) + 1}`;
      }}>create new room</button>
    </div>
  );
}
