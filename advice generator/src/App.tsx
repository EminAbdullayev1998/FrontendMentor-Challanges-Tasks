import { useEffect, useState } from "react";
import "./sass/style.scss";
import axios from "axios";

interface Advice {
	slip: {
		id: number;
		advice: string;
	};
}

function App() {
	const [advice, setAdvice] = useState<Advice | null>(null);

	const fetchAdvice = async () => {
		try {
			const response = await axios.get<Advice>("https://api.adviceslip.com/advice");
			setAdvice(response.data);
		} catch (error) {
			console.error("Xəta:", error);
		}
	};

	useEffect(() => {
		fetchAdvice();
	}, []);

	const handleCircleClick = () => {
		fetchAdvice();
	};

	return (
		<>
			<section>
				<div className="main-box">
					<div className="hero-box">
						<div className="title">
							<h1>ADVICE #{advice?.slip.id}</h1>
						</div>
						<div className="advice-box">
							<p>"{advice?.slip.advice}"</p>
						</div>
						<div className="patterns">
							<svg width={444} height={16} xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fillRule="evenodd">
									<path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
									<g transform="translate(212)" fill="#CEE3E9">
										<rect width={6} height={16} rx={3} />
										<rect x={14} width={6} height={16} rx={3} />
									</g>
								</g>
							</svg>
						</div>
						<div className="patterns-res">
							<svg width={295} height={16} xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fillRule="evenodd">
									<path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
									<g transform="translate(138)" fill="#CEE3E9">
										<rect width={6} height={16} rx={3} />
										<rect x={14} width={6} height={16} rx={3} />
									</g>
								</g>
							</svg>
						</div>
					</div>
					<div className="circle" onClick={handleCircleClick}>
						<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
							<path
								d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
								fill="#202733"
							/>
						</svg>
					</div>
				</div>
			</section>
		</>
	);
}

export default App;
