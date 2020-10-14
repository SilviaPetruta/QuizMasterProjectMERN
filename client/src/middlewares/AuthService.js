
export default {
    login: (body) =>{
        // console.log(body);
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
        // console.log(body);

        return fetch('/register', {
            method: "post",
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    logout : ()=>{
        return fetch('/logout')
                .then(res => res.json())
                .then(data => data);
    },
    quizQuestions : (body) => {
        // console.log(body);

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
        return fetch('/authenticated')
                .then(res => {
                    // console.log("AuthService /authenticated response: ", res);

                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated: false, user: {email: "", role: "", name: ""}};
                });
    }
}