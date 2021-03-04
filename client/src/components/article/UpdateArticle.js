import React from 'react';
import { Redirect,  useParams } from 'react-router-dom';
import { Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import ArticleForm from './ArticleForm';

const UpdateArticle = ({ login, user }) => {
    const [redir, setRedir] = React.useState('');
    const [id, setId] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [markdown, setMarkdown] = React.useState('');
    const [date, setDate] = React.useState('');
    const [slug, setSlug] = React.useState(useParams().slug);
    const [errorMsg, setErrorMsg] = React.useState('');

    React.useEffect(() => {

        axios.get(`/article/${slug}`)
            .then((res) => {
                if(res.data){
                    setId(res.data._id);
                    setTitle(res.data.title);
                    setAuthor(res.data.author);
                    setDescription(res.data.description);
                    setMarkdown(res.data.markdown);
                    setDate(new Date(res.data.date).toLocaleDateString());
                }else{
                    setId('/');
                }
                
            })
    }, []);

    const onSubmitArticle = () => {
        axios.post('/article?_method=PUT', {id, title, description, markdown, author})
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



export default UpdateArticle;