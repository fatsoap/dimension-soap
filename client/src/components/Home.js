import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';

const Home =  ({ login }) => {

    const [articles, setArticles] = React.useState([]); 

    useEffect(() => {
        axios.get('/articles')
            .then((res) => {
                setArticles(res.data);
            })
    }, []);

    return(
        <div className="container">
            <h1>Home page here</h1>
            {login? <Link to="/article/new" className="btn btn-success">New Article</Link> : null }
            {RenderArticle(articles)}
        </div>
    );
}

const RenderArticle = (articles) => {
    return(
        articles.map((article) => {
            return( 
                <ArticleCard key={article._id} article={article} />
            )
        })
    );    
}

const ArticleCard = ({article}) => {
    var date = new Date(article.date).toLocaleDateString();
    return(
        <Link to={`/article/${article.slug}`} style={{color: 'black'}} className="card mt-4">
            <div className="card-body">
                <h4 className="card-title">{article.title}</h4>
                <div className="card-subtitle text-muted mb-2">{article.author}</div>
                <div className="card-subtitle text-muted mn-2">{date}</div>
                <div className="card-text mb-2">{article.description}</div>
            </div>
        </Link>
    )
}

export default Home;