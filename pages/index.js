import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Icons from "@/components/Icons";

const Home = () => {
	const video = useRef();
	const pause = useRef();
	const play = useRef();
	const canvas = useRef();
	const screenshot = useRef();
	const select = useRef();
	const [live, setLive] = useState(false);
	const [loading, setLoading] = useState(false);
	const [devices, setDevices] = useState([]);
	const [showScreenshotImage, setShowScreenshotImage] = useState(false);
	const [screenshotSrc, setScreenshotSrc] = useState("");
	const [err, setErr] = useState("");
	const [data, setData] = useState();
	const [scaled, setScaled] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const supports = navigator.mediaDevices.getSupportedConstraints();
				if (!supports["facingMode"]) {
					setErr("Browser Not supported!");
				}
			} catch (e) {
				console.error(e.message);
				setErr(
					"Could not get persmission." +
						"\nYou can add this website in the list of `Insecure origins treated as secure`" +
						"\nYou can go to chrome://flags/#unsafely-treat-insecure-origin-as-secure to do it"
				);
			}

			const devices = await navigator.mediaDevices.enumerateDevices();
			setDevices(devices.filter((value) => value.label.length > 0));
			await capture(devices[0].deviceId);
			play.current.classList.add("d-none");
			pause.current.classList.remove("d-none");
			screenshot.current.classList.remove("d-none");
		})();
	}, []);

	const capture = async (deviceId) => {
		setErr("");
		setLive(true);
		setLoading(true);
		const options = {
			audio: false,
			video: {
				deviceId: {
					exact: deviceId,
				},
			},
		};

		let stream;

		try {
			if (data) {
				const tracks = data.getTracks();
				tracks.forEach((track) => track.stop());
			}
			stream = await navigator.mediaDevices.getUserMedia(options);
			setData(stream);
		} catch (e) {
			setErr(`capture error: ${e.message}`);
			return;
		}
		video.current.srcObject = null;
		video.current.srcObject = stream;
		await video.current.play();
		setLoading(false);
	};

	const startLive = async () => {
		await video.current.play();
		play.current.classList.add("d-none");
		pause.current.classList.remove("d-none");
	};
	const pauseLive = async () => {
		video.current.pause();
		play.current.classList.remove("d-none");
		pause.current.classList.add("d-none");
	};

	const takeScreenshot = () => {
		canvas.current.width = video.current.videoWidth;
		canvas.current.height = video.current.videoHeight;
		canvas.current.getContext("2d").drawImage(video.current, 0, 0);
		setScreenshotSrc(canvas.current.toDataURL("image/webp"));
		setShowScreenshotImage(true);
	};

	const selectChangeHandler = async (e) => {
		await capture(e.target.value);
	};

	return (
		<>
			<Head>
				<title>Playing with web rtc</title>
				<meta name="description" content="Developed by ATA" />
			</Head>
			<main className={styles.main}>
				{err.length > 0 && <p className={"error"}>{err}</p>}
				<div className="display-cover">
					<video className={scaled && "scale-effect"} ref={video} autoPlay={true} />
					<canvas className="d-none" ref={canvas} />
					{showScreenshotImage && (
						<figure className={"screenshot-image"}>
							<img
								src={screenshotSrc}
								alt="Screenshot"
								className={scaled && "scale-effect"}
							/>
						</figure>
					)}

					{devices.length > 1 && (
						<div className="video-options">
							<select
								className="custom-select"
								onChange={selectChangeHandler}
								ref={select}
							>
								<option value="">Select camera</option>
								{devices.map(
									(value) =>
										value.label.length > 0 && (
											<option key={value.deviceId} value={value.deviceId}>
												{value.label}
											</option>
										)
								)}
							</select>
						</div>
					)}
					<div className="controls">
						<button className="play" title="Play" ref={play} onClick={startLive}>
							<Icons name={"play"} />
						</button>
						<button
							className="pause d-none"
							title="Pause"
							ref={pause}
							onClick={pauseLive}
						>
							<Icons name={"pause"} />
						</button>
						<button
							className="screenshot d-none"
							title="ScreenShot"
							ref={screenshot}
							onClick={takeScreenshot}
						>
							<Icons name={"screenshot"} />
						</button>
						<button onClick={() => setScaled(!scaled)}>
							<Icons name={"horizontal-mirror"} />
						</button>
					</div>
				</div>
			</main>
		</>
	);
};
export default Home;
