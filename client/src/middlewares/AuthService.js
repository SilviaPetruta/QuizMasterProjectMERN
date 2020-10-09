
export default {
    login: (body) =>{
        console.log(body);
        return fetch('/login',{
            method : "post",
            body : body,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    register : (body) => {
        console.log(body);

        return fetch('/register', {
            method: "post",
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    quizQuestions : (body) => {
        console.log(body);

        return fetch('/quizQuestions', {
            method: "post",
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/user/authenticated')
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated: false, user: {email: "", role: "", name: ""}};
                });
    }
}