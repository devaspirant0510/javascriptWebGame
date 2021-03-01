
class User {
    loginUser(id, password) {
        return new Promise((onSucess, onError) => {
            setTimeout(() => {
                if ((id === "seungho" && password === "1234") ||
                    (id === "dev0510" && password === "4321")) {
                    onSucess(id);
                } else {
                    onError(new Error("no user data"))
                }

            }, 2000)
        });
    }
    getRoles(user) {
        return new Promise((onSucess, onError) => {
            setTimeout(() => {
                if (user === "seungho") {
                    onSucess({ name: "seungho", role: "admin" });

                } else {
                    onError(new Error("no access"));
                }

            }, 1000);

        });
    }
}
let id = prompt("id");
console.log(id);
let password = prompt("passwrod");
console.log(password);

const user = new User();
user.loginUser(id, password)
.then(id=>{
    console.log("로그인 성공!!");
    return user.getRoles(id)})
.catch(err=>{
    console.log(err);
})
.then(data=>{
    console.log(data.name);
    console.log(data.role);
})
.catch(err=>{
    console.log(err);
})


// user.loginUser(id, password, onSucess => {
//     console.log(`your id is ${onSucess}`);
//     user.getRoles(id,onSucess=>{
//         console.log(`you name is ${onSucess.name} you is ${onSucess.role}`);
//     },function onError(){
//         console.log(onError);
//     })
// }, onError => {
//     console.log(onError);
// });
