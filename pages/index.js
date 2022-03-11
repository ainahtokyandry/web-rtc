import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
	const video = useRef();
	const pause = useRef();
	const play = useRef();
	const canvas = useRef();
	const screenshot = useRef();
	const [streaming, setStreaming] = useState(false);
	const [devices, setDevices] = useState([]);
	const [screenshotImageSrc, setScreenshotImageSrc] = useState("/");
	const [showScreenshotImage, setShowScreenshotImage] = useState(false);
	const [err, setErr] = useState("");

	const selectChangeHandler = async (e) => {
		let camera;
		if (e.target.value === "back") {
			camera = "environment";
		} else camera = "user";
		await capture(camera);
	};

	const capture = async (facingMode) => {
		setErr("");
		const options = {
			audio: false,
			video: {
				facingMode,
			},
		};

		try {
			navigator.mediaDevices
				.getUserMedia(options)
				.then(async (mediaStream) => {
					const tracks = mediaStream.getTracks();
					tracks.forEach((track) => track.stop());
					video.current.srcObject = mediaStream;
					await video.current.play();
				})
				.catch((e) => {
					setErr(e.message);
				});
		} catch (e) {
			return setErr(e.message);
		}
	};
	useEffect(() => {
		(async () => {
			try {
				await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
				const devices = await navigator.mediaDevices.enumerateDevices();
				setDevices(devices.filter((value) => value.deviceId.length > 0));
			} catch (e) {
				setErr(e.message);
			}
		})();
	}, []);

	const playStream = async () => {
		pause.current.classList.remove("d-none");
		play.current.classList.add("d-none");
		screenshot.current.classList.remove("d-none");
		if (!streaming) {
			setStreaming(true);
			try {
				const supports = navigator.mediaDevices.getSupportedConstraints();
				if (!supports["facingMode"]) {
					return setErr("Browser Not supported!");
				}
				await capture("user");
			} catch (e) {
				setErr(e.message);
			}
		} else {
			await video.current.play();
		}
	};

	const doScreenshot = () => {
		canvas.current.width = video.current.videoWidth;
		canvas.current.height = video.current.videoHeight;
		canvas.current.getContext("2d").drawImage(video.current, 0, 0);
		setScreenshotImageSrc(canvas.current.toDataURL("image/webp"));
		setShowScreenshotImage(true);
	};

	const pauseStream = async () => {
		pause.current.classList.add("d-none");
		play.current.classList.remove("d-none");
		video.current.pause();
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Playing with web rtc</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<main className={styles.main}>
				<p>{err}</p>
				<div className="display-cover">
					<video ref={video} />
					<canvas className="d-none" ref={canvas} />

					{devices.length > 1 && (
						<div className="video-options">
							<select
								name=""
								id=""
								className="custom-select"
								onChange={selectChangeHandler}
							>
								<option value="">Select camera</option>
								<option value="front">Front</option>
								<option value="back">Back</option>
							</select>
						</div>
					)}

					{showScreenshotImage && (
						<div className="screenshot-image">
							<Image alt="" src={screenshotImageSrc} width={300} height={200} />
						</div>
					)}

					<div className="controls">
						<button
							className="btn btn-danger play"
							title="Play"
							onClick={playStream}
							ref={play}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="60"
								height="60"
								viewBox="0 0 60 60"
							>
								<path d="M45.563,29.174l-22-15A1,1,0,0,0,22,15V45a1,1,0,0,0,1.563.826l22-15a1,1,0,0,0,0-1.652ZM24,43.107V16.893L43.225,30Z" />
								<path d="M30,0A30,30,0,1,0,60,30,30.034,30.034,0,0,0,30,0Zm0,58A28,28,0,1,1,58,30,28.032,28.032,0,0,1,30,58Z" />
							</svg>
						</button>
						<button
							className="btn btn-info pause d-none"
							title="Pause"
							ref={pause}
							onClick={pauseStream}
						>
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
						</button>
						<button
							className="btn btn-outline-success screenshot d-none"
							title="ScreenShot"
							ref={screenshot}
							onClick={doScreenshot}
						>
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
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
