export async function getStaticProps() {
  const data = await fetch('https://doar-computador-api.herokuapp.com/');

  const alive = await data.json();

  return {
    props: {
      result: alive,
    },
  };
}

export default function Home({ result }) {
  console.log(result);

  return <h1>Doação de computadores usados</h1>;
}
