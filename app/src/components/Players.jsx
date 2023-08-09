const Players = ({ players }) => (
    <div>
        {players.map(player =>
            <div key={player.id}>
                <p>
                    <strong>
                    {player.name} 
                    </strong>
                    <br />
                    <small>
                    {player.birthday}
                    </small>
                    <br />
                    <small style={{color: 'red'}}>
                    {player.position}
                    </small>
                </p>
            </div>
        )}
    </div>
)

export default Players