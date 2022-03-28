import React, { useState } from "react";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
// import "rsuite/dist/rsuite.min.css";
// import { Calendar } from "rsuite";
import styled from "styled-components";
import "react-dates/lib/css/_datepicker.css";

function Slot(props) {
	const [focusedStart, setFocusedStart] = useState(false);
	const [focusedEnd, setFocusedEnd] = useState(false);
	const [startDate, setStartDate] = useState(moment());
	const [startTime, setStartTime] = useState("");
	const [endDate, setEndDate] = useState(moment());
	const [endTime, setEndTime] = useState("");
	const [error, setError] = useState(
		"Veuillez entrez une plage horaire valide !"
	);
	// console.log(moment().format("LT"));

	// console.log(moment().format("dddd, Do MMMM YYYY, h:mm:ss a"));
	// console.log(typeof moment().format("dddd, Do MMMM YYYY, h:mm:ss a"));

	const handleClick = (e) => {
		e.preventDefault();
		//date actuelle
		let currentDate = moment().format("D MMMM YYYY");
		let currentDay = new window.Date(currentDate);

		//date de début et de fin de location
		let startDateFormat = startDate.format("D MMMM YYYY");
		let startDay = new window.Date(startDateFormat);
		let endDateFormat = endDate.format("D MMMM YYYY");
		let endDay = new window.Date(endDateFormat);

		//heure actuelle
		let currentHour = parseInt(startDate.format("LT").substring(0, 2));

		//heure de début et fin de location
		let startHour = parseInt(startTime.substring(0, 2));
		let endHour = parseInt(endTime.substring(0, 2));

		//si pas heure de début ou de fin erreur
		if (!endTime || !startTime) console.log("Premiere erreur", error);

		//si la date est aujourdhui l'heure de début ou de fin doit être supérieur à l'heure actuelle
		if (startDay.getTime() === currentDay.getTime() && startHour <= currentHour)
			console.log("seconde erreur", error);
		if (endDay.getTime() === currentDay.getTime() && endHour <= currentHour)
			console.log("troisième erreur ", error);

		//si la date de début et de fin est aujourdhui , l'heure de fin de location doit être supérieur à celle de début
		if (startDay.getTime() === endDay.getTime() && startHour >= endHour)
			console.log("quatrième erreur", error);

		//TODO Envoyer dans la db la date , l'heure de début et de fin de location
	};
	return (
		<Container>
			<Content>
				<Head>Louer</Head>
				<Form>
					<legend>Choisissez une date</legend>
					<div className="date">
						<p>Du</p>

						<StyledDatePickerWrapper>
							<SingleDatePicker
								numberOfMonths={1}
								onDateChange={(date) => {
									console.log(date._d);
									setStartDate(date);
								}}
								onFocusChange={(focus) => {
									setFocusedStart(focus.focused);
								}}
								focused={focusedStart}
								date={startDate}
							/>
						</StyledDatePickerWrapper>

						<input
							type="time"
							onChange={(e) => {
								setStartTime(e.target.value);
							}}
						/>
					</div>

					<div className="date">
						<p>Au </p>
						<StyledDatePickerWrapper>
							<SingleDatePicker
								numberOfMonths={1}
								onDateChange={(date) => {
									setEndDate(date);
								}}
								onFocusChange={(focus) => {
									setFocusedEnd(focus.focused);
								}}
								focused={focusedEnd}
								date={endDate}
							/>
						</StyledDatePickerWrapper>
						<input
							type="time"
							onChange={(e) => {
								setEndTime(e.target.value);
							}}
						/>
					</div>
					<button
						onClick={(e) => {
							handleClick(e);
						}}
					>
						Valider
					</button>
				</Form>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	/* border: solid red 1px; */
	display: flex;
	position: relative;
	top: 60px;
	margin: auto;
	margin-top: 35px;
	height: 150px;
	width: 950px;
	@media (max-width: 1000px) {
		width: 600px;
	}
`;
const Content = styled.div`
	border: solid black 1px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: 100%;
`;
const Head = styled.div`
	/* border: solid black 1px; */
	border-radius: 5px 0 5px 0;
	display: flex;
	justify-content: center;
	text-align: center;
	font-size: 1.25em;
	background-color: #00a9ff;
	width: 200px;
	height: 30px;
	padding: 8px;
`;
const Form = styled.form`
	/* border: solid red 1px; */
	margin-top: 0px;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	legend {
		/* border: solid red 1px; */
		width: 200px;
	}
	input {
		font-size: 1em;
		border: none;
		font-family: "Roboto";
		background-color: #f3f3f3;
		padding: 5px;
		@media (min-width: 1000px) {
			margin-left: 10px;
		}
	}
	button {
		margin-left: 10px;
		background-color: #00a9f0;
		border-radius: 3px;
		border: none;
		font-size: 1em;
		padding: 5px;
		cursor: pointer;
		&:hover {
			background-color: #00a9ff;
		}
	}
	.date {
		/* border: solid red 1px; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 10px;
		@media (max-width: 1000px) {
			flex-direction: column;
			input {
				margin-top: 5px;
			}
		}
		p {
			/* border : solid red 1px ; */
			padding-right: 10px;
		}
	}
`;
const StyledDatePickerWrapper = styled.div`
	& .SingleDatePicker,
	.SingleDatePickerInput {
		.DateInput {
			width: 100%;
			height: 40px;
			display: flex;
			/* border: solid blue 1px; */
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.DateInput_input {
				font-size: 1rem;
				border-bottom: 0;
				padding: 12px 16px 14px;
				/* border: solid blue 1px; */
			}
		}

		.SingleDatePickerInput__withBorder {
			border-radius: 4px;
			overflow: hidden;
			display: flex;

			:hover,
			.DateInput_input__focused {
				/* border: 1px solid red; */
			}

			.CalendarDay__selected {
				background: blue;
				border: blueviolet;
				/* border: solid blue 1px; */
			}
		}

		.SingleDatePicker_picker.SingleDatePicker_picker {
			top: 43px;
			left: 2px;
			/* border: solid red 1px; */
			/* top: 43px !important;
			left: 2px !important; */
		}
	}
`;

export default Slot;
