import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        country: 'us',
                        category: 'technology',
                        apiKey: 'ae58ab1383894f93826e4522885475ad',
                    },
                });
                setArticles(response.data.articles);
            } catch (error) {
                setError('An error occurred while fetching the news');
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
                    {articles.map((article, index) => (
                        <li key={index} className="news-item">
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="news-image"
                                />
                            )}
                            <div className="news-content">
                                <h2 className="news-title">{article.title}</h2>
                                <p className="news-author">By {article.author || 'Unknown'}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
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
