import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
 
const customStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: '40px',
        height: '40px',
        fontSize: '16px',
        width: '160px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '40px',
        padding: '0 6px',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '40px',
    }),
    menu: (provided) => ({
        ...provided,
        fontSize: '16px'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? state.data.color : state.isFocused ? '#f2f2f2' : null,
        color: state.isSelected ? 'white' : 'black',
        padding: '10px 20px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.data.color
    })
};

const ScheduleTable = ({ weekDates, data, onDropdownChange }) => {
    const [timeOptions, setTimeOptions] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/time_options')
            .then(response => setTimeOptions(response.data))
            .catch(error => console.error('Error fetching time options:', error));

        axios.get('http://localhost:5000/employees')
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Error fetching employees:', error));

        axios.get('http://localhost:5000/schedules')
            .then(response => setSchedules(response.data))
            .catch(error => console.error('Error fetching schedules:', error));
    }, []);

    return (
        <div className="schedule-table">
            <table>
                <thead>
                    <tr className="header-row">
                        <th colSpan="2" rowSpan="2">Əməkdaş məlumatları</th>
                        <th rowSpan="2">Məlumat Növü</th>
                        {weekDates.map((date, index) => (
                            <th rowSpan="1" colSpan={2} key={index} className="date-cell">{date}</th>
                        ))}
                        <th rowSpan="2" colSpan="2">Növbə statistikası</th>
                        <th rowSpan="2" colSpan="2">İstirahət Statistikası</th>
                        <th>Bayram Balansı</th>
                        <th>Məzuniyyət Balansı</th>
                        <th rowSpan="2">Bildiriş</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, rowIndex) => {
                        const employeeSchedules = schedules.filter(schedule => schedule[1] == employee[0]);
                        return (
                            <React.Fragment key={`fragment-${rowIndex}`}>
                                <tr className="employee-row">
                                    <td rowSpan="3" className="employee-number">{rowIndex + 1}</td>
                                    <td rowSpan="1" className="employee-info">{`${employee[0]} - ${employee[1]}`}</td>
                                    <td>Plan</td>
                                    {weekDates.map((date, colIndex) => {
                                        const schedule = employeeSchedules.find(schedule => schedule[0] === date);
                                        const selectedOption = schedule ? { value: schedule[2], label: schedule[2] } : null;
                                        return (
                                            <td 
                                                colSpan={2} 
                                                key={`${rowIndex}-${colIndex}`} 
                                                className="dropdown-cell" 
                                                style={{ backgroundColor: selectedOption ? selectedOption.color : 'inherit' }}
                                            >
                                                <Select
                                                    options={timeOptions}
                                                    value={selectedOption}
                                                    onChange={(selectedOption) => onDropdownChange(rowIndex, colIndex, selectedOption)}
                                                    styles={customStyles}
                                                    isSearchable={false}
                                                    components={{
                                                        IndicatorSeparator: () => null
                                                    }}
                                                    placeholder="Select..."
                                                />
                                            </td>
                                        );
                                    })}
                                    <td className="stat-label">Səhər</td>
                                    <td className="stat-value">3</td>
                                    <td className="stat-label">Day Off</td>
                                    <td className="stat-value">3</td>
                                    <td rowSpan="3">{employee[4]}</td>
                                    <td rowSpan="3">{employee[5]}</td>
                                    <td rowSpan="3" className="notification">Növbələr arasındakı 12 saat intervalı pozulub</td>
                                </tr>
                                <tr className="position-row">
                                    <td className="employee-position">{employee[2]}</td>
                                    <td>Fakt</td>
                                    {weekDates.map((date, colIndex) => {
                                        const schedule = employeeSchedules.find(schedule => schedule[0] == '06-08-24');
                                        console.log(date);
                                        console.log(Date.parse(date));
                                        console.log(employeeSchedules);
                                        return (
                                            <td colSpan={2} key={`${rowIndex}-${colIndex}`} className="static-time">
                                                {schedule ? schedule[3] : ''}
                                            </td>
                                        );
                                    })}
                                    <td className="stat-label">Axşam</td>
                                    <td className="stat-value">3</td>
                                    <td className="stat-label">Bayram</td>
                                    <td className="stat-value">3</td>
                                </tr>
                                <tr className="department-row">
                                    <td className="department">{employee[3]}</td>
                                    <td>Məzuniyyət qrafiki</td>
                                    {weekDates.map((date, colIndex) => {
                                        const schedule = employeeSchedules.find(schedule => schedule.date === date);
                                        return (
                                            <td colSpan={2} key={`${rowIndex}-${colIndex}`} className="static-time">
                                                {schedule ? schedule.mezuniyyet_qrafiki : ''}
                                            </td>
                                        );
                                    })}
                                    <td className="stat-label">Gecə</td>
                                    <td className="stat-value">3</td>
                                    <td className="stat-label">Məzuniyyət</td>
                                    <td className="stat-value">3</td>
                                </tr>
                                <tr className="spacer-row"><td colSpan="22"></td></tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;