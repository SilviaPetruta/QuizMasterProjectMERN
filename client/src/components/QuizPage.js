import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AuthService from '../middlewares/AuthService';


const QuizPage = (props) => {

    const [selectCategory, setSelectCategory] = useState({
        category: "",
        difficulty: ""
    });

    const [quizQuestions, setQuizQuestions] = useState();

    const [message, setMessage] = useState({
        msgBody: "",
        msgError: ""
    });

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

        const body = JSON.stringify({
            quizQuestions: res.data.results
        });

        AuthService.quizQuestions(body).then(async(data) => {
            console.log(data);

             const { message } = data;
            setMessage(message);
            resetForm();

            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/quizQuestions');
                },2000);
            }
        });

        

        console.log(res.data.results);
    }

    return (
        <div>
            <form 
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
                    >Generate Quiz</button>
            </form>
        </div>
    )
}

export default QuizPage;
