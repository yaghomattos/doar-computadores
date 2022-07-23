import axios from 'axios';

export async function getStaticProps() {
  const response = await axios.get(
    'https://doar-computador-api.herokuapp.com/'
  );

  const alive = await response.data;

  return {
    props: {
      result: alive,
    },
  };
}

export default function Home({ result }) {
  console.log(result);

  return (
    <div>
      <h1>Doação de computadores usados</h1>

      {result.alive ? <p>API online</p> : <p>API offline</p>}
    </div>
  );
}
