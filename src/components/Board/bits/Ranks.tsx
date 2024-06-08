import React, { FC } from 'react';
import './Ranks.css';

interface RanksProps {
  ranks: number[];
}

const Ranks: FC<RanksProps> = ({ ranks }) => (
  <div className="ranks">
    {ranks.map((rank) => (
      <span key={rank}>{rank}</span>
    ))}
  </div>
);

export default Ranks;