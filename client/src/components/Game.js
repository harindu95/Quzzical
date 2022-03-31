import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Button } from "@mui/material";
import ChatBox from "./ChatBox";
function Game(props) {
  const [index, setIndex] = useState(0);
  const [apiData, setData] = useState(undefined);
  const [questions, setQuestions] = useState([]);

  const handleClick = (e) => {
    console.log(questions);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  const getQuestions = async () => {
    await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let _questions = [];
        data.results.forEach((element) => {
          const splice = Math.floor(Math.random() * 4);

          let answers = element.incorrect_answers;

          answers.splice(splice, 0, element.correct_answer);
          answers.join();
          const question = {
            question: decodeURIComponent(element.question),
            answers: answers,
            correct_answer: element.correct_answer,
          };
          _questions.push(question);
        });

        setQuestions(_questions);
        console.log(questions);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  if (questions.length < 5) {
    return <h1>loading game...</h1>;
  } else {
    console.log(questions);
    return (
      <Container maxWidth="xl" className="game">
        <Grid spacing={1} container>
          <Grid item xs={12} md={12}>
            <div className="question">
              <h1>{questions[index].question.toString()}</h1>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="ans1"
            >
              <div>{decodeURIComponent(questions[index].answers[0])}</div>
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="ans2"
            >
              <div>{decodeURIComponent(questions[index].answers[1])}</div>
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="ans3"
            >
              <div>{decodeURIComponent(questions[index].answers[2])}</div>
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="ans4"
            >
              <div>{decodeURIComponent(questions[index].answers[3])}</div>
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Game;
