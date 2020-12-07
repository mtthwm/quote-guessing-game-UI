import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import codeService from '../services/codeService'

const Game = () => {
    const colors = ['#ff0000', '#0000ff', '#00ff00', '#ffff00', '#00ffff', '#ff00ff'];

    const { code, player_name } = useParams();
    const [in_room, set_in_room] = useState();
    const [players, set_players] = useState([]);
    const [current_player, set_current_player] = useState({});

    const validateGame = async (join_code) => {
        try {
            const valid = await codeService.validate(join_code);
            return valid === true;   
        } catch (err)
        {
            return false;
        }
    }

    const socketIOClient = async () => {
        if (await validateGame(code)) {
            const socket = io('http://localhost:3001');    
            socket.on('connect', () => {
                socket.emit('join_room', {'join_code': code, 'player_name': player_name});
            });   
            socket.on('player_join', (data) => {
                set_in_room(true);
                set_players(data);
            });
        }
    }

    useEffect(() => {
        socketIOClient();
    }, []);

    return (
        <div>
            <h1>Welcome</h1>
            <h5>Join Code: {code}</h5>
            {!in_room ? 
            <h2>Loading</h2> 
            : <div>{players.map((player) => <p key={player.id} style={{color: colors[player.player_index]}}>{player.player_name}</p>)}</div>}
        </div>
  );
}

export default Game;