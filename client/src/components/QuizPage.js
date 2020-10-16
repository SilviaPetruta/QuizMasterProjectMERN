import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Logo from '../images/logo-white.png';


const QuizPage = (props) => {

    const [selectCategory, setSelectCategory] = useState({
        category: "",
        difficulty: ""
    });

    const [quizQuestions, setQuizQuestions] = useState(
        
    );

    const [showQuizQuestions, setShowQuizQuestions] = useState(false);

    const [points, setPoints] = useState(0);

    const [showFinalScore, setShowFinalScore] = useState(false);

    const [finalAnswers, setFinalAnswers] = useState();

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
        // const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    
        return `${getMinutes} : ${getSeconds}`;
    };

    let timerID = useRef(null);

    useEffect(()=>{ 
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const getCategoryInfo = (event) => {
        // console.log(event.target.name + ' ' + event.target.value);

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

        // console.log('Category: ', selectCategory);

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

        handleStart();
    }

    const saveAnswers = (index, ans) => {
        console.log("Checked a response for question number ", index);

        let answers = {...finalAnswers};
        answers[index] = ans;

        setFinalAnswers(answers);
    }

    const finalScore = async(event) => {
        event.preventDefault();
        console.log('Final answers array: ',finalAnswers);
        let finalScore = 0;

        for(let index in finalAnswers) {
            let answer = finalAnswers[index];
          
            if(answer === quizQuestions[index].correct_answer) {
                finalScore++;
            }
        }    
        
        setPoints(finalScore);
        handlePause();
        setShowFinalScore(true);


        const body = JSON.stringify({
            score: finalScore,
            time: timer
        });

        // console.log(body);

        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/quizPage', body, config);

        console.log(res.data);

        console.log(body);
    }

    let questions = null;
    if (showQuizQuestions) {
        questions = quizQuestions.map((q, index) => {

            const answers = q.shuffledAnswers.map((a, aIndex) => {
                return (
                    <li key={aIndex} className="quizQuestionAnswer">
                        <input 
                            name={q.question}
                            id={a} 
                            value={a} 
                            type="radio" 
                            onChange={(event) => saveAnswers(index, event.target.value)} />
                        <label htmlFor={a}>{a}</label>
                    </li>
                )
            });

            return (
                <li key={index} className="quizQuestion">
                    <h2>{index+1}. {q.question}</h2>
                    <div>
                        {/* <p>Select your answer:</p>
                        <br /> */}
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
            {showQuizQuestions ? (showFinalScore ? <div className="questionsQuizPageFinalScore">
                <h1>You scored {points} points in {timer} seconds.</h1>
                <br/>
                <a className="btnHome btn--white" href="/quizPage">Play again</a>
            </div> :    
                <div className="questionsQuizPage">
                    <form onSubmit={finalScore}>
                        <div className='stopwatch-card'>
                            <h1>Time</h1>
                            <p>{formatTime()}</p>
                        </div>

                        <ul className="questionsUl">
                            {questions}
                        </ul>
                        
                        <button
                            className="btnQuiz"
                            type="submit">Finish Quiz</button>
                    </form> 
                </div>  )                  
             : <div className='quizGenerator'>
                    <div className="header__logo-box">
                        <a href="/home">
                            <img src={Logo} alt="Logo" className="header__logo" />
                        </a>
                        
                    </div>
                 <form className="quizGeneratorForm" onSubmit={getAPI}>
                    <h1>Please choose the category and difficulty to generate your quiz.</h1>
                    <div className="select">
                        <select 
                            onChange={getCategoryInfo}
                            name="category" 
                            defaultValue={''}>
                            <option 
                                value=""
                                disabled
                                hidden
                                >Select Category</option>
                            <option
                                name="category" 
                                value="23">History</option>
                            <option 
                                name="category"
                                value="10">Books</option>
                            <option
                                name="category"
                                value="11">Films</option>
                            <option 
                                name="category" 
                                value="27">Animals</option>
                            <option
                                name="category" 
                                value="9">General Knowledge</option>
                        </select>
                        <div className="select_arrow"></div>
                    </div>

                    <div className="select">
                        <select 
                            name="difficulty"
                            defaultValue={''}
                            onChange={getCategoryInfo}>
                            <option 
                                value=""  
                                disabled
                                hidden 
                                >Select Difficulty</option>
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
                        <div className="select_arrow"></div>
                    </div>
                    <button 
                        className="btnQuiz" 
                        type="submit"
                        >Generate Quiz</button>
                </form>
             </div>
            }
        </div>
    )
}

export default withRouter(QuizPage);
