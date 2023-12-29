import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';

type DatepickerInputProps = {
    onClick?: () => void;
    value?: string;
    inputClass: string;
};

const DatepickerButton = forwardRef<any, DatepickerInputProps>((props, ref) => (
    <button type="button" className={classNames('btn', props.inputClass)} onClick={props.onClick} ref={ref}>
        {props.value}
    </button>
));

/* Datepicker with Input */
const DatepickerInput = forwardRef<HTMLInputElement, DatepickerInputProps>((props, ref) => {
    const onDateValueChange = () => {
        console.log('date value changed');
    };
    return (
        <input
            type="text"
            className={classNames('form-control', props.inputClass)}
            onClick={props.onClick}
            value={props.value}
            onChange={onDateValueChange}
            ref={ref}
        />
    );
});

/* Datepicker with Addon Input */
const DatepickerInputWithAddon = forwardRef<HTMLInputElement, DatepickerInputProps>((props, ref) => (
    <div className="input-group position-relative" ref={ref}>
        <input
            type="text"
            className={classNames('form-control', props.inputClass)}
            onClick={props.onClick}
            value={props.value}
            readOnly
        />
        <span className="input-group-text">
            <i className="ri-calendar-event-fill" />
        </span>
    </div>
));

type CustomDatePickerProps = {
    value?: Date;
    selectsRange?: boolean;
    startDate?: Date;
    endDate?: Date;
    calendarClassName?: string;
    onChange: (date: any) => void;
    hideAddon?: string;
    inputClass?: string;
    showMonthYearDropdown?:any;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
    filterTime?:any;
    showTimeSelect?: boolean;
    tI?: number;
    timeCaption?: string;
    timeFormat?: string;
    showTimeSelectOnly?: boolean;
    monthsShown?: number;
    inline?: boolean;
};

const CustomDatePicker = (props: CustomDatePickerProps) => {
    const {
        calendarClassName,
        selectsRange,
        startDate,
        endDate,
        value,
        showMonthYearDropdown,
        filterTime,
        onChange,
        showTimeSelect,
        timeFormat,
        timeCaption,
        dateFormat,
        minDate,
        maxDate,
        tI,
        monthsShown,
        showTimeSelectOnly,
        inline,
    } = props;
    // handle custom input
    const { hideAddon, inputClass } = props;

    let element;

    if (hideAddon === 'input') {
        element = <DatepickerInput inputClass={inputClass!} />;
    } else if (hideAddon === 'inputothers') {
        element = <DatepickerInputWithAddon inputClass={inputClass!} />;
    } else {
        element = <DatepickerButton inputClass={inputClass!} />;
    }

    return (
        <>
            {/* date picker control */}
            <DatePicker
                calendarClassName={calendarClassName || 'shadow'}
                selectsRange={selectsRange}
                startDate={startDate}
                endDate={endDate}
                selected={value}
                onChange={date => onChange(date)}
                customInput={element}
                filterTime={filterTime}
                timeIntervals={tI}
                showTimeSelect={showTimeSelect}
                timeFormat={timeFormat || 'hh:mm a'}
                timeCaption={timeCaption}
                dateFormat={dateFormat || 'MM/dd/yyyy'}
                minDate={minDate}
                maxDate={maxDate}
                monthsShown={monthsShown}
                showTimeSelectOnly={showTimeSelectOnly}
                inline={inline}
                autoComplete="off"
            />
        </>
    );
};

export default CustomDatePicker;
