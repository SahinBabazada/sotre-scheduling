import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import ScheduleTable from './Components/ScheduleTable/ScheduleTable';
import Buttons from './Components/Buttons/Buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const initialData = [
  {
    employeeInfo: 'AS1396 - Tahirov Nizami',
    type: 'select',
    staticTime: '07:45 - 19:53',
    shiftStats: 'Səhər 3',
    restStats: 'Day Off',
    notifications: 'Növbələr arasındakı 12 saat intervalı pozulub',
    position: 'HRIS Manager',
    department: 'HR'
  },
  {
    employeeInfo: 'AS1234 - Ali Hasanov',
    type: 'select',
    staticTime: '08:00 - 18:00',
    shiftStats: 'Səhər 2',
    restStats: 'Məzuniyyət',
    notifications: 'Heç bir bildiriş',
    position: 'HR Specialist',
    department: 'HR'
  },
  {
    employeeInfo: 'AS5678 - Leyla Aliyeva',
    type: 'select',
    staticTime: '09:00 - 17:00',
    shiftStats: 'Axşam 2',
    restStats: 'Bayram',
    notifications: 'Bayram günü təyin edilməyib',
    position: 'Finance Manager',
    department: 'HR'
  },
  {
    employeeInfo: 'AS9876 - Mehmet Kaya',
    type: 'select',
    staticTime: '10:00 - 18:00',
    shiftStats: 'Gecə 3',
    restStats: 'Day Off',
    notifications: 'Növbələr arasındakı 12 saat intervalı pozulub',
    position: 'IT Manager',
    department: 'HR'
  }
];

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    updateWeekDates(startDate);
  }, [startDate]);

  const updateWeekDates = (date) => {
    const start = new Date(date);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    setWeekDates(dates);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    updateWeekDates(date);
  };

  const handleDropdownChange = (rowIndex, colIndex, selectedOption) => {
    const newData = [...data];
    newData[rowIndex].dropdownValues = newData[rowIndex].dropdownValues || [];
    newData[rowIndex].dropdownValues[colIndex] = selectedOption;
    setData(newData);
  };

  const handleReset = () => {
    setData(initialData);
  };

  const handleDownloadPDF = () => {
    // Implement PDF download logic
  };

  const handleDownloadExcel = () => {
    // Implement Excel download logic
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <div className="top-controls">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showWeekNumbers
            className="date-picker"
          />
          <Buttons
            onReset={handleReset}
            onDownloadPDF={handleDownloadPDF}
            onDownloadExcel={handleDownloadExcel}
          />
        </div>
        <ScheduleTable
          weekDates={weekDates}
          data={data}
          onDropdownChange={handleDropdownChange}
        />
      </div>
    </div>
  );
};

export default App;
