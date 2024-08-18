import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            const cachedArticles = localStorage.getItem('newsArticles');
            const cacheTime = localStorage.getItem('newsCacheTime');
    
            if (cachedArticles && cacheTime && Date.now() - cacheTime < 3600000) {
                setArticles(JSON.parse(cachedArticles));
                setLoading(false);
                return;
            }
    
            try {
                const response = await axios.get('https://newsdata.io/api/1/latest', {
                    params: {
                        country: 'bd',
                        category: 'technology',
                        apikey: import.meta.env.VITE_NEWS2_API_KEY,
                    },
                });
                localStorage.setItem('newsArticles', JSON.stringify(response.data.results));
                localStorage.setItem('newsCacheTime', Date.now());
                setArticles(response.data.results);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    setError('Rate limit exceeded. Please try again later.');
                } else {
                    setError('An error occurred while fetching the news');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchArticles();
    }, []);

    if (loading) return <div className="spinner"></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="news-container">
            <h1>Latest Technology News</h1>
            {articles.length > 0 ? (
                <ul className="news-list">
                    {articles.map((article) => (
                        <li key={article.article_id} className="news-item">
                            {article.image_url && (
                                <img
                                    src={article.image_url}
                                    alt={article.title}
                                    className="news-image"
                                />
                            )}
                            <div className="news-content">
                                <h2 className="news-title">{article.title}</h2>
                                <p className="news-description">{article.description}</p>
                                <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-link">
                                    Read more
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
};

export default News;
