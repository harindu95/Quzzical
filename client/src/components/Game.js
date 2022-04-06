import React, { useState, useEffect } from "react";
import { Snackbar, Alert, Container, Grid, Button, Modal } from "@mui/material";
import ChatBox from "./ChatBox";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
function Game({ username }) {
  const [resultIcon, setResulIcon] = useState();
  const [index, setIndex] = useState(0);
  const [apiData, setData] = useState(undefined);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClick = (e) => {
    console.log(questions);
    const correctAnswer = questions[index].correct_answer;
    const answer = questions[index].answers[parseInt(e.target.id.charAt(1))];

    questions[index].index = parseInt(e.target.id.charAt(1));

    if (correctAnswer === answer) {
      setScore(score + 1);
      const right = (
        <CheckCircleTwoToneIcon
          stroke={"black"}
          stroke-width={0.1}
          style={{
            color: "Green",
            fontSize: "300px",
            textShadow: "5px 5px 20px black",
          }}
        />
      );

      setOpenAlert(true);
      setResulIcon(right);
    } else {
      const wrong = (
        <CancelTwoToneIcon
          stroke={"black"}
          stroke-width={0.1}
          style={{
            color: "red",
            fontSize: "300px",
            textShadow: "5px 5px 20px black",
          }}
        />
      );

      setResulIcon(wrong);
      setOpenAlert(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeAlert = () => {
    setOpenAlert(false);
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setOpen(true);
      console.log(questions);
      console.log("Your score is ", score);
      //submit score to server
      let options = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          score: score,
        }),
      };
      fetch("http://localhost:2000/submitScore/", options)
        .then((response) => {
          console.log(response);
          // Show congrats page here
        })
        .catch((e) => console.log(e));
    }
  };
  const getQuestions = async () => {
    await fetch("http://localhost:2000/questions")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let _questions = [];
        data.forEach((element) => {
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
    return (
      <Container maxWidth="xl" className="game">
        <Grid spacing={1} container>
          <Grid item xs={12} md={12}>
            <div className="question">
              <h1>{questions[index].question.toString()}</h1>
              <Snackbar
                open={openAlert}
                autoHideDuration={400}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={closeAlert}
              >
                {resultIcon}
              </Snackbar>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              key="0"
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="_0"
            >
              <h1>{decodeURIComponent(questions[index].answers[0])}</h1>
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="_1"
            >
              <h1>{decodeURIComponent(questions[index].answers[1])}</h1>
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="_2"
            >
              <h1>{decodeURIComponent(questions[index].answers[2])}</h1>
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="_3"
            >
              <h1>{decodeURIComponent(questions[index].answers[3])}</h1>
            </Button>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <h1>your score is: {score}</h1>
        </Modal>
      </Container>
    );
  }
}

export default Game;
