import React, { useState, useEffect, useRef } from "react";
import { Snackbar, Alert, Container, Grid, Button, Modal } from "@mui/material";
import ChatBox from "./ChatBox";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Scoreboard from "./Scoreboard";

function Game({ username }) {
  const [key, setKey] = useState(0);
  const [buttonState, setButtonState] = useState({
    answer: true,
    question: false,
  });
  const [quizState, setQuizState] = useState({
    totalTime: 60,
    totalQuestions: 10,
    clock: false,
  });
  const [time, setTime] = useState({
    startTime: quizState.totalTime,
    currentTime: 0,
  });
  const [resultIcon, setResulIcon] = useState();
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(
    quizState.totalTime * quizState.totalQuestions
  );
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      endGame();
    }
    if (remainingTime != time.currentTime) {
      setScore(
        score -
          (quizState.totalTime * quizState.totalQuestions) / quizState.totalTime
      );
      setTime({ startTime: time.startTime, currentTime: remainingTime });
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  const handleClick = (e) => {
    console.log(time);
    setButtonState({ answer: true, question: true });
    setTime({ startTime: time.currentTime, currentTime: time.currentTime });

    const correctAnswer = questions[index].correct_answer;
    const answer = questions[index].answers[parseInt(e.target.id.charAt(1))];

    questions[index].index = parseInt(e.target.id.charAt(1));

    if (correctAnswer === answer) {
      setScore(
        score +
          (quizState.totalTime * quizState.totalQuestions) /
            quizState.totalQuestions
      );
      const right = (
        <CheckCircleTwoToneIcon
          stroke={"black"}
          strokeWidth={0.1}
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
      setScore(
        score -
          (quizState.totalTime * quizState.totalQuestions) /
            quizState.totalQuestions
      );
      const wrong = (
        <CancelTwoToneIcon
          stroke={"black"}
          strokeWidth={0.1}
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

  const handleStartQuizButton = () => {
    if (index > 5) {
      getQuestions();
      console.log("restartr");
      setKey((prevKey) => prevKey + 1);
      setIndex(0);
      return;
    }

    setIndex(index + 1);
    setButtonState({ answer: false, question: true });
    setQuizState({ totalTime: 60, totalQuestions: 10, clock: true });
  };

  const closeAlert = () => {
    setOpenAlert(false);
    if (index < questions.length - 2) {
      setButtonState(false);
      setIndex(index + 1);
      setButtonState({ answer: false, question: true });
    } else {
      endGame();
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

  const endGame = () => {
    setButtonState({ answer: true, question: false });
    setOpen(true);
    setIndex(questions.length - 1);
    setKey((prevKey) => prevKey + 1);
    setQuizState({ totalTime: 60, totalQuestions: 10, clock: false });
    setScore(0);
  };

  const getQuestions = async () => {
    await fetch("http://localhost:2000/questions")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let _questions = [];
        _questions.push({
          question: "Click to Start Quiz",
          answers: ["", "", "", ""],
        });
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
        _questions.push({
          question: "Click to Replay",
          answers: ["", "", "", ""],
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
      <Container maxWidth="xl" className="game" sx={{ paddingTop: "0" }}>
        <Grid spacing={1} container>
          <Grid item xs={12} md={12}>
            <Grid
              container
              item
              style={{ marginTop: "15px", marginBottom: "15px" }}
            >
              <Grid container item xs={12} justifyContent="center">
                <h1> Welcome {username}!</h1>
              </Grid>
            </Grid>
            <div className="question">
              <Grid container item xs={12} justifyContent="center">
                <Grid item container justifyContent="space-between">
                  <Grid item>
                    {index < quizState.totalQuestions + 1 ? (
                      <h2>
                        {" "}
                        {index} / {quizState.totalQuestions}{" "}
                      </h2>
                    ) : (
                      <h2> Fininshed </h2>
                    )}
                  </Grid>
                  <Grid item>
                    <CountdownCircleTimer
                      key={key}
                      size={50}
                      strokeWidth={3}
                      isPlaying={quizState.clock}
                      duration={quizState.totalTime}
                      colors={["#000000"]}
                      onComplete
                    >
                      {renderTime}
                    </CountdownCircleTimer>
                  </Grid>
                </Grid>
                <Button
                  onClick={handleStartQuizButton}
                  disabled={buttonState.question}
                >
                  <h3>{questions[index].question.toString()}</h3>
                </Button>
              </Grid>
            </div>
            <Snackbar
              open={openAlert}
              autoHideDuration={400}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={closeAlert}
            >
              {resultIcon}
            </Snackbar>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              disabled={buttonState.answer}
              key="0"
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="_0"
            >
              <h3>{decodeURIComponent(questions[index].answers[0])}</h3>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              disabled={buttonState.answer}
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="_1"
            >
              <h3>{decodeURIComponent(questions[index].answers[1])}</h3>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              disabled={buttonState.answer}
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="_2"
            >
              <h3>{decodeURIComponent(questions[index].answers[2])}</h3>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              disabled={buttonState.answer}
              onClick={(e) => handleClick(e)}
              variant="primary"
              className="answer"
              id="_3"
            >
              <h3>{decodeURIComponent(questions[index].answers[3])}</h3>
            </Button>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Scoreboard score={score} />
        </Modal>
      </Container>
    );
  }
}

export default Game;
