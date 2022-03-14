const Icons = ({ name }) => {
	const icons = {
		"horizontal-mirror": (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="60"
				height="58"
				viewBox="0 0 60 58"
			>
				<g transform="translate(0 -1)">
					<path d="M0,56.016,27.652,35,0,13.984Z" />
					<path d="M32.348,35,60,56.016V13.984Z" />
					<path d="M30,41a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V42A1,1,0,0,0,30,41Z" />
					<path d="M30,51a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V52A1,1,0,0,0,30,51Z" />
					<path d="M30,56a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V57A1,1,0,0,0,30,56Z" />
					<path d="M30,21a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V22A1,1,0,0,0,30,21Z" />
					<path d="M30,26a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V27A1,1,0,0,0,30,26Z" />
					<path d="M30,11a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V12A1,1,0,0,0,30,11Z" />
					<path d="M30,16a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V17A1,1,0,0,0,30,16Z" />
					<path d="M30,31a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V32A1,1,0,0,0,30,31Z" />
					<path d="M30,36a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V37A1,1,0,0,0,30,36Z" />
					<path d="M30.71,46.02a1,1,0,0,0-1.71.71,1.075,1.075,0,0,0,.027.135A1.008,1.008,0,0,0,29,47v1a1,1,0,0,0,2,0V47a1.055,1.055,0,0,0-.027-.136A1.04,1.04,0,0,0,31,46.729,1.051,1.051,0,0,0,30.71,46.02Z" />
					<path d="M11.973,14.929a1,1,0,0,0,1.3-.558,17.978,17.978,0,0,1,33.09-.826l-5.9-1.581a1,1,0,0,0-.518,1.932l7.728,2.07a1.015,1.015,0,0,0,.26.034c.012,0,.022-.005.034-.006S47.988,16,48,16a1,1,0,0,0,.325-.055.987.987,0,0,0,.656-1.005l1.985-7.41a1,1,0,1,0-1.932-.518l-1.29,4.815a19.972,19.972,0,0,0-36.329,1.8A1,1,0,0,0,11.973,14.929Z" />
				</g>
			</svg>
		),
		screenshot: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 18 18"
			>
				<path
					d="M17.25,3A3.75,3.75,0,0,1,21,6.75v10.5A3.75,3.75,0,0,1,17.25,21H6.75A3.75,3.75,0,0,1,3,17.25V6.75A3.75,3.75,0,0,1,6.75,3Zm0,1.5H6.75A2.25,2.25,0,0,0,4.5,6.75v10.5A2.25,2.25,0,0,0,6.75,19.5h10.5a2.25,2.25,0,0,0,2.25-2.25V6.75A2.25,2.25,0,0,0,17.25,4.5Zm0,8.5a.75.75,0,0,1,.75.75V16a2,2,0,0,1-2,2H13.75a.75.75,0,0,1,0-1.5H16a.5.5,0,0,0,.5-.5V13.75A.75.75,0,0,1,17.25,13ZM6.75,13a.75.75,0,0,1,.75.75V16a.5.5,0,0,0,.5.5h2.25a.75.75,0,0,1,0,1.5H8a2,2,0,0,1-2-2V13.75A.75.75,0,0,1,6.75,13ZM8,6h2.25a.75.75,0,0,1,.1,1.493l-.1.007H8a.5.5,0,0,0-.492.41L7.5,8v2.25a.75.75,0,0,1-1.493.1L6,10.25V8A2,2,0,0,1,7.851,6.005L8,6H8Zm8,0a2,2,0,0,1,2,2v2.25a.75.75,0,0,1-1.5,0V8a.5.5,0,0,0-.5-.5H13.75a.75.75,0,0,1,0-1.5Z"
					transform="translate(-3 -3)"
					fill="#212121"
				/>
			</svg>
		),
		pause: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="60"
				height="60"
				viewBox="0 0 60 60"
			>
				<path d="M30,0A30,30,0,1,0,60,30,30.034,30.034,0,0,0,30,0Zm0,58A28,28,0,1,1,58,30,28.032,28.032,0,0,1,30,58Z" />
				<path d="M33,46h8V14H33Zm2-30h4V44H35Z" />
				<path d="M19,46h8V14H19Zm2-30h4V44H21Z" />
			</svg>
		),
		play: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="60"
				height="60"
				viewBox="0 0 60 60"
			>
				<path d="M45.563,29.174l-22-15A1,1,0,0,0,22,15V45a1,1,0,0,0,1.563.826l22-15a1,1,0,0,0,0-1.652ZM24,43.107V16.893L43.225,30Z" />
				<path d="M30,0A30,30,0,1,0,60,30,30.034,30.034,0,0,0,30,0Zm0,58A28,28,0,1,1,58,30,28.032,28.032,0,0,1,30,58Z" />
			</svg>
		),
	};
	return <>{icons[name]}</>;
};
export default Icons