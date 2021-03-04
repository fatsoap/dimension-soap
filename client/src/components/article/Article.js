import React, { useEffect } from 'react';
import axios from 'axios';
import { Redirect, useParams, Link } from 'react-router-dom';

const Article = ({ user }) => {
    const [id, setId] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [date, setDate] = React.useState(new Date().toLocaleDateString());
    const [sanitizedHtml, setSanitizedHtml] = React.useState('');
    const [slug, setSlug] = React.useState(useParams().slug);
    const [errorMsg, setErrorMsg] = React.useState('');

    useEffect(() => {
        axios.get(`/article/${slug}`)
            .then((res) => {
                if(res.data){
                    setId(res.data._id);
                    setTitle(res.data.title);
                    setAuthor(res.data.author);
                    setDescription(res.data.description);
                    setDate(new Date(res.data.date).toLocaleDateString());                
                    setSanitizedHtml(res.data.sanitizedHtml);
                }else{
                    setId('/');
                }
                
            })
    }, []);

    const deleteArticle = () => {
        axios.post(`/article/${id}?_method=DELETE`);
        setId('/');
    }

    if(id==='/'){
        return(
            <Redirect to="/" />
        )
    }
    return(
        <div className="container">
            <div className="card-body" >
                <h1 className="card-title mb-4">{title}</h1>
                {user.username===author? <button className="btn btn-danger mb-5 mr-4" onClick={deleteArticle} >Delete</button> : null }
                {user.username===author? <Link to={`/article/update/${slug}`} className="btn btn-primary mb-5">Edit</Link> : null}
                <div className="card-subtitle text-muted mb-4" >Author : {author}</div>
                <div className="card-subtitle text-muted mb-4" >Date : {date}</div>
                <div className="card-text mb-4" >{description}</div>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} ></div>
            </div>
        </div>
    );
};

export default Article;