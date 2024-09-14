import React from 'react';
 
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="profile-circle"></div>
        <div className="profile-info">
          <div className="profile-name">Sm 1001</div>
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-item">Area</div>
        <div className="sidebar-item">Mağaza:</div>
        <div className="sidebar-item">Şöbə:</div>
        <div className="sidebar-item">Həftə</div>
        <div className="sidebar-item">Çəm işçi</div>
        <div className="sidebar-item">Səhər növbəsi</div>
        <div className="sidebar-item">Axşam növbəsi</div>
        <div className="sidebar-item">Məzuniyyət</div>
        <div className="sidebar-item">Bayram</div>
        <div className="sidebar-item">Day Off</div>
        <div className="sidebar-legend">
          <div className="legend-item"><span>A</span> 09 - 18</div>
          <div className="legend-item"><span>B</span> 10 - 19</div>
          <div className="legend-item"><span>D</span> 08 - 17</div>
          <div className="legend-item"><span>T</span> 14 - 23</div>
          <div className="legend-item"><span>F</span> 07 - 16</div>
          <div className="legend-item"><span>M</span> Məzuniyyət</div>
          <div className="legend-item"><span>B</span> Bayram</div>
          <div className="legend-item"><span>O</span> Day Off</div>
        </div>
      </div>
      <button className="sidebar-button">Tənzimləmələr</button>
    </div>
  );
};

export default Sidebar;
