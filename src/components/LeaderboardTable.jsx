function LeaderboardTable({ data }) {
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  return (
    <div className="table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Sıralama</th>
            <th>İsim</th>
            <th>Skor</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={item.id} className={`rank-${index + 1}`}>
              <td className="rank-cell">
                {index === 0 && <span className="emoji">🏅</span>}
                {index === 1 && <span className="emoji">🥈</span>}
                {index === 2 && <span className="emoji">🥉</span>}
                {index > 2 && index + 1}
              </td>
              <td>{item.name}</td>
              <td className="score-cell">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable;
