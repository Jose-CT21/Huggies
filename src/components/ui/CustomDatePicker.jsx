import React, { useState, useEffect } from 'react';

const CustomDatePicker = ({ birthDate, setBirthDate }) => {
    const today = new Date();
    
    const minDateNormalized = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
    minDateNormalized.setHours(0, 0, 0, 0);

    const maxDateNormalized = new Date(today.getFullYear(), today.getMonth() + 9, today.getDate());
    maxDateNormalized.setHours(23, 59, 59, 999);

    const minYear = minDateNormalized.getFullYear();
    const maxYear = maxDateNormalized.getFullYear();

    const [calYear, setCalYear] = useState(() => {
        if (birthDate) return new Date(birthDate).getFullYear();
        return today.getFullYear();
    });
    
    const [calMonth, setCalMonth] = useState(() => {
        if (birthDate) return new Date(birthDate).getMonth();
        return today.getMonth();
    });
    
    const [isCalendarOpen, setIsCalendarOpen] = useState(true);

    const MONTHS = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const getAvailableYears = () => {
        const years = [];
        for (let y = minYear; y <= maxYear; y++) {
            years.push(y);
        }
        return years;
    };

    const getAvailableMonths = () => {
        if (calYear === minYear) {
            const startMonth = minDateNormalized.getMonth();
            return MONTHS.map((name, index) => ({ name, index })).filter(m => m.index >= startMonth);
        }
        if (calYear === maxYear) {
            const endMonth = maxDateNormalized.getMonth();
            return MONTHS.map((name, index) => ({ name, index })).filter(m => m.index <= endMonth);
        }
        return MONTHS.map((name, index) => ({ name, index }));
    };

    const handleYearChange = (yearVal) => {
        const newYear = parseInt(yearVal);
        setCalYear(newYear);
        
        if (newYear === minYear && calMonth < minDateNormalized.getMonth()) {
            setCalMonth(minDateNormalized.getMonth());
        } else if (newYear === maxYear && calMonth > maxDateNormalized.getMonth()) {
            setCalMonth(maxDateNormalized.getMonth());
        }
    };

    const handlePrevMonth = () => {
        if (calMonth === 0) {
            setCalMonth(11);
            setCalYear(prev => prev - 1);
        } else {
            setCalMonth(prev => prev - 1);
        }
    };

    const handleNextMonth = () => {
        if (calMonth === 11) {
            setCalMonth(0);
            setCalYear(prev => prev + 1);
        } else {
            setCalMonth(prev => prev + 1);
        }
    };

    const isPrevMonthDisabled = calYear === minYear && calMonth <= minDateNormalized.getMonth();
    const isNextMonthDisabled = calYear === maxYear && calMonth >= maxDateNormalized.getMonth();

    const getDaysInMonth = () => {
        return new Date(calYear, calMonth + 1, 0).getDate();
    };

    const getFirstDayIndex = () => {
        return new Date(calYear, calMonth, 1).getDay();
    };

    const handleDaySelect = (dayNum) => {
        const selected = new Date(calYear, calMonth, dayNum);
        const yyyy = selected.getFullYear();
        const mm = String(selected.getMonth() + 1).padStart(2, '0');
        const dd = String(selected.getDate()).padStart(2, '0');
        setBirthDate(`${yyyy}-${mm}-${dd}`);
    };

    const getSelectedDayDetails = () => {
        if (!birthDate) return { year: null, month: null, day: null };
        const [y, m, d] = birthDate.split('-').map(Number);
        return { year: y, month: m - 1, day: d };
    };

    const selectedDetails = getSelectedDayDetails();

    const formatDateSpanish = (dateStr) => {
        if (!dateStr) return '';
        const [y, m, d] = dateStr.split('-');
        const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
        return dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // Sync calendar focus year and month when birthDate changes or gets reset
    useEffect(() => {
        if (birthDate) {
            const [y, m] = birthDate.split('-').map(Number);
            setCalYear(y);
            setCalMonth(m - 1);
        } else {
            setCalYear(today.getFullYear());
            setCalMonth(today.getMonth());
        }
    }, [birthDate]); // Only react when birthDate prop changes

    return (
        <div className="form-group-wizard date-step-wrapper">
            <label className="wizard-label">Fecha de nacimiento / Estimada de parto</label>
            <div 
                className={`custom-date-trigger ${isCalendarOpen ? 'active' : ''}`}
                onClick={() => setIsCalendarOpen(prev => !prev)}
            >
                <span className="date-trigger-value">
                    {birthDate ? formatDateSpanish(birthDate) : 'Selecciona una fecha...'}
                </span>
                <span className="date-trigger-icon">📅</span>
            </div>

            {isCalendarOpen && (
                <div className="custom-calendar-box animate-scale-up">
                    <div className="calendar-control-header">
                        <button 
                            type="button" 
                            className="cal-nav-btn" 
                            onClick={handlePrevMonth}
                            disabled={isPrevMonthDisabled}
                            aria-label="Mes anterior"
                        >
                            ‹
                        </button>
                        
                        <div className="calendar-selectors">
                            <select 
                                className="calendar-select" 
                                value={calMonth} 
                                onChange={(e) => setCalMonth(parseInt(e.target.value))}
                            >
                                {getAvailableMonths().map(m => (
                                    <option key={m.index} value={m.index}>{m.name}</option>
                                ))}
                            </select>
                            
                            <select 
                                className="calendar-select" 
                                value={calYear} 
                                onChange={(e) => handleYearChange(e.target.value)}
                            >
                                {getAvailableYears().map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        <button 
                            type="button" 
                            className="cal-nav-btn" 
                            onClick={handleNextMonth}
                            disabled={isNextMonthDisabled}
                            aria-label="Siguiente mes"
                        >
                            ›
                        </button>
                    </div>

                    <div className="calendar-weekdays-grid">
                        <span>Do</span>
                        <span>Lu</span>
                        <span>Ma</span>
                        <span>Mi</span>
                        <span>Ju</span>
                        <span>Vi</span>
                        <span>Sá</span>
                    </div>

                    <div className="calendar-days-grid">
                        {Array(getFirstDayIndex()).fill(null).map((_, idx) => (
                            <div key={`empty-${idx}`} className="calendar-day-cell empty"></div>
                        ))}
                        {Array.from({ length: getDaysInMonth() }, (_, i) => i + 1).map(day => {
                            const cellDate = new Date(calYear, calMonth, day);
                            cellDate.setHours(12, 0, 0, 0);
                            const isDisabled = cellDate < minDateNormalized || cellDate > maxDateNormalized;
                            const isSelected = selectedDetails.year === calYear && 
                                                selectedDetails.month === calMonth && 
                                                selectedDetails.day === day;
                            const isCurrentToday = today.getFullYear() === calYear && 
                                                    today.getMonth() === calMonth && 
                                                    today.getDate() === day;

                            return (
                                <button
                                    key={`day-${day}`}
                                    type="button"
                                    className={`calendar-day-cell day ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''} ${isCurrentToday ? 'today' : ''}`}
                                    disabled={isDisabled}
                                    onClick={() => handleDaySelect(day)}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
