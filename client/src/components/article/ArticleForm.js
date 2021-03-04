import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ArticleForm = ({ 
    login, user, redir, 
    setRedir, title, setTitle,
    description,setDescription, 
    markdown, setMarkdown, errorMsg,
    setErrorMsg, onSubmitArticle }) => {


    const onSubmit = () => {
        if(title===''){
            setErrorMsg(`Title can't be empty!`);
        }else if(description===''){
            setErrorMsg(`Description can't be empty!`);
        }else if(markdown===''){
            setErrorMsg(`Markdown can't be empty!`);
        }else{
            setErrorMsg(``);
            onSubmitArticle();
        }
    }

    return(        
        <div className="container">
            <h1 className="mb-4">New Article</h1>
            <Form>
                <Form.Group >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Markdown</Form.Label>
                    <Form.Control as="textarea" rows={8} value={markdown} onChange={e => setMarkdown(e.target.value)} />
                </Form.Group>
                {errorMsg!==''? <Alert variant="danger">{errorMsg}</Alert> : null }
                <Button className="btn btn-secondary mr-4" onClick={()=>setRedir('/')}>
                    Cancel
                </Button>
                <Button className="btn btn-primary" onClick={onSubmit}>
                    Save
                </Button>
            </Form>
        </div>
    )
}



export default ArticleForm;