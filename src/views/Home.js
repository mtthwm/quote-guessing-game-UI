import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import codeService from '../services/codeService';

const Home = () => {

    const history = useHistory();
    const [joinCode, setJoinCode] = useState('');
    const [playerName, setPlayerName] = useState('');

    const onJoinGame = () => {
        if (playerName) {
            saveName();
            history.push(`/game/${joinCode}/${playerName}`);
        } else {
            alert('Please Choose a name!');
        }
    }

    const saveName = () => {
        localStorage.setItem('playerName', playerName); 
    }

    const loadName = () => {
        return localStorage.getItem('playerName');
    }

    const onChangeJoinCode = (event) => {
        setJoinCode(event.target.value);
    }

    const onChangePlayerName = (event) => {
        setPlayerName(event.target.value);
    }

    const onStartGame = async () => {
        try {
            if (playerName) {
                const response = await codeService.create();
                const code = response.join_code;
                saveName();
                history.push(`/game/${code}/${playerName}`);
            } else {
                alert("Please choose a name!")
            }
        } catch (e) {
            console.log(e, "ERROR");
        }
    }

    useEffect(() => {
        setPlayerName(loadName());
    }, []);

    return (
        <div>
            <h1>Welcome</h1>
            <div stye={{flexDirection: 'row'}}>
                <input type={'text'} value={playerName} onChange={onChangePlayerName}/>
                <p>Name</p>
            </div>
            <div>
                <button onClick={onStartGame}>Start Game</button>
            </div>
            <div>
                <input type={'text'} value={joinCode} onChange={onChangeJoinCode}/>
                <button onClick={onJoinGame}>Join Game</button>
            </div>
        </div>
    );
}

export default Home;