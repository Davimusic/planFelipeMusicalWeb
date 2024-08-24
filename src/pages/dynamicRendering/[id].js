import { useRouter } from 'next/router';

function render() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Hola, {id}!</h1>
    </div>
  );
}

export default render;
