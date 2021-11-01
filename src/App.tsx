import { useEffect, useState } from "react";

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

interface Quote {
  quote: string;
}

function App() {
  const [joke, setJoke] = useState<Joke>();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchJoke = async () => {
      const response = await fetch(
        "https://jokestemp.neillbogie.repl.co/jokes/general/random"
      );
      const jsonBody: Joke[] = await response.json();
      setJoke(jsonBody[0]);
    };

    fetchJoke();
  }, []);

  // useEffect(() => {
  //   fetch("https://jokestemp.neillbogie.repl.co/jokes/general/random")
  //     .then(response => response.json())
  //     .then((jsonBody: Joke[]) => setJoke(jsonBody[0]));
  // }, [])

  useEffect(() => {
    fetch("https://api.kanye.rest/")
      .then((response) => response.json())
      .then((jsonBody: Quote) => setQuotes([...quotes, jsonBody]));
  }, []);

  return (
    <>
      <h1>Joke app</h1>
      {joke && (
        // This is a conditional rendering strategy
        //  using 'short-circuiting': if the left-hand
        //  side of an && is false, then JavaScript
        //  doesn't bother to evaluate the right-hand
        //  side (since the overall expression is false
        //  regardless)
        //
        // Exploiting that feature to conditional render JSX!
        <>
          <p>
            <b>{joke.setup}</b>
          </p>
          <p>
            <i>{joke.punchline}</i>
          </p>
        </>
      )}
      <hr />
      {quotes && (
        <>
          <h1>Kanye Quotes</h1>
          {quotes.map((quote) => (
            <p>{quote.quote}</p>
          ))}
        </>
      )}
    </>
  );
}

export default App;
