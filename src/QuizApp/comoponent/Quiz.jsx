import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";
import qu from '../../assets/qu.jpg'
import aq from '../../assets/a&q.jpg'
export const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [check, setCheck] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [backs, setBacks] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
 
  let opt_arr = [option1, option2, option3, option4];
  const checkAns = (e, ans) => {
    if (check === false) {
      //Check select one choise answer
      if (question.ans === ans) {
        //Check answer multiple choice
        e.target.classList.add("correct");
        setCheck(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setCheck(true);
        opt_arr[question.ans - 1].current.classList.add("correct");
      }
    }
  };
  // The function next button
  let next = () => {
    if (check === false || check===true) {
      //This nested if statment is 
      if (index === data.length - 1) {
        setResult(true);
      }
      setIndex(++index);
      setQuestion(data[index]);
      setCheck(false);
      //Next button is click then the answer is d/f bg color
      opt_arr.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  const back=()=>{
    if (check === false || check===true) {
      //This nested if statment is 
      if (index === data.length - 1) {
        setResult(true);
      }
      setIndex(--index);
      setQuestion(data[index]);
      setCheck(false);
      //Next button is click then the answer is d/f bg color
      opt_arr.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }

  }
  // Reset question 
 const result1=()=>{
setIndex(0);
setQuestion(data[0]);
setScore(0);
setCheck(false);
setResult(false);
  }


  return (
    <div className="container_q">
      <div className="quiz">
       <div className="timg">
         <img className="answer rotate-45" src={aq} alt="" />
           <img className="questionMark rotate-45" src={qu} alt="" />
       </div>
         <h1>Quiz App</h1>
      
        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <h2>
              {index + 1}.{question.question}
            </h2>
            <ul>
              <li
                ref={option1}
                onClick={(e) => {
                  checkAns(e, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                ref={option2}
                onClick={(e) => {
                  checkAns(e, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                ref={option3}
                onClick={(e) => {
                  checkAns(e, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                ref={option4}
                onClick={(e) => {
                  checkAns(e, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <div className="btns">
              <button onClick={next}>next</button>
              <button onClick={back}>Back</button>
            </div>
            <p>
              {index + 1}of {data.length} questions
            </p>
          </>
        )}
        {result?<>
        <h2>your scored {score} out of {data.length}</h2>
        <button  onClick={result1} className="results">Reset</button></>:<></>}
      </div>
    </div>
  );
};
