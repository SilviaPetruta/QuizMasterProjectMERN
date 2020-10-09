import React, { useState, useRef, useEffect } from 'react';
// import AuthService from '../middlewares/AuthService';
import axios from 'axios';


const QuizPage = (props) => {

    const [selectCategory, setSelectCategory] = useState({
        category: "",
        difficulty: ""
    });

    const [selectDifficulty, setSelectDifficulty] = useState({
        difficulty: ""
    });

    const [message, setMessage] = useState({
        msgBody: "",
        msgError: ""
    });

    let timerID = useRef(null);

    useEffect(()=>{
        getAPI();

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

        // setSelectDifficulty({
        //     ...selectDifficulty,
        //     [event.target.name]: event.target.value
        // });
    };

    const resetForm = ()=>{
        setSelectCategory({
            category: ""
        });

        // setSelectDifficulty({
        //     difficulty: ""
        // });
    }

    const getAPI = async () => {

        // let cat = selectCategory.category;
        // let dif = selectDifficulty.difficulty;

        // console.log(cat, dif);
        const res = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectCategory.category}&difficulty=${selectCategory.difficulty}&type=multiple`);
        console.log(res.data.results);
        console.log(res.data.results);
        


      }

    // const sendData = async (event) => {
    //     event.preventDefault();
    //     console.log("Form to be submitted");

    //     const body = JSON.stringify({
    //         userNameForm: user.name,
    //         userEmailForm: user.email,
    //         userPasswordForm: user.password,
    //         userConfirmPasswordForm: user.confirmPassword,
    //         userRoleForm: user.role
    //     });

    //     // const res = await axios.post('/register', body, config);

    //     AuthService.register(body).then(async(data) => {
    //         console.log(data);

    //         const { message } = data;
    //         setMessage(message);
    //         resetForm();

    //         if(!message.msgError){
    //             timerID = setTimeout(()=>{
    //                 // this.context.history.push('/login')
    //                 props.history.push('/login');
    //             },2000);
    //         }
    //     });
    // };

    console.log('Category: ', selectCategory);
    // console.log('Difficulty: ', selectDifficulty.difficulty);

    return (
        <div>
            <form className='quizGenerator' >
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
                    type="submit">Generate Quiz</button>
            </form>
        </div>
    )
}

export default QuizPage;
