import { useFormik } from "formik";
import * as Yup from "yup";
import "./sass/style.scss";
import { useState } from "react";

const validationSchema = Yup.object().shape({
	day: Yup.string()
		.matches(/^(0?[1-9]|[1-2][0-9]|3[0-1])$/, "Must be a valid day")
		.required("This field is required"),
	month: Yup.string()
		.matches(/^(0?[1-9]|1[0-2])$/, "Must be a valid month")
		.required("This field is required"),
	year: Yup.string()
		.matches(/^[0-9]{4}$/, "Must be a 4-digit year")
		.test("is-past", "Must be in the past", function (value) {
			const currentYear = new Date().getFullYear();
			return parseInt(value, 10) <= currentYear;
		})
		.required("This field is required")
		.min(4, "Must be a valid year"),
});

function isValidDate(day, month, year) {
	const dateStr = `${year}-${month}-${day}`;
	const date = new Date(dateStr);

	if (
		date.getDate() === parseInt(day, 10) &&
		date.getMonth() === parseInt(month, 10) - 1 &&
		date.getFullYear() === parseInt(year, 10)
	) {
		return true;
	}

	return false;
}

function calculateAge(birthDate) {
	const today = new Date();
	const birthDateObj = new Date(birthDate);
	let ageYears = today.getFullYear() - birthDateObj.getFullYear();
	let ageMonths = today.getMonth() - birthDateObj.getMonth();
	let ageDays = today.getDate() - birthDateObj.getDate();

	if (ageDays < 0) {
		ageMonths--;
		const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
		ageDays += lastDayOfMonth;
	}

	if (ageMonths < 0) {
		ageYears--;
		ageMonths += 12;
	}

	return { years: ageYears, months: ageMonths, days: ageDays };
}

function App() {
	const [age, setAge] = useState(null);

	const formik = useFormik({
		initialValues: {
			day: "",
			month: "",
			year: "",
		},
		validationSchema,
		onSubmit: (values) => {
			const { day, month, year } = values;
			if (!isValidDate(day, month, year)) {
				formik.setErrors({
					day: "There are no 31 days in this month",
				});
			} else {
				const birthDate = `${year}-${month}-${day}`;
				const ageResult = calculateAge(birthDate);
				setAge(ageResult);
			}
		},
	});

	return (
		<>
			<section>
				<div className="calculator-box">
					<div className="main-box">
						<form onSubmit={formik.handleSubmit}>
							<div className="inputs">
								<div className="day-input">
									<div className="title">
										<h1>DAY</h1>
									</div>
									<div className="input">
										<input
											type="text"
											placeholder="DD"
											name="day"
											maxLength="2"
											pattern="[0-9]*"
											onInput={(e) => {
												e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
												formik.handleChange(e); // Handle the change in Formik
											}}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.day}
											className={formik.touched.day && formik.errors.day ? "input-error" : ""}
										/>
									</div>
									<div className="alert">
										{formik.touched.day && formik.errors.day ? <p>{formik.errors.day}</p> : null}
									</div>
									<div className="error">
										<p>Must be a valid day</p>
									</div>
								</div>
								<div className="month-input">
									<div className="title">
										<h1>MONTH</h1>
									</div>
									<div className="input">
										<input
											type="text"
											placeholder="MM"
											name="month"
											maxLength="2"
											pattern="[0-9]*"
											onInput={(e) => {
												e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
												formik.handleChange(e); // Handle the change in Formik
											}}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.month}
											className={formik.touched.month && formik.errors.month ? "input-error" : ""}
										/>
									</div>
									<div className="alert">
										{formik.touched.month && formik.errors.month ? (
											<p>{formik.errors.month}</p>
										) : null}
									</div>
									<div className="error">
										<p>Must be a valid month</p>
									</div>
								</div>
								<div className="year-input">
									<div className="title">
										<h1>YEAR</h1>
									</div>
									<div className="input">
										<input
											type="text"
											placeholder="YYYY"
											name="year"
											maxLength="4"
											pattern="[0-9]*"
											onInput={(e) => {
												e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
												formik.handleChange(e); // Handle the change in Formik
											}}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.year}
											className={formik.touched.year && formik.errors.year ? "input-error" : ""}
										/>
									</div>
									<div className="alert">
										{formik.touched.year && formik.errors.year ? <p>{formik.errors.year}</p> : null}
									</div>
									<div className="error">
										<p>Must be in the past</p>
									</div>
								</div>
							</div>
							<div className="button-box">
								<div className="line"></div>
								<button type="submit" className="circle">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={40}
										height={40}
										viewBox="0 0 46 44">
										<g fill="none" stroke="#FFF" strokeWidth={2}>
											<path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
										</g>
									</svg>
								</button>
							</div>
						</form>
						<div className="results">
							<div className="results-year results-divs">
								<span>{age ? age.years : "- -"}</span> <p>years</p>
							</div>
							<div className="results-month results-divs">
								<span>{age ? age.months : "- -"}</span> <p>months</p>
							</div>
							<div className="results-day results-divs">
								<span>{age ? age.days : "- -"}</span> <p>days</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default App;
