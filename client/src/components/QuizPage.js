import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import AuthService from '../middlewares/AuthService';
import MyStopwatch from './Timer';


const QuizPage = (props) => {

    const [selectCategory, setSelectCategory] = useState({
        category: "",
        difficulty: ""
    });

    const [quizQuestions, setQuizQuestions] = useState();

    const [showQuizQuestions, setShowQuizQuestions] = useState(false);

    const [score, setScore] = useState({
        points: 0,
        time: ''
    });

    const [showFinalScore, setShowFinalScore] = useState(false);

    const [message, setMessage] = useState({
        msgBody: "",
        msgError: ""
    });

    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const increment = useRef(null);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);
        increment.current = setInterval(() => {
          setTimer((timer) => timer + 1)
        }, 1000);

        console.log(increment.current);
    };
    
    const handlePause = () => {
        clearInterval(increment.current);
        setIsPaused(false);        
    };

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2);
        const minutes = `${Math.floor(timer / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    
        return `${getMinutes} : ${getSeconds}`;
    };

    let timerID = useRef(null);

    useEffect(()=>{ 
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const getCategoryInfo = (event) => {
        console.log(event.target.name + ' ' + event.target.value);

        setSelectCategory({
            ...selectCategory,
            [event.target.name]: event.target.value
        });
    };

    const resetForm = ()=>{
        setSelectCategory({
            category: "",
            difficulty: ""
        });
    }

    const getAPI = async (event) => {
        event.preventDefault();

        console.log('Category: ', selectCategory);

        const res = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectCategory.category}&difficulty=${selectCategory.difficulty}&type=multiple`);

        let questions = res.data.results;

        questions.map(q => {
            let shuffledAnswers = [...q.incorrect_answers];
            shuffledAnswers.push(q.correct_answer);

            shuffledAnswers.sort(() => Math.random() - 0.5);

            q.shuffledAnswers = shuffledAnswers;
        });

        setQuizQuestions(questions);
        setShowQuizQuestions(true);

        // handleStart();
    }
    
    let finalAnswers = [];
    const checkAnswer = (index, ans) => {
        console.log("Checked a response for question number ", index);

        finalAnswers.push(ans);
    }

    const finalScore = (event) => {
        event.preventDefault();
        console.log('Final answers array: ',finalAnswers);
        let finalScore = 0;
        finalAnswers.map((item, index) => {
            if(item === quizQuestions[index].correct_answer) {
                finalScore++;
            }
        });     
        
        setScore({
            ...score,
            points: finalScore,
            time: increment.current
        });


        // handlePause();

        // setScore({
        //     ...score,
        //     time: increment.current
        // });
        setShowFinalScore(true);
        console.log(score.points);
    }

    let questions = null;
    if (showQuizQuestions) {
        questions = quizQuestions.map((q, index) => {

            const answers = q.shuffledAnswers.map((a, aIndex) => {
                return (
                    <li key={aIndex}>
                        <label htmlFor={a}>{a}</label>
                        <input 
                            name={q.question}
                            id={a} 
                            value={a} 
                            type="radio" 
                            onChange={(event) => checkAnswer(index, event.target.value)} />
                    </li>
                )
            });

            return (
                <li key={index}>
                    {q.question}
                    <div>
                        <p>Select your answer:</p>
                        <br />
                        <ul>
                            {answers}                          
                        </ul>                        
                    </div>
                </li>
            )
        });
    }

    return (
        <div>
            {showQuizQuestions ? (showFinalScore ? <p>{score.points}</p> :    
                <div>
                    <form onSubmit={finalScore}>
                        <div className="app">
                            <h3>React Stopwatch</h3>
                            <div className='stopwatch-card'>
                                <p>{formatTime()}</p>
                            </div>
                        </div>

                        <ul>
                            {questions}
                        </ul>
                        <button 
                            // onClick={handlePause}
                            type="submit">Finish Quiz</button>
                    </form> 
                </div>  )                  
             : <form 
                className='quizGenerator'
                onSubmit={getAPI}
                 >
                {/* <h2>{message.msgBody}</h2> */}
                <select 
                    onChange={getCategoryInfo}
                    name="category" >
                    <option 
                        value="" 
                        selected
                        disabled
                        hidden
                         >Select Category:</option>
                    <option
                        name="category" 
                        value="23">History</option>
                    <option 
                        name="category"
                        value="10">Entertaiment: Books</option>
                    <option
                        name="category"
                        value="11">Entertaiment: Film</option>
                    <option 
                        name="category" 
                        value="27">Animals</option>
                    <option
                        name="category" 
                        value="9">General Knowledge</option>
                </select>

                <select 
                    name="difficulty"
                    onChange={getCategoryInfo}>
                    <option 
                        selected
                        value=""  
                        disabled
                        hidden 
                        >Select Difficulty:</option>
                    <option
                        name="difficulty" 
                        value="easy">Easy</option>
                    <option 
                        name="difficulty" 
                        value="medium">Medium</option>
                    <option 
                        name="difficulty" 
                        value="hard">Hard</option>
                </select>
                <button 
                    className="btn btn-lg btn-primary btn-block" 
                    type="submit"
                    // onClick={handleStart}
                    >Generate Quiz</button>
            </form>}
             
            
        </div>
    )
}

export default QuizPage;
