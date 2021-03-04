import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import ArticleForm from './ArticleForm';

const NewArticle = ({ login, user }) => {
    const [redir, setRedir] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [markdown, setMarkdown] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    const onSubmitArticle = () => {
        axios.post('/article', {title, description, markdown, author: user.username})
            .then((res) => {
                setRedir(res.data);
            });

    }

    if(!login){
        return(
            <Redirect to="/" />
        )
    }else if(redir==='/'){
        return(
            <Redirect to="/" />
        )
    }else if(redir!=='/' && redir!==''){
        return(
            <Redirect to={{ pathname: `/article/${redir}`, state:{ id: redir } }} />
        )
    }else {
        return(        
            <ArticleForm 
                login={login} user={user} redir={redir}
                setRedir={setRedir} title={title} setTitle={setTitle}
                description={description} setDescription={setDescription}
                markdown={markdown} setMarkdown={setMarkdown} errorMsg={errorMsg}
                setErrorMsg={setErrorMsg} onSubmitArticle={onSubmitArticle} 
            />
        )
    }
}



export default NewArticle;