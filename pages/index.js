import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useEffect, useRef, useState } from "react";
import Icons from "@/components/Icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useWindowDimensions from "@/lib/useWindowDimensions";

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
	const [screenshotSrcList, setScreenshotSrcList] = useState([]);
	const [err, setErr] = useState("");
	const [data, setData] = useState();
	const [scaled, setScaled] = useState(false);
	const [defaultDevice, setDefaultDevice] = useState("");
	const { width } = useWindowDimensions();

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

			let devices = await navigator.mediaDevices.enumerateDevices();
			devices = devices.filter((value) => value.kind === "videoinput");
			setDevices(devices);
			setDefaultDevice(devices[0].deviceId);
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
		setScreenshotSrcList([
			...screenshotSrcList,
			canvas.current.toDataURL("image/webp"),
		]);
		setShowScreenshotImage(true);
	};

	const selectChangeHandler = async (e) => {
		setDefaultDevice(e.target.value);
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
				<div
					className={screenshotSrcList.length === 0 ? "w-100" : "" + "display-cover"}
				>
					<video
						className={scaled ? "scale-effect" : undefined}
						ref={video}
						autoPlay={true}
					/>
					<canvas className="d-none" ref={canvas} />
					{devices.length > 1 && (
						<select
							className="video-options"
							onChange={selectChangeHandler}
							ref={select}
						>
							<option value={defaultDevice}>Select camera</option>
							{devices.map(
								(value) =>
									value.label.length > 0 && (
										<option
											key={value.deviceId}
											selected={defaultDevice === value.deviceId}
											value={value.deviceId}
										>
											{value.label}
										</option>
									)
							)}
						</select>
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
				{showScreenshotImage && (
					<>
						<Swiper
							slidesPerView={"auto"}
							spaceBetween={1}
							modules={[Mousewheel, Pagination]}
							mousewheel={true}
							direction={width >= 992 ? "vertical" : "horizontal"}
						>
							{screenshotSrcList.length > 0 &&
								screenshotSrcList.map((value, index) => (
									<SwiperSlide
										key={index}
										className={
											width < 992 && screenshotSrcList.length > 1 && index > 0
												? "ml-6 "
												: ""
										}
									>
										<figure>
											<img
												src={value}
												alt="Screenshot"
												className={scaled ? "scale-effect" : ""}
											/>
										</figure>
									</SwiperSlide>
								))}
						</Swiper>
					</>
				)}
			</main>
		</>
	);
};
export default Home;
