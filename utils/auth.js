// import cookie from "js-cookie";
// import Router from "next/router";

// export function handleLogin(token) {
//   cookie.set("token", token);
//   Router.push("/account");
// }

// export function redirectUser(ctx, location) {
//   if (ctx.req) {
//     ctx.res.writeHead(302, { Location: location });
//     ctx.res.end();
//   } else {
//     Router.push(location);
//   }
// }

// export function handleLogout() {
//   cookie.remove("token");
//   window.localStorage.setItem("logout", Date.now());
//   Router.push("/login");
// }


import cookie from 'js-cookie';
import Router from 'next/router';

//no default exports here because we are exporting several functions
export function handleLogin(token){
    cookie.set('token', token);
    Router.push('/account');
}

//ctx is from react, it gives react access to the req. res. objs.
export function redirectUser(ctx, location){//redirecting using the server
    if(ctx.req){
        ctx.res.writeHead(302, { location: location });//writeHead is a node js way of redirecting
        ctx.res.end();
    } else {//or redirect using the client
        Router.push(location);
    }
}

export function handleLogOut(){
    cookie.remove('token');
    //if 2 browser windows are open and we logout of 1 then we wont be logged out of the other, until we refresh the page
    //but this prevents is and logs us out of both
    window.localStorage.setItem('logout', Date.now());//it does n't matter what we enter for the logout value we are just entering the time 
    Router.push('/login');
}
