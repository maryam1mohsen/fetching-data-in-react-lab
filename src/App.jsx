import React, { useState, useEffect } from 'react';
import { fetchStarships } from './services/starshipService';
import StarshipSearch from './components/StarshipSearch';
import StarshipList from './components/StarshipList';

const App = () => {
    const [starships, setStarships] = useState([]);
    const [filteredStarships, setFilteredStarships] = useState([]);

    useEffect(() => {
        const getStarships = async () => {
            const starshipData = await fetchStarships();
            setStarships(starshipData);
            setFilteredStarships(starshipData);
        };
        getStarships();
    }, []);

    const handleSearch = (query) => {
        const filtered = starships.filter(starship =>
            starship.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredStarships(filtered);
    };

    if (starships.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <StarshipSearch onSearch={handleSearch} />
            <StarshipList starships={filteredStarships} />
            <p>{filteredStarships.length} results</p>
        </main>
    );
};

export default App;
