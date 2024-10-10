export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // if (id) {
  //   return <Room id={id} />;
  // }

  return (
    <div>
      <h1>Room {id} is not exist </h1>
    </div>
  );
}
